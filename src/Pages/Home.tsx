import fetchPopularFilm from '../api.tsx'
import {useEffect, useState} from "react";

interface Result {
    id: number
    title: string
    overview: string
    release_date: string
    vote_average: number
    backdrop_path: string
    poster_path: string
}

export default function Home() {
    const [popularFilmResult, setPopularFilmResult] = useState<Result[]>([])

    useEffect(() => {
        const popularFilm = async () => {
            const data = await fetchPopularFilm()
            setPopularFilmResult(data.results)
            console.log(data)
        }
        popularFilm()
    }, [])

    return (
        <>
            {popularFilmResult.length > 0 && (
                <div className='flex gap-2'>
                    {popularFilmResult.map(film => (
                        <div className='border-2 border-black'>
                            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt=""/>
                            {film.title}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}