import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'cineya_token'
const MAX_AGE = 30 * 24 * 60 * 60

function getSecret(): string {
    const secret = process.env.JWT_SECRET
    if (!secret) console.error('JWT_SECRET is not set — using insecure fallback')
    return secret || 'cineya-insecure-dev-secret'
}

function base64url(input: string): string {
    return Buffer.from(input, 'utf8').toString('base64url')
}

function sign(data: string, secret: string): string {
    return createHmac('sha256', secret).update(data).digest('base64url')
}

export function signToken(userId: string): string {
    const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const now = Math.floor(Date.now() / 1000)
    const payload = base64url(JSON.stringify({ sub: userId, iat: now, exp: now + MAX_AGE }))
    return `${header}.${payload}.${sign(`${header}.${payload}`, getSecret())}`
}

export function verifyToken(token: string): string | null {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [header, payload, signature] = parts

    const expected = sign(`${header}.${payload}`, getSecret())
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null

    try {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
        if (typeof data.exp !== 'number' || Date.now() / 1000 >= data.exp) return null
        return typeof data.sub === 'string' ? data.sub : null
    } catch {
        return null
    }
}

export async function getUserId(req: VercelRequest): Promise<string | null> {
    const token = req.cookies?.[COOKIE_NAME]
    if (!token) return null
    return verifyToken(token)
}

export async function setSessionCookie(res: VercelResponse, userId: string) {
    const token = signToken(userId)
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${MAX_AGE}${secure}`)
}

export function clearSessionCookie(res: VercelResponse) {
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`)
}
