import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "../../Auth/useAuth.tsx";
import {fetchLikes, mergeLikes, toggleLike as apiToggleLike} from "../../api.tsx";
import type {Result} from "../../type.ts";

const LOCAL_KEY = 'likes'

let mergedUserId: string | null = null

export default function useLike() {
    const {user, isAuthenticated} = useAuth()
    const queryClient = useQueryClient()

    const [localLikes, setLocalLikes] = useState<number[]>(() => {
        try {
            return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(localLikes))
    }, [localLikes])

    const {data: likedMovies = [], isLoading: isLoadingLikes, isError: isErrorLikes} = useQuery<Result[]>({
        queryKey: ['likes'],
        queryFn: fetchLikes,
        enabled: isAuthenticated,
    })

    useEffect(() => {
        if (!isAuthenticated || !user || mergedUserId === user.id) return
        mergedUserId = user.id

        if (localLikes.length > 0) {
            mergeLikes(localLikes)
                .then(() => queryClient.invalidateQueries({queryKey: ['likes']}))
                .catch(() => {})
                .finally(() => setLocalLikes([]))
        }
    }, [isAuthenticated, user, localLikes, queryClient])

    const toggleMutation = useMutation({
        mutationFn: apiToggleLike,
        onMutate: async (movieId: number) => {
            await queryClient.cancelQueries({queryKey: ['likes']})
            const previous = queryClient.getQueryData<Result[]>(['likes'])
            queryClient.setQueryData<Result[]>(['likes'], (old = []) => {
                return old.filter(m => m.id !== movieId)
            })
            return {previous}
        },
        onError: (_err, _id, context) => {
            if (context?.previous) queryClient.setQueryData(['likes'], context.previous)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['likes']})
        },
    })

    const likeList: number[] = isAuthenticated ? likedMovies.map(m => m.id) : localLikes

    const toggleLike = (id: number) => {
        if (!isAuthenticated) {
            setLocalLikes(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
            return
        }
        toggleMutation.mutate(id)
    }

    return {
        likeList,
        likedMovies,
        toggleLike,
        isLoadingLikes,
        isErrorLikes,
        isAuthenticated,
    }
}
