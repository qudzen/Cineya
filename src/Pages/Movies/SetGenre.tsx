import type {Genre} from "../../type.tsx";

interface GenreProps {
    genre: Genre[],
    setSelectedGenre: (id: number) => void,
}
export default function SetFilm({ genre, setSelectedGenre}: GenreProps) {


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