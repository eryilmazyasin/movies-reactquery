import { useQuery } from 'react-query';
import { getTopRatedMovies } from './methods/getTopRatedMovies';

export const useTopRatedMovies = (page, listId) => {
    return useQuery(['useTopRatedMovies', page, listId], () => getTopRatedMovies(page, listId));
}