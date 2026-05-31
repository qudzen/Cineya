import fetchPopularFilm, {fetchGenre} from '../../api.tsx'
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import SliderFilm from "./SliderFilm.tsx";

export interface Result {
    id: number
    title: string
    overview: string
    release_date: string
    vote_average: number
    backdrop_path: string
    poster_path: string
    genre_ids: number[]

}

interface Genre {
    id: number,
    name: string
}

export default function Home() {
    const [popularFilmResult, setPopularFilmResult] = useState<Result[]>([])

    const [genre, setGenre] = useState<Genre[]>([])

    const shuffle = (array: Result[]) => {
        return [...array].sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        const popularFilm = async () => {
            const data = await fetchPopularFilm()
            //const filtered = data.results.filter((film: Result) => /[а-яёА-ЯЁ]/.test(film.title))
            setPopularFilmResult(shuffle(data.results))
            console.log(data)
        }
        const genreFilm = async () => {
            const dataGenre = await fetchGenre()
            setGenre(dataGenre.genres)
        }
        popularFilm()
        genreFilm()
    }, [])



    const sliderFilms = popularFilmResult.slice(0, 5)
    const otherFilms = popularFilmResult.slice(5)

    return (
        <div className="bg-black">
            {sliderFilms.length > 0 && (
                <SliderFilm sliderFilms={sliderFilms}/>
            )}
            {popularFilmResult.length > 0 && (
                <div className='mt-12'>
                    <h1 className='font-bold text-3xl ml-7 text-white'>Популярные фильмы</h1>
                    <div className='flex gap-2 flex-wrap justify-center mt-7 mx-30'>
                        {otherFilms.map(film => (
                            <Link to={`/movie/${film.id}`}>
                                <div className='w-60 mt-5 mb-5'>
                                    <img className='' src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                                         alt=""/>
                                    <div className='text-sm text-left mt-2 text-white'>{film.title}</div>
                                    <div
                                        className='text-sm text-white'>{genre.find((g: Genre) => g.id === film.genre_ids[0])?.name}</div>
                                    <div className='text-sm text-left text-white'>{ film.vote_average > 1 ?  (Math.round(film.vote_average * 10) / 10) : 'Скоро'}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}