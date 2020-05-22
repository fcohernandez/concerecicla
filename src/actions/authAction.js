import { LOGGED } from './types';

export const login = (payload) => {
    return {
        type: LOGGED,
        payload
    };
}