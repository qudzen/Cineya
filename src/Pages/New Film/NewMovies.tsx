import {useEffect, useState} from "react";
import {fetchNewFilm} from "../../api.tsx";
import SetFilm from "../Components/SetFilm.tsx";
import type {Result} from "../../type.tsx";
import {Link} from "react-router-dom";

export default function NewMovies() {
    const [newFilm, setNewFilm] = useState<Result[]>([])
    const [page, setPage] = useState<number>(1)

    const nextPage = async () => {
        const nextPageNumber = page + 1
        setPage(nextPageNumber)
        const data = await fetchNewFilm(nextPageNumber)
        setNewFilm(prev => [...prev, ...data.results])
    }

    useEffect(() => {
        const nowPlayingFilm = async () => {
            const data = await fetchNewFilm(page)
            setNewFilm(data.results)
        }
        nowPlayingFilm()
    }, [])
    return (
        <>
            <div className='flex gap-2 flex-wrap justify-center mt-7 mx-30'>
                {newFilm && (
                    newFilm.map((film: Result) => (
                        <Link key={film.id} to={`/movie/${film.id}`}>
                            <SetFilm film={film}/>
                        </Link>
                    ))
                )
                }
            </div>
            <button onClick={nextPage}>Показать еще</button>
        </>
    )
}