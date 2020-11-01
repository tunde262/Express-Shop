import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import nav from './navReducer';
import product from './productReducer';
import collection from './collectionReducer';
import customer from './customerReducer';
import profile from './profileReducer';
import store from './storeReducer';
import location from './locationReducer';
import variant from './variantReducer';
import order from './orderReducer';

export default combineReducers({
    alert,
    auth,
    nav,
    product,
    collection,
    customer,
    profile,
    store,
    location,
    variant,
    order
});