import { instance } from '../axios';
import { apiKey } from '../../utils/constants';

export const getTopRatedMovies = async (page) => {
    const res = await instance.get(`/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`);
    return res.data;
}