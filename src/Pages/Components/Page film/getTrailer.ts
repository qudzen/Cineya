interface SearchTrailer {
    results: Trailer[]
}
interface Trailer {
    id: number,
    name: string,
    key: string,
    type: string,
    site: string,
}

export function getTrailer(videos: SearchTrailer) {
    return videos?.results.find(
        (video: Trailer) => video.type === 'Trailer' && video.site === 'YouTube'
    );
}
