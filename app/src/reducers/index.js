import { combineReducers } from "redux";
import authReducer from './authReducer';
import headerReducer from './headerReducer';

export default combineReducers({
    authReducer,
    headerReducer
})