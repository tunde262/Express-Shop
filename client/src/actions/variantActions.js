import axios from 'axios';
import { setAlert } from './alertActions';

import { 
    GET_VARIANTS,
    VARIANT_ERROR,
    UPDATE_VARIANT_LIKES,
    DELETE_VARIANT,
    ADD_VARIANT,
    EDIT_VARIANT,
    UPDATE_VARIANT_LOCATIONS,
    ADD_VARIANT_LOCATIONS,
    GET_VARIANT,
    ADD_VARIANT_COMMENT,
    REMOVE_VARIANT_COMMENT,
    SET_SORTED_VARIANTS,
    SET_MODAL_VARIANTS,
    HANDLE_VAR_TAGS,
    REMOVE_VAR_TAGS,
    ADD_TO_VARIANTS,
    HANDLE_DETAIL,
    VARIANTS_LOADING
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
    dispatch(setVariantsLoading());
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

// Set Variants for displayed modal
export const setModalVariants = (variants) =>  {
  return {
      type: SET_MODAL_VARIANTS,
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

export const addToVariants = (id) => async dispatch => {
  try {
      console.log('IN ACTION')
      console.log(id);
      const res = await axios.get(`/api/variants/${id}`);

      dispatch({
          type: ADD_TO_VARIANTS,
          payload: res.data
      });
  } catch (err) {
      dispatch({
          type: VARIANT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}

// Add variant
export const addVariant = (formData, prodId, storeId) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post(`/api/variants/product/add/${prodId}/${storeId}`, formData, config);

      const newVarList = await axios.post(`/api/products/add_variant/${prodId}/${res.data._id}`, config);
      // const updatedProd = await axios.post(`/api/products/variant/${prodId}/${res.data._id}`, formData, config);
  
      dispatch({
        type: ADD_VARIANT,
        payload: res.data
      });

      // dispatch({
      //   type: HANDLE_DETAIL,
      //   payload: updatedProd.data
      // })
  
      dispatch(setAlert('Variant Created', 'success'));
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Edit variant
export const editVariant = (formData, id, storeId) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {

      const res = await axios.post(`/api/variants/edit/${id}/${storeId}`, formData, config);
  
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
export const deleteVariant = (varId, prodId) => async dispatch => {
    try {
      await axios.delete(`/api/variants/${varId}`);
      await axios.delete(`/api/products/variant/${prodId}/${varId}`);
  
      dispatch({
        type: DELETE_VARIANT,
        payload: varId
      });
  
      dispatch(setAlert('Variant Removed', 'success'));
    } catch (err) {
      dispatch({
        type: VARIANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

export const addVarLocation = (formData, varId, locId)  => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/variants/add_location/${varId}/${locId}`, formData, config);

    dispatch({
      type: ADD_VARIANT_LOCATIONS,
      payload: { id: varId, location: res.data}
    });

    // dispatch(setAlert('Location Created', 'success'));
  } catch (err) {
    dispatch({
      type: VARIANT_ERROR,
      payload: { msg: "something went wrong", status: 500 }
    });
    console.log(err);
  }
}

export const editVarLocation = (formData, varId, locId)  => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/variants/location/${varId}/${locId}`, formData, config);

    dispatch({
      type: UPDATE_VARIANT_LOCATIONS,
      payload: { id: varId, location: res.data}
    });

    // dispatch(setAlert('Location Created', 'success'));
  } catch (err) {
    dispatch({
      type: VARIANT_ERROR,
      payload: { msg: "something went wrong", status: 500 }
    });
    console.log(err);
  }
}
  
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

// Variants loading
export const setVariantsLoading = () => {
  return {
      type: VARIANTS_LOADING
  }
}
