import {useEffect, useState} from "react";
import type {Result} from "../../type.ts";

export function useFetch(fetchFunction: () => Promise<any>, deps: any[] = []) {
    const [data, setData] = useState<Result>()
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)
        const popularFilm = async () => {
            try {
                const data = await fetchFunction()
                if (cancelled) return
                setData(data)
            }catch (err){
                console.log(`Ошибка ${err}`)
                if (!cancelled) setError(err instanceof Error ? err : null)
            }finally {
                if (!cancelled) setLoading(false)
            }
        }
        popularFilm()
        return () => {
            cancelled = true
        }
    }, deps)


    return {
        data,
        error,
        loading,
    }
}