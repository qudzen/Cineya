import useGenre from "../Hooks/useGenre.tsx";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {searchByGenre} from "../../api.tsx";
import FilmGrid from "../Components/FilmGrid.tsx";
import SetGenre from "./SetGenre.tsx"
import {useInfiniteQuery} from "@tanstack/react-query";

export default function Movies() {
    const {data: genreData, isError: genreError, isLoading: genreLoading} = useGenre()
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedGenre, setSelectedGenre] = useState<number | null>(
        searchParams.get('genre') ? Number(searchParams.get('genre')) : 28
    )

    const handleSelectGenre = (id: number) => {
        setSelectedGenre(id)
        setSearchParams({genre: String(id)})
    }

    const {
        data,
        isError,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['genreFilms', selectedGenre],
        queryFn: ({pageParam}) => searchByGenre(selectedGenre!, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        enabled: selectedGenre !== null,
    })

    const films = data?.pages.flatMap(p => p.results) ?? []

    if (genreLoading) return <span className="loading loading-spinner loading-xl"></span>
    if (genreError) return <div>Не удалось загрузить жанры.</div>
    if (isLoading) return <span className="loading loading-spinner loading-xl"></span>
    if (isError) return <div>Не удалось загрузить фильмы.</div>

    return (
        <div className="pb-24 md:pb-10">
            <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 lg:px-12">
                <aside className="hidden lg:block sticky top-24 self-start pt-8">
                    {selectedGenre && (
                        <SetGenre genre={genreData?.genres ?? []} setSelectedGenre={handleSelectGenre} selectedGenre={selectedGenre}/>
                    )}
                </aside>

                <main>
                    <h1 className="px-4 pt-5 text-xl font-bold text-white md:text-4xl lg:px-0 lg:pt-8 lg:text-5xl">
                        Фильмы
                    </h1>

                    {selectedGenre && (
                        <div className="sticky top-[60px] z-40 mt-4 border-b border-white/10 bg-black/95 py-3 backdrop-blur-sm lg:hidden">
                            <SetGenre genre={genreData?.genres ?? []} setSelectedGenre={handleSelectGenre} selectedGenre={selectedGenre}/>
                        </div>
                    )}

                    <div className="mt-4 lg:mt-7">
                        <FilmGrid films={films}/>
                    </div>

                    {selectedGenre && films.length > 0 && (
                        <div className="mt-8 flex justify-center pb-4">
                            {hasNextPage && (
                                <button
                                    type="button"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="rounded-full border border-white/20 px-8 py-3 text-sm font-light uppercase tracking-widest transition-colors hover:border-yellow-400 hover:text-yellow-400"
                                >
                                    {isFetchingNextPage ? 'Загрузка…' : 'Показать еще'}
                                </button>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
