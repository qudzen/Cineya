import useGenre from "../Hooks/useGenre.tsx";
import {useEffect, useState} from "react";
import {searchByGenre} from "../../api.tsx";
import type {Result} from "../../type.tsx";
import {Link} from 'react-router-dom'
import SetFilm from "../Components/SetFilm.tsx";
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
        <div className="relative">
            <div className="fixed ml-15 mt-10">
                {selectedGenre && (
                    <SetGenre genre={genre} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre} />
                )}
            </div>
            <h1 className='font-bold text-5xl mt-5 ml-90 text-white'>Фильмы</h1>
            <div className='flex gap-2 flex-wrap justify-center mt-7 ml-60'>
                {resultSearchByGenre && (
                    resultSearchByGenre.map((film: Result) => (
                        <Link to={`/movie/${film.id}`}>
                            <SetFilm film={film}/>
                        </Link>
                    ))
                )}
            </div>
            {selectedGenre && (
                <button onClick={() => nextPage(selectedGenre, page)}>Показать еще</button>
            )}
        </div>
    )
}