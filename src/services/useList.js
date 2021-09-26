import { useQuery, useInfiniteQuery, usePaginatedQuery } from 'react-query';
import { getList } from './methods/getList';

export const useList = (page, listId) => {        
    return useQuery(['getList', page, listId], () => getList(page, listId), { keepPreviousData: true, staleTime: 5000 })
    
};

