import { useEffect } from 'react'

export default function Callback() {
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')
        if (!code) {
            window.close()
            return
        }

        const verifier = sessionStorage.getItem('code_verifier')
        if (!verifier) {
            window.close()
            return
        }

        const auth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/yandex-auth?code=${code}&code_verifier=${verifier}`)
                const user = await response.json()

                if (user && window.opener) {
                    window.opener.postMessage({ user }, window.location.origin)
                }
            } catch (err) {
                console.log(err)
            } finally {
                window.close()
            }
        }

        auth()
    }, [])

    return (
        <div className='flex items-center justify-center h-screen bg-black text-white'>
            <div className='flex flex-col items-center gap-4'>
                <div className='w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin'/>
                <p className='text-white/50 text-sm font-light tracking-widest'>Авторизация...</p>
            </div>
        </div>
    )
}