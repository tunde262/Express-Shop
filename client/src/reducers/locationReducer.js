import {
    SET_LOCATIONS,
    SET_ALL_LOCATIONS,
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
  } from '../actions/types';
  
  const initialState = {
    locations: [],
    detailLocation: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_LOCATIONS:
        return {
          ...state,
          locations: payload,
          loading: false
        };
      case SET_PRODUCT_LOCATIONS:
        const newTempLocations = [...state.locations, ...payload];

        return {
          ...state,
          locations: newTempLocations,
          loading: false
        };
      case GET_PRODUCT_LOCATIONS:
        const tempLocations = [...state.locations, ...payload];

        return {
          ...state,
          locations: tempLocations,
          loading: false
        };
      case GET_VARIANT_LOCATIONS:
          const newLocations = [...payload];
  
          return {
            ...state,
            locations: newLocations,
            loading: false
          };
      case GET_LOCATION:
        return {
          ...state,
          detailLocation: payload,
          loading: false
        };
      case SET_ALL_LOCATIONS:
        const newSetOfLocations = [...state.locations, ...payload];
        return {
          ...state,
          locations: newSetOfLocations,
          loading: false
        }
      case SET_LOCATIONS:
        return {
          ...state,
          locations: [payload],
          loading: false
        };
      case ADD_LOCATION:
        return {
          ...state,
          locations: [payload, ...state.locations],
          detailLocation: payload,
          loading: false
        };
      case EDIT_LOCATION:
        return {
            ...state,
            detailLocation: payload,
            loading: false
        };
      case DELETE_LOCATION:
        return {
          ...state,
          locations: state.locations.filter(location => location._id !== payload),
          loading: false
        };
      case LOCATION_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case UPDATE_LOCATION_PRODUCTS:
        const products = payload.products;
        return {
          ...state,
          detailLocation: { ...state.detailLocation, products },
          loading: false
        };
      case CLEAR_LOCATIONS:
        return {
            ...state,
            detailLocation: null,
            locations:[],
            loading: false
        }
      default:
        return state;
    }
  }