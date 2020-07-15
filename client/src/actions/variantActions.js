import axios from 'axios';
import { setAlert } from './alertActions';

import { 
    GET_VARIANTS,
    VARIANT_ERROR,
    UPDATE_VARIANT_LIKES,
    DELETE_VARIANT,
    ADD_VARIANT,
    GET_VARIANT,
    ADD_VARIANT_COMMENT,
    REMOVE_VARIANT_COMMENT,
    SET_SORTED_VARIANTS,
    HANDLE_VAR_TAGS,
    REMOVE_VAR_TAGS
} from './types';

// Get variants
export const getVariants = () => async dispatch => {
    try {
      const res = await axios.get('/api/variants');
  
      dispatch({
        type: GET_VARIANTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Get Variants by user's store
export const getStoreVariants = () => async dispatch => {
  try {
    const res = await axios.get('/api/variants/store');

    dispatch({
      type: GET_VARIANTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_VARIANTS,
      payload: {}
    })
  }
};

  
// Get variants by store ID
export const getVariantsByStoreId = id => async dispatch => {
    try {
        const res = await axios.get(`/api/variants/store/${id}`);

        dispatch({
            type: GET_VARIANTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_VARIANTS,
            payload: {}
        })
    }
}

// Get product's variants
export const getProductVariants = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/variants/product/${id}`);

        dispatch({
            type: GET_VARIANTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_VARIANTS,
            payload: {}
        })
    }
}

// Get variants by category
export const getVariantsByCategory = id => async dispatch => {
    try {
        const res = await axios.get(`/api/variants/category/${id}`);

        dispatch({
            type: GET_VARIANTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_VARIANTS,
            payload: {}
        })
    }
}
  
// Get variants by id
export const getVariantById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/variants/${id}`);
  
        dispatch({
            type: GET_VARIANT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VARIANT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get Filtered Variants
export const setSortedVariants = (variants) =>  {
  return {
      type: SET_SORTED_VARIANTS,
      payload: variants
  }
};

// Add filter to tags
export const handleTags = (filter) => {
  return {
      type: HANDLE_VAR_TAGS,
      payload: filter
  }
}

// Add filter to tags
export const removeTags = (filter) => {
  return {
      type: REMOVE_VAR_TAGS,
      payload: filter
  }
}

// Add variant
export const addVariant = (formData, id) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post(`/api/variants/product/${id}`, formData, config);
  
      dispatch({
        type: ADD_VARIANT,
        payload: res.data
      });
  
      dispatch(setAlert('Variant Created', 'success'));
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Edit variant
export const editVariant = (formData, id) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post(`/api/variants/${id}`, formData, config);
  
      dispatch({
        type: GET_VARIANT,
        payload: res.data
      });
  
      dispatch(setAlert('Variant Updated', 'success'));
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
  
// Add like
export const addLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/variants/like/${id}`);
  
      dispatch({
        type: UPDATE_VARIANT_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
  
// Remove like
export const removeLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/variants/unlike/${id}`);
  
      dispatch({
        type: UPDATE_VARIANT_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
  
// Delete project
export const deleteVariant = id => async dispatch => {
    try {
      await axios.delete(`/api/variants/${id}`);
  
      dispatch({
        type: DELETE_VARIANT,
        payload: id
      });
  
      dispatch(setAlert('Variant Removed', 'success'));
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
  
// Add comment
export const addComment = (variantId, formData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post(
        `/api/variants/comment/${variantId}`,
        formData,
        config
      );
  
      dispatch({
        type: ADD_VARIANT_COMMENT,
        payload: res.data
      });
  
      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
  
// Delete comment
export const deleteComment = (variantId, commentId) => async dispatch => {
    try {
      await axios.delete(`/api/variants/comment/${variantId}/${commentId}`);
  
      dispatch({
        type: REMOVE_VARIANT_COMMENT,
        payload: commentId
      });
  
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
