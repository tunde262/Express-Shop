import axios from 'axios';
import { setAlert } from './alertActions';
import {
  SET_LOCATIONS,
  GET_LOCATIONS,
  LOCATION_ERROR,
  DELETE_LOCATION,
  UPDATE_LOCATION_VARIANTS,
  ADD_LOCATION,
  GET_LOCATION,
  GET_PRODUCT_LOCATIONS,
  CLEAR_LOCATIONS
} from './types';

// Set Locations to detailLocation
export const setLocations = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/darkstores/${id}`);

    dispatch({
      type: SET_LOCATIONS,
      payload: res.data
    });

  } catch (err) {
    
  }
}

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

// Get Locations by product id
export const getProductLocations = (id) => async dispatch => {
  const locationArray = [];
  let darkstore;
  try {
    const productData = await axios.get(`/api/products/${id}`);
    const variantListData = await axios.get(`/api/variants/product/${productData.data._id}`);

    const variants = variantListData.data;
    variants.map(async variant => {
      for(var i = 0; i < variant.locations.length; i++) {
        console.log('Location ID');
        console.log(variant.locations[i].location);
        darkstore = await axios.get(`/api/darkstores/${variant.locations[i].location}`);
        console.log('NEW DARKSTORE');
        console.log(darkstore.data);
        if(locationArray.length > 0) {
          if(locationArray.filter(location => location._id.toString() === darkstore.data._id).length > 0) {
            return;
          } else {
            locationArray.push({
              _id: darkstore.data._id,
              location: darkstore.data.location,
              address_components: darkstore.data.address_components,
              name: darkstore.data.name,
              placeId: darkstore.data.placeId,
              formatted_address: darkstore.data.formatted_address,
              phone: darkstore.data.phone,
              qty: variant.locations[i].qty,
              price: variant.locations[i].price,
              sale_price: variant.locations[i].sale_price
            });
          }
        } else {
          locationArray.push({
            _id: darkstore.data._id,
            location: darkstore.data.location,
            address_components: darkstore.data.address_components,
            name: darkstore.data.name,
            placeId: darkstore.data.placeId,
            formatted_address: darkstore.data.formatted_address,
            phone: darkstore.data.phone,
            qty: variant.locations[i].qty,
            price: variant.locations[i].price,
            sale_price: variant.locations[i].sale_price
          });
        }
        
        console.log('LOCATIONS ARRAY');
        console.log(locationArray);
      }
      console.log('EXIT FOR LOOP')
      console.log(locationArray)

      dispatch({
        type: GET_PRODUCT_LOCATIONS,
        payload: locationArray
      });
      
    })
  } catch (err) {
    dispatch({
      type: GET_LOCATIONS,
      payload: {}
    })
  }
};

export const getCollectionLocations = (id) => async dispatch => {
  const locationArray = [];
  let darkstore;
  try {
    const collectionData = await axios.get(`/api/categories/${id}`);

    collectionData.data.items.map(async itemId => {
      try {
        const productData = await axios.get(`/api/products/${itemId.item}`);
        const variantListData = await axios.get(`/api/variants/product/${productData.data._id}`);

        const variants = variantListData.data;
        variants.map(async variant => {
          for(var i = 0; i < variant.locations.length; i++) {
            console.log('Location ID');
            console.log(variant.locations[i].location);
            darkstore = await axios.get(`/api/darkstores/${variant.locations[i].location}`);
            console.log('NEW DARKSTORE');
            console.log(darkstore.data);
            if(locationArray.length > 0) {
              if(locationArray.filter(location => location._id.toString() === darkstore.data._id).length > 0) {
                return;
              } else {
                locationArray.push({
                  _id: darkstore.data._id,
                  location: darkstore.data.location,
                  address_components: darkstore.data.address_components,
                  name: darkstore.data.name,
                  placeId: darkstore.data.placeId,
                  formatted_address: darkstore.data.formatted_address,
                  phone: darkstore.data.phone,
                  qty: variant.locations[i].qty,
                  price: variant.locations[i].price,
                  sale_price: variant.locations[i].sale_price
                });
              }
            } else {
              locationArray.push({
                _id: darkstore.data._id,
                location: darkstore.data.location,
                address_components: darkstore.data.address_components,
                name: darkstore.data.name,
                placeId: darkstore.data.placeId,
                formatted_address: darkstore.data.formatted_address,
                phone: darkstore.data.phone,
                qty: variant.locations[i].qty,
                price: variant.locations[i].price,
                sale_price: variant.locations[i].sale_price
              });
            }
            
            console.log('LOCATIONS ARRAY');
            console.log(locationArray);
          }
          console.log('EXIT FOR LOOP')
          console.log(locationArray)
          
        })
      } catch (err) {
        dispatch({
          type: GET_LOCATIONS,
          payload: {}
        })
      }

      console.log('FINAL COLLECTION LOOP')
      console.log(locationArray);

      dispatch({
        type: GET_PRODUCT_LOCATIONS,
        payload: locationArray
      });
    })
  } catch (err) {
    
    dispatch({
      type: GET_LOCATIONS,
      payload: {}
    })
  }
} 

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
export const addLocation = (formData, storeId, history) => async dispatch => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
      const res = await axios.post(`/api/darkstores/add/${storeId}`, formData, config);

      // const storeVariants = await axios.get('/api/variants/store');

      // const locationTags = [...res.data.tags];
      
      // for(var i = 0; i < locationTags.length; i++) {
      //   storeVariants.data.map(async variant => {
      //     try {
      //       if(variant.tags.includes(locationTags[i])) {
      //         let data = new FormData();
      //         data.append('id', variant._id);
  
      //         await axios.put(`/api/darkstores/variant/${res.data._id}`, data, config);
      //         console.log('Added ' + variant._id + ' TO LOCATION: ' + res.data.name);
      //       }
      //     } catch (err) {
      //       console.log(err);
      //     }
      //   })
      // }
  
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

// add single variant to location
export const addLocationVariant = (variantList, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log('VARIANT LIST ACTION');
  console.log(variantList);

  variantList.map(async variantId => {
    try {
      const variant = await axios.get(`/api/variants/${variantId}`)

      const location = await axios.put(`/api/darkstores/variant/${id}/${variant.data._id}`, config);
  
      dispatch({
        type: UPDATE_LOCATION_VARIANTS,
        payload: { id, variants: location.data}
      });
  
      // dispatch(setAlert('Location Created', 'success'));
    } catch (err) {
      dispatch({
        type: LOCATION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  })
};

export const clearLocations = () => dispatch => {
  dispatch({ type: CLEAR_LOCATIONS });
}
