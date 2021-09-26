import axios from 'axios'
import { accessToken } from '../utils/constants';

export const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${accessToken}`
    }
})