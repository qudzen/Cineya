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

    if (loading) return <span className="loading loading-spinner loading-xl"></span>

    return (
        <>
            {movie && (
                <div>
                    <img className='w-100' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                         alt=""/>
                    <div>{movie.title}</div>
                    <div>{movie.overview}</div>
                </div>
            )}
        </>
    )
}