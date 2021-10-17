import { instance } from '../axios';
import { apiKey } from '../../utils/constants';

export const getSearchMovie = async (movie) => {
    const res = await instance.get(
        `search/movie?api_key=${apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`
    )
}
