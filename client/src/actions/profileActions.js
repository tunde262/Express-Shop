import axios from 'axios';
import { setAlert } from './alertActions';

import { GET_PROFILE, GET_PROFILES, SET_SUBS, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED } from './types';

// Get Current users Profile 
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get profiles by ID
export const getProfileById = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Create or update profile
export const createProfile = (formData, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get & set profile users subscriptions
export const getProfileSubscriptions = id => async dispatch => {

    try {
        const res = await axios.get(`/api/stores/subscriptions/${id}`);

        dispatch({
            type: SET_SUBS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SET_SUBS,
            payload: []
        })
    }
};

// Add Address
export const addAddress = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log('IN ADD ADDRESS')
        const res = await axios.put('/api/profile/address_book', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Address Added', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete address
export const deleteAddress = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/address_book/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Address Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!'))

    try {
        await axios.delete(`/api/profile`);

        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });

        dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}