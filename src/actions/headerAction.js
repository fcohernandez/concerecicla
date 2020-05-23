import { HEADERTITLE } from './types';

export const changeTitle = (payload) => {
    return{
        type: HEADERTITLE,
        payload
    }
}