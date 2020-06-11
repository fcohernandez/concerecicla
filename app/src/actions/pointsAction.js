import { FETCH_POINTS, FETCH_COMMENTS } from './types';

export const fetchPoints = () => dispatch => {
      
    fetch(`http://192.168.18.169:3000/puntolimpio`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: FETCH_POINTS, payload: json })
        })


    
}

export const fetchComments = (id) => dispatch => {
    fetch(`http://192.168.18.169:3000/comentario/${id}`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: FETCH_COMMENTS, payload: json })
        })
}