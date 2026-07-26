import { useEffect } from 'react'

export default function Callback() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')

        if (code) {
            localStorage.setItem('yandex_auth_code', code)
        }

        setTimeout(() => {
            window.close()
        }, 300)
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
