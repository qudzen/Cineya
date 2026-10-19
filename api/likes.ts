import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getUserId } from './_lib/auth'
import { supabaseFetch } from './_lib/supabase'

const TABLE = 'liked_movies'

async function fetchTmdbMovie(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=ru-RU`
    const r = await fetch(url)
    if (!r.ok) return null
    return r.json()
}

async function rowExists(userId: string, movieId: number): Promise<boolean> {
    const r = await supabaseFetch(
        `/${TABLE}?yandex_user_id=eq.${encodeURIComponent(userId)}&movie_id=eq.${movieId}&select=id`
    )
    if (!r.ok) {
        const detail = await r.text().catch(() => '')
        throw new Error(`Supabase select failed ${r.status}: ${detail.slice(0, 500)}`)
    }
    const rows = await r.json()
    return Array.isArray(rows) && rows.length > 0
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const userId = await getUserId(req)
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'GET') {
        try {
            const r = await supabaseFetch(
                `/${TABLE}?yandex_user_id=eq.${encodeURIComponent(userId)}&select=movie_data&order=created_at.desc`
            )
            if (!r.ok) {
                const detail = await r.text().catch(() => '')
                console.error(`[likes GET] supabase ${r.status}: ${detail.slice(0, 800)}`)
                return res.status(500).json({ error: 'Failed to load likes', status: r.status, detail: detail.slice(0, 300) })
            }
            const rows = await r.json()
            const movies = (Array.isArray(rows) ? rows : [])
                .map((row: { movie_data?: unknown }) => row.movie_data)
                .filter(Boolean)
            return res.json({ movies })
        } catch (err) {
            console.error('likes GET error:', err)
            return res.status(500).json({ error: 'Failed to load likes', detail: String(err) })
        }
    }

    if (req.method === 'POST') {
        let body: { movieId?: number; ids?: number[] } = req.body ?? {}
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body)
            } catch {
                body = {}
            }
        }

        try {
            if (Array.isArray(body.ids)) {
                const added: number[] = []
                for (const id of body.ids) {
                    if (typeof id !== 'number') continue
                    if (await rowExists(userId, id)) continue
                    const movie = await fetchTmdbMovie(id)
                    if (!movie) continue
                    const r = await supabaseFetch(`/${TABLE}`, {
                        method: 'POST',
                        body: JSON.stringify({ yandex_user_id: userId, movie_id: id, movie_data: movie }),
                    })
                    if (r.ok) added.push(id)
                    else {
                        const detail = await r.text().catch(() => '')
                        console.error(`[likes merge] insert ${id} failed ${r.status}: ${detail.slice(0, 500)}`)
                    }
                }
                return res.json({ added })
            }

            const movieId = body.movieId
            if (typeof movieId !== 'number') {
                return res.status(400).json({ error: 'movieId is required' })
            }

            if (await rowExists(userId, movieId)) {
                const r = await supabaseFetch(
                    `/${TABLE}?yandex_user_id=eq.${encodeURIComponent(userId)}&movie_id=eq.${movieId}`,
                    { method: 'DELETE' }
                )
                if (!r.ok) {
                    const detail = await r.text().catch(() => '')
                    console.error(`[likes] delete failed ${r.status}: ${detail.slice(0, 500)}`)
                    return res.status(500).json({ error: 'Failed to unlike', detail: detail.slice(0, 300) })
                }
                return res.json({ liked: false })
            }

            const movie = await fetchTmdbMovie(movieId)
            if (!movie) return res.status(502).json({ error: 'Failed to load movie from TMDB' })
            const r = await supabaseFetch(`/${TABLE}`, {
                method: 'POST',
                body: JSON.stringify({ yandex_user_id: userId, movie_id: movieId, movie_data: movie }),
            })
            if (!r.ok) {
                const detail = await r.text().catch(() => '')
                console.error(`[likes] insert failed ${r.status}: ${detail.slice(0, 800)}`)
                return res.status(500).json({ error: 'Failed to like', status: r.status, detail: detail.slice(0, 300) })
            }
            return res.json({ liked: true })
        } catch (err) {
            console.error('likes POST error:', err)
            return res.status(500).json({ error: 'Failed to update like', detail: String(err) })
        }
    }

    return res.status(405).json({ error: 'Method not allowed' })
}
