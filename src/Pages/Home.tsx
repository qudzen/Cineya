import fetchPopularFilm, {fetchGenre} from '../api.tsx'
import {useEffect, useState} from "react";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa";
import {Link} from 'react-router-dom'

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
    const [indexSlider, setIndexSlider] = useState<number>(0)
    const [direction, setDirection] = useState('right')
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

    const nextFilm = () => {
        setDirection('right')
        if (indexSlider === 4) {
            setIndexSlider(0)
        } else {
            setIndexSlider(prev => prev + 1)
        }
    }

    const prevFilm = () => {
        setDirection('left')
        if (indexSlider === 0) {
            setIndexSlider(4)
        } else {
            setIndexSlider(prev => prev - 1)
        }
    }

    const sliderFilms = popularFilmResult.slice(0, 5)
    const otherFilms = popularFilmResult.slice(5)

    return (
        <>
            {sliderFilms.length > 0 && (
                <div
                    className='grid grid-cols-[70px_1fr_2fr_33px] h-[calc(100vh-60px)] bg-black overflow-hidden relative'>

                    {/* ФОНОВАЯ КАРТИНКА */}
                    <img key={indexSlider}
                         src={`https://image.tmdb.org/t/p/original${sliderFilms[indexSlider].backdrop_path}`} alt=""
                         className={`absolute inset-0 w-full h-full object-cover object-right brightness-50 z-0 pl-[20%] ${
                             direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'
                         }`}
                    />
                    <div className='absolute inset-0 z-10' style={{
                        background: 'linear-gradient(to right, black 20%, transparent 60%)'
                    }}/>

                    <button onClick={prevFilm} className='z-20 text-white hover:text-yellow-400 transition'>
                        <FaChevronLeft size={30}/>
                    </button>

                    <div key={indexSlider}
                         className={`relative z-20 flex flex-col justify-center gap-4 px-10 text-white ${
                             direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'
                         }`}>
                        <p className='text-yellow-400 uppercase tracking-[4px]'>Trending Now</p>
                        <h1 className='text-5xl font-bold'>{sliderFilms[indexSlider].title}</h1>
                        <div className='flex gap-5 text-zinc-400'>
                            <span>⭐ {sliderFilms[indexSlider].vote_average}</span>
                            <span>{sliderFilms[indexSlider].release_date}</span>
                        </div>
                        <p className='text-zinc-300 leading-6 max-w-[500px]'>{sliderFilms[indexSlider].overview}</p>
                    </div>

                    <div className='z-0'/>

                    <button onClick={nextFilm} className='z-20 text-white hover:text-yellow-400 transition'>
                        <FaChevronRight size={30}/>
                    </button>
                </div>
            )}
            {popularFilmResult.length > 0 && (
                <div className='mt-12'>
                    <h1 className='font-bold text-3xl ml-7'>Популярные фильмы</h1>
                    <div className='flex gap-2 flex-wrap justify-center mt-7 mx-30'>
                        {otherFilms.map(film => (
                            <Link to={`/movie/${film.id}`}>
                                <div className='w-60 mt-5 mb-5'>
                                    <img className='' src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                                         alt=""/>
                                    <div className='text-sm text-left mt-2'>{film.title}</div>
                                    <div
                                        className='text-sm'>{genre.find((g: Genre) => g.id === film.genre_ids[0])?.name}</div>
                                    <div className='text-sm text-left'>{Math.round(film.vote_average * 10) / 10}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}