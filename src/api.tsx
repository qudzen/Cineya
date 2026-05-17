const API_KEY = import.meta.env.VITE_TMDB_KEY
const randomPage = Math.floor(Math.random() * 6) + 1
export default async function fetchPopularFilm(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${randomPage}`)
    const data = await response.json()
    return data
}