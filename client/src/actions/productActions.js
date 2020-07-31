import axios from 'axios';
import { setAlert } from './alertActions';

import { SET_PRODUCTS, SET_SORTED_PRODUCTS, ADD_PRODUCT, EDIT_PRODUCT, UPDATE_PRODUCT_LIKES, ADD_PRODUCT_REVIEW, REMOVE_PRODUCT_REVIEW, PRODUCT_ERROR, HANDLE_TAGS, REMOVE_TAGS, PRODUCTS_LOADING, ADD_TOTALS, HANDLE_DETAIL, ADD_TO_CART, OPEN_OVERVIEW, CLOSE_OVERVIEW, OPEN_MODAL, HANDLE_MAP, CLOSE_MODAL, CLEAR_CART, GET_CART, GET_ORDERS } from './types';
import store from '../store';

// Get Products
export const getProducts = (skip) => dispatch => {
    axios.get(`/api/products?skip=${skip}`)
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


// Get Product By Locations placeId
export const getProductsByLocationId = id => async dispatch => {
    dispatch(setProductsLoading());
    try {
        const res = await axios.get(`/api/products/location/${id}`);

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

// Get products user liked
export const getLikedProducts = id => async dispatch => {
    dispatch(setProductsLoading());
    try {
        const res = await axios.get(`/api/products/liked/${id}`);

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
export const addProduct = (prodData, imgData, varInfo, varName, storeId, history) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    try {
        const res = await axios.post(`/api/products/add/${storeId}`, prodData, config);
        console.log(res.data);

        const categoryList = await axios.get(`/api/categories/storeid/${storeId}`);
        let tempTags = [...res.data.tags];
  
        categoryList.data.map(async category => {
            const categoryTags = [...category.tags];
            
            try {
                for(var i = 0; i < categoryTags.length; i++) {
                    if(tempTags.includes(categoryTags[i])) {
                        let data = new FormData();
                        data.append('id', res.data._id);

                        await axios.put(`/api/categories/product/${category._id}`, data, config);
    
                        break;
                    }
                    console.log('NO MATCH')
                }
            } catch (err) {
                console.log(err)
            }
        })

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

        if (varInfo.length > 0) {
            varInfo.map(async (variant) => {
                let data = new FormData();
                
                if(varName.var1 !== undefined && varName.var1 !== null && varName.var1 !== '')data.append(`${varName.var1}`, variant.var1);
                if(varName.var2 !== undefined && varName.var2 !== null && varName.var2 !== '')data.append(`${varName.var2}`, variant.var2);
                if(varName.var3 !== undefined && varName.var3 !== null && varName.var3 !== '')data.append(`${varName.var3}`, variant.var3);
                if(varName.var4 !== undefined && varName.var4 !== null && varName.var4 !== '')data.append(`${varName.var4}`, variant.var4);
                if(res.data.name !== undefined && res.data.name !== null && res.data.name !== '')data.append('name', res.data.name);
                if(variant.sku !== undefined && variant.sku !== null && variant.sku !== '')data.append('sku', variant.sku);
                if(res.data.website_link !== undefined && res.data.website_link !== null && res.data.website_link !== '')data.append('website_link', res.data.website_link);
                if(variant.sale_price !== undefined && variant.sale_price !== null && variant.sale_price !== '')data.append('sale_price', variant.sale_price);
                if(variant.price !== undefined && variant.price !== null && variant.price !== '')data.append('price', variant.price);
                if(res.data.visible !== undefined && res.data.visible !== null && res.data.visible !== '')data.append('visible', res.data.visible);
                if(res.data.category !== undefined && res.data.category !== null && res.data.category !== '')data.append('in_stock', res.data.in_stock);
                if(variant.inventory_qty !== undefined && variant.inventory_qty !== null && variant.inventory_qty !== '')data.append('inventory_qty', variant.inventory_qty);
                if(res.data.category !== undefined && res.data.category !== null && res.data.category !== '')data.append('category', res.data.category);
                if(res.data.condition !== undefined && res.data.condition !== null && res.data.condition !== '')data.append('condition', res.data.condition);
                if(res.data.tags !== undefined && res.data.tags !== null && res.data.tags !== '')data.append('tags', res.data.tags);
    
                await axios.post(`/api/variants/product/add/${res.data._id}/${storeId}`, data, config);
                console.log('variants added');
            });
        } else {
            let data = new FormData();
                
            if(res.data.name !== undefined && res.data.name !== null && res.data.name !== '')data.append('name', res.data.name);
            if(res.data.sku !== undefined && res.data.sku !== null && res.data.sku !== '')data.append('sku', res.data.sku);
            if(res.data.website_link !== undefined && res.data.website_link !== null && res.data.website_link !== '')data.append('website_link', res.data.website_link);
            if(res.data.sale_price !== undefined && res.data.sale_price !== null && res.data.sale_price !== '')data.append('sale_price', res.data.sale_price);
            if(res.data.price !== undefined && res.data.price !== null && res.data.price !== '')data.append('price', res.data.price);
            if(res.data.visible !== undefined && res.data.visible !== null && res.data.visible !== '')data.append('visible', res.data.visible);
            if(res.data.in_stock !== undefined && res.data.in_stock !== null && res.data.in_stock !== '')data.append('in_stock', res.data.in_stock);
            if(res.data.inventory_qty !== undefined && res.data.inventory_qty !== null && res.data.inventory_qty !== '')data.append('inventory_qty', res.data.inventory_qty);
            if(res.data.category !== undefined && res.data.category !== null && res.data.category !== '')data.append('category', res.data.category);
            if(res.data.condition !== undefined && res.data.condition !== null && res.data.condition !== '')data.append('condition', res.data.condition);
            if(res.data.tags !== undefined && res.data.tags !== null && res.data.tags !== '')data.append('tags', res.data.tags);

            await axios.post(`/api/variants/product/add/${res.data._id}/${storeId}`, data, config);
            console.log('default variant added');
        }

        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        });

        history.push(`/admin/product/${res.data._id}`);
        dispatch(setAlert('New Product Created', 'success'));
    } catch (err) {
        dispatch({
          type: PRODUCT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Edit product
export const editProduct = (prodData, id, storeId) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    try {
        const res = await axios.post(`/api/products/edit/${id}/${storeId}`, prodData, config);
        console.log(res.data);

        dispatch({
            type: EDIT_PRODUCT,
            payload: res.data
        });

        dispatch(setAlert('Product Updated', 'success'));
    } catch (err) {
        dispatch({
          type: PRODUCT_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add product Img
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
        .then(res => {
                console.log(res.data);
                dispatch({
                    type: GET_CART,
                    payload: res.data
                })
            }
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

// Set Modal
export const handleMap = () => dispatch => {
    dispatch({
        type: HANDLE_MAP
    })
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

// INTERACTIONS


// Add Review
export const addReview = (formData, productId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        
        console.log('IN REVIEW!!!!!')
        console.log(productId);
        const res = await axios.post(`/api/products/comment/${productId}`, formData, config);
        console.log(res.data);

        dispatch({
            type: ADD_PRODUCT_REVIEW,
            payload: res.data
        });

        dispatch(setAlert('Review Added', 'success'));

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        console.log({msg: err.response.statusText, status: err.response.status})
    }
}

// Delete review
export const deleteReview = (productId, reviewId) => async dispatch => {
    try {
        await axios.delete(`/api/products/comment/${productId}/${reviewId}`);

        dispatch({
        type: REMOVE_PRODUCT_REVIEW,
        payload: reviewId
        });

        dispatch(setAlert('Review Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}   
