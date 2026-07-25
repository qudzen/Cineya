export function generateCodeVerifier(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}
export async function generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}
export async function loginWithYandex() {
    const verifier = generateCodeVerifier()
    const challenge = await generateCodeChallenge(verifier)
    
    sessionStorage.setItem('code_verifier', verifier)
    
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: import.meta.env.VITE_YANDEX_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        code_challenge: challenge,
        code_challenge_method: 'S256',
    })
    
    window.open(
        `https://oauth.yandex.ru/authorize?${params}`,
        'yandex_auth',
        'width=600,height=700,scrollbars=yes'
    )
}