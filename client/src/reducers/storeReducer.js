import { GET_STORE, GET_STORES, STORE_ERROR, UPDATE_STORE_FAVORITES, ADD_STORE_REVIEW, REMOVE_STORE_REVIEW, CLEAR_STORE } from "../actions/types";

const initialState = {
    store: null,
    stores: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_STORE:
            return {
                ...state,
                store: payload,
                loading: false
            }
        case GET_STORES:
            return {
                ...state,
                stores: payload,
                loading: false
            }
        case STORE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                store: null
            };
        case UPDATE_STORE_FAVORITES:
            return {
                ...state,
                stores: state.stores.map(store => 
                    store._id === payload.id ? { ...store, favorites: payload.favorites } : store
                ),
                loading: false
            };
        case ADD_STORE_REVIEW:
            return {
                ...state,
                store: { ...state.store, reviews: payload },
                loading: false
            };
        case REMOVE_STORE_REVIEW:
            return {
                ...state,
                store: {
                    ...state.store,
                    reviews: state.store.reviews.filter(
                        review => review._id !== payload
                    )
                },
                loading: false
            };
        case CLEAR_STORE:
            return {
                ...state,
                store: null,
                loading: false
            }
        default:
            return state;
    }
}