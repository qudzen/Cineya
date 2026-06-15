import {useParams} from 'react-router-dom'
import {fetchMovie} from "../../api.tsx";
import useLike from "../Hooks/useLike.tsx";
import {useFetch} from "../Hooks/useFetch.tsx";
import {FaStar, FaCalendar, FaClock, FaHeart} from 'react-icons/fa'

export default function PageFilm() {
    const {id} = useParams()
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
                <div className='relative min-h-screen bg-black'>

                    {/* ФОНОВАЯ КАРТИНКА */}
                    <img
                        src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                        className='absolute inset-0 w-full h-full object-cover opacity-20'
                        alt=""
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent'/>

                    {/* КОНТЕНТ */}
                    <div className='relative z-10 flex flex-col md:flex-row gap-10 px-6 md:px-20 pt-20 pb-20'>

                        {/* ПОСТЕР */}
                        <div className='flex-shrink-0'>
                            <img
                                className='w-48 md:w-72 rounded-2xl shadow-2xl shadow-black'
                                src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                                alt=""
                            />
                        </div>

                        {/* ИНФОРМАЦИЯ */}
                        <div className='flex flex-col gap-5 justify-center'>

                            <div className='flex items-center gap-4'>
                                <h1 className='text-3xl md:text-5xl font-bold text-white'>{data.title}</h1>
                                <button
                                    className={`text-2xl transition-transform hover:scale-110 ${isLiked ? 'text-red-500' : 'text-white/30'}`}
                                    onClick={() => toggleLike(data.id)}
                                >
                                    <FaHeart size={20} className='mt-3' />
                                </button>
                            </div>

                            {data.tagline && (
                                <p className='text-yellow-400 font-light tracking-widest italic'>{data.tagline}</p>
                            )}

                            <div className='flex flex-wrap gap-4 text-sm text-white/50 font-light tracking-wider'>
                                <span className='flex items-center gap-1'>
                                    <FaStar className='text-yellow-400'/>
                                    {data.vote_average > 0 ? Math.round(data.vote_average * 10) / 10 : 'Скоро'}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <FaCalendar/> {data.release_date?.slice(0, 4)}
                                </span>
                                {data.runtime  && (
                                    <span className='flex items-center gap-1'>
                                        <FaClock/> {(data.runtime > 0 ? (`${data.runtime} мин`) : (`Скоро`))}
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
                </div>
            )}
        </>
    )
}