import {
    LOGGED
  } from '../actions/types';

const INITIAL_STATE = {
    logged: 'false'
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGGED:
      return {...state, logged: action.payload};
    default: 
     return state;
  }
};