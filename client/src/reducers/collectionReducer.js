import {
    GET_COLLECTIONS,
    SET_PROFILE_COLLECTIONS,
    COLLECTION_ERROR,
    DELETE_COLLECTION,
    ADD_COLLECTION,
    ADD_PROFILE_COLLECTION,
    UPDATE_COLLECTION_ITEMS,
    GET_COLLECTION,
    EDIT_COLLECTION,
    OPEN_COLLECTION_MODAL,
    CLOSE_COLLECTION_MODAL,
    CLEAR_COLLECTIONS
  } from '../actions/types';
  
  const initialState = {
    collections: [],
    profile_collections: [],
    collection: null,
    loading: true,
    modalOpen: false,
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
      case SET_PROFILE_COLLECTIONS:
        // const newProfileCollections = [...state.profile_collections, ...payload];

        return {
          ...state,
          profile_collections: payload,
          loading: false
        };
      case ADD_COLLECTION:
        return {
          ...state,
          collections: [payload, ...state.collections],
          collection: payload,
          loading: false
        };
      case ADD_PROFILE_COLLECTION:
        return {
          ...state,
          profile_collections: [payload, ...state.profile_collections],
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
      case OPEN_COLLECTION_MODAL: 
        return {
            ...state,
            modalOpen: true
        }
      case CLOSE_COLLECTION_MODAL: 
          return {
              ...state,
              modalOpen: false
          }
      case CLEAR_COLLECTIONS:
        return {
            ...state,
            collections: [],
            loading: false
        }
      default:
        return state;
    }
  }