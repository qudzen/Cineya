import useLike from "../Hooks/useLike.tsx";
import {fetchMovie} from "../../api.tsx";
import FilmGrid from "../Components/FilmGrid.tsx";
import {Link} from "react-router-dom";
import type {Result} from "../../type.ts";
import {FaHeart} from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";

export default function MyList() {
    const {likeList} = useLike();

    const {data: movies = [], isLoading, isError} = useQuery<Result[]>({
        queryKey: ['myList', likeList],
        queryFn: () => Promise.all(likeList.map(id => fetchMovie(id))),
        enabled: likeList.length > 0,
    })

    return (
        <div className="pb-24 md:pb-10">
            <main className="lg:px-12">
                <h1 className="px-4 pt-5 text-xl font-bold text-white md:text-4xl lg:px-0 lg:pt-8 lg:text-5xl">
                    Моё
                </h1>
                <p className="mt-2 px-4 text-sm font-light tracking-widest text-white/40 uppercase lg:px-0">
                    Избранные фильмы
                </p>

                {isLoading && (
                    <div className="mt-12 flex justify-center">
                        <span className="loading loading-spinner loading-lg text-yellow-400"/>
                    </div>
                )}

                {isError && (
                    <div className="mt-16 flex flex-col items-center gap-4 px-4 text-center">
                        <p className="text-sm font-light tracking-widest text-white/40 uppercase">
                            Не удалось загрузить список
                        </p>
                    </div>
                )}

                {!isLoading && movies.length === 0 && (
                    <div className="mt-16 flex flex-col items-center gap-4 px-4 text-center">
                        <FaHeart size={32} className="text-white/20"/>
                        <p className="text-sm font-light tracking-widest text-white/40 uppercase">
                            Список пуст
                        </p>
                        <p className="max-w-xs text-sm text-white/30">
                            Добавляйте фильмы в избранное на странице фильма — они появятся здесь
                        </p>
                        <Link
                            to="/movies"
                            className="mt-2 rounded-full border border-white/20 px-6 py-2.5 text-xs font-light uppercase tracking-widest transition-colors hover:border-yellow-400 hover:text-yellow-400"
                        >
                            Перейти к фильмам
                        </Link>
                    </div>
                )}

                {!isLoading && movies.length > 0 && (
                    <div className="mt-4 lg:mt-7">
                        <FilmGrid films={movies}/>
                    </div>
                )}
            </main>
        </div>
    )
}
