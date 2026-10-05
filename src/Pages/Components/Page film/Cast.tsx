import {useParams} from 'react-router-dom'
import {useQuery} from "@tanstack/react-query";
import {fetchCast} from "../../../api.tsx";
import type {CastMember} from "../../../type.ts";

export default function Cast() {
    const {id} = useParams()

    const {data: castData} = useQuery({
        queryKey: ['cast', id],
        queryFn: () => fetchCast(id ?? ''),
    })

    if (!castData || castData.cast.length === 0) return null

    return (
        <div className='min-w-0 flex-1'>
            <h2 className='text-xl md:text-2xl font-bold text-white mb-6'>Актёрский состав</h2>
            <div className='flex gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                {castData.cast.slice(0, 20).map((actor: CastMember) => (
                    <div key={actor.id} className='flex w-24 flex-shrink-0 flex-col items-center gap-2'>
                        {actor.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                                className='h-40 object-cover rounded-2xl'
                            />
                        ) : (
                            <div className='flex h-40 w-24 rounded-2xl items-center justify-center bg-white/5 text-2xl font-bold text-white/40'>
                                {actor.name?.charAt(0)}
                            </div>
                        )}
                        <p className='text-center text-xs font-light text-white'>{actor.name}</p>
                        <p className='text-center text-[10px] font-light text-white/40'>{actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
