import {
    GET_COLLECTIONS,
    COLLECTION_ERROR,
    DELETE_COLLECTION,
    ADD_COLLECTION,
    UPDATE_COLLECTION_ITEMS,
    GET_COLLECTION,
    EDIT_COLLECTION
  } from '../actions/types';
  
  const initialState = {
    collections: [],
    collection: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_COLLECTIONS:
        return {
          ...state,
          collections: payload,
          loading: false
        };
      case GET_COLLECTION:
        return {
          ...state,
          collection: payload,
          loading: false
        };
      case ADD_COLLECTION:
        return {
          ...state,
          collections: [payload, ...state.collections],
          loading: false
        };
      case EDIT_COLLECTION:
        return {
            ...state,
            collection: payload,
            loading: false
        };
      case DELETE_COLLECTION:
        return {
          ...state,
          collections: state.collections.filter(collection => collection._id !== payload),
          loading: false
        };
      case COLLECTION_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case UPDATE_COLLECTION_ITEMS:
        return {
          ...state,
          collections: state.collections.map(collection =>
            collection._id === payload.id ? { ...collection, payload } : collection
          ),
          loading: false
        };
      default:
        return state;
    }
  }