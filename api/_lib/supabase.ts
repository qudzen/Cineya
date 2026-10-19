const RAW_URL = process.env.SUPABASE_URL || ''
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY || ''

function restBase(): string {
    const trimmed = RAW_URL.replace(/\/+$/, '')
    if (trimmed.endsWith('/rest/v1')) return trimmed
    return `${trimmed}/rest/v1`
}

export async function supabaseFetch(path: string, options: RequestInit = {}): Promise<Response> {
    const url = `${restBase()}${path}`
    return fetch(url, {
        ...options,
        headers: {
            apikey: SECRET_KEY,
            Authorization: `Bearer ${SECRET_KEY}`,
            'Content-Type': 'application/json',
            ...(options.headers ?? {}),
        },
    })
}
