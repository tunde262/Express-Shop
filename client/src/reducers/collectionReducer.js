import {
    SET_COLLECTIONS,
    GET_COLLECTIONS,
    SET_TRENDING_COLLECTIONS,
    SET_PROFILE_COLLECTIONS,
    COLLECTION_ERROR,
    DELETE_COLLECTION,
    ADD_COLLECTION,
    ADD_PROFILE_COLLECTION,
    UPDATE_COLLECTION_ITEMS,
    UPDATE_COLLECTION_VIEWS,
    UPDATE_COLLECTION_LIKES,
    GET_COLLECTION,
    EDIT_COLLECTION,
    OPEN_COLLECTION_MODAL,
    CLOSE_COLLECTION_MODAL,
    CLEAR_COLLECTIONS
  } from '../actions/types';
  
  const initialState = {
    collections: [],
    profile_collections: [],
    featured: [],
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
      case SET_COLLECTIONS: 
        const categories = payload;
        let tempCategories = categories; 
        
        if(state.collections.length > 0) {
            tempCategories = [...state.collections, ...tempCategories ];
        }

        return {
            ...state,
            collections: tempCategories,
            loading: false
        };
      case SET_TRENDING_COLLECTIONS: 
        const featuredCategories = payload;
        let tempFeatured = featuredCategories; 
        
        if(state.featured.length > 0) {
            tempFeatured = [...state.featured, ...tempFeatured ];
        }

        return {
            ...state,
            featured: tempFeatured,
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
      case UPDATE_COLLECTION_LIKES:
        let tempDetailCollection = state.collection;

        if(tempDetailCollection._id === action.payload.id) { 
            tempDetailCollection = {...tempDetailCollection, likes: action.payload.likes }
        }

        return {
            ...state,
            collections: state.collections.map(collection =>
                collection._id === action.payload.id ? { ...collection, likes: action.payload.likes } : collection
            ),
            collection: tempDetailCollection
        };
      case UPDATE_COLLECTION_VIEWS:
          let tempDetail = state.collection;

          if(tempDetail._id === action.payload.id) { 
              tempDetail = {...tempDetail, view_count: action.payload.view_count }
          }

          return {
              ...state,
              collections: state.collections.map(collection =>
                  collection._id === action.payload.id ? { ...collection, view_count: action.payload.view_count } : collection
              ),
              collection: tempDetail
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