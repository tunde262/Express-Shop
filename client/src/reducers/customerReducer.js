import {
    GET_CUSTOMERS,
    CUSTOMER_ERROR,
    DELETE_CUSTOMER,
    UPDATE_CUSTOMER_NAME,
    UPDATE_CUSTOMER_ADDRESS_BOOK,
    UPDATE_CUSTOMER_NOTES,
    UPDATE_CUSTOMER_TAGS,
    UPDATE_CUSTOMER_TOTALS,
    UPDATE_CUSTOMER_ACTIVITY,
    ADD_CUSTOMER,
    GET_CUSTOMER
  } from '../actions/types';
  
  const initialState = {
    customers: [],
    customer: null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_CUSTOMERS:
            return {
            ...state,
            customers: payload,
            loading: false
            };
        case GET_CUSTOMER:
            return {
            ...state,
            customer: payload,
            loading: false
            };
        case ADD_CUSTOMER:
            return {
            ...state,
            customers: [payload, ...state.customers],
            loading: false
            };
        case DELETE_CUSTOMER:
            return {
            ...state,
            customers: state.customers.filter(customer => customer._id !== payload),
            loading: false
            };
        case CUSTOMER_ERROR:
            return {
            ...state,
            error: payload,
            loading: false
            };
        case UPDATE_CUSTOMER_NAME:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer._id === payload.id ? { ...customer, payload } : customer
                ),
                loading: false
            };
        case UPDATE_CUSTOMER_ADDRESS_BOOK:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer._id === payload.id ? { ...customer, payload } : customer
                ),
                loading: false
            };
        case UPDATE_CUSTOMER_NOTES:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer._id === payload.id ? { ...customer, payload } : customer
                ),
                loading: false
            };
        case UPDATE_CUSTOMER_TAGS:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer._id === payload.id ? { ...customer, payload } : customer
                ),
                loading: false
            };
        case UPDATE_CUSTOMER_TOTALS:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer._id === payload.id ? { ...customer, payload } : customer
                ),
                loading: false
            };
        case UPDATE_CUSTOMER_ACTIVITY:
            return {
                ...state,
                customers: state.customers.map(customer =>
                    customer._id === payload.id ? { ...customer, payload } : customer
                ),
                loading: false
            };
      default:
        return state;
    }
  }