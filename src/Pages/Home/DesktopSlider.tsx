import type {Result} from "../../type.ts";
import {FaChevronLeft, FaChevronRight, FaStar} from "react-icons/fa";
import {Link} from "react-router-dom";

interface sliderProps {
    sliderFilms: Result[]
    direction: string
    indexSlider: number
    prevFilm: () => void
    nextFilm: () => void
    goTo: (index: number) => void
}

export default function DesktopSlider({direction, indexSlider, sliderFilms, prevFilm, nextFilm, goTo}: sliderProps) {
    const film = sliderFilms[indexSlider]
    const year = film.release_date ? new Date(film.release_date).getFullYear() : null

    return (
        <>
            <img key={indexSlider}
                 src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                 alt=""
                 className={`absolute inset-0 w-full h-full object-cover object-center brightness-50 z-0 ${direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}
            />
            <div className='absolute inset-0 z-10 bg-gradient-to-r from-black via-black/50 to-black/10'/>

            <button onClick={prevFilm} aria-label="Предыдущий фильм" className='absolute left-6 top-1/2 z-20 -translate-y-1/2 text-white/60 transition-colors hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-full'>
                <FaChevronLeft size={32} aria-hidden="true"/>
            </button>
            <button onClick={nextFilm} aria-label="Следующий фильм" className='absolute right-6 top-1/2 z-20 -translate-y-1/2 text-white/60 transition-colors hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-full'>
                <FaChevronRight size={32} aria-hidden="true"/>
            </button>

            <div key={indexSlider}
                 className={`absolute inset-x-0 bottom-0 z-20 flex max-w-3xl flex-col justify-center gap-4 px-8 pb-20 text-white md:px-16 ${direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}>
                <p className='text-xs md:text-sm text-yellow-400 uppercase tracking-[4px]'>Trending Now</p>
                <Link to={`/movie/${film.id}`} className='w-fit'>
                    <h1 className='text-3xl md:text-5xl xl:text-6xl font-bold leading-tight text-balance'>{film.title}</h1>
                </Link>
                <div className='flex items-center gap-5 text-sm text-zinc-300'>
                    <span className='flex items-center gap-1.5'>
                        <FaStar size={14} className='text-yellow-400' aria-hidden="true"/>
                        {film.vote_average > 0 ? Math.round(film.vote_average * 10) / 10 : 'Скоро'}
                    </span>
                    {year && <span className='text-zinc-400'>{year}</span>}
                </div>
                <p className='hidden md:block text-zinc-300 leading-7 max-w-xl line-clamp-3'>{film.overview}</p>
                <div className='mt-2 flex items-center gap-6'>
                    <Link to={`/movie/${film.id}`} className='rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-300'>
                        Подробнее
                    </Link>
                    <div className='flex items-center gap-2'>
                        {sliderFilms.map((f, i) => (
                            <button
                                key={f.id}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Перейти к фильму ${i + 1}`}
                                aria-current={i === indexSlider ? 'true' : undefined}
                                className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${i === indexSlider ? 'w-6 bg-yellow-400' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
