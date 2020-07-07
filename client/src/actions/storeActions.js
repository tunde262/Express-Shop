import axios from 'axios';
import { setAlert } from './alertActions';

import { GET_STORE, GET_STORES, STORE_ERROR, UPDATE_STORE_FAVORITES, ADD_STORE_REVIEW, REMOVE_STORE_REVIEW, CLEAR_STORE, STORE_DELETED } from './types';

// Get Current users Store 
export const getCurrentStore = () => async dispatch => {
    try {
        const res = await axios.get('/api/stores/me');

        dispatch({
            type: GET_STORE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: STORE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all stores
export const getStores = () => async dispatch => {
    dispatch({ type: CLEAR_STORE });

    try {
        const res = await axios.get('/api/stores');

        dispatch({
            type: GET_STORES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: STORE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get store by ID
export const getStoreById = Id => async dispatch => {
    dispatch({ type: CLEAR_STORE });

    try {
        const res = await axios.get(`/api/stores/${Id}`);

        dispatch({
            type: GET_STORE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: STORE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Create or update store
export const createStore = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/stores', formData, config);

        dispatch({
            type: GET_STORE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Store Updated' : 'Store Created', 'success'));

        history.push('/admin');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: STORE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Favorite & Unfavorite 
export const favorite = id => async dispatch => {
    try {
      const res = await axios.put(`/api/stores/favorite/${id}`);
  
      dispatch({
        type: UPDATE_STORE_FAVORITES,
        payload: { id, favorites: res.data }
      });
    } catch (err) {
      dispatch({
        type: STORE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Add Review
export const addReview = (storeId, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/stores/review/${storeId}`, formData, config);

        dispatch({
            type: ADD_STORE_REVIEW,
            payload: res.data
        });

        dispatch(setAlert('Review Added', 'success'));

    } catch (err) {
        dispatch({
            type: STORE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete review
export const deleteReview = (storeId, reviewId) => async dispatch => {
    try {
        await axios.delete(`/api/stores/review/${storeId}/${reviewId}`);

        dispatch({
        type: REMOVE_STORE_REVIEW,
        payload: reviewId
        });

        dispatch(setAlert('Review Removed', 'success'));
    } catch (err) {
        dispatch({
            type: STORE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete account & profile
export const deleteStore = id => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!'))

    try {
        await axios.delete(`/api/stores/${id}`);

        dispatch(
            { type: CLEAR_STORE }
        );
        dispatch(
            { 
                type: STORE_DELETED 
            }
        );

        dispatch(setAlert('Your store has been permanently deleted', 'success'));
    } catch (err) {
        dispatch({
            type: STORE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}