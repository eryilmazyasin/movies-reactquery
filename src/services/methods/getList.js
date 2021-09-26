import { instance } from '../axios';

export const getList = async (page, listId) => {
    const res = await instance.get(
        `/list/${listId}?page=${page}`
      );
  return res.data;
}