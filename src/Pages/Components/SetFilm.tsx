import type {Result} from "../../type.tsx";
import {FaStar} from "react-icons/fa";

interface Props {
    film: Result;
    variant?: 'default' | 'featured';
}

export function getRatingStyle(vote: number) {
    if (vote <= 1) {
        return {label: 'Скоро', badge: 'bg-zinc-700/90 text-zinc-300 ring-zinc-600/50'}
    }

    const score = Math.round(vote * 10) / 10

    if (score >= 7.5) {
        return {label: String(score), badge: 'bg-emerald-500/90 text-white ring-emerald-400/40'}
    }
    if (score >= 6) {
        return {label: String(score), badge: 'bg-yellow-400/90 text-black ring-yellow-300/40'}
    }
    if (score >= 5) {
        return {label: String(score), badge: 'bg-orange-500/90 text-white ring-orange-400/40'}
    }
    return {label: String(score), badge: 'bg-red-500/90 text-white ring-red-400/40'}
}

export default function SetFilm({film, variant = 'default'}: Props) {
    const rating = getRatingStyle(film.vote_average)

    if (variant === 'featured') {
        return (
            <div className="group flex h-full gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-yellow-400/30 hover:bg-white/[0.06]">
                <div className="relative shrink-0 overflow-hidden rounded-lg">
                    <img
                        className="aspect-[2/3] w-24 object-cover transition-transform duration-300 group-hover:scale-105 sm:w-28"
                        src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                        alt={film.title}
                    />
                    <span className={`absolute right-1.5 top-1.5 flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 backdrop-blur-sm ${rating.badge}`}>
                        {film.vote_average > 1 && <FaStar size={8}/>}
                        {rating.label}
                    </span>
                </div>
                <div className="flex min-w-0 flex-col justify-center gap-1.5">
                    <h3 className="line-clamp-2 text-sm font-semibold text-white sm:text-base">{film.title}</h3>
                    <p className="text-xs text-zinc-500">{film.release_date?.slice(0, 4)}</p>
                    {film.overview && (
                        <p className="line-clamp-3 text-xs leading-relaxed text-zinc-400">{film.overview}</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="group w-full">
            <div className="relative overflow-hidden rounded-lg">
                <img
                    className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                    alt={film.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"/>
                <span className={`absolute right-2 top-2 flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ring-1 backdrop-blur-sm ${rating.badge}`}>
                    {film.vote_average > 1 && <FaStar size={9}/>}
                    {rating.label}
                </span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-left text-sm text-white">{film.title}</h3>
            <p className="mt-0.5 text-left text-xs text-zinc-500">{film.release_date?.slice(0, 4)}</p>
        </div>
    )
}
