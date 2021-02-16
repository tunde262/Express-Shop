import axios from 'axios';
import { setAlert } from './alertActions';
import { getProfileSubscriptions } from './profileActions';

import { 
    GET_STORE, 
    GET_STORES, 
    SET_FEATURED_STORES,
    SET_TRENDING_STORES,
    GET_SUBSCRIPTIONS, 
    SET_CART_STORES, 
    STORE_ERROR, 
    UPDATE_STORE_FAVORITES, 
    UPDATE_STORE_VIEWS,
    ADD_STORE_REVIEW, 
    REMOVE_STORE_REVIEW, 
    CLEAR_STORE, 
    CLEAR_STORES,
    CLEAR_FEATURED, 
    STORE_DELETED 
} from './types';

// Get Current users Store 
export const getCurrentStore = () => async dispatch => {
    try {
        const res = await axios.get('/api/stores/me');

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

// Get all stores
export const getStores = () => async dispatch => {
    dispatch({ type: CLEAR_STORES });

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

export const setCartStores = (stores) => dispatch => {
    dispatch({
        type: SET_CART_STORES,
        payload: stores
    });
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

        console.log('GET BY ID DATA');
        console.log(Id)
        console.log(res.data)
    } catch (err) {
        // dispatch({
        //     type: STORE_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // });
        console.log(err);
    }
}

// Get stores user current user subscribed too
export const getStoreSubscriptions = id => async dispatch => {

    try {
        const res = await axios.get(`/api/stores/subscriptions/${id}`);

        dispatch({
            type: GET_SUBSCRIPTIONS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_SUBSCRIPTIONS,
            payload: []
        })
    }
};

// Get For You Products
export const getFeaturedStores = (skip) => async dispatch => {
    console.log('FETCHING FEATURED STORES')
  
    try {
        const res = await axios.get(`/api/stores/trending?skip=${skip}`);
  
        dispatch({
            type: SET_FEATURED_STORES,
            payload: res.data
        });
        
        // dispatch(setAllProductLocations(res.data));
    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_FEATURED_STORES,
            payload: []
        })
    }
};

// Get For You Products
export const getTrendingStores = (skip) => async dispatch => {
    console.log('FETCHING TRENDING STORES')

    let tempSkip = skip + 50;
  
    try {
        const res = await axios.get(`/api/stores/trending?skip=${tempSkip}`);
  
        dispatch({
            type: SET_TRENDING_STORES,
            payload: res.data
        });
        
        // dispatch(setAllProductLocations(res.data));
    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_TRENDING_STORES,
            payload: []
        })
    }
};

// Get all stores
export const getStoresByTagList = (tagList, skip) => async dispatch => {
    dispatch({ type: CLEAR_STORES });
    const storesArray = [];
    let fetchedStores;
    
    try {

        for(var i = 0; i < tagList.length; i++) {
            console.log('TAG VALUE');
            console.log(tagList[i]);
            fetchedStores = await axios.get(`/api/stores/filter/${tagList[i]}?skip=${skip}`);
            console.log('NEW STORES');
            console.log(fetchedStores.data);
            if(fetchedStores.data.length > 0) {
                storesArray.unshift(...fetchedStores.data);
            }
            
            console.log('LOCATIONS ARRAY');
            console.log(storesArray);
        }
        console.log('EXIT FOR LOOP')
        console.log(storesArray)

        if(storesArray.length > 0) {
            dispatch({
                type: GET_STORES,
                payload: storesArray
            });
        } else {
            dispatch(getStores())
        }
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_STORES,
            payload: []
            // payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get Filtered stores by tag
export const getStoresByTag = (tag, skip) => async dispatch =>  {
    dispatch({ type: CLEAR_STORES });

    try {
        const res = await axios.get(`/api/stores/filter/${tag}?skip=${skip}`)

        dispatch({
            type: GET_STORES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_STORES,
            payload: []
        })
    }
};

// Get all filtered stores by tag without skip 
export const getFullStoresByTag = (tag) => async dispatch =>  {
    dispatch({ type: CLEAR_STORES });

    try {
        const res = await axios.get(`/api/stores/filter/full/${tag}`)

        dispatch({
            type: GET_STORES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_STORES,
            payload: []
        })
    }
};


// Create or update store
export const createStore = (formData, history, edit = false) => async dispatch => {
    try {
        console.log('creating store');
        console.log(formData); 
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

        history.push(`/admin/${res.data._id}`);
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

// Edit store
export const editStore = (storeData, storeId) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    try {
        console.log('EDIT STORE');
        const res = await axios.post(`/api/stores/edit/${storeId}`, storeData, config);
        console.log(res.data);

        dispatch({
            type: GET_STORE,
            payload: res.data
        });

        dispatch(setAlert('Store Updated', 'success'));
    } catch (err) {
        dispatch({
          type: STORE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add product Img
export const addBannerImg = (imgData, id) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'image/jpeg'
        }
    };

    let data = new FormData();
    data.append('file', imgData[0]);
    
    try {
        const res = await axios.post(`/api/stores/bannerImg/${id}`, data, config);

        console.log('Banner img added');
        dispatch(setAlert('Image Added', 'success'));
    } catch (err) {
        dispatch({
          type: STORE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add view
export const addView = id => async dispatch => {
    try {
      const res = await axios.put(`/api/stores/view/${id}`);
  
      dispatch({
        type: UPDATE_STORE_VIEWS,
        payload: { id, view_count: res.data }
      });
    } catch (err) {
      console.log(err)
    }
};

// Favorite & Unfavorite 
export const favorite = (id, userId) => async dispatch => {
    try {
      const res = await axios.put(`/api/stores/favorite/${id}`);
  
      console.log('UPDATE STORE FAVORITES');

      dispatch({
        type: UPDATE_STORE_FAVORITES,
        // payload: { id, favorites: res.data }
      });

      dispatch(getProfileSubscriptions(userId));
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

// Remove all stores
export const clearStores = () => dispatch => {
    dispatch({
        type: CLEAR_STORES
    });

}

// Clear Feature List
export const clearFeatured = () => dispatch => {
    dispatch({
        type: CLEAR_FEATURED
    });

}