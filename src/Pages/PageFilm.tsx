import { useParams } from 'react-router-dom'
import {useEffect, useState} from "react";
import {fetchMovie} from "../api.tsx";
import type {Result} from "./Home.tsx";

export default function PageFilm() {
    const [movie, setMovie] = useState<Result | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { id } = useParams()
    useEffect(() => {
        if (!id) return
        const  getMovie = async () => {
            const data = await fetchMovie(id)
            setMovie(data)
            setLoading(false)
            console.log(data)
        }
        getMovie()
    }, [])

    if (loading) return <div>Загрузка</div>

    return (
        <>
            {movie && <div>{movie.title}</div>}
        </>
    )
}