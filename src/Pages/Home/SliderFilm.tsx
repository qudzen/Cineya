import {useState, useEffect} from "react";
import type {Result} from "../../type.tsx";
import DesktopSlider from "./DesktopSlider.tsx";
import MobileSlider from "./MobileSlider";

interface Props {
    sliderFilms: Result[]
}

export default function SliderFilm({sliderFilms}: Props) {
    const [direction, setDirection] = useState('right')
    const [indexSlider, setIndexSlider] = useState<number>(0)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 480);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
            className='lg:grid lg:grid-cols-[70px_1fr_2fr_33px] lg:h-[calc(100vh-60px)] bg-black overflow-hidden lg:relative'>

            {/* ФОНОВАЯ КАРТИНКА */}
            {isMobile ? (
                <MobileSlider direction={direction} indexSlider={indexSlider} sliderFilms={sliderFilms} prevFilm={prevFilm} nextFilm={nextFilm} />
            ) : (
                <DesktopSlider direction={direction} indexSlider={indexSlider} sliderFilms={sliderFilms} prevFilm={prevFilm} nextFilm={nextFilm}/>
            )}
        </div>
    )
}
