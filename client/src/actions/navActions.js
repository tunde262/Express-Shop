import { SET_NAV1, REMOVE_NAV1, SET_NAV2, REMOVE_NAV2, SET_NAV3, REMOVE_NAV3 } from './types';
import { setProductsLoading } from './productActions';

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