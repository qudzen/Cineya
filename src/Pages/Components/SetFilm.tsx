import type {Genre} from "../Hooks/useGenre.tsx";
import type {Result} from "../Home/Home.tsx";

interface Props {
    genre: Genre[];
    film: Result;
}

export default function SetFilm({film, genre}: Props) {
    return (
        <div className='w-60 mt-5 mb-5'>
            <img className='' src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                 alt=""/>
            <div className='text-sm text-left mt-2 '>{film.title}</div>
            <div
                className='text-sm '>{genre.find((g: Genre) => g.id === film.genre_ids[0])?.name}</div>
            <div
                className='text-sm text-left '>{film.vote_average > 1 ? (Math.round(film.vote_average * 10) / 10) : 'Скоро'}</div>
        </div>
    )
}