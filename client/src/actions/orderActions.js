import axios from 'axios';
import { setAlert } from './alertActions';

import mixpanel from 'mixpanel-browser';

import { GET_ORDERS, GET_ORDER, ORDERS_LOADING, CLEAR_ORDER, CLEAR_ORDERS } from './types';
import store from '../store';


// Get Orders
export const getOrders = () => dispatch => {
    dispatch(setOrdersLoading());
    axios.get('/api/orders')
        .then(res =>
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ORDERS,
                payload: []
            })
        );
};

// Get Orders
export const getOrderById = (orderId) => async dispatch => {
    dispatch({ type: CLEAR_ORDER });

    try {
        const res = await axios.get(`/api/orders/${orderId}`);

        dispatch({
            type: GET_ORDER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ORDER,
            payload: null
        })
    }
};

// Get Store Orders
export const getStoreOrders = (id) => async dispatch => {
    dispatch(setOrdersLoading());
    try {
        const res = await axios.get(`/api/orders/store/${id}`);

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ORDERS,
            payload: []
        })
    }
};

// Get Customer Orders
export const getCustomerOrders = (id) => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/orders/customer/${id}`)
        .then(res =>
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ORDERS,
                payload: []
            })
        );
};

// Remove all items
export const clearOrders = () => dispatch => {
    dispatch(setOrdersLoading());

    dispatch({
        type: CLEAR_ORDERS
    });

}

// Orders loading
export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}
