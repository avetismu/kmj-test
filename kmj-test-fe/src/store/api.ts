import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;

const GET_ALL_EVENTS = '/event';

export const enum API_STATE {
    LOADING = 'loading',
    IDLE = 'idle',
    ERROR = 'error',
    SUCCESS = 'success'
}

const userAPI = axios.create({
    baseURL: BASE_URL,
});

export const getAllEventsAsync = async () => {
    try {
        const response = await userAPI.get(GET_ALL_EVENTS);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all events.');
    }
}