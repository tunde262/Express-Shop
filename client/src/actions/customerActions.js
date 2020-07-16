import axios from 'axios';
import { setAlert } from './alertActions';
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
} from './types';

// Get customers
export const getCustomers = () => async dispatch => {
  try {
    const res = await axios.get('/api/customers');

    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Customers by current store
export const getStoreCustomers = () => async dispatch => {
  try {
    const res = await axios.get('/api/customers/store');

    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CUSTOMERS,
      payload: {}
    })
  }
};


// Get Store Customers by store id
export const getCustomersByStoreId = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/customers/store/${id}`);

        dispatch({
            type: GET_CUSTOMERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CUSTOMER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get single customer by id
export const getCustomerById = id => async dispatch => {
  try {
      const res = await axios.get(`/api/customers/${id}`);

      dispatch({
          type: GET_CUSTOMER,
          payload: res.data
      });
  } catch (err) {
      dispatch({
          type: CUSTOMER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      });
  }
}

// Add Customer
export const addCustomer = (formData, subData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(`/api/customers`, formData, config);
        console.log(res.data);
        
        const { _id } = res.data;
        const { firstname, lastname, street, city, state, zipcode, address_name, apartment_number, address_active, notes, tags, store} = subData;

        console.log('STORE ID');
        console.log(store)

        let nameData = new FormData();
        nameData.append('customerId', _id);
        nameData.append('firstname', firstname);
        nameData.append('lastname', lastname);
        await axios.put(`/api/customers/add/name/${store}`, nameData, config);


        if(city) {
            console.log('ADDY')
            let addressData = new FormData();
            addressData.append('customerId', _id);
            addressData.append('street', street);
            addressData.append('city', city);
            addressData.append('state', state);
            addressData.append('zipcode', zipcode);
            addressData.append('apartment_number', apartment_number);
            addressData.append('name', address_name);
            addressData.append('active', address_active);
            await axios.put(`/api/customers/add/address_book/${store}`, addressData, config);
        }
        
        if(notes) {
            console.log('NOTES')
            let noteData = new FormData();
            noteData.append('customerId', _id);
            noteData.append('text', notes);
            await axios.put(`/api/customers/add/note/${store}`, noteData, config);
        }

        if(tags) {
            console.log('TAGS')
            let tagData = new FormData();
            tagData.append('customerId', _id);
            tagData.append('tags', tags);
            await axios.put(`/api/customers/add/tag/${store}`, tagData, config);
        }


        let creationData = new FormData();
        creationData.append('customerId', _id);
        await axios.put(`/api/customers/add/creation_date/${store}`, creationData, config);
        
  
      dispatch({
        type: ADD_CUSTOMER,
        payload: res.data
      });

      history.push(`/admin/customer/${res.data._id}`);
  
      dispatch(setAlert('Customer Created', 'success'));
    } catch (err) {
      dispatch({
        type: CUSTOMER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Delete customer
export const deleteCustomer = id => async dispatch => {
  try {
    await axios.delete(`/api/customers/${id}`);

    dispatch({
      type: DELETE_CUSTOMER,
      payload: id
    });

    // dispatch(setAlert('Customer Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


