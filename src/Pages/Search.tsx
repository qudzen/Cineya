import {useState} from "react";
import {fetchSearch} from "../api.tsx";
import type {Result} from "./Home";
import { useNavigate } from 'react-router-dom'




export default function Search() {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<Result[]>([]);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value
        setSearch(searchText)
        console.log(searchText);
    }

    const onEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const data = await fetchSearch(search);
            setResultSearch(data.results)
            const firstFilm = data.results[0];
            if (firstFilm) {
                navigate(`/movie/${firstFilm.id}`)
            }
        }
    }

    return (
        <>
            <input
                className='bg-white text-gray-700 border-gray-200 border-2 rounded-2xl px-6 py-3 w-80 transition-all'
                type="search"
                placeholder="Search"
                onChange={onSearch}
                value={search}
                onKeyDown={onEnter}
            />
            {resultSearch.length > 0 && resultSearch[0].title}
        </>
    )
}