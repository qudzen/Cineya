import type { VercelRequest, VercelResponse } from '@vercel/node'
import { get } from '@vercel/edge-config'

function likesKey(userId: string) {
    return `likes_${userId}`
}

function parseEdgeConfig(connectionString: string): string[] | null {
    const match = connectionString.match(
        /edge-config\.vercel\.com\/([^?]+)\?token=(.+)/,
    )
    return match ? [match[1], match[2]] : null
}

const [EDGE_CONFIG_ID, EDGE_CONFIG_TOKEN] = process.env.EDGE_CONFIG
    ? parseEdgeConfig(process.env.EDGE_CONFIG) || []
    : []

async function writeLikes(userId: string, likes: number[]) {
    if (!EDGE_CONFIG_ID || !EDGE_CONFIG_TOKEN) {
        throw new Error('Edge Config not configured')
    }

    const res = await fetch(
        `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${EDGE_CONFIG_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [{
                    operation: 'upsert',
                    key: likesKey(userId),
                    value: likes,
                }],
            }),
        },
    )

    if (!res.ok) {
        const errText = await res.text()
        throw new Error(`Edge Config write failed: ${errText}`)
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.method === 'GET') {
        const userId = req.query.userId as string
        if (!userId) {
            return res.status(400).json({ error: 'Missing userId' })
        }

        try {
            const likes = await get<number[]>(likesKey(userId))
            return res.json({ likes: likes || [] })
        } catch (err) {
            console.error('Error reading likes from Edge Config:', err)
            return res.json({ likes: [] })
        }
    }

    if (req.method === 'POST') {
        const { userId, movieId } = req.body || {}
        if (!userId || !movieId) {
            return res.status(400).json({ error: 'Missing userId or movieId' })
        }

        try {
            const current = await get<number[]>(likesKey(userId))
            const likes: number[] = current || []
            const index = likes.indexOf(movieId)

            if (index === -1) {
                likes.push(movieId)
            } else {
                likes.splice(index, 1)
            }

            await writeLikes(userId, likes)
            return res.json({ likes })
        } catch (err) {
            console.error('Error updating likes:', err)
            return res.status(500).json({ error: 'Failed to update likes' })
        }
    }

    return res.status(405).json({ error: 'Method not allowed' })
}
