import { combineReducers } from "redux";
import authReducer from './authReducer';
import headerReducer from './headerReducer';
import pointsReducer from './pointsReducer'

export default combineReducers({
    authReducer,
    headerReducer,
    pointsReducer
})