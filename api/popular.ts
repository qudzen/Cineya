import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const pages = Number(req.query.pages ?? 3)
    const fetches = Array.from({length: pages}, (_, i) =>
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_KEY}&language=ru-RU&page=${i + 1}`)
            .then(r => r.json())
    )
    const all = await Promise.all(fetches)
    const results = all.flatMap(p => p.results ?? [])
    res.json({page: 1, results, total_pages: 1, total_results: results.length})
}