import { HEADERTITLE } from '../actions/types';

const INITIAL_STATE = {
    title: 'Conce Recicla'
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case HEADERTITLE:
        return {...state, title: action.payload};
      default: 
       return state;
    }
  };