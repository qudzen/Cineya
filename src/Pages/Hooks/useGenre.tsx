import {useQuery} from "@tanstack/react-query";
import {fetchGenre} from "../../api.tsx";

export default function useGenre() {
    const {data, isError, isLoading} = useQuery({
        queryKey: ['genre'],
        queryFn: fetchGenre,
    })

    return {
        data,
        isError,
        isLoading,
    }
}