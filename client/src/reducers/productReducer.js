import { SET_PRODUCTS, SET_SORTED_PRODUCTS, UPDATE_PRODUCT_LIKES, PRODUCTS_LOADING, HANDLE_DETAIL, ADD_TO_CART, OPEN_OVERVIEW, CLOSE_OVERVIEW, OPEN_MODAL, CLOSE_MODAL, CLEAR_CART,ADD_TOTALS, GET_CART, GET_ORDERS, HANDLE_TAGS, REMOVE_TAGS } from '../actions/types';

const initialState = {
    products: null,
    sortedProducts: null,
    exploreTops: [],
    exploreBottoms: [],
    exploreHats: [],
    exploreSocks: [],
    featuredProducts: [],
    loading: false,
    location: 'all',
    category: 'all',
    tags: [],
    gender: 'all',
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    detailProduct: null,
    cart: [],
    cartOverview: false,
    modalOpen: false,
    modalProduct: null,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
    cartQty: 0,
    orders: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_PRODUCTS: {
            const products = action.payload;
            let tempProd = products;
            let featuredProducts = tempProd.filter(product => product.featured === true);
            // let exploreTops = tempProd.filter(product => product.category === 'top');
            // let exploreBottoms = tempProd.filter(product => product.category === 'bottom');
            // let exploreHats = tempProd.filter(product => product.category === 'hat');
            // let exploreSocks = tempProd.filter(product => product.category === 'socks');
            let maxPrice = Math.max(...products.map(product => product.price));

            return {
                ...state,
                products,
                sortedProducts: products,
                featuredProducts,
                price: maxPrice,
                maxPrice,
                loading: false
            };
        }
        case SET_SORTED_PRODUCTS: {
            const products = action.payload;
            console.log(products);
            let featuredProducts = tempProd.filter(product => product.featured === true);
            let maxPrice = Math.max(...products.map(product => product.price));

            return {
                ...state,
                sortedProducts: products,
                featuredProducts,
                price: maxPrice,
                maxPrice
            };
        }
        case UPDATE_PRODUCT_LIKES:
            return {
                ...state,
                sortedProducts: state.products.map(product =>
                    product._id === action.payload.id ? { ...product, likes: action.payload.likes } : product
                )
            };
        case HANDLE_TAGS: 
            let tempProd = [...state.products];
            const tags = [...state.tags, action.payload];
            let res;
            if (action.payload === 'explore') {
                res = tempProd;
            } else {
                for(var i = 0; i < tags.length; i++) {
                    res = tempProd.filter(prod => prod.tags.includes(tags[i]));
                }
            }
            let maxPrice = Math.max(...res.map(product => product.price));
            return {
                ...state,
                tags: [...state.tags, action.payload],
                sortedProducts: res,
                price: maxPrice,
                maxPrice
            }
        case REMOVE_TAGS: 
            return {
                ...state,
                tags: [...state.tags.filter(tag => tag !== action.payload)]
            }
        case HANDLE_DETAIL: 
            return {
                ...state,
                detailProduct: action.payload,
                modalProduct: action.payload,
                loading: false
            };
        case GET_CART: {
            const arr = [];
            for (const id in action.payload.items) {
                arr.push(action.payload.items[id]);
            }

            let subTotal = action.payload.totalPrice;
            // const tempTax = subTotal * 0.1;
            // const tax = parseFloat(tempTax.toFixed(2));
            const tax = 5;
            const total = subTotal + tax;
            const totalQty = action.payload.totalQty;
            return {
                ...state,
                cart: arr,
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total,
                cartQty: totalQty
            }
        }
        case ADD_TO_CART: {
            const arr = [];
            for (const id in action.payload.items) {
                arr.push(action.payload.items[id]);
            }

            let subTotal = action.payload.totalPrice;
            const tempTax = subTotal * 0.1;
            const tax = parseFloat(tempTax.toFixed(2));
            const total = subTotal + tax;
            const totalQty = action.payload.totalQty;
            return {
                ...state,
                cart: arr,
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total,
                cartQty: totalQty
            }
        }
        case OPEN_OVERVIEW: 
            return {
                ...state,
                cartOverview: true
            }
        case CLOSE_OVERVIEW: 
            return {
                ...state,
                cartOverview: false
            }
        case OPEN_MODAL: 
            return {
                ...state,
                modalProduct: action.payload,
                modalOpen: true
            }
        case CLOSE_MODAL: 
            return {
                ...state,
                modalOpen: false
            }

        case CLEAR_CART: 
            return {
                ...state,
                cart: []
            }
        case ADD_TOTALS: {
            let subTotal = 0;
            state.cart.map(item => (subTotal += item.price));
            const tempTax = subTotal * 0.1;
            const tax = parseFloat(tempTax.toFixed(2));
            const total = subTotal + tax;
            return {
                ...state,
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        }
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            };
        default:
            return state;
    }
}