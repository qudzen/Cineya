import {fetchNewFilm} from "../../api.tsx";
import FilmGrid from "../Components/FilmGrid.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";

export default function NewMovies() {
    const {
        data,
        isError,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['newFilms'],
        queryFn: ({pageParam}) => fetchNewFilm(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    })

    const films = data?.pages.flatMap(p => p.results) ?? []

    if (isLoading) return <span className="loading loading-spinner loading-xl"></span>
    if (isError) return <div>Не удалось загрузить фильмы.</div>

    return (
        <div className="pb-24 md:pb-10">
            <main className="lg:px-12">
                <h1 className="px-4 pt-5 text-xl font-bold text-white md:text-4xl lg:px-0 lg:pt-8 lg:text-5xl">
                    Новинки
                </h1>
                <p className="mt-2 px-4 text-sm font-light tracking-widest text-white/40 uppercase lg:px-0">
                    Сейчас в прокате
                </p>

                <div className="mt-4 lg:mt-7">
                    <FilmGrid films={films}/>
                </div>

                {hasNextPage && (
                    <div className="mt-8 flex justify-center pb-4">
                        <button
                            type="button"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="rounded-full border border-white/20 px-8 py-3 text-sm font-light uppercase tracking-widest transition-colors hover:border-yellow-400 hover:text-yellow-400"
                        >
                            {isFetchingNextPage ? 'Загрузка…' : 'Показать еще'}
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
