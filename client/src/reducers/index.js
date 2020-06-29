import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import product from './productReducer';
import collection from './collectionReducer';
import profile from './profileReducer';
import store from './storeReducer';
import location from './locationReducer';
import variant from './variantReducer';

export default combineReducers({
    alert,
    auth,
    product,
    collection,
    profile,
    store,
    location,
    variant
});