import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const { code, code_verifier } = req.query

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Missing authorization code' })
    }

    if (!code_verifier || typeof code_verifier !== 'string') {
        return res.status(400).json({ error: 'Missing code_verifier' })
    }

    try {
        const tokenResponse = await fetch('https://oauth.yandex.ru/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: process.env.VITE_YANDEX_CLIENT_ID!,
                client_secret: process.env.YANDEX_SECRET!,
                code_verifier,
            }),
        })

        const tokenData = await tokenResponse.json()

        if (!tokenResponse.ok || !tokenData.access_token) {
            console.error('Yandex token exchange failed:', tokenData)
            return res.status(400).json({ error: 'Failed to exchange code for token', details: tokenData })
        }

        const userResponse = await fetch('https://login.yandex.ru/info', {
            headers: {
                Authorization: `OAuth ${tokenData.access_token}`,
            },
        })

        if (!userResponse.ok) {
            console.error('Yandex user info failed:', userResponse.status)
            return res.status(400).json({ error: 'Failed to get user info' })
        }

        const userData = await userResponse.json()
        return res.json(userData)
    } catch (err) {
        console.error('Yandex auth error:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
