import type {Genre} from "../Hooks/useGenre.tsx";

interface GenreProps {
    genre: Genre[],
    setSelectedGenre: (id: number) => void,
}
export default function setFilm({ genre, setSelectedGenre}: GenreProps) {


    return (
        <div>
            {genre.map((g: Genre) => (
                <div key={g.id} onClick={() => {
                    setSelectedGenre(g.id)
                }}>
                    {g.name}
                </div>
            ))}
        </div>
    )
}