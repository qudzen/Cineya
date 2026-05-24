import { useParams } from 'react-router-dom'
import {useEffect, useState} from "react";
import {fetchMovie} from "../api.tsx";
import type {Result} from "./Home.tsx";

export default function PageFilm() {
    const [movie, setMovie] = useState<Result | null>(null)
    const { id } = useParams()
    useEffect(() => {
        if (!id) return
        const  getMovie = async () => {
            const data = await fetchMovie(id)
            setMovie(data)
            console.log(data)
        }
        getMovie()
    }, [])

    return (
        <>
            {movie && <div>{movie.title}</div>}
        </>
    )
}