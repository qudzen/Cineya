import { useState, useEffect } from 'react'

interface YandexUser {
    id: string
    login: string
    real_name: string
    avatar_id: string
}

export function useAuth() {
    const [user, setUser] = useState<YandexUser | null>(() => {
        const saved = localStorage.getItem('user')
        return saved ? JSON.parse(saved) : null
    })

    const exchangeCode = async (code: string) => {
        const verifier = sessionStorage.getItem('code_verifier')
        sessionStorage.removeItem('code_verifier')

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/yandex-auth?code=${code}&code_verifier=${verifier}`,
            )

            if (!response.ok) {
                const errText = await response.text()
                console.error('Ошибка API авторизации:', response.status, errText)
                return
            }

            const userData = await response.json()

            if (userData && userData.id) {
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData))
            }
        } catch (err) {
            console.error('Ошибка обмена кода на токен:', err)
        }
    }

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return
            if (event.data?.type !== 'yandex_auth') return

            exchangeCode(event.data.code)
        }

        const handleStorage = (event: StorageEvent) => {
            if (event.key !== 'yandex_auth_code' || !event.newValue) return
            localStorage.removeItem('yandex_auth_code')
            exchangeCode(event.newValue)
        }

        window.addEventListener('message', handleMessage)
        window.addEventListener('storage', handleStorage)
        return () => {
            window.removeEventListener('message', handleMessage)
            window.removeEventListener('storage', handleStorage)
        }
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return { user, logout }
}
