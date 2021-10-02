import { useQuery, useInfiniteQuery, usePaginatedQuery } from 'react-query';
import { getPopularMovies } from './methods/getPopularMovies';

export const usePopularMovies = (page, listId) => {        
    return useQuery(['getPopularMovies', page, listId], () => getPopularMovies(page, listId), { keepPreviousData: true, staleTime: 5000 })
    
};