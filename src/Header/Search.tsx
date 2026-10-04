import {useEffect, useRef, useState} from "react";
import {fetchSearch} from "../api.tsx";
import type {Result} from "../type.ts";
import {useNavigate} from 'react-router-dom'
import {keepPreviousData, useQuery} from "@tanstack/react-query";


export default function Search() {
    const navigate = useNavigate()
    const [search, setSearch] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const hintsRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value
        setSearch(searchText)
        setCurrentIndex(0)
        if (searchText.trim() === '') {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400)
        return () => clearTimeout(timer)
    }, [search])

    const {data} = useQuery<{results: Result[]}>({
        queryKey: ['search', debouncedSearch],
        queryFn: () => fetchSearch(debouncedSearch),
        enabled: debouncedSearch.trim().length > 0,
        placeholderData: keepPreviousData,
    })

    const hints = data?.results.slice(0, 5) ?? []

    useEffect(() => {
        const handleClickOutside  = (e: MouseEvent) => {
            if (hintsRef.current && !hintsRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (hints[currentIndex]) {
                setIsOpen(false)
                navigate(`/movie/${hints[currentIndex].id}`)
            }
        }else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            if (hints.length === 0) return
            e.preventDefault()
            const direction = e.key === "ArrowDown" ? 1 : -1
            const indexItem = (currentIndex + direction + hints.length) % hints.length
            setCurrentIndex(indexItem)
        }

    }



    return (
        <div className='relative'>
            <input
                className='bg-transparent border border-white/20 text-white text-sm font-light tracking-widest rounded-full px-5 py-2 w-36 md:w-54 placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:border-yellow-400 transition-colors'
                type="search"
                placeholder="Поиск…"
                aria-label="Поиск фильмов"
                aria-expanded={isOpen}
                aria-controls="search-hints"
                autoComplete="off"
                spellCheck={false}
                onChange={onSearch}
                value={search}
                onKeyDown={handleKeyDown}
            />
            {isOpen && hints.length > 0 && (
                <div ref={hintsRef} id="search-hints" className='absolute top-full mt-2 w-full bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-50'>
                    {hints.map((i, index) => (
                        <button
                            key={i.id}
                            type="button"
                            onClick={() => { setIsOpen(false); navigate(`/movie/${i.id}`) }}
                            onMouseEnter={() => setCurrentIndex(index)}
                            className={`w-full text-left px-5 py-3 text-sm font-light tracking-wider text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${index === currentIndex ? 'text-yellow-400 bg-white/5' : 'hover:bg-white/3 hover:text-yellow-400'}`}
                        >
                            {i.title}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
