import type {Genre} from "../../type.tsx";

interface GenreProps {
    genre: Genre[],
    setSelectedGenre: (id: number) => void,
    selectedGenre: number,
}

export default function SetGenre({genre, setSelectedGenre, selectedGenre}: GenreProps) {
    return (
        <>
            <div className="flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {genre.map((g: Genre) => (
                    <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGenre(g.id)}
                        className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-light uppercase tracking-widest transition-colors ${
                            selectedGenre === g.id
                                ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                                : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white'
                        }`}
                    >
                        {g.name}
                    </button>
                ))}
            </div>

            <nav className="hidden lg:flex flex-col">
                {genre.map((g: Genre) => (
                    <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGenre(g.id)}
                        className={`mb-4 cursor-pointer text-left text-sm font-light uppercase tracking-widest transition-colors ${
                            selectedGenre === g.id ? 'text-yellow-400' : 'text-white/50 hover:text-white'
                        }`}
                    >
                        {g.name}
                    </button>
                ))}
            </nav>
        </>
    )
}
