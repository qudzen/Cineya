import { useParams } from 'react-router-dom'
import {useEffect, useState} from "react";
import {fetchMovie} from "../../api.tsx";
import type {Result} from "../../type.tsx";
import useLike from "../Hooks/useLike.tsx";

export default function PageFilm() {
    const {toggleLike, likeList} = useLike();
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

    const isLiked = movie ? likeList.includes(movie.id) : false

    if (loading) return <span className="loading loading-spinner loading-xl"></span>

    return (
        <>
            {movie && (
                <div>
                    <img className='w-100' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                         alt=""/>
                    <button className={`${isLiked ? 'text-red-600' : 'text-white'}`} onClick={() => toggleLike(movie.id)}>like</button>
                    <div>{movie.title}</div>
                    <div>{movie.overview}</div>
                </div>
            )}
        </>
    )
}