import useGenre from "./useGenre.tsx";
import type {Genre} from "./useGenre.tsx";
import {useEffect, useState} from "react";
import {searchByGenre} from "../api.tsx";
import type {Result} from "./Home/Home.tsx";
import {Link} from 'react-router-dom'

export default function Movies() {
    const {genre} = useGenre()
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
    const [resultSearchByGenre, setResultSearchByGenre] = useState<Result[]>([])
    const [page, setPage ] = useState<number>(1)

    const nextPage = async (selectedGenre: number, page: number) => {
        if (selectedGenre) {
            const nextPageNumber = page + 1
            setPage(nextPageNumber)
            const data = await searchByGenre(selectedGenre, nextPageNumber)
            setResultSearchByGenre(prev => [...prev, ...data.results])
        }
    }

    useEffect(() => {
        if (selectedGenre) {
            const listOfFilms = async (selectedGenre: number, page: number) => {
                const data = await searchByGenre(selectedGenre, page)
                setResultSearchByGenre(data.results)
                console.log(data.results)
                setPage(1)
            }
            listOfFilms(selectedGenre, page)
        }
    }, [selectedGenre])
    return (
        <>
            {
                genre.map((g: Genre) => (
                    <div key={g.id} onClick={() => {
                        setSelectedGenre(g.id)
                    }}>
                        {g.name}
                    </div>
                ))
            }
            <div className='flex gap-2 flex-wrap justify-center mt-7 mx-30'>
                {resultSearchByGenre && (
                    resultSearchByGenre.map((film: Result) => (
                        <Link to={`/movie/${film.id}`}>
                            <div className='w-60 mt-5 mb-5'>
                                <img className='' src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                                     alt=""/>
                                <div className='text-sm text-left mt-2 '>{film.title}</div>
                                <div
                                    className='text-sm '>{genre.find((g: Genre) => g.id === film.genre_ids[0])?.name}</div>
                                <div
                                    className='text-sm text-left '>{film.vote_average > 1 ? (Math.round(film.vote_average * 10) / 10) : 'Скоро'}</div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <button onClick={() => nextPage(selectedGenre, page)}>Показать еще</button>
        </>
    )
}