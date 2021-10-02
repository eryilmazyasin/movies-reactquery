import { instance } from '../axios';
import { apiKey } from '../../utils/constants';

export const getPopularMovies = async (page) => {
  const res = await instance.get(
      `movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
  return res.data;
}