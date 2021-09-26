import axios from 'axios'
import { accessToken } from '../utils/constants';

export const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/4/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${accessToken}`
    }
})