import useLike from "../Hooks/useLike.tsx";
import {useEffect, useState} from "react";
import {fetchMovie} from "../../api.tsx";
import SetFilm from "../Components/SetFilm.tsx";
import {Link} from "react-router-dom";
import type {Result} from "../../type.tsx";


export default function MyList() {
    const {likeList} = useLike();
    const [movies, setMovies] = useState<Result[]>([]);

    useEffect(() => {
        if (likeList.length === 0) return
        const getMovie = async () => {
            try {
                const data = await Promise.all(likeList.map(id => fetchMovie(id)))
                setMovies(data)
            }catch(err) {
                console.log(`Ошибка ${err}`)
            }
        }
        getMovie()
    }, [])


    return (
        <div>
            <div className='flex gap-2 flex-wrap justify-center mt-7 mx-30'>
                {movies && (
                    movies.map((film) => (
                        <Link to={`/movie/${film.id}`}>
                            <SetFilm film={film}/>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}