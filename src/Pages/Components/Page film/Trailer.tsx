import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchTrailer} from "../../../api.tsx";
import {useParams} from "react-router-dom";
import {getTrailer} from "./getTrailer.ts";

export default function Trailer() {
    const {id} = useParams()
    const [failed, setFailed] = useState(false)

    const {data, isError, isLoading} = useQuery({
        queryKey: ['trailer', id],
        queryFn: () => fetchTrailer(id ?? ''),
    })

    const trailer = getTrailer(data)

    if (isLoading) return <span className="loading loading-spinner loading-xl"></span>
    if (isError) return <div>Не удалось загрузить трейлер.</div>

    const placeholder = (
        <div className="flex w-full h-[200px] md:w-[560px] md:h-[315px] items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/50">
            Трейлер не найден
        </div>
    )

    if (!trailer || failed) return placeholder

    return (
        <div className="relative w-full aspect-video md:w-[560px] md:h-[315px]">
            <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${trailer?.key}`}
                title="Трейлер фильма"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                onError={() => setFailed(true)}
            />
        </div>
    )
}