import {useQuery} from "@tanstack/react-query";
import {fetchTrailer} from "../../../api.tsx";
import {useParams} from "react-router-dom";
import {getTrailer} from "./getTrailer.ts";

export default function Trailer() {
    const {id} = useParams()



    const {data, isError, isLoading} = useQuery({
        queryKey: ['trailer', id],
        queryFn: () => fetchTrailer(id ?? ''),
    })

    const trailer = getTrailer(data)

    if (isLoading) return <span className="loading loading-spinner loading-xl"></span>
    if (isError) return <div>Не удалось загрузить трейлер.</div>
    if (!trailer) return <div>Трейлер не найден</div>

    return (
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer?.key}`}
            title="Трейлер фильма"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    )
}