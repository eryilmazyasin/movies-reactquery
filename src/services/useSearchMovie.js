import { useQuery } from 'react-query';
import { getSearchMovie } from './methods/getSearchMovie';

export const useSearchMovie = async (movie) => {
    return useQuery(['getSearchMovie', movie], () => getSearchMovie(movie), { keepPreviousData: true, staleTime: 5000, enabled: Boolean(movie) })
};
