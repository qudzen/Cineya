import { useEffect, useState } from 'react'

export default function Callback() {
    const [status, setStatus] = useState<'waiting' | 'ok' | 'error'>('waiting')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const error = params.get('error')

        if (error) {
            setStatus('error')
            if (window.opener) {
                window.opener.postMessage({ type: 'yandex_auth_error', error }, window.location.origin)
            }
            return
        }

        if (code && window.opener) {
            window.opener.postMessage({ type: 'yandex_auth', code }, window.location.origin)
            setStatus('ok')
            localStorage.setItem('yandex_auth_code', code)
        }

        setTimeout(() => {
            window.close()
        }, 800)
    }, [])

    return (
        <div className='flex items-center justify-center h-screen bg-black text-white'>
            <div className='flex flex-col items-center gap-4'>
                <div className='w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin'/>
                <p className='text-white/50 text-sm font-light tracking-widest'>
                    {status === 'ok' ? 'Готово' : status === 'error' ? 'Ошибка' : 'Авторизация...'}
                </p>
            </div>
        </div>
    )
}
