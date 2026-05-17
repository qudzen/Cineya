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
    const [indexSlider, setIndexSlider] = useState<number>(0)

    useEffect(() => {
        const popularFilm = async () => {
            const data = await fetchPopularFilm()
            setPopularFilmResult(data.results)
            console.log(data)
        }
        popularFilm()
    }, [])

    const nextFilm = () => {
        if (indexSlider === 4){
            setIndexSlider(0)
        }
        else {
            setIndexSlider(prev => prev + 1)
        }
    }

    const prevFilm = () => {
        if (indexSlider === 0){
            setIndexSlider(4)
        }
        else {
            setIndexSlider(prev => prev - 1)
        }
    }

    const sliderFilms = popularFilmResult.slice(0, 5)
    const otherFilms = popularFilmResult.slice(5)

    return (
        <>
            {sliderFilms.length > 0 && (
                <div className='flex gap-2'>
                        <div className='border-2 border-black'>
                            <img src={`https://image.tmdb.org/t/p/original${sliderFilms[indexSlider].backdrop_path}`} alt=""/>
                            {sliderFilms[indexSlider].title}
                        </div>
                    <button onClick={nextFilm}> Следующий </button>
                    <button onClick={prevFilm}> Предидущий </button>
                </div>
            )}
            {popularFilmResult.length > 0 && (
                <div className='flex gap-2'>
                    {otherFilms.map(film => (
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