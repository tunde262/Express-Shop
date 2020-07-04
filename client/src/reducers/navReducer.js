import { SET_NAV1, REMOVE_NAV1, SET_NAV2, REMOVE_NAV2, SET_NAV3, REMOVE_NAV3 } from '../actions/types';

const initialState = {
    nav1: 'explore',
    nav2: '',
    nav3: ''
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_NAV1: {
            return {
                ...state,
                nav1: payload,
                nav2: '',
                nav3: ''
            };
        }
        case SET_NAV2: {
            return {
                ...state,
                nav2: payload
            };
        }
        case SET_NAV3: {
            return {
                ...state,
                nav3: payload
            };
        }
        case REMOVE_NAV1: {
            return {
                ...state,
                nav3: ''
            };
        }
        case REMOVE_NAV2: {
            return {
                ...state,
                nav3: ''
            };
        }
        case REMOVE_NAV3: {
            return {
                ...state,
                nav3: ''
            };
        }
        default:
            return state;
    }
}