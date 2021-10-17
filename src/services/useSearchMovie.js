import { useQuery } from 'react-query';
import { getSearchMovie } from './methods/getSearchMovie';

export const useSearchMovie = (movie) => { 
    return useQuery(['getSearchMovie', movie], () => getSearchMovie(movie))
};
