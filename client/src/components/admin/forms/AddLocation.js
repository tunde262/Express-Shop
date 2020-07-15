import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLocation } from '../../../actions/locationActions';

const AddLocation = ({ addLocation, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        tags: '',
        file: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: ''
    });

    const { name, street, city, state, zipcode, phone, tags, file } = formData;

    const fileChanged = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
    
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    } 

    const onSubmit = (e) => {
        e.preventDefault();
    
        let data = new FormData();
        if(file !== '') data.append('file', file);
        data.append('name', name);
        data.append('street', street);
        data.append('city', city);
        data.append('state', state);
        data.append('zipcode', zipcode);
        data.append('phone', phone);
        data.append('tags', tags);
    
        addLocation(data, history);
    };

    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i> Add Location
                    </h1>   
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Img</label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                className="form-control"
                                onChange={fileChanged}
                            />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Collection Name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input 
                                type="text"
                                name="street"
                                className="form-control"
                                value={street}
                                onChange={onChange}
                                placeholder="1234 Example Street Drive"
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input 
                                type="text"
                                name="city"
                                className="form-control"
                                value={city}
                                onChange={onChange}
                                placeholder="city"
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input 
                                type="text"
                                name="state"
                                className="form-control"
                                value={state}
                                onChange={onChange}
                                placeholder="state"
                            />
                        </div>
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input 
                                type="text"
                                name="zipcode"
                                className="form-control"
                                value={zipcode}
                                onChange={onChange}
                                placeholder="zipcode"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                                type="text"
                                name="phone"
                                className="form-control"
                                value={phone}
                                onChange={onChange}
                                placeholder="123-456-7890"
                            />
                        </div>
                        <div className="form-group">
                            <label>Tags</label>
                            <input
                                type="text"
                                placeholder="streetwear, hoodies, joggers..."
                                name="tags"
                                value={tags}
                                onChange={onChange}
                            />
                            <small className="form-text">
                                Please use comma separated tags (eg. streetwear, hoodies, joggers...)
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Add Collection
                        </button>
                    </form>
                    <p className="lead mt-4"><Link to="/admin">Back to admin</Link></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

AddLocation.propTypes = {
    addLocation: PropTypes.func.isRequired,
}

export default connect(null, { addLocation })(AddLocation);
