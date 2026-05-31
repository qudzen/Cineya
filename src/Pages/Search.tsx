import {useEffect, useState} from "react";
import {fetchSearch} from "../api.tsx";
import type {Result} from "./Home/Home.tsx";
import { useNavigate } from 'react-router-dom'




export default function Search() {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<Result | null>(null);
    const [hints, setHints] = useState<Result[]>([]);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value
        setSearch(searchText)
        console.log(searchText);
        if (searchText.trim() === '') {
            setResultSearch(null)
            navigate(`/`)
            return
        }
    }
    useEffect( () => {
        const resultFilm = async () => {
            if (!search.trim()) return;
            const data = await fetchSearch(search);
            setResultSearch(data.results[0])
            setHints(data.results.slice(0, 5))
        }
        resultFilm()
    }, [search])

    const onEnter = async (e: React.KeyboardEvent<HTMLInputElement>,) => {
        if (e.key === "Enter") {
            if (resultSearch) {
                setHints([])
                navigate(`/movie/${resultSearch.id}`)
            }
        }
    }

    const selectHints = async () => {
        if (hints) {
            navigate(`/movie/${hints.id}`)
        }

    }

    return (
        <>
            <input
                className='bg-white text-gray-700 border-gray-200 border-2 rounded-2xl px-6 py-3 w-80 transition-all h-10'
                type="search"
                placeholder="Search"
                onChange={onSearch}
                value={search}
                onKeyDown={onEnter}
            />
            {hints.map(i => (
                <div onClick={selectHints}>
                    {i.title}
                </div>
            ))}
        </>
    )
}