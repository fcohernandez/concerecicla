import { FETCH_MATERIALS }  from './types'

export const fetchMaterials = () => dispatch => {
      
    fetch(`http://192.168.18.169:3000/material`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: FETCH_MATERIALS, payload: json })
        })


    
}