function generateCodeVerifier(): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    const random = new Uint8Array(64)
    crypto.getRandomValues(random)
    return Array.from(random, (v) => charset[v % charset.length]).join('')
}

async function generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

export function loginWithYandex() {
    const clientId = import.meta.env.VITE_YANDEX_CLIENT_ID
    const redirectUri = import.meta.env.VITE_REDIRECT_URI

    const codeVerifier = generateCodeVerifier()
    sessionStorage.setItem('code_verifier', codeVerifier)

    const popup = window.open('', 'yandex_auth', 'width=600,height=700')

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
        const authUrl = new URL('https://oauth.yandex.ru/authorize')
        authUrl.searchParams.set('response_type', 'code')
        authUrl.searchParams.set('client_id', clientId)
        authUrl.searchParams.set('redirect_uri', redirectUri)
        authUrl.searchParams.set('code_challenge', codeChallenge)
        authUrl.searchParams.set('code_challenge_method', 'S256')

        if (popup) {
            popup.location.href = authUrl.toString()
        } else {
            window.open(authUrl.toString(), 'yandex_auth', 'width=600,height=700')
        }
    }).catch(err => {
        console.error('Ошибка генерации code_challenge:', err)
    })
}
