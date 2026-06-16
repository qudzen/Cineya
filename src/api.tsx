const BASE_URL = import.meta.env.VITE_API_URL || ''

export default async function fetchPopularFilm() {
    const response = await fetch(`${BASE_URL}/api/popular`)
    return response.json()
}

export async function fetchGenre() {
    const response = await fetch(`${BASE_URL}/api/genre`)
    return response.json()
}

export async function fetchMovie(id: number | string) {
    const response = await fetch(`${BASE_URL}/api/movie?id=${id}`)
    return response.json()
}

export async function fetchSearch(searchText: string) {
    const response = await fetch(`${BASE_URL}/api/search?query=${searchText}`)
    return response.json()
}

export async function searchByGenre(genreId: number, page: number) {
    const response = await fetch(`${BASE_URL}/api/genre-films?genreId=${genreId}&page=${page}`)
    return response.json()
}

export async function fetchNewFilm(page: number) {
    const response = await fetch(`${BASE_URL}/api/new-films?page=${page}`)
    return response.json()
}