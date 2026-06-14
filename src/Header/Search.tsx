import {useEffect, useRef, useState} from "react";
import {fetchSearch} from "../api.tsx";
import type {Result} from "../type.tsx";
import {useNavigate} from 'react-router-dom'


export default function Search() {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('');
    const [resultSearch, setResultSearch] = useState<Result | null>(null);
    const [hints, setHints] = useState<Result[]>([]);
    const hintsRef = useRef<HTMLDivElement>(null);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value
        setSearch(searchText)
        console.log(searchText);
        if (searchText.trim() === '') {
            setResultSearch(null)
            setHints([])
            navigate(`/`)
            return
        }
    }
    useEffect(() => {
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

    useEffect(() => {
        const handleClickOutside  = (e: MouseEvent) => {
            if (hintsRef.current && !hintsRef.current.contains(e.target as Node)) {
                setHints([])
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []);


    return (
        <div className='relative'>
            <input
                className='bg-transparent border border-white/20 text-white text-sm font-light tracking-widest rounded-full px-5 py-2 w-64 placeholder:text-white/30 focus:outline-none focus:border-yellow-400 transition-colors'
                type="search"
                placeholder="ПОИСК"
                onChange={onSearch}
                value={search}
                onKeyDown={onEnter}
            />
            {hints.length > 0 && (
                <div ref={hintsRef} className='absolute top-full mt-2 w-full bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-50'>
                    {hints.map(i => (
                        <div
                            key={i.id}
                            onClick={() => navigate(`/movie/${i.id}`)}
                            className='px-5 py-3 text-sm font-light tracking-wider text-white/70 hover:bg-white/5 hover:text-yellow-400 cursor-pointer transition-colors'
                        >
                            {i.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}