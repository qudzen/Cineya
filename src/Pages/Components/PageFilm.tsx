import { useParams } from 'react-router-dom'
import {fetchMovie} from "../../api.tsx";
import useLike from "../Hooks/useLike.tsx";
import {useFetch} from "../Hooks/useFetch.tsx";

export default function PageFilm() {
    const { id } = useParams()
    const {data, error, loading} = useFetch(() => {
        if (!id) return Promise.reject(new Error('id not found'))
        return fetchMovie(id)
    })
    const {toggleLike, likeList} = useLike();

    if (error) return <div>Не удалось загрузить фильмы</div>
    const isLiked = data ? likeList.includes(data.id) : false
    if (loading) return <span className="loading loading-spinner loading-xl"></span>

    return (
        <>
            {data && (
                <div>
                    <img className='w-100' src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                         alt=""/>
                    <button className={`${isLiked ? 'text-red-600' : 'text-white'}`} onClick={() => toggleLike(data.id)}>like</button>
                    <div>{data.title}</div>
                    <div>{data.overview}</div>
                </div>
            )}
        </>
    )
}