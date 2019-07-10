import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import productReducer from './productReducer';

export default combineReducers({
    alert,
    auth,
    product: productReducer
});