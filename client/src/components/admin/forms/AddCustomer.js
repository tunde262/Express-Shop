import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCustomer } from '../../../actions/customerActions';
import InputTag from '../../common/InputTag/InputTag';

const AddCustomer = ({ store, addCustomer, history }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        apartment_number: '',
        address_name: '',
        address_active: false,
        notes: '',
        tags: '',
    });
    const [varTags, setVarTags] = useState([]);

    const { firstname, lastname, email, phone, street, city, state, zipcode, apartment_number, address_name, address_active, notes } = formData;
    
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    } 

    const onSubmit = (e) => {
        e.preventDefault();

        let stringTags;
        if (Array.isArray(varTags)) {
            stringTags = varTags.join(', ');
        }
    
        let data = new FormData();
        data.append('email', email);
        data.append('phone', phone);

        let subData = {};
        subData.firstname = firstname;
        subData.lastname = lastname;
        subData.street = street;
        subData.city = city;
        subData.state = state;
        subData.zipcode = zipcode;
        subData.apartment_number = apartment_number;
        subData.address_name = address_name;
        subData.address_active = address_active;
        subData.notes = notes;
        subData.tags = stringTags;
        subData.store = store.store._id;
    
        addCustomer(data, subData, history);
    };

    const onAddTag = (tag) => {
        setVarTags([...varTags, tag]);
    }
    
    const onDeleteTag = (tag) => {
        let remainingTags = varTags.filter ((t) => {
        return (t !== tag);
        });
        setVarTags([...remainingTags]);
    }

    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i> Add Customer
                    </h1>   
                    <form onSubmit={onSubmit}>
                        <div style={{display: 'flex'}}>
                            <input
                                type="name"
                                name="firstname"
                                className="input_line"
                                placeholder="Enter Name"
                                value={firstname}
                                onChange={e => onChange(e)}
                            />
                            <input
                                type="name"
                                name="lastname"
                                className="input_line"
                                placeholder="Enter Name"
                                value={lastname}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="input_line"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => onChange(e)}
                        />
                        <label>Phone #</label>
                        <input
                            type="text"
                            name="phone"
                            className="input_line"
                            placeholder="123-456-7890"
                            value={phone}
                            onChange={e => onChange(e)}
                        />
                        <label>Street</label>
                        <input
                            type="text"
                            name="street"
                            className="input_line"
                            placeholder="1234 example Dr."
                            value={street}
                            onChange={e => onChange(e)}
                        />
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            className="input_line"
                            placeholder="Los Angeles"
                            value={city}
                            onChange={e => onChange(e)}
                        />
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            className="input_line"
                            placeholder="CA"
                            value={state}
                            onChange={e => onChange(e)}
                        />
                        <label>Postal code</label>
                        <input
                            type="text"
                            name="zipcode"
                            className="input_line"
                            placeholder="12345"
                            value={zipcode}
                            onChange={e => onChange(e)}
                        />
                        <label>Notes</label>
                        <textarea
                            name="notes"
                            className="input_line"
                            placeholder="Add a note for this customer..."
                            value={notes}
                            onChange={e => onChange(e)}
                            style={{width:'100%'}}
                        />
                        <label>Tags</label>
                        <InputTag
                            onAddTag ={onAddTag}
                            onDeleteTag = {onDeleteTag}
                            defaultTags={varTags}  
                            placeholder="enter tags separated by comma"
                        />
                        <button type="submit" className="btn btn-primary btn-block">
                            Add Customer
                        </button>
                    </form>
                    <p className="lead mt-4"><Link to="/admin">Back to admin</Link></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

AddCustomer.propTypes = {
    addCustomer: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { addCustomer })(AddCustomer);
