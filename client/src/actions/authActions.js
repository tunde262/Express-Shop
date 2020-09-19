import axios from 'axios';
import { setAlert } from './alertActions';
import { getCurrentProfile } from './profileActions';
import { clearLocations } from './locationActions';
import mixpanel from 'mixpanel-browser';

import { 
    SET_SIDEBAR, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    UPDATE_AUTH, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT 
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = (register, login) => async dispatch => {
    // dispatch(clearLocations());
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        console.log('LOAD USER');
        console.log(res.data)

        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");

        if(register && !login) {
            mixpanel.alias(res.data._id);
            // mixpanel.register({
            //     "Zipcode": auth.zipcode
            // });

            mixpanel.track("Complete Registration", {
                "Name": res.data.name,
                // "Last Name": res.data.last_name,
                "Email": res.data.email,
                "Registration Date": new Date().toISOString(),
                "Registration Method": "E-mail",
                "Referred": "No",
                "Saved Products": 0,
                "Lifetime Value": 0,
                "Address": "n/a",
                "Last Category Filter": "n/a"
            });

            mixpanel.people.set({
                "$name": res.data.name,
                // "First Name": res.data.first_name,
                // "Last Name": res.data.last_name,
                "$email": res.data.email,
                "Registration Date": new Date().toISOString(),
                "Referred": "No",
                "Registration Method": "E-mail"
            })
        } 

        if(!register && login) {
            mixpanel.identify(res.data._id);
            // mixpanel.register({
            //     "Zipcode": auth.zipcode
            // });

            mixpanel.track("Login", {
                "Name": res.data.name,
                // "Last Name": res.data.last_name,
                "Email": res.data.email,
                "Login Method": "E-mail",
                "Login Date": new Date().toISOString(),
            });

            mixpanel.people.set({
                "Last Login Date": new Date().toISOString()
            });
        } 

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Update auth inputs
export const updateAuth = (formObj) => dispatch => {
    dispatch({
        type: UPDATE_AUTH,
        payload: formObj
    });
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser(true, false));
        dispatch(getCurrentProfile());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// Login User
export const login = (email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser(false, true));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}

// Set type sidebar
export const setSidebar = (type) => {
    return {
        type: SET_SIDEBAR,
        payload: type
    }
}

