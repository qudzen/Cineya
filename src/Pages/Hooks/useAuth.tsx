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
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return
            if (event.data.user) {
                setUser(event.data.user)
                localStorage.setItem('user', JSON.stringify(event.data.user))
            }
        }
        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return { user, logout }
}