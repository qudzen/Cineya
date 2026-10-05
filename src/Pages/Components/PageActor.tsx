import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchActor} from "../../api.tsx";

export default function PageActor(){
    const {actorId} = useParams()

    const {data, isLoading, isError} = useQuery({
        queryKey: ['actor', actorId],
        queryFn: () => fetchActor(actorId ?? '')
    })
    if (isLoading) return <span className="loading loading-spinner loading-xl" role="status" aria-live="polite"></span>
    if (isError) return <div role="alert">Не удалось загрузить актера.</div>

    return (
        <div>
            {data && (
                <div>
                    {data.profile_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
                            alt={data.name}
                        />
                    )}
                    <h1>{data.name}</h1>
                    {data.birthday && <p>{data.birthday}</p>}
                    {data.place_of_birth && <p>{data.place_of_birth}</p>}
                    {data.biography && <p>{data.biography}</p>}
                </div>
            )}
        </div>
    )
}
