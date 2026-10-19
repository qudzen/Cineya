import {useState} from "react";
import type {Result} from "../../type.ts";
import DesktopSlider from "./DesktopSlider.tsx";
import MobileSlider from "./MobileSlider";

interface Props {
    sliderFilms: Result[]
}

export default function SliderFilm({sliderFilms}: Props) {
    const [direction, setDirection] = useState('right')
    const [indexSlider, setIndexSlider] = useState<number>(0)
    const count = sliderFilms.length

    const nextFilm = () => {
        setDirection('right')
        setIndexSlider(prev => (prev + 1) % count)
    }

    const prevFilm = () => {
        setDirection('left')
        setIndexSlider(prev => (prev - 1 + count) % count)
    }

    const goTo = (index: number) => {
        setDirection(index > indexSlider ? 'right' : 'left')
        setIndexSlider(index)
    }

    return (
        <div className='bg-black'>
            <MobileSlider direction={direction} indexSlider={indexSlider} sliderFilms={sliderFilms} prevFilm={prevFilm} nextFilm={nextFilm} goTo={goTo} />
            <div className='hidden lg:block relative h-[calc(100vh-60px)] overflow-hidden'>
                <DesktopSlider direction={direction} indexSlider={indexSlider} sliderFilms={sliderFilms} prevFilm={prevFilm} nextFilm={nextFilm} goTo={goTo} />
            </div>
        </div>
    )
}
