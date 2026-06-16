import {useEffect, useState} from "react";
import {fetchNewFilm} from "../../api.tsx";
import FilmGrid from "../Components/FilmGrid.tsx";
import type {Result} from "../../type.tsx";

export default function NewMovies() {
    const [newFilm, setNewFilm] = useState<Result[]>([])
    const [page, setPage] = useState<number>(1)

    const nextPage = async () => {
        const nextPageNumber = page + 1
        setPage(nextPageNumber)
        const data = await fetchNewFilm(nextPageNumber)
        try {
            setNewFilm(prev => [...prev, ...data.results])
        } catch (err) {
            console.log(`Ошибка ${err}`)
        }
    }

    useEffect(() => {
        const nowPlayingFilm = async () => {
            try {
                const data = await fetchNewFilm(page)
                setNewFilm(data.results)
            } catch (err) {
                console.log(`Ошибка ${err}`)
            }
        }
        nowPlayingFilm()
    }, [])

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
                    <FilmGrid films={newFilm}/>
                </div>

                {newFilm.length > 0 && (
                    <div className="mt-8 flex justify-center pb-4">
                        <button
                            type="button"
                            onClick={nextPage}
                            className="rounded-full border border-white/20 px-8 py-3 text-sm font-light uppercase tracking-widest transition-colors hover:border-yellow-400 hover:text-yellow-400"
                        >
                            Показать еще
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}
