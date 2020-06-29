import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_LOCATIONS,
  LOCATION_ERROR,
  DELETE_LOCATION,
  UPDATE_LOCATION_ITEMS,
  ADD_LOCATION,
  GET_LOCATION
} from './types';

// Get projects
export const getLocations = () => async dispatch => {
  try {
    const res = await axios.get('/api/darkstores');

    dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Store Locations
export const getStoreLocations = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/darkstores/store/${id}`);

        dispatch({
            type: GET_LOCATIONS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LOCATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get single locations by id
export const getLocationById = id => async dispatch => {
  try {
      const res = await axios.get(`/api/darkstores/${id}`);

      dispatch({
          type: GET_LOCATION,
          payload: res.data
      });
  } catch (err) {
      dispatch({
          type: LOCATION_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}

// Add Location
export const addLocation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
      const res = await axios.post(`/api/darkstores`, formData, config);
  
      dispatch({
        type: ADD_LOCATION,
        payload: res.data
      });

      history.push('/admin');
  
      dispatch(setAlert('New Storage Location Created', 'success'));
    } catch (err) {
      dispatch({
        type: LOCATION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Delete project
export const deleteLocation = id => async dispatch => {
  try {
    await axios.delete(`/api/darkstores/${id}`);

    dispatch({
      type: DELETE_LOCATION,
      payload: id
    });

    // dispatch(setAlert('Location Removed', 'success'));
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add single Item to location
export const addItem = (formData, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/darkstores/product/${id}`, formData, config);

    dispatch({
      type: UPDATE_LOCATION_ITEMS,
      payload: { id, items: res.data}
    });

    // dispatch(setAlert('Location Created', 'success'));
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
