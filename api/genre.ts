import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=ru-RU`)
    const data = await response.json()
    res.json(data)
}