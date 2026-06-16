import type {Result} from "../../type.tsx";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {Link} from "react-router-dom";

interface sliderProps {
    sliderFilms: Result[]
    direction: string
    indexSlider: number
    prevFilm: () => void
    nextFilm: () => void
}

export default function MobileSlider({direction, indexSlider, sliderFilms, prevFilm, nextFilm}: sliderProps) {
    return (
        <>
            <img key={indexSlider}
                 src={`https://image.tmdb.org/t/p/original${sliderFilms[indexSlider].poster_path}`} alt=""
                 className={`absolute ${direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}
            />
            <div className='absolute inset-0 z-10' style={{
                background: 'linear-gradient(to top, black 30%, transparent 80%)'
            }}/>
            <button onClick={prevFilm} className='z-20 text-white hover:text-yellow-400 transition'>
                <FaChevronLeft size={30}/>
            </button>

            <div
                 className={`relative z-20 flex flex-col justify-end gap-4 px-10 text-white ${
                     direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'
                 }`}>
                <p className='text-yellow-400 uppercase tracking-[4px]'>Trending Now</p>
                <Link to={`/movie/${sliderFilms[indexSlider].id}`}><h1
                    className='text-2xl font-bold'>{sliderFilms[indexSlider].title}</h1></Link>
                <div className='flex gap-5 text-zinc-400'>
                    <span>⭐ {sliderFilms[indexSlider].vote_average}</span>
                    <span>{sliderFilms[indexSlider].release_date}</span>
                </div>
            </div>



            <button onClick={nextFilm} className='z-20 text-white hover:text-yellow-400 transition'>
                <FaChevronRight size={30}/>
            </button>
        </>
    )
}