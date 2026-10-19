import type {ActorResponse, CastResponse, GenreFilmsResponse, Result} from "./type.ts";

const BASE_URL = import.meta.env.VITE_API_URL || ''


export default async function fetchPopularFilm() {
    const response = await fetch(`${BASE_URL}/api/popular`)
    return response.json()
}

export async function fetchGenre() {
    const response = await fetch(`${BASE_URL}/api/genre`)
    const data =  response.json()
    return data
}

export async function fetchMovie(id: number | string) {
    const response = await fetch(`${BASE_URL}/api/movie?id=${id}`)
    return response.json()
}

export async function fetchSearch(searchText: string) {
    const response = await fetch(`${BASE_URL}/api/search?query=${searchText}`)
    return response.json()
}

export async function searchByGenre(genreId: number, page: number): Promise<GenreFilmsResponse> {
    const response = await fetch(`${BASE_URL}/api/genre-films?genreId=${genreId}&page=${page}`)
    return response.json()
}

export async function fetchNewFilm(page: number): Promise<GenreFilmsResponse> {
    const response = await fetch(`${BASE_URL}/api/new-films?page=${page}`)
    return response.json()
}

export async function fetchCast(id: number | string): Promise<CastResponse> {
    const response = await fetch(`${BASE_URL}/api/cast?id=${id}`)
    return response.json()
}

export async function fetchTrailer(id: number | string) {
    const response = await fetch(`${BASE_URL}/api/trailer?id=${id}`)
    return response.json()
}

export async function fetchActor(actorId: number | string): Promise<ActorResponse> {
    const response = await fetch(`${BASE_URL}/api/actor?actorId=${actorId}`)
    return response.json()
}

export async function fetchLikes(): Promise<Result[]> {
    const response = await fetch(`${BASE_URL}/api/likes`, { credentials: 'include' })
    if (!response.ok) throw new Error('Не удалось загрузить избранное')
    const data = await response.json()
    return data.movies ?? []
}

export async function toggleLike(movieId: number): Promise<{ liked: boolean }> {
    const response = await fetch(`${BASE_URL}/api/likes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
    })
    if (!response.ok) throw new Error('Не удалось обновить избранное')
    return response.json()
}

export async function mergeLikes(ids: number[]): Promise<{ added: number[] }> {
    const response = await fetch(`${BASE_URL}/api/likes`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
    })
    if (!response.ok) throw new Error('Не удалось объединить избранное')
    return response.json()
}