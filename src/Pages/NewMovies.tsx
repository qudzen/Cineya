import {useEffect, useState} from "react";
import {fetchNewFilm} from "../api.tsx";
import SetFilm from "./Components/SetFilm.tsx";
import type {Result} from "./Home/Home.tsx";
import {Link} from "react-router-dom";

export default function NewMovies() {
    const [newFilm, setNewFilm] = useState<Result[]>([])
    useEffect(() => {
        const nowPlayingFilm = async () => {
            const data = await fetchNewFilm()
            setNewFilm(data.results)
        }
        nowPlayingFilm()
    }, [])
    return (
        <>
            <div className='flex gap-2 flex-wrap justify-center mt-7 mx-30'>
                {newFilm && (
                    newFilm.map((film: Result) => (
                        <Link to={`/movie/${film.id}`}>
                            <SetFilm film={film}/>
                        </Link>
                    ))
                )
                }
            </div>
        </>
    )
}