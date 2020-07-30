import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCollection } from '../../../actions/collectionActions';

const AddCollection = ({ addCollection, store, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        tags: '',
        file: '',
    });

    // Redirect if store is null
    if(store.store === null ) {
        history.push('/admin');
    }

    const { name, tags, file } = formData;

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
        data.append('tags', tags);
    
        addCollection(data, store.store._id, history);
    };

    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i> Add Collection
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
                                type="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter Collection Name"
                                value={name}
                                onChange={onChange}
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

AddCollection.propTypes = {
    addCollection: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    store: state.store
});

export default connect(mapStateToProps, { addCollection })(AddCollection);
