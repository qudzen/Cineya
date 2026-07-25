import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    
    const { code, code_verifier } = req.query

    // обмен кода на токен
    const tokenResponse = await fetch('https://oauth.yandex.ru/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code as string,
            client_id: process.env.VITE_YANDEX_CLIENT_ID!,
            client_secret: process.env.YANDEX_SECRET!,
            code_verifier: code_verifier as string,
        })
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
        return res.status(400).json({ error: 'Failed to get token' })
    }

    // получаем данные пользователя
    const userResponse = await fetch('https://login.yandex.ru/info', {
        headers: {
            'Authorization': `OAuth ${tokenData.access_token}`
        }
    })

    const userData = await userResponse.json()
    res.json(userData)
}