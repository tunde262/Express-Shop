import axios from 'axios';

import { SET_PRODUCTS, PRODUCTS_LOADING, ADD_TOTALS, HANDLE_DETAIL, ADD_TO_CART, OPEN_OVERVIEW, CLOSE_OVERVIEW, OPEN_MODAL, CLOSE_MODAL, CLEAR_CART, GET_CART, GET_ORDERS } from './types';

// Get Products
export const getProducts = () => dispatch => {
    dispatch(setProductsLoading());
    axios.get('/api/products')
        .then(res =>
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: SET_PRODUCTS,
                payload: {}
            })
        );
};

// Add product
export const addProduct = (prodData, history) => dispatch => {
    axios
        .post('/api/products', prodData)
        .then(res => history.push('/admin/all'));
}

// Delete product
export const deleteProduct = (prod_id) => dispatch => {
    axios
        .delete(`/api/products/${prod_id}`)
        .then(res =>
            dispatch(getProducts())
        );
}

// Get Orders
export const getOrders = () => dispatch => {
    dispatch(setProductsLoading());
    axios.get('/api/admin/orders')
        .then(res =>
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ORDERS,
                payload: []
            })
        );
};

// Get Customer Orders
export const getCustomerOrders = (id) => dispatch => {
    dispatch(setProductsLoading());
    axios.get(`/api/admin/${id}`)
        .then(res =>
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ORDERS,
                payload: []
            })
        );
};

// // Get single Detail Product
// export const handleDetail = (id) => dispatch => {
//     dispatch({
//         type: HANDLE_DETAIL,
//         payload: id
//     })
// }

// Get single Product
export const handleDetail = (id) => dispatch => {
    dispatch(setProductsLoading());
    axios.get(`/api/products/${id}`)
        .then(res =>
            dispatch({
                type: HANDLE_DETAIL,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: HANDLE_DETAIL,
                payload: null
            })
        );
}

// filter the products show
export const categoryProducts = (category) => dispatch => {
    dispatch(setProductsLoading());
    axios.get(`/api/products/category/${category}`)
        .then(res =>
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: SET_PRODUCTS,
                payload: null
            })
        );
}



// Get Current Cart
export const getCart = () => dispatch => {
    axios.get('/api/products/cart/all')
        .then(res =>
            dispatch({
                type: GET_CART,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_CART,
                payload: []
            })
        );
};

// Add item to cart
export const addToCart = (id) => dispatch => {
    axios.get(`/api/products/add-to-cart/${id}`)
        .then(res =>
            dispatch({
                type: ADD_TO_CART,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: ADD_TO_CART,
                payload: []
            })
        );
}

// Decrease item qty in cart by 1
export const decrement = (id) => dispatch => {
    axios.get(`/api/products/reduce/${id}`)
        .then(res =>
            dispatch(getCart())
        )
        .catch(err => 
            dispatch(getCart())
        );
}

// Open Overview
export const openOverview = () => {
    return {
        type: OPEN_OVERVIEW
    }
}

// Close Overview
export const closeOverview = () => {
    return {
        type: CLOSE_OVERVIEW
    }
}

// Open Modal
export const openModal = (id) => dispatch => {
    axios.get(`/api/products/${id}`)
        .then(res =>
            dispatch({
                type: OPEN_MODAL,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: PRODUCTS_LOADING
            })
        );
}

// Close Modal
export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

// Remove item from cart
export const removeItem = (id) => dispatch => {
    axios.get(`/api/products/remove/${id}`)
        .then(res =>
            dispatch(getCart())
        )
        .catch(err => 
            dispatch(getCart())
        );
}

// Remove all items from cart
export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

// Add Totals
export const addTotals = () => {
    return {
        type: ADD_TOTALS
    }
}

// Products loading
export const setProductsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}
