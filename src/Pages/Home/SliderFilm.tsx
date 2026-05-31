import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useState} from "react";
import type {Result} from "./Home.tsx";

interface Props {
    sliderFilms: Result[]
}

export default function SliderFilm ({ sliderFilms }: Props){
    const [direction, setDirection] = useState('right')
    const [indexSlider, setIndexSlider] = useState<number>(0)

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
    return (
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
                <Link to={`/movie/${sliderFilms[indexSlider].id}`}><h1 className='text-5xl font-bold'>{sliderFilms[indexSlider].title}</h1></Link>
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
    )
}