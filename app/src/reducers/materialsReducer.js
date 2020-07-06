import { FETCH_MATERIALS } from '../actions/types';

export default (state = [], action) => {
    switch(action.type) {
      case FETCH_MATERIALS:
        return action.payload;
      default: 
       return state;
    }
};