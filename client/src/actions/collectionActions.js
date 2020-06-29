import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_COLLECTIONS,
  COLLECTION_ERROR,
  DELETE_COLLECTION,
  UPDATE_COLLECTION_ITEMS,
  ADD_COLLECTION,
  GET_COLLECTION
} from './types';

// Get projects
export const getCollections = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories');

    dispatch({
      type: GET_COLLECTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Store Collections
export const getStoreCollections = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/categories/store/${id}`);

        dispatch({
            type: GET_COLLECTIONS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COLLECTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get single collection by id
export const getCollectionById = id => async dispatch => {
  try {
      const res = await axios.get(`/api/categories/${id}`);

      dispatch({
          type: GET_COLLECTION,
          payload: res.data
      });
  } catch (err) {
      dispatch({
          type: COLLECTION_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}

// Add Collection
export const addCollection = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
      const res = await axios.post(`/api/categories`, formData, config);
  
      dispatch({
        type: ADD_COLLECTION,
        payload: res.data
      });

      history.push('/admin');
  
      dispatch(setAlert('Collection Created', 'success'));
    } catch (err) {
      dispatch({
        type: COLLECTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Delete project
export const deleteCollection = id => async dispatch => {
  try {
    await axios.delete(`/api/categories/${id}`);

    dispatch({
      type: DELETE_COLLECTION,
      payload: id
    });

    // dispatch(setAlert('Collection Removed', 'success'));
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add single Item to collection
export const addItem = (formData, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/categories/product/${id}`, formData, config);

    dispatch({
      type: UPDATE_COLLECTION_ITEMS,
      payload: { id, items: res.data}
    });

    // dispatch(setAlert('Collection Created', 'success'));
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
