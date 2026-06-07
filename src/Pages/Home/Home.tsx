import useGenre from "../Hooks/useGenre.tsx";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import SliderFilm from "./SliderFilm.tsx";
import fetchPopularFilm from "../../api.tsx";
import SetFilm from "../Components/SetFilm.tsx";

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



export default function Home() {
    const [popularFilmResult, setPopularFilmResult] = useState<Result[]>([])
    const {genre} = useGenre();


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

        popularFilm()

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
                                <SetFilm genre={genre} film={film}/>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}