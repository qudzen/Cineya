import useGenre from "../Hooks/useGenre.tsx";
import {useEffect, useState} from "react";
import {searchByGenre} from "../../api.tsx";
import type {Result} from "../../type.tsx";
import FilmGrid from "../Components/FilmGrid.tsx";
import SetGenre from "./SetGenre.tsx"

export default function Movies() {
    const {genre} = useGenre()
    const [selectedGenre, setSelectedGenre] = useState<number | null>(28)
    const [resultSearchByGenre, setResultSearchByGenre] = useState<Result[]>([])
    const [page, setPage] = useState<number>(1)

    const nextPage = async (selectedGenre: number, page: number) => {
        if (selectedGenre) {
            const nextPageNumber = page + 1
            setPage(nextPageNumber)
            const data = await searchByGenre(selectedGenre, nextPageNumber)
            try {
                setResultSearchByGenre(prev => [...prev, ...data.results])
            } catch (err) {
                console.log(`Ошибка ${err}`)
            }
        }
    }

    useEffect(() => {
        if (selectedGenre) {
            const listOfFilms = async (selectedGenre: number, page: number) => {
                try {
                    const data = await searchByGenre(selectedGenre, page)
                    setResultSearchByGenre(data.results)
                    console.log(data.results)
                    setPage(1)
                } catch (err) {
                    console.log(`Ошибка ${err}`)
                }
            }
            listOfFilms(selectedGenre, page)
        }
    }, [selectedGenre])

    return (
        <div className="pb-24 md:pb-10">
            <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 lg:px-12">
                <aside className="hidden lg:block sticky top-24 self-start pt-8">
                    {selectedGenre && (
                        <SetGenre genre={genre} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre}/>
                    )}
                </aside>

                <main>
                    <h1 className="px-4 pt-5 text-xl font-bold text-white md:text-4xl lg:px-0 lg:pt-8 lg:text-5xl">
                        Фильмы
                    </h1>

                    {selectedGenre && (
                        <div className="sticky top-[60px] z-40 mt-4 border-b border-white/10 bg-black/95 py-3 backdrop-blur-sm lg:hidden">
                            <SetGenre genre={genre} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre}/>
                        </div>
                    )}

                    <div className="mt-4 lg:mt-7">
                        <FilmGrid films={resultSearchByGenre}/>
                    </div>

                    {selectedGenre && resultSearchByGenre.length > 0 && (
                        <div className="mt-8 flex justify-center pb-4">
                            <button
                                type="button"
                                onClick={() => nextPage(selectedGenre, page)}
                                className="rounded-full border border-white/20 px-8 py-3 text-sm font-light uppercase tracking-widest transition-colors hover:border-yellow-400 hover:text-yellow-400"
                            >
                                Показать еще
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
