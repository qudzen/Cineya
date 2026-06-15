export interface Result {
    id: number
    title: string
    overview: string
    release_date: string
    vote_average: number
    backdrop_path: string
    poster_path: string
    genre_ids: number[]
    results: []
    runtime: number
    tagline: string
    genres: { id: number, name: string }[]

}
export interface Genre {
    id: number,
    name: string
}