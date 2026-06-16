

export default async function fetchPopularFilm(){
    const response = await fetch(`/api/tmdb/trending/movie/week?language=ru-RU&page=1`)
    const data = await response.json()
    return data
}

export async function fetchGenre(){
    const response = await fetch(`/api/tmdb/genre/movie/list?language=ru-RU`)
    const data = await response.json()
    return data
}

export async function fetchMovie(id: number | string){
    const response = await fetch(`/api/tmdb/movie/${id}?language=ru-RU`)
    const data = await response.json()
    return data
}

export async function fetchSearch(searchText: string){
    const responce = await fetch(`/api/tmdb/search/movie?language=ru-RU&query=${searchText}`);
    const data = await responce.json()
    return data
}

export async function searchByGenre(genreId: number, page: number){
    const responce = await fetch(`/api/tmdb/discover/movie?language=ru-RU&with_genres=${genreId}&page=${page}`)
    const data = await responce.json()
    return data
}

export async function fetchNewFilm(page: number) {
    const responce = await fetch(`/api/tmdb/movie/now_playing?language=ru-RU&page=${page}`)
    const data = await responce.json()
    return data
}