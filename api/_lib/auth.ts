import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'cineya_token'
const MAX_AGE = 30 * 24 * 60 * 60

function getSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        console.error('JWT_SECRET is not set — using insecure fallback')
    }
    return new TextEncoder().encode(secret || 'cineya-insecure-dev-secret')
}

export async function signToken(userId: string): Promise<string> {
    return new SignJWT({})
        .setSubject(userId)
        .setIssuedAt()
        .setExpirationTime(`${MAX_AGE}s`)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(getSecret())
}

export async function verifyToken(token: string): Promise<string | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret())
        return (payload.sub as string) ?? null
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
    const token = await signToken(userId)
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${MAX_AGE}${secure}`)
}

export function clearSessionCookie(res: VercelResponse) {
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`)
}
