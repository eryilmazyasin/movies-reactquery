import { instance } from '../axios';
import { apiKey } from '../../utils/constants';

export const getList = async (page) => {
  const res = await instance.get(
      `movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
  return res.data;
}