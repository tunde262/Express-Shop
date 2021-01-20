import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStore, getCurrentStore } from '../../../../actions/storeActions';

import cardboardLogo from '../../../common/logo.jpg';
import { Logo } from '../../../Logo';

import Login from './Login';
import Name from './Name';
import Terms from './Terms';
import PaymentTerms from './PaymentTerms';
import Description from './Description';
import Category from './Category';
import Return from './Return';
import SocialMedia from './SocialMedia';
import Support from './Support';
import Upload from './Upload';
import Website from './Website';
import Zipcode from './Zipcode';

const initialState = {
    step: 2,
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
  const [slideform1, setSlideForm1] = useState(false);
  const [slideform2, setSlideForm2] = useState(false);
  const [slideform3, setSlideForm3] = useState(false);
  const [slideform4, setSlideForm4] = useState(false);
  const [slideform5, setSlideForm5] = useState(false);
  const [slideform6, setSlideForm6] = useState(false);
  const [slideform7, setSlideForm7] = useState(false);
  const [slideform8, setSlideForm8] = useState(false);
  const [slideform9, setSlideForm9] = useState(false);
  const [slideform10, setSlideForm10] = useState(false);
  const [slideform11, setSlideForm11] = useState(false);
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
    step,
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

  let formContent;

  if(step === 1) formContent = <Login onChange={onChange}/>
  if(step === 2) formContent = <Terms onChange={onChange}/>
  if(step === 3) formContent = <Name onChange={onChange} />
  if(step === 4) formContent = <Category onChange={onChange}/>
  if(step === 5) formContent = <Upload onChange={onChange}/>
  if(step === 6) formContent = <Description onChange={onChange}/>
  if(step === 7) formContent = <Support onChange={onChange}/>
  if(step === 8) formContent = <Zipcode onChange={onChange}/>
  if(step === 9) formContent = <Return onChange={onChange}/>
  if(step === 10) formContent = <Website onChange={onChange}/>
  if(step === 11) formContent = <SocialMedia onChange={onChange} instagram={instagram} youtube={youtube} twitter={twitter} facebook={facebook}/>

  return (
    <main id="home" className="store-form-container">
      <div className="store-form">
        <Logo>
          <img src={cardboardLogo} style={{maxHeight: '40px'}} alt="cardboard express logo" />
        </Logo>
        <div style={{width:'100%'}} className="form-settings-transition">
          <div id="transition-1" style={{width:'100%'}} className={!slideform1 ? "auth-form-container active" : "auth-form-container"}>
            <Login slideform1={slideform1} setSlideForm1={setSlideForm1} onChange={onChange}/>
          </div>
          <div id="transition-2" style={{width:'100%'}} className={slideform1 ? "auth-form-container active" : "auth-form-container"}>
            <div style={{width:'100%'}} className="form-settings-transition">
              <div id="transition-1" style={{width:'100%'}} className={!slideform2 ? "auth-form-container active" : "auth-form-container"}>
                <Terms slideform1={slideform1} setSlideForm1={setSlideForm1} slideform2={slideform2} setSlideForm2={setSlideForm2} onChange={onChange}/>
              </div>
              <div id="transition-2" style={{width:'100%'}} className={slideform2 ? "auth-form-container active" : "auth-form-container"}>
                <div style={{width:'100%'}} className="form-settings-transition">
                  <div id="transition-1" style={{width:'100%'}} className={!slideform3 ? "auth-form-container active" : "auth-form-container"}>
                    <Name slideform2={slideform2} setSlideForm2={setSlideForm2} slideform3={slideform3} setSlideForm3={setSlideForm3} onChange={onChange}/>
                  </div>
                  <div id="transition-2" style={{width:'100%'}} className={slideform3 ? "auth-form-container active" : "auth-form-container"}>
                    <div style={{width:'100%'}} className="form-settings-transition">
                      <div id="transition-1" style={{width:'100%'}} className={!slideform4 ? "auth-form-container active" : "auth-form-container"}>
                        <Category slideform3={slideform3} setSlideForm3={setSlideForm3} slideform4={slideform4} setSlideForm4={setSlideForm4} onChange={onChange}/>
                      </div>
                      <div id="transition-2" style={{width:'100%'}} className={slideform4 ? "auth-form-container active" : "auth-form-container"}>
                        <div style={{width:'100%'}} className="form-settings-transition">
                          <div id="transition-1" style={{width:'100%'}} className={!slideform5 ? "auth-form-container active" : "auth-form-container"}>
                            <Upload slideform4={slideform4} setSlideForm4={setSlideForm4} slideform5={slideform5} setSlideForm5={setSlideForm5} onChange={onChange}/>
                          </div>
                          <div id="transition-2" style={{width:'100%'}} className={slideform5 ? "auth-form-container active" : "auth-form-container"}>
                            <div style={{width:'100%'}} className="form-settings-transition">
                              <div id="transition-1" style={{width:'100%'}} className={!slideform6 ? "auth-form-container active" : "auth-form-container"}> 
                                <Description slideform5={slideform5} setSlideForm5={setSlideForm5} slideform6={slideform6} setSlideForm6={setSlideForm6} onChange={onChange}/>
                              </div>
                              <div id="transition-2" style={{width:'100%'}} className={slideform6 ? "auth-form-container active" : "auth-form-container"}>
                                <div style={{width:'100%'}} className="form-settings-transition">
                                  <div id="transition-1" style={{width:'100%'}} className={!slideform7 ? "auth-form-container active" : "auth-form-container"}> 
                                    <Support slideform6={slideform6} setSlideForm6={setSlideForm6} slideform7={slideform7} setSlideForm7={setSlideForm7} onChange={onChange}/>
                                  </div>
                                  <div id="transition-2" style={{width:'100%'}} className={slideform7 ? "auth-form-container active" : "auth-form-container"}>
                                    <div style={{width:'100%'}} className="form-settings-transition">
                                      <div id="transition-1" style={{width:'100%'}} className={!slideform8 ? "auth-form-container active" : "auth-form-container"}> 
                                        <Zipcode slideform7={slideform7} setSlideForm7={setSlideForm7} slideform8={slideform8} setSlideForm8={setSlideForm8} onChange={onChange}/>
                                      </div>
                                      <div id="transition-2" style={{width:'100%'}} className={slideform8 ? "auth-form-container active" : "auth-form-container"}>
                                        <div style={{width:'100%'}} className="form-settings-transition">
                                          <div id="transition-1" style={{width:'100%'}} className={!slideform9 ? "auth-form-container active" : "auth-form-container"}> 
                                          <Return slideform8={slideform8} setSlideForm8={setSlideForm8} slideform9={slideform9} setSlideForm9={setSlideForm9} onChange={onChange}/>
                                          </div>
                                          <div id="transition-2" style={{width:'100%'}} className={slideform9 ? "auth-form-container active" : "auth-form-container"}>
                                            <div style={{width:'100%'}} className="form-settings-transition">
                                              <div id="transition-1" style={{width:'100%'}} className={!slideform10 ? "auth-form-container active" : "auth-form-container"}> 
                                                <Website slideform9={slideform9} setSlideForm9={setSlideForm9} slideform10={slideform10} setSlideForm10={setSlideForm10} onChange={onChange}/>
                                              </div>
                                              <div id="transition-2" style={{width:'100%'}} className={slideform10 ? "auth-form-container active" : "auth-form-container"}> 
                                                <div style={{width:'100%'}} className="form-settings-transition">
                                                  <div id="transition-1" style={{width:'100%'}} className={!slideform11 ? "auth-form-container active" : "auth-form-container"}> 
                                                    <SocialMedia slideform10={slideform10} setSlideForm10={setSlideForm10} slideform11={slideform11} setSlideForm11={setSlideForm11} onChange={onChange}/>
                                                  </div>
                                                  <div id="transition-2" style={{width:'100%'}} className={slideform11 ? "auth-form-container active" : "auth-form-container"}> 
                                                    <PaymentTerms slideform1={slideform11} setSlideForm1={setSlideForm11} slideform2={slideform11} setSlideForm2={setSlideForm11} onChange={onChange}/>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
          
        </div>
        {/* {formContent} */}
      </div>
    </main>
        
        
   
        
  
      /* <h1 className="large text-primary">Edit Your Store</h1>
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
      </form> */
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