import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStore, getCurrentStore } from '../../../actions/storeActions';

const initialState = {
    file: '',
    name: '', 
    description: '',
    tags: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
    website: ''
};

const StoreForm = ({
  store: { store, loading },
  createStore,
  getCurrentStore,
  history
  }) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!store) getCurrentStore();
    if (!loading && store) {
      const storeData = { ...initialState };
      for (const key in store) {
        if (key in storeData) storeData[key] = store[key];
      }
      for (const key in store.social) {
        if (key in storeData) storeData[key] = store.social[key];
      }
      if (Array.isArray(storeData.skills))
        storeData.skills = storeData.skills.join(', ');
      setFormData(storeData);
    }
  }, [loading, getCurrentStore, store]);

  const {
    file,
    name, 
    description,
    tags,
    youtube,
    instagram,
    facebook,
    twitter,
    website
  } = formData;

  const fileChanged = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    if(file !== '') data.append('file', file);
    data.append('name', name);
    data.append('description', description);
    data.append('tags', tags);
    data.append('website', website);
    data.append('twitter', twitter);
    data.append('facebook', facebook);
    data.append('youtube', youtube);
    data.append('instagram', instagram);

    createStore(data, history, store ? true : false);
  };

  return (
    <main id="home" style={{textAlign: "center"}}>
      <h1 className="large text-primary">Edit Your Store</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your store
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <label className='form-group'>Store Img.
          <input
              type="file"
              name="file"
              id="file"
              className="form-control"
              placeholder="Start with ../img/"
              onChange={fileChanged}
          />
        </label>
        <div className="line"></div>
        <label className="form-group">Store Name
          <input
            type="text"
            placeholder="Name your store"
            name="name"
            value={name}
            onChange={onChange}
          />
          <small className="form-text">
            You can always change this later
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Description
          <input
            type="text"
            placeholder="Describe your store"
            name="description"
            value={description}
            onChange={onChange}
          />
          <small className="form-text">
            This will appear on your store's page
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Tags
          <input
            type="text"
            placeholder="* Tags"
            name="tags"
            value={tags}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. apparel, beauty, art, essentials)
          </small>
        </label>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Click To Add Social
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <label className="form-group social-input">
              <i className="fas fa-globe fa-2x" />
              <input
                type="text"
                placeholder="Website URL"
                name="website"
                value={website}
                onChange={onChange}
              />
            </label>
            <label className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </label>
            <div className="line"></div>
            <label className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </label>
            <div className="line"></div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>
            <div className="line"></div>
            <label className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </label>
          </Fragment>
        )}
        <div className="line"></div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/admin">
          Go Back
        </Link>
      </form>
    </main>
  );
};

StoreForm.propTypes = {
  createStore: PropTypes.func.isRequired,
  getCurrentStore: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  store: state.store
});

export default connect(mapStateToProps, { createStore, getCurrentStore })(
  withRouter(StoreForm)
);