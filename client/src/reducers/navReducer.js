import { 
    SET_PAGE, 
    SET_NAV1, 
    REMOVE_NAV1, 
    SET_NAV2, 
    REMOVE_NAV2, 
    SET_NAV3, 
    REMOVE_NAV3, 
    SET_MAIN_NAV, 
} from '../actions/types';

const initialState = {
    nav1: '',
    nav2: '',
    nav3: '',
    page: '',
    main: '',
    loading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_PAGE: {
            return {
                ...state,
                page: payload,
                loading: false
            };
        }
        case SET_MAIN_NAV: {
            return {
                ...state,
                main: payload,
                loading: false
            };
        }
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