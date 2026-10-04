import {useParams} from 'react-router-dom'
import useLike from "../../Hooks/useLike.tsx";
import {FaStar, FaCalendar, FaClock, FaHeart} from 'react-icons/fa'
import {useQuery} from "@tanstack/react-query";
import {fetchCast, fetchMovie} from "../../../api.tsx";
import type {CastMember} from "../../../type.ts";
import Trailer from "./Trailer.tsx";

export default function PageFilm() {
    const {id} = useParams()


    const {data, isError, isLoading} = useQuery({
        queryKey: ['PageFilm', id],
        queryFn: () => fetchMovie(id ?? ''),
    })

    const {data: castData} = useQuery({
        queryKey: ['cast', id],
        queryFn: () => fetchCast(id ?? ''),
    })

    

    const {toggleLike, likeList} = useLike();

    if (isError) return <div>Не удалось загрузить фильмы</div>
    const isLiked = data ? likeList.includes(data.id) : false
    if (isLoading) return <span className="loading loading-spinner loading-xl"></span>

    return (
        <>
            {data && (
                <div className='relative min-h-screen bg-black'>

                    {/* ФОНОВАЯ КАРТИНКА */}
                    <img
                        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                        className='absolute inset-0 w-full h-full object-cover opacity-20'
                        alt=""
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent'/>

                    {/* КОНТЕНТ */}
                    <div className='relative z-10 flex min-h-[calc(100vh-60px)] flex-col md:flex-row md:items-center gap-10 px-6 md:px-20 pt-20 pb-20'>

                        {/* ПОСТЕР */}
                        <div className='flex-shrink-0'>
                            <img
                                className='w-48 md:w-72 rounded-2xl shadow-2xl shadow-black'
                                src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                alt={data.title}
                            />
                        </div>

                        {/* ИНФОРМАЦИЯ */}
                        <div className='flex flex-col gap-5 justify-center'>

                            <div className='flex items-center gap-4'>
                                <h1 className='text-3xl md:text-5xl font-bold text-white'>{data.title}</h1>
                                <button
                                    type="button"
                                    aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
                                    aria-pressed={isLiked}
                                    className={`text-2xl transition-transform hover:scale-110 ${isLiked ? 'text-red-500' : 'text-white/30'}`}
                                    onClick={() => toggleLike(data.id)}
                                >
                                    <FaHeart size={20} className='mt-3' aria-hidden="true" />
                                </button>
                            </div>

                            {data.tagline && (
                                <p className='text-yellow-400 font-light tracking-widest italic'>{data.tagline}</p>
                            )}

                            <div className='flex flex-wrap gap-4 text-sm text-white/50 font-light tracking-wider'>
                                <span className='flex items-center gap-1'>
                                    <FaStar className='text-yellow-400' aria-hidden="true"/>
                                    {data.vote_average > 0 ? Math.round(data.vote_average * 10) / 10 : 'Скоро'}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaCalendar aria-hidden="true"/> {data.release_date ? new Date(data.release_date).getFullYear() : 'Скоро'}
                                </span>
                                {data.runtime  && (
                                    <span className='flex items-center gap-1'>
                                        <FaClock aria-hidden="true"/> {(data.runtime > 0 ? (`${data.runtime}\u00A0мин`) : (`Скоро`))}
                                    </span>
                                )}
                            </div>

                            <div className='flex flex-wrap gap-2'>
                                {data.genres?.map((g: { id: number, name: string }) => (
                                    <span key={g.id}
                                          className='px-3 py-1 border border-yellow-400/40 text-yellow-400 text-xs font-light tracking-widest rounded-full'>
                                    {g.name}
                                </span>
                                ))}
                            </div>

                            <p className='text-white/60 font-light leading-7 max-w-2xl'>{data.overview}</p>

                        </div>
                    </div>

                    <div className='relative z-10 mt-10 mb-20 px-6 md:px-20'>
                        <div className='flex flex-col md:flex-row md:items-start gap-10'>
                            <div className='md:flex-shrink-0'>
                                <Trailer />
                            </div>

                            {castData && castData.cast.length > 0 && (
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
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}