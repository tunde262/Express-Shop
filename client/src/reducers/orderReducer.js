import { GET_ORDER, GET_ORDERS, CLEAR_ORDER, CLEAR_ORDERS, ORDERS_LOADING } from "../actions/types";

const initialState = {
    order: null,
    orders: [],
    orderStores: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ORDER:
            const arr = [];
            const storeList = [];

            for (const id in Object.values(payload.cart.items)) {
                arr.push(Object.values(payload.cart.items)[id]);
                console.log(Object.values(payload.cart.items)[id]);
            }

            arr.map(item => storeList.includes(item.item.store) ? null : storeList.push({
                store: item.item.store
            }));
            return {
                ...state,
                order: payload,
                orderStores: storeList,
                loading: false
            }
        case GET_ORDERS:
            const ordersArr = [];
            const storeList2 = [];

            for (let i = 0; i < payload.length; i++) {
                for (const id in Object.values(payload[i].cart.items)) {
                    ordersArr.push(Object.values(payload[i].cart.items)[id]);
                    console.log(Object.values(payload[i].cart.items)[id]);
                }
            }

            ordersArr.map(item => storeList2.includes(item.item.store) ? null : storeList2.push({
                store: item.item.store
            }));

            return {
                ...state,
                orders: payload,
                orderStores: storeList2,
                loading: false
            }
        case CLEAR_ORDER:
            return {
                ...state,
                order: null,
                orderStores: [],
                loading: false
            }
        case CLEAR_ORDERS:
            return {
                ...state,
                orders: [],
                orderStores: [],
                loading: false
            }
        default:
            return state;
    }
}