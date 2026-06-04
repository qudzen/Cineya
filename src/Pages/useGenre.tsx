import {useEffect, useState} from "react";
import {fetchGenre} from "../api.tsx";

export interface Genre {
    id: number,
    name: string
}

export default function useGenre() {
    const [genre, setGenre] = useState<Genre[]>([])

    useEffect(() => {
        const genreFilm = async () => {
            const dataGenre = await fetchGenre()
            setGenre(dataGenre.genres)
        }
        genreFilm()
    }, [])
    return {
        genre
    }
}