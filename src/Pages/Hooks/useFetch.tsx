import {useEffect, useState} from "react";
import type {Result} from "../../type.tsx";

export function useFetch(fetchFunction: () => Promise<any>) {
    const [data, setData] = useState<Result>()
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const popularFilm = async () => {
            try {
                const data = await fetchFunction()
                setData(data)
            }catch (err){
                console.log(`Ошибка ${err}`)
                setError(err instanceof Error ? err : null)
            }finally {
                setLoading(false)
            }
        }
        popularFilm()
    }, [])


    return {
        data,
        error,
        loading,
    }
}