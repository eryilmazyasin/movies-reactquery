import { instance } from '../axios';
import { apiKey } from '../../utils/constants';

export const getMovie = async (movieId) => {
  const res = await instance.get(
      `movie/${movieId}api_key=${apiKey}&language=en-US&`
      );
  return res.data;
}