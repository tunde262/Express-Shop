import {
    GET_LOCATIONS,
    LOCATION_ERROR,
    DELETE_LOCATION,
    UPDATE_LOCATION_ITEMS,
    ADD_LOCATION,
    GET_LOCATION
  } from '../actions/types';
  
  const initialState = {
    locations: [],
    location: null,
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
      case GET_LOCATION:
        return {
          ...state,
          location: payload,
          loading: false
        };
      case ADD_LOCATION:
        return {
          ...state,
          locations: [payload, ...state.locations],
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
      case UPDATE_LOCATION_ITEMS:
        return {
          ...state,
          locations: state.locations.map(location =>
            location._id === payload.id ? { ...location, payload } : location
          ),
          loading: false
        };
      default:
        return state;
    }
  }