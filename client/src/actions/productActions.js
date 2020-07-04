import axios from 'axios';
import { setAlert } from './alertActions';

import { SET_PRODUCTS, SET_SORTED_PRODUCTS, UPDATE_PRODUCT_LIKES, PRODUCT_ERROR, HANDLE_TAGS, REMOVE_TAGS, PRODUCTS_LOADING, ADD_TOTALS, HANDLE_DETAIL, ADD_TO_CART, OPEN_OVERVIEW, CLOSE_OVERVIEW, OPEN_MODAL, CLOSE_MODAL, CLEAR_CART, GET_CART, GET_ORDERS } from './types';

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

// Get Products by user's store
export const getStoreProducts = () => dispatch => {
    dispatch(setProductsLoading());
    axios.get('/api/products/store')
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

// Get Product By Store Id
export const getProductsByStoreId = id => async dispatch => {
    dispatch(setProductsLoading());
    try {
        const res = await axios.get(`/api/products/store/${id}`);

        dispatch({
            type: SET_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SET_PRODUCTS,
            payload: {}
        })
    }
};

// Get Filtered Products
export const setSortedProducts = (products) =>  {
    return {
        type: SET_SORTED_PRODUCTS,
        payload: products
    }
};

// Add filter to tags
export const handleTags = (filter) => {
    return {
        type: HANDLE_TAGS,
        payload: filter
    }
}

// Add filter to tags
export const removeTags = (filter) => {
    return {
        type: REMOVE_TAGS,
        payload: filter
    }
}


// Add product
export const addProduct = (prodData, imgData) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    try {
        const res = await axios.post('/api/products', prodData, imgData, config);
        console.log(res.data);

        // imgData.map(img => console.log(img));
        // imgData.map(img => addProductImg(img, res.data._id))
        // dispatch(handleDetail(res.data._id));
        // payload: res.data
        imgData.map(async (img) => {
            let data = new FormData();
            data.append('file', img);

            await axios.post(`/api/products/image/${res.data._id}`, data, config);
            console.log('img added');
        });
        // history.push('/admin');
        dispatch(setAlert('New Product Created', 'success'));
    } catch (err) {
        dispatch({
          type: PRODUCT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add product
export const addProductImg = (imgData, id) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'image/jpeg'
        }
    };
    
    try {
        const res = await axios.post(`/api/products/image/${id}`, imgData, config);
        // payload: res.data
        // varData.map((variant, index) => {
        //     let data = new FormData();
        //     if(varName.var1 !== '')data.append(`${varName.var1}`, variant.var1);
        //     if(varName.var2 !== '')data.append(`${varName.var2}`, variant.var2);
        //     if(varName.var3 !== '')data.append(`${varName.var3}`, variant.var3);
        //     if(varName.var4 !== '')data.append(`${varName.var4}`, variant.var4);
        //     if(name !== '')data.append('name', name);
        //     if(variant.sku !== '')data.append('sku', variant.sku);
        //     if(website_link !== '')data.append('website_link', website_link);
        //     if(variant.sale_price !== '')data.append('sale_price', variant.sale_price);
        //     if(variant.price !== '')data.append('price', variant.price);
        //     if(visible !== '')data.append('visible', visible);
        //     if(in_stock !== '')data.append('in_stock', in_stock);
        //     if(variant.inventory_qty !== '')data.append('inventory_qty', variant.inventory_qty);
        //     if(category !== '')data.append('category', category);
        //     if(condition !== '')data.append('condition', condition);
        //     if(tags !== '')data.append('tags', tags);

        //     await axios.post(`/api/variants/product/${res.data.id}`, data, config);
        // });
        // history.push('/admin');
        console.log(res.data);
        dispatch(setAlert('Image Added', 'success'));
    } catch (err) {
        dispatch({
          type: PRODUCT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
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
    axios.get('/api/orders')
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

// Get Store Orders
export const getStoreOrders = (id) => async dispatch => {
    dispatch(setProductsLoading());
    try {
        const res = await axios.get(`/api/orders/store/${id}`);

        dispatch({
            type: GET_ORDERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ORDERS,
            payload: []
        })
    }
};

// Get Customer Orders
export const getCustomerOrders = (id) => dispatch => {
    dispatch(setProductsLoading());
    axios.get(`/api/orders/${id}`)
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


// Add like
export const addLike = id => async dispatch => {
    try {
      const res = await axios.put(`/api/products/like/${id}`);
  
      dispatch({
        type: UPDATE_PRODUCT_LIKES,
        payload: { id, likes: res.data }
      });
    } catch (err) {
      console.log({ msg: err.response.statusText, status: err.response.status })
    }
};


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
