import type {Result} from "../../type.tsx";
import {FaChevronLeft, FaChevronRight, FaStar} from "react-icons/fa";
import {Link} from "react-router-dom";

interface sliderProps {
    sliderFilms: Result[]
    direction: string
    indexSlider: number
    prevFilm: () => void
    nextFilm: () => void
}

export default function MobileSlider({direction, indexSlider, sliderFilms, prevFilm, nextFilm}: sliderProps) {
    const film = sliderFilms[indexSlider]

    return (
        <div className='relative w-full col-span-3 bg-black'>
            <div className='relative aspect-[16/10] w-full overflow-hidden'>
                <img
                    key={indexSlider}
                    src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover ${direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}
                />

                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent'/>

                <button onClick={prevFilm} className='absolute left-3 top-1/2 z-20 -translate-y-1/2 text-white/50 transition hover:text-yellow-400'>
                    <FaChevronLeft size={20}/>
                </button>
                <button onClick={nextFilm} className='absolute right-3 top-1/2 z-20 -translate-y-1/2 text-white/50 transition hover:text-yellow-400'>
                    <FaChevronRight size={20}/>
                </button>
            </div>

            <div
                key={`info-${indexSlider}`}
                className={`relative z-20 flex flex-row items-center gap-3 px-4 -mt-[calc(6.5rem*3/4)] pb-4 ${direction === 'left' ? 'animate-slide-left' : 'animate-slide-right'}`}
            >
                <Link to={`/movie/${film.id}`} className='flex-shrink-0'>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                        alt=""
                        className='w-26 aspect-[2/3] rounded-lg object-cover shadow-lg'
                    />
                </Link>

                <div className='flex min-w-0 flex-col gap-1'>
                    <p className='text-[10px] uppercase tracking-widest text-yellow-400'>Trending Now</p>
                    <Link to={`/movie/${film.id}`}>
                        <h1 className='line-clamp-1 text-base font-bold text-white'>{film.title}</h1>
                    </Link>
                    <div className='flex items-center gap-3 text-xs text-zinc-400'>
                        <span className='flex items-center gap-1'>
                            <FaStar size={10} className='text-yellow-400'/>
                            {film.vote_average > 0 ? Math.round(film.vote_average * 10) / 10 : 'Скоро'}
                        </span>
                        <span>{film.release_date?.slice(0, 4)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}