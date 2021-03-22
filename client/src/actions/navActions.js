import { 
    SET_PAGE, 
    SET_NAV1, 
    REMOVE_NAV1, 
    SET_NAV2, 
    REMOVE_NAV2, 
    SET_NAV3, 
    REMOVE_NAV3, 
    SET_MAIN_NAV,
    TOGGLE_ITEM_MODAL,
    TOGGLE_COLLECTION_MODAL,
    TOGGLE_LOCATION_MODAL,
    REMOVE_ITEM_MODAL,
    REMOVE_COLLECTION_MODAL,
    REMOVE_LOCATION_MODAL,
    TOGGLE_SIDE_NAV
} from './types';

export const setPage = (page) => dispatch => {
    dispatch({
        type: SET_PAGE,
        payload: page
    });
}

export const setNav1 = (nav) => dispatch => {
    dispatch({
        type: SET_NAV1,
        payload: nav
    });
}

export const setNav2 = (nav) => dispatch => {
    dispatch({
        type: SET_NAV2,
        payload: nav
    });
}
export const setNav3 = (nav) => dispatch => {
    dispatch({
        type: SET_NAV3,
        payload: nav
    });
}
export const removeNav1 = () => dispatch => {
    dispatch({
        type: REMOVE_NAV1,
    });
}
export const removeNav2 = () => dispatch => {
    dispatch({
        type: REMOVE_NAV2,
    });
}
export const removeNav3 = () => dispatch => {
    dispatch({
        type: REMOVE_NAV3,
    });
}

// Set Admin Nav
export const setMainNav = (value) => {
    return {
        type: SET_MAIN_NAV,
        payload: value
    }
}

// Toggle Main Side Nav
export const toggleSideNav = () => dispatch => {
    dispatch({
        type: TOGGLE_SIDE_NAV,
    });
}

export const toggleItemModal = () => dispatch => {
    dispatch({
        type: TOGGLE_ITEM_MODAL,
    });
}

export const toggleCollectionModal = () => dispatch => {
    dispatch({
        type: TOGGLE_COLLECTION_MODAL,
    });
}

export const toggleLocationModal = () => dispatch => {
    dispatch({
        type: TOGGLE_LOCATION_MODAL,
    });
}

export const removeItemModal = () => dispatch => {
    dispatch({
        type: REMOVE_ITEM_MODAL,
    });
}

export const removeCollectionModal = () => dispatch => {
    dispatch({
        type: REMOVE_COLLECTION_MODAL,
    });
}

export const removeLocationModal = () => dispatch => {
    dispatch({
        type: REMOVE_LOCATION_MODAL,
    });
}