import { useQuery } from 'react-query';
import { getMovie } from './methods/getMovie';

export const useMovie = (movieId) => {        
    return useQuery(['movie', movieId], () => getMovie(movieId), { keepPreviousData: true, staleTime: 5000 })
    
};

