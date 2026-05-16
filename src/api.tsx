const API_KEY = import.meta.env.VITE_TMDB_KEY
export default async function fetchPopularFilm(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU`)
    const data = await response.json()
    return data
}