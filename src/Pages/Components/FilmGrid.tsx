import {Link} from "react-router-dom";
import type {FilmCardData} from "../../type.ts";
import SetFilm from "./SetFilm.tsx";

interface FilmGridProps {
    films: FilmCardData[];
}

export default function FilmGrid({films}: FilmGridProps) {
    return (
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:px-12 xl:gap-4">
            {films.map((film) => (
                <Link key={film.id} to={`/movie/${film.id}`} className="h-full">
                    <SetFilm film={film}/>
                </Link>
            ))}
        </div>
    )
}
