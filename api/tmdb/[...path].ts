import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'TMDB_API_KEY not configured' });
    }

    const pathSegments = req.query.path as string[];
    const path = pathSegments.join('/');

    const params = new URLSearchParams();

    Object.entries(req.query).forEach(([key, value]) => {
        if (key !== 'path' && value) {
            params.append(key, value as string);
        }
    });

    params.append('api_key', apiKey);

    const url = `https://api.themoviedb.org/3/${path}?${params.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('TMDB API Error:', error);
        res.status(500).json({ error: 'Failed to fetch from TMDB' });
    }
}