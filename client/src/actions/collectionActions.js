import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_COLLECTIONS,
  COLLECTION_ERROR,
  DELETE_COLLECTION,
  UPDATE_COLLECTION_ITEMS,
  ADD_COLLECTION,
  GET_COLLECTION,
  EDIT_COLLECTION
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

// Get Collections by current user
export const getStoreCollections = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories/store');

    dispatch({
      type: GET_COLLECTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COLLECTIONS,
      payload: {}
    })
  }
};


// Get Store Collections
export const getCollectionsByStoreId = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/categories/store/${id}`);

        dispatch({
            type: GET_COLLECTIONS,
            payload: res.data
        });
    } catch (err) {
        // dispatch({
        //     type: COLLECTION_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // });
        console.log(err);
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
export const addCollection = (formData, storeId, history) => async dispatch => {
    try {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
      };
      const res = await axios.post(`/api/categories/add/${storeId}`, formData, config);

      const storeProducts = await axios.get(`/api/products/store/${storeId}`);

      const categoryTags = [...res.data.tags];
      
      for(var i = 0; i < categoryTags.length; i++) {
        storeProducts.data.map(async product => {
          try {
            if(product.tags.includes(categoryTags[i])) {
              let data = new FormData();
              data.append('id', product._id);
  
              await axios.put(`/api/categories/product/${res.data._id}`, data, config);
              console.log('Added ' + product._id + ' TO COLLECTION: ' + res.data.name);
            }
          } catch (err) {
            console.log(err);
          }
        })
      }
  
      dispatch({
        type: ADD_COLLECTION,
        payload: res.data
      });

      history.push(`/admin/collection/${storeId}/${res.data._id}?show=detail`);
  
      dispatch(setAlert('Collection Created', 'success'));
    } catch (err) {
      dispatch({
        type: COLLECTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Add Collection
export const addCollectionByName = (formData, storeId, history) => async dispatch => {
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    const res = await axios.post(`/api/categories/add/${storeId}`, formData, config);

    dispatch({
      type: ADD_COLLECTION,
      payload: res.data
    });

    history.push(`/admin/collection/${storeId}/${res.data._id}?show=add_collection`);

    dispatch(setAlert('Collection Created', 'success'));
  } catch (err) {
    // dispatch({
    //   type: COLLECTION_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
    console.log(err);
  }
};

// Add Collection
export const editCollection = (formData, collectionId, storeId, history) => async dispatch => {
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    const res = await axios.post(`/api/categories/edit/${collectionId}/${storeId}`, formData, config);

    const storeProducts = await axios.get(`/api/products/store/${storeId}`);

    // const storeProducts = await axios.get('/api/products/store');

    const categoryTags = [...res.data.tags];
    
    for(var i = 0; i < categoryTags.length; i++) {
      storeProducts.data.map(async product => {
        try {
          if(product.tags.includes(categoryTags[i])) {
            let data = new FormData();
            data.append('id', product._id);

            await axios.post(`/api/products/edit_collection/${product._id}/${res.data._id}`);
            await axios.put(`/api/categories/product/${res.data._id}/${product._id}`, config);
            console.log('Added ' + product._id + ' TO COLLECTION: ' + res.data.name);
          }
        } catch (err) {
          console.log(err);
        }
      })
    }

    dispatch({
      type: EDIT_COLLECTION,
      payload: res.data
    });

    history.push(`/admin/collection/${storeId}/${res.data._id}?show=detail`);
    
    dispatch(setAlert('Collection Updated', 'success'));
  } catch (err) {
    dispatch({
      type: COLLECTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete collection
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
export const addCollectionItem = (itemList, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log('ITEM LIST ACTION');
  console.log(itemList);

  itemList.map(async item => {
    try {
      await axios.post(`/api/products/edit_collection/${item}/${id}`);

      const collection = await axios.put(`/api/categories/product/${id}/${item}`, config);
  
      dispatch({
        type: UPDATE_COLLECTION_ITEMS,
        payload: { id, items: collection.data}
      });
  
      // dispatch(setAlert('Collection Created', 'success'));
    } catch (err) {
      dispatch({
        type: COLLECTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  })
};
