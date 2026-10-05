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
export interface FilmCardData {
    id: number
    title: string
    poster_path: string | null
    release_date: string
    vote_average: number
    overview?: string
    character?: string
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

export interface ActorResponse extends Actor {
    external_ids: ExternalIds
    movie_credits: MovieCredits
    images: { profiles: PersonProfileImage[] }
}
export interface ExternalIds {
    imdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    tiktok_id: string | null;
    youtube_id: string | null;
    freebase_mid?: string | null;
    freebase_id?: string | null;
    tvrage_id?: number | null;
    wikidata_id?: string | null;
}
export interface PersonProfileImage {
    file_path: string;
    width: number;
    height: number;
    aspect_ratio: number;
    vote_average: number;
    vote_count: number;
}
interface MovieCastCredit {
    id: number;
    title: string;
    original_title: string;
    character: string;
    release_date: string;
    poster_path: string | null;
    vote_average: number;
    overview: string;
    popularity: number;
    credit_id: string;
}

interface MovieCrewCredit {
    id: number;
    title: string;
    job: string;
    department: string;
    release_date: string;
    poster_path: string | null;
    credit_id: string;
}

export interface MovieCredits {
    cast: MovieCastCredit[];
    crew: MovieCrewCredit[];
}
