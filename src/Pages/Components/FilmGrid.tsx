import {Link} from "react-router-dom";
import type {Result} from "../../type.tsx";
import SetFilm from "./SetFilm.tsx";

const ITEM_WIDTH =
    'w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-1.5rem)/3)] md:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-3rem)/5)] xl:w-[calc((100%-5rem)/6)]'

interface FilmGridProps {
    films: Result[];
}

export default function FilmGrid({films}: FilmGridProps) {
    return (
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap justify-center gap-3 px-4 lg:px-12 xl:gap-4">
            {films.map((film) => (
                <Link key={film.id} to={`/movie/${film.id}`} className={ITEM_WIDTH}>
                    <SetFilm film={film}/>
                </Link>
            ))}
        </div>
    )
}
