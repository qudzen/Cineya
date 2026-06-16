import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { genreId, page } = req.query
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=ru-RU&with_genres=${genreId}&page=${page}`)
    const data = await response.json()
    res.json(data)
}