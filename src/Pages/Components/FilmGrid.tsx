import {Link} from "react-router-dom";
import type {Result} from "../../type.ts";
import SetFilm from "./SetFilm.tsx";
import {useEffect, useState} from "react";

const ITEM_WIDTH =
    'w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-1.5rem)/3)] md:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-3rem)/5)] xl:w-[calc((100%-5rem)/6)]'

const BREAKPOINTS = [
    '(min-width: 1280px)',
    '(min-width: 1024px)',
    '(min-width: 768px)',
    '(min-width: 640px)',
]

const getColumns = () => {
    if (window.matchMedia(BREAKPOINTS[0]).matches) return 6
    if (window.matchMedia(BREAKPOINTS[1]).matches) return 5
    if (window.matchMedia(BREAKPOINTS[2]).matches) return 4
    if (window.matchMedia(BREAKPOINTS[3]).matches) return 3
    return 2
}

interface FilmGridProps {
    films: Result[];
}

export default function FilmGrid({films}: FilmGridProps) {
    const [columns, setColumns] = useState(getColumns)

    useEffect(() => {
        const mediaQueries = BREAKPOINTS.map(q => window.matchMedia(q))
        const update = () => setColumns(getColumns())
        mediaQueries.forEach(mq => mq.addEventListener('change', update))
        return () => mediaQueries.forEach(mq => mq.removeEventListener('change', update))
    }, [])

    const placeholders = (columns - (films.length % columns)) % columns

    return (
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap justify-center gap-3 px-4 lg:px-12 xl:gap-4">
            {films.map((film) => (
                <Link key={film.id} to={`/movie/${film.id}`} className={ITEM_WIDTH}>
                    <SetFilm film={film}/>
                </Link>
            ))}
            {Array.from({length: placeholders}).map((_, i) => (
                <div key={`placeholder-${i}`} className={`${ITEM_WIDTH} invisible`} aria-hidden="true"/>
            ))}
        </div>
    )
}
