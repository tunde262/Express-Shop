import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_LOCATIONS,
  LOCATION_ERROR,
  DELETE_LOCATION,
  UPDATE_LOCATION_VARIANTS,
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
export const getLocationsByStoreId = (id) => async dispatch => {
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

// Get Locations by current user
export const getStoreLocations = () => async dispatch => {
  try {
    const res = await axios.get('/api/darkstores/store');

    dispatch({
      type: GET_LOCATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LOCATIONS,
      payload: {}
    })
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

      const storeVariants = await axios.get('/api/variants/store');

      const locationTags = [...res.data.tags];
      
      for(var i = 0; i < locationTags.length; i++) {
        storeVariants.data.map(async variant => {
          try {
            if(variant.tags.includes(locationTags[i])) {
              let data = new FormData();
              data.append('id', variant._id);
  
              await axios.put(`/api/darkstores/variant/${res.data._id}`, data, config);
              console.log('Added ' + variant._id + ' TO LOCATION: ' + res.data.name);
            }
          } catch (err) {
            console.log(err);
          }
        })
      }
  
      dispatch({
        type: ADD_LOCATION,
        payload: res.data
      });

      history.push(`/admin/location/${res.data._id}`);
  
      dispatch(setAlert('New Location Added', 'success'));
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

// add single Item Variant to location
export const addVariant = (formData, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/darkstores/product/${id}`, formData, config);

    dispatch({
      type: UPDATE_LOCATION_VARIANTS,
      payload: { id, variants: res.data}
    });

    // dispatch(setAlert('Location Created', 'success'));
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
