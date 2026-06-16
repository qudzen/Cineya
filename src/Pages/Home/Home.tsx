import {Link} from 'react-router-dom'
import SliderFilm from "./SliderFilm.tsx";
import fetchPopularFilm from "../../api.tsx";
import SetFilm from "../Components/SetFilm.tsx";
import type {Result} from "../../type.tsx";
import {useFetch} from "../Hooks/useFetch.tsx";

const shuffle = (array: Result[]) => {
    return [...array].sort(() => Math.random() - 0.5)
}

export default function Home() {
    const {data, error, loading} = useFetch(fetchPopularFilm)

    if (loading) return <span className="loading loading-spinner loading-xl"></span>
    if (error) return <div>Не удалось загрузить фильмы</div>
    const shuffled =  shuffle(data?.results || [])


    const sliderFilms = shuffled.slice(0, 5)
    const otherFilms = shuffled.slice(5)
    console.log(shuffled)

    return (
        <div>
            {sliderFilms.length > 0 && (
                <SliderFilm sliderFilms={sliderFilms}/>
            )}
            {shuffled.length > 0 && (
                <div className='mt-12'>
                    <h1 className='font-bold text-xl md:text-5xl text-white md:mx-57 px-2 mt-5'>Популярные фильмы</h1>
                    <div className='flex gap-2 flex-wrap justify-center mt-7 md:mx-3 lg:mx-30'>
                        {otherFilms.map(film => (
                            <Link key={film.id} to={`/movie/${film.id}`}>
                                <SetFilm film={film}/>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}