import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_COLLECTIONS,
  SET_PROFILE_COLLECTIONS,
  COLLECTION_ERROR,
  DELETE_COLLECTION,
  UPDATE_COLLECTION_ITEMS,
  UPDATE_COLLECTION_VIEWS,
  UPDATE_COLLECTION_LIKES,
  ADD_COLLECTION,
  ADD_PROFILE_COLLECTION,
  GET_COLLECTION,
  EDIT_COLLECTION,
  CLOSE_COLLECTION_MODAL,
  OPEN_COLLECTION_MODAL,
  CLEAR_COLLECTIONS
} from './types';

// Get projects
export const getCollections = (skip) => async dispatch => {
  console.log('ENTER GET COLLECTIONS')
  try {
    const res = await axios.get(`/api/categories?skip=${skip}`);

    console.log('ALMOST DONE... DATA:')
    console.log(res.data)

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

// Get Locations by product id
export const getCollectionsByIdList = (collectionIdList) => async dispatch => {
  const collectionArray = [];
  let category;
  try {

    for(var i = 0; i < collectionIdList.length; i++) {
      console.log('CATEGORY ID');
      console.log(collectionIdList[i].category);
      category = await axios.get(`/api/categories/${collectionIdList[i].category}`);
      console.log('NEW CATEGORY');
      console.log(category.data);
      if(collectionArray.length > 0) {
        if(collectionArray.filter(collectionItem => collectionItem._id.toString() === category.data._id).length > 0) {
          return;
        } else {
          collectionArray.push(category.data);
        }
      } else {
        collectionArray.push(category.data);
      }
      
      console.log('COLLECTIONS ARRAY');
      console.log(collectionArray);
    }
    console.log('EXIT FOR LOOP')
    console.log(collectionArray)

    dispatch({
      type: SET_PROFILE_COLLECTIONS,
      payload: collectionArray
    });
  } catch (err) {
    dispatch({
      type: SET_PROFILE_COLLECTIONS,
      payload: []
    })
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

// Get all stores
export const getCollectionsByTagList = (tagList, skip) => async dispatch => {
  dispatch({ type: CLEAR_COLLECTIONS });
  const collectionsArray = [];
  let filteredCollections;
  
  try {

      for(var i = 0; i < tagList.length; i++) {
          console.log('TAG VALUE');
          console.log(tagList[i]);
          filteredCollections = await axios.get(`/api/categories/filter/${tagList[i]}?skip=${skip}`);
          console.log('NEW STORES');
          console.log(filteredCollections.data);
          
          collectionsArray.unshift(...filteredCollections.data);
          
          console.log('LOCATIONS ARRAY');
          console.log(collectionsArray);
      }
      console.log('EXIT FOR LOOP')
      console.log(collectionsArray)

      if(collectionsArray.length > 0) {
        dispatch({
          type: GET_COLLECTIONS,
          payload: collectionsArray
        });
      } else {
          dispatch(getCollections(skip))
      }
  } catch (err) {
      console.log(err);
      dispatch({
          type: GET_COLLECTIONS,
          payload: []
          // payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}

// Get products user liked
export const getLikedCollections = id => async dispatch => {
  try {
      const res = await axios.get(`/api/categories/liked/${id}`);

      dispatch({
          type: GET_COLLECTIONS,
          payload: res.data
      });
  } catch (err) {
      dispatch({
          type: GET_COLLECTIONS,
          payload: []
      })
  }
};

// Add Collection
export const addCollection = (formData, storeId, history) => async dispatch => {
    try {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
      };
      const res = await axios.post(`/api/categories/admin/add/${storeId}`, formData, config);

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

// Add Profile Collection
export const addProfileCollection = (formData, profileId) => async dispatch => {
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    const res = await axios.post(`/api/categories/profile/add/${profileId}`, formData, config);

    dispatch({
      type: ADD_PROFILE_COLLECTION,
      payload: res.data
    });

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

// Edit Collection
export const editCollection = (formData, collectionId, storeId, history) => async dispatch => {
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    const res = await axios.post(`/api/categories/admin/edit/${collectionId}/${storeId}`, formData, config);

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

// Edit Profile Collection
export const editProfileCollection = (formData, collectionId, profileId) => async dispatch => {
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    const res = await axios.post(`/api/categories/profile/edit/${collectionId}/${profileId}`, formData, config);

    dispatch({
      type: EDIT_COLLECTION,
      payload: res.data
    });
    
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

// Add like
export const followCollection = id => async dispatch => {
  try {
    const res = await axios.put(`/api/categories/like/${id}`);

    dispatch({
      type: UPDATE_COLLECTION_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    console.log(err)
  }
};

// Add view
export const addView = id => async dispatch => {
  try {
    const res = await axios.put(`/api/categories/view/${id}`);

    dispatch({
      type: UPDATE_COLLECTION_VIEWS,
      payload: { id, view_count: res.data }
    });
  } catch (err) {
    console.log(err)
  }
};

// Open  Modal
export const openCollectionModal = () => {
  return {
      type: OPEN_COLLECTION_MODAL
  }
}

// Close Modal
export const closeCollectionModal = () => {
  return {
      type: CLOSE_COLLECTION_MODAL
  }
}

// Remove all collections
export const clearCollections = () => dispatch => {
  dispatch({
      type: CLEAR_COLLECTIONS
  });
}