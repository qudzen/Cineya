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

    useEffect(() => {
        const handleStorage = async (event: StorageEvent) => {
            if (event.key !== 'yandex_auth_code' || !event.newValue) return

            const code = event.newValue
            localStorage.removeItem('yandex_auth_code')

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

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return { user, logout }
}
