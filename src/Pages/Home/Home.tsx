import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import SliderFilm from "./SliderFilm.tsx";
import fetchPopularFilm from "../../api.tsx";
import SetFilm from "../Components/SetFilm.tsx";
import type {Result} from "../../type.tsx";


export default function Home() {
    const [popularFilmResult, setPopularFilmResult] = useState<Result[]>([])


    const shuffle = (array: Result[]) => {
        return [...array].sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        const popularFilm = async () => {
            try {
                const data = await fetchPopularFilm()
                setPopularFilmResult(shuffle(data.results))
                console.log(data)
            }catch (err){
                console.log(`Ошибка ${err}`)
            }
        }
        popularFilm()
    }, [])


    const sliderFilms = popularFilmResult.slice(0, 5)
    const otherFilms = popularFilmResult.slice(5)

    return (
        <div>
            {sliderFilms.length > 0 && (
                <SliderFilm sliderFilms={sliderFilms}/>
            )}
            {popularFilmResult.length > 0 && (
                <div className='mt-12'>
                    <h1 className='font-bold text-3xl ml-7 text-white'>Популярные фильмы</h1>
                    <div className='flex gap-2 flex-wrap justify-center mt-7 mx-30'>
                        {otherFilms.map(film => (
                            <Link to={`/movie/${film.id}`}>
                                <SetFilm film={film}/>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}