import { instance } from '../axios';
import { apiKey } from '../../utils/constants';

export const getSearchMovie = async (movie) => {
    if (!movie) {
        return null;
    }
    
    const res = await instance.get(
        `search/movie?api_key=${apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`
    )

    return res.data
}
