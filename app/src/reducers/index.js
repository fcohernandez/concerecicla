import { combineReducers } from "redux";
import authReducer from './authReducer';
import headerReducer from './headerReducer';
import pointsReducer from './pointsReducer';
import commentsReducer from "./commentsReducer";

export default combineReducers({
    authReducer,
    headerReducer,
    pointsReducer,
    commentsReducer
})