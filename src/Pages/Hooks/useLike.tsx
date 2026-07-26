import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./useAuth";

const LOCAL_KEY = 'likes'

export default function useLike() {
    const { user } = useAuth();
    const [likeList, setLikeList] = useState<number[]>(() => {
        return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    })

    useEffect(() => {
        if (!user) return

        fetch(`${import.meta.env.VITE_API_URL}/api/likes?userId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.likes) {
                    setLikeList(data.likes)
                }
            })
            .catch(err => console.error('Ошибка загрузки лайков:', err))
    }, [user?.id])

    const toggleLike = useCallback(async (id: number) => {
        const newList = likeList.includes(id)
            ? likeList.filter(i => i !== id)
            : [...likeList, id]

        setLikeList(newList)

        if (user) {
            fetch(`${import.meta.env.VITE_API_URL}/api/likes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, movieId: id }),
            }).catch(err => console.error('Ошибка сохранения лайка:', err))
        } else {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(newList))
        }
    }, [likeList, user])

    return { likeList, toggleLike }
}
