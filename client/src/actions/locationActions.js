import axios from 'axios';
import { setAlert } from './alertActions';
import {
  SET_LOCATIONS,
  GET_LOCATIONS,
  LOCATION_ERROR,
  DELETE_LOCATION,
  UPDATE_LOCATION_PRODUCTS,
  ADD_LOCATION,
  EDIT_LOCATION,
  GET_LOCATION,
  SET_PRODUCT_LOCATIONS,
  GET_PRODUCT_LOCATIONS,
  GET_VARIANT_LOCATIONS,
  CLEAR_LOCATIONS
} from './types';

// Set Locations to detailLocation
export const setLocations = (locationList) => dispatch => {
  dispatch({
    type: GET_LOCATIONS,
    payload: locationList
  });
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

    console.log('GOT VARIANTS');
    console.log(variantListData.data);

    const variants = variantListData.data;
    if(variants.length > 0) {
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
          type: GET_LOCATIONS,
          payload: locationArray
        });
        
      })
    } else {
      dispatch({
        type: GET_LOCATIONS,
        payload: []
      })
    }
  } catch (err) {
    dispatch({
      type: GET_LOCATIONS,
      payload: []
    })
  }
};

// Get Locations by product id
export const setProductLocations = (id) => async dispatch => {
  const locationArray = [];
  let darkstore;
  try {
    const productData = await axios.get(`/api/products/${id}`);
    const variantListData = await axios.get(`/api/variants/product/${productData.data._id}`);

    console.log('GOT VARIANTS');
    console.log(variantListData.data);

    const variants = variantListData.data;
    if(variants.length > 0) {
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
          type: SET_LOCATIONS,
          payload: locationArray
        });
        
      })
    } else {
      dispatch({
        type: SET_LOCATIONS,
        payload: []
      })
    }
  } catch (err) {
    dispatch({
      type: SET_LOCATIONS,
      payload: []
    })
  }
};

// Get Locations by product id
export const getVariantLocations = (id) => async dispatch => {
  const locationArray = [];
  let darkstore;
  try {
    const variantData = await axios.get(`/api/variants/${id}`);

    const variant = variantData.data;
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
      type: GET_LOCATIONS,
      payload: locationArray
    });
  } catch (err) {
    dispatch({
      type: GET_LOCATIONS,
      payload: []
    })
  }
};

// Get Locations by product id
export const getLocationsByIdList = (locationIdList) => async dispatch => {
  const locationArray = [];
  let darkstore;
  try {

    for(var i = 0; i < locationIdList.length; i++) {
      console.log('Location ID');
      console.log(locationIdList[i].location);
      darkstore = await axios.get(`/api/darkstores/${locationIdList[i].location}`);
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
            qty: locationIdList[i].qty,
            price: locationIdList[i].price,
            sale_price: locationIdList[i].sale_price
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
          qty: locationIdList[i].qty,
          price: locationIdList[i].price,
          sale_price: locationIdList[i].sale_price
        });
      }
      
      console.log('LOCATIONS ARRAY');
      console.log(locationArray);
    }
    console.log('EXIT FOR LOOP')
    console.log(locationArray)

    dispatch({
      type: GET_VARIANT_LOCATIONS,
      payload: locationArray
    });
  } catch (err) {
    dispatch({
      type: GET_LOCATIONS,
      payload: []
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
          payload: { msg: "something went wrong", status: 500 }
      });
      console.log(err);
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
          console.log('FRONTEND FORM DATA');
          console.log(formData);
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

      history.push(`/admin/location/${storeId}/${res.data._id}?show=add_location`);
  
      dispatch(setAlert('New Location Added', 'success'));
    } catch (err) {
      dispatch({
        type: LOCATION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

// Edit Location
export const editLocation = (formData, locationId, storeId, history) => async dispatch => {
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        console.log('FRONTEND FORM DATA');
        console.log(formData);
    const res = await axios.post(`/api/darkstores/edit/${locationId}/${storeId}`, formData, config);

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
      type: EDIT_LOCATION,
      payload: res.data
    });

    history.push(`/admin/location/${storeId}/${res.data._id}?show=detail`);

    dispatch(setAlert('Location Updated', 'success'));
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

// add single Product Id to location
export const addProductToLocation = (locId, prodId) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/darkstores/product/${locId}/${prodId}`, config);

    dispatch({
      type: UPDATE_LOCATION_PRODUCTS,
      payload: { locId, products: res.data}
    });

    // dispatch(setAlert('Location Created', 'success'));
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add single product to location
export const addProductsByList = (productList, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log('PRODUCT LIST ACTION');
  console.log(productList);

  productList.map(async productId => {
    try {
      const product = await axios.get(`/api/products/${productId}`)

      const location = await axios.put(`/api/darkstores/product/${id}/${product.data._id}`, config);
  
      dispatch({
        type: UPDATE_LOCATION_PRODUCTS,
        payload: { id, products: location.data}
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
