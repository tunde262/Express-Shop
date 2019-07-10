import { SET_PRODUCTS, PRODUCTS_LOADING, HANDLE_DETAIL, ADD_TO_CART, OPEN_OVERVIEW, CLOSE_OVERVIEW, OPEN_MODAL, CLOSE_MODAL, CLEAR_CART,ADD_TOTALS, GET_CART, GET_ORDERS } from '../actions/types';

const initialState = {
    products: null,
    loading: false,
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
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
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