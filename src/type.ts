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

export interface GenreFilmsResponse {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
}

export interface CastMember {
    id: number
    name: string
    character: string
    profile_path: string | null
}

export interface CastResponse {
    id: number
    cast: CastMember[]
}

export interface Actor {
    id: number
    name: string
    biography: string
    birthday: string
    place_of_birth: string
    profile_path: string | null
    popularity: number
}