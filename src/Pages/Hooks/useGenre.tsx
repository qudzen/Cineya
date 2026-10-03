import {useEffect, useState} from "react";
import {fetchGenre} from "../../api.tsx";
import type {Genre} from "../../type.ts";

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