import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function fetchPopularFilm(req: VercelRequest, res: VercelResponse){
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=ru-RU&page=1`)
    const data = await response.json()
    res.json(data)
}