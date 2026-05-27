
const API_KEY = import.meta.env.VITE_TMDB_KEY

//const randomPage = Math.floor(Math.random() * 6) + 1

export default async function fetchPopularFilm(){
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ru-RU&page=1`)
    const data = await response.json()
    return data
}

export async function fetchGenre(){
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
    const data = await response.json()
    return data
}

export async function fetchMovie(id: string){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ru-RU`)
    const data = await response.json()
    return data
}
export async function fetchSearch(searchText: string){
    const responce = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchText}`);
    const data = await responce.json()
    return data
}