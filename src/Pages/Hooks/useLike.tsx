import {useEffect, useState} from "react";

export default function useLike() {
    const [likeList, setLikeList] = useState<number[]>(() => {
        return JSON.parse(localStorage.getItem('likes') || '[]')
    })

    const toggleLike = (id: number) => {
        if (likeList.includes(id) ) {
            setLikeList(likeList.filter(i => i !== id))
        }
        else {
            setLikeList([...likeList, id])
        }
    }

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likeList))
    }, [likeList])

    return {
        likeList,
        toggleLike,
    }
}
