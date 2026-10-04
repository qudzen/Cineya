import type {Result} from "../../type.ts";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {Link} from "react-router-dom";

interface sliderProps {
    sliderFilms: Result[]
    direction: string
    indexSlider: number
    prevFilm: () => void
    nextFilm: () => void
}

export default function DesktopSlider({direction, indexSlider, sliderFilms, prevFilm, nextFilm}: sliderProps) {
    const film = sliderFilms[indexSlider]
    const year = film.release_date ? new Date(film.release_date).getFullYear() : null

    return (
        <>
            <img key={indexSlider}
                 src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} alt=""
                 className={`absolute inset-0 w-full h-full object-cover object-right brightness-50 z-0 pl-[20%] ${
                     direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'
                 }`}
            />
            <div className='absolute inset-0 z-10' style={{
                background: 'linear-gradient(to right, black 20%, transparent 60%)'
            }}/>
            <button onClick={prevFilm} aria-label="Предыдущий фильм" className='z-20 text-white hover:text-yellow-400 transition-colors'>
                <FaChevronLeft size={30} aria-hidden="true"/>
            </button>

            <div key={indexSlider}
                 className={`relative z-20 flex flex-col justify-center gap-4 px-10 text-white ${
                     direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'
                 }`}>
                <p className='text-yellow-400 uppercase tracking-[4px]'>Trending Now</p>
                <Link to={`/movie/${film.id}`}><h1
                    className='text-3xl md:text-5xl font-bold'>{film.title}</h1></Link>
                <div className='flex gap-5 text-zinc-400'>
                    <span>⭐ {film.vote_average.toFixed(1)}</span>
                    {year && <span>{year}</span>}
                </div>
                <p className='hidden md:block text-zinc-300 leading-6 max-w-[500px]'>{film.overview}</p>
            </div>

            <div className='z-0'/>

            <button onClick={nextFilm} aria-label="Следующий фильм" className='z-20 text-white hover:text-yellow-400 transition-colors'>
                <FaChevronRight size={30} aria-hidden="true"/>
            </button>
        </>
    )
}
