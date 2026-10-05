import {useQuery} from "@tanstack/react-query";
import {fetchActor} from "../../api.tsx";
import {useParams} from "react-router-dom";
import {FaInstagram, FaTwitter, FaFacebook, FaTiktok} from "react-icons/fa";
import type {IconType} from "react-icons";
import FilmGrid from "./FilmGrid.tsx";

type Social = { label: string; url: string; icon: IconType }

export default function PageActor() {
    const {actorId} = useParams()

    const {data, isLoading, isError} = useQuery({
        queryKey: ['actor', actorId],
        queryFn: () => fetchActor(actorId ?? '')
    })
    if (isLoading) return <span className="loading loading-spinner loading-xl" role="status" aria-live="polite"></span>
    if (isError) return <div role="alert">Не удалось загрузить актера.</div>
    if (!data) return null

    const ext = data.external_ids
    const socials: Social[] = []
    if (ext.instagram_id) socials.push({label: 'Instagram', url: `https://instagram.com/${ext.instagram_id}`, icon: FaInstagram})
    if (ext.twitter_id) socials.push({label: 'Twitter', url: `https://twitter.com/${ext.twitter_id}`, icon: FaTwitter})
    if (ext.facebook_id) socials.push({label: 'Facebook', url: `https://facebook.com/${ext.facebook_id}`, icon: FaFacebook})
    if (ext.tiktok_id) socials.push({label: 'TikTok', url: `https://tiktok.com/@${ext.tiktok_id}`, icon: FaTiktok})

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-20">
                <div className="flex flex-col gap-8 md:flex-row">
                    {data.profile_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
                            alt={data.name}
                            className="h-72 w-52 rounded-2xl object-cover shadow-2xl shadow-black md:h-96 md:w-64"
                        />
                    )}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold md:text-5xl">{data.name}</h1>
                        {data.birthday && <p className="text-white/50">Дата рождения: {data.birthday}</p>}
                        {data.place_of_birth && <p className="text-white/50">Место рождения: {data.place_of_birth}</p>}

                        {socials.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {socials.map(({label, url, icon: Icon}) => (
                                    <a
                                        key={label}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:border-yellow-400/40 hover:text-yellow-400"
                                    >
                                        <Icon aria-hidden="true"/>
                                        {label}
                                    </a>
                                ))}
                            </div>
                        )}

                        {data.biography && <p className="max-w-2xl leading-7 text-white/60">{data.biography}</p>}
                    </div>
                </div>

                {data.movie_credits.cast.length > 0 && (
                    <section className="mt-12">
                        <h2 className="mb-6 text-xl font-bold md:text-2xl">Фильмография</h2>
                        <FilmGrid films={data.movie_credits.cast} />
                    </section>
                )}
            </div>
        </div>
    )
}
