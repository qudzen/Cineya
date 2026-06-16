import type {Genre} from "../../type.tsx";

interface GenreProps {
    genre: Genre[],
    setSelectedGenre: (id: number) => void,
    selectedGenre: number,
}
export default function SetFilm({ genre, setSelectedGenre, selectedGenre}: GenreProps) {


    return (
        <div className="flex flex-col">
            {genre.map((g: Genre) => (
                <div key={g.id} onClick={() => {
                    setSelectedGenre(g.id)
                }} className={`text-sm font-light tracking-widest uppercase transition-colors cursor-pointer mb-4 ml-3 ${selectedGenre === g.id ? 'text-yellow-400' : 'text-white/50 hover:text-white'}`}>
                    {g.name}
                </div>
            ))}
        </div>
    )
}