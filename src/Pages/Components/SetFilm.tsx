import type {Result} from "../Home/Home.tsx";

interface Props {
    film: Result;
}

export default function SetFilm({film}: Props) {
    return (
        <div className='w-60 mt-5 mb-5'>
            <img className='' src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                 alt=""/>
            <div className='text-sm text-left mt-2 text-white'>{film.title}</div>

            <div
                className='text-sm text-left text-white'>{film.vote_average > 1 ? (Math.round(film.vote_average * 10) / 10) : 'Скоро'}</div>
        </div>
    )
}