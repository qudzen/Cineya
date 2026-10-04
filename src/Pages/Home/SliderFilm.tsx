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
        <div className='lg:grid lg:grid-cols-[70px_1fr_2fr_33px] lg:h-[calc(100vh-60px)] bg-black overflow-hidden lg:relative'>
            <MobileSlider direction={direction} indexSlider={indexSlider} sliderFilms={sliderFilms} prevFilm={prevFilm} nextFilm={nextFilm} />
            <div className="hidden lg:contents">
                <DesktopSlider direction={direction} indexSlider={indexSlider} sliderFilms={sliderFilms} prevFilm={prevFilm} nextFilm={nextFilm}/>
            </div>
        </div>
    )
}
