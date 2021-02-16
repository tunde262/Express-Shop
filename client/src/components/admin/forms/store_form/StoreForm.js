import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStore, getCurrentStore } from '../../../../actions/storeActions';
import { setAlert } from '../../../../actions/alertActions';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
    phone: '',
    email: '',
    zipcode: '',
    tags: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
    website: '',
    // Location Info
    city: '',
    state: '',
    country: '',
    area: '',
    stateProvince: '',
    street_number: '',
    formatted_address: '',
    street_name: '',
    postalCode: '',
    placeId: '',
    latLng: '',
};

const StoreForm = ({
  store: { store, loading },
  createStore,
  getCurrentStore,
  setAlert,
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

  // Category Data
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [categoryData, setCategoryData] = useState('');

  // File Upload
  const [fileUploadState, setFileUploadState] = useState('');

  // Location Info  
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
      lat: null, 
      lng: null
  });
  

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
    phone,
    email,
    zipcode,
    tags,
    youtube,
    instagram,
    facebook,
    twitter,
    website,
    // Location Info
    city,
    state,
    country,
    area,
    stateProvince,
    street_number,
    formatted_address,
    street_name,
    postalCode,
    placeId,
    latLng,
  } = formData;

  const fileChanged = e => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleCategoryChange = (value) => {
    setCategoryData(value);
  
    setCategoryToggle(false);
  }
  
  const fileUploadButton = () => {
    document.getElementById('fileButton').click();
    document.getElementById('fileButton').onchange = () =>{      
      setFileUploadState(document.getElementById('fileButton').value);
    }
  }

  const handleLocationSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0])
    console.log('VALUE:');
    console.log(value);
    console.log('RESULTS:')
    console.log(result);
    console.log('LATLNG');
    console.log(latLng);

    let locationTags = [];

    if(result[0].types && result[0].types.length > 0) {
        result[0].types.map(type => locationTags.push(type));
    };
    const address = result[0].formatted_address;
    const placeId = result[0].place_id;
    const addressArray =  result[0].address_components;
    const city = getCity(addressArray);
    const country = getCountry(addressArray );
    const area = getArea(addressArray);
    const state = getState(addressArray);
    const postalCode = getPostalCode(addressArray);
    const street = getStreet(addressArray);
    const number = getNumber(addressArray);


    console.log('city: ' + city);
    console.log('state: ' + state);
    console.log('country: ' + country);
    console.log('area: ' + area);
    console.log('state: ' + state);
    console.log('number: ' + number);
    console.log('street: ' + street);
    console.log('postalCode: ' + postalCode);
    console.log("formatted address: " + address);
    console.log("placeId: " + placeId);

    setAddress(value);
    setFormData({
        ...formData,
        city: (city) ? city : '',
        state: (state) ? state : '',
        country: (country) ? country : '',
        area: (area) ? area : '',
        stateProvince: (state) ? state : '',
        street_number: (number) ? number : '',
        formatted_address: (address) ? address : '',
        street_name: (street) ? street : '',
        postalCode: (postalCode) ? postalCode : '',
        placeId: (placeId) ? placeId : '',
        latLng: `${latLng.lat}, ${latLng.lng}`
    })
    setCoordinates(latLng);
  };

  const getCity = ( addressArray ) => {
      let city = '';
      for( let i = 0; i < addressArray.length; i++ ) {
          if ( addressArray[ i ].types[0] && 'locality' === addressArray[ i ].types[0] ) {
              city = addressArray[ i ].long_name;
              return city;
          }
      }
  };

  const getArea = ( addressArray ) => {
      let area = '';
      for( let i = 0; i < addressArray.length; i++ ) {
          if ( addressArray[ i ].types[0]  ) {
              for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                  if ( 'administrative_area_level_2' === addressArray[ i ].types[j] ) {
                      area = addressArray[ i ].long_name;
                      return area;
                  }
              }
          }
      }
  };

  const getCountry = ( addressArray ) => {
      let area = '';
      for( let i = 0; i < addressArray.length; i++ ) {
          if ( addressArray[ i ].types[0]  ) {
              for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                  if ( 'country' === addressArray[ i ].types[j] ) {
                      area = addressArray[ i ].long_name;
                      return area;
                  }
              }
          }
      }
  };

  const getPostalCode = ( addressArray ) => {
      let area = '';
      for( let i = 0; i < addressArray.length; i++ ) {
          if ( addressArray[ i ].types[0]  ) {
              for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                  if ( 'postal_code' === addressArray[ i ].types[j] ) {
                      area = addressArray[ i ].long_name;
                      return area;
                  }
              }
          }
      }
  };

  const getState = ( addressArray ) => {
      let state = '';
      for( let i = 0; i < addressArray.length; i++ ) {
          for( let i = 0; i < addressArray.length; i++ ) {
              if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
                  state = addressArray[ i ].long_name;
                  return state;
              }
          }
      }
  };

  const getNumber = ( addressArray ) => {
      let state = '';
      for( let i = 0; i < addressArray.length; i++ ) {
          for( let i = 0; i < addressArray.length; i++ ) {
              if ( addressArray[ i ].types[0] && 'street_number' === addressArray[ i ].types[0] ) {
                  state = addressArray[ i ].long_name;
                  return state;
              }
          }
      }
  };

  const getStreet = ( addressArray ) => {
      let state = '';
      for( let i = 0; i < addressArray.length; i++ ) {
          for( let i = 0; i < addressArray.length; i++ ) {
              if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
                  state = addressArray[ i ].long_name;
                  return state;
              }
          }
      }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // const storeFields = {};
    // if(file !== '') storeFields.file = file;
    // if(name !== '') storeFields.name = name;
    // console.log('SUBMIT NAME:')
    // console.log(name);
    // if(description !== '') storeFields.description = description;
    // if(email !== '') storeFields.email = email;
    // if(phone !== '') storeFields.phone = phone;
    // if(categoryData !== '') storeFields.department = categoryData;
    // // if(tags !== '') storeFields.tags = tags;
    // if(zipcode !== '') storeFields.zipcode = zipcode;
    // if(website !== '') storeFields.website = website;
    // if(twitter !== '') storeFields.twitter = twitter;
    // if(facebook !== '') storeFields.facebook = facebook;
    // if(youtube !== '') storeFields.youtube = youtube;
    // if(instagram !== '') storeFields.instagram = instagram;
    // if(street_name !== '') storeFields.street_name = street_name;
    // if(street_number !== '') storeFields.street_number = street_number;
    // if(city !== '') storeFields.city = city;
    // if(state !== '') storeFields.state = state;
    // if(postalCode !== '') storeFields.postalCode = postalCode;
    // if(country !== '') storeFields.country = country;
    // if(area !== '') storeFields.area = area;
    // if(placeId !== '') storeFields.return_placeId = placeId;
    // if(stateProvince !== '') storeFields.stateProvince = stateProvince;
    // if(formatted_address !== '') storeFields.formatted_return_address = formatted_address;
    // if(latLng !== '') storeFields.coordinates = latLng;

    let data = new FormData();
    if(file !== '') data.append('file', file);
    data.append('name', name);
    data.append('description', description);
    if(email !== '')data.append('email', email);
    if(phone !== '')data.append('phone', phone);
    data.append('department', categoryData);
    data.append('tags', tags);
    data.append('zipcode', zipcode);
    data.append('website', website);
    data.append('twitter', twitter);
    data.append('facebook', facebook);
    data.append('youtube', youtube);
    data.append('instagram', instagram);

    if(street_name !== '')data.append('street_name', street_name);
    if(street_number !== '')data.append('street_number', street_number);
    if(city !== '')data.append('city', city);
    if(state !== '')data.append('state', state);
    if(postalCode !== '')data.append('postalCode', postalCode);
    if(country !== '')data.append('country', country);
    if(area !== '')data.append('area', area);
    if(placeId !== '')data.append('return_placeId', placeId);
    if(stateProvince !== '')data.append('stateProvince', stateProvince);
    if(formatted_address !== '')data.append('formatted_return_address', formatted_address);
    if(latLng !== '')data.append('coordinates', latLng);

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
            <Login slideform1={slideform1} setSlideForm1={setSlideForm1} />
          </div>
          <div id="transition-2" style={{width:'100%'}} className={slideform1 ? "auth-form-container active" : "auth-form-container"}>
            <div style={{width:'100%'}} className="form-settings-transition">
              <div id="transition-1" style={{width:'100%'}} className={!slideform2 ? "auth-form-container active" : "auth-form-container"}>
                <Terms slideform1={slideform1} setSlideForm1={setSlideForm1} slideform2={slideform2} setSlideForm2={setSlideForm2} onChange={onChange}/>
              </div>
              <div id="transition-2" style={{width:'100%'}} className={slideform2 ? "auth-form-container active" : "auth-form-container"}>
                <div style={{width:'100%'}} className="form-settings-transition">
                  <div id="transition-1" style={{width:'100%'}} className={!slideform3 ? "auth-form-container active" : "auth-form-container"}>
                    <Name slideform2={slideform2} setSlideForm2={setSlideForm2} slideform3={slideform3} setSlideForm3={setSlideForm3} name={name} onChange={onChange} setAlert={setAlert} />
                  </div>
                  <div id="transition-2" style={{width:'100%'}} className={slideform3 ? "auth-form-container active" : "auth-form-container"}>
                    <div style={{width:'100%'}} className="form-settings-transition">
                      <div id="transition-1" style={{width:'100%'}} className={!slideform4 ? "auth-form-container active" : "auth-form-container"}>
                        <Category slideform3={slideform3} setSlideForm3={setSlideForm3} slideform4={slideform4} setSlideForm4={setSlideForm4} handleCategoryChange={handleCategoryChange} categoryData={categoryData} categoryToggle={categoryToggle} setCategoryToggle={setCategoryToggle} setAlert={setAlert} />
                      </div>
                      <div id="transition-2" style={{width:'100%'}} className={slideform4 ? "auth-form-container active" : "auth-form-container"}>
                        <div style={{width:'100%'}} className="form-settings-transition">
                          <div id="transition-1" style={{width:'100%'}} className={!slideform5 ? "auth-form-container active" : "auth-form-container"}>
                            <Upload slideform4={slideform4} setSlideForm4={setSlideForm4} slideform5={slideform5} setSlideForm5={setSlideForm5} fileChanged={fileChanged} fileUploadButton={fileUploadButton} fileUploadState={fileUploadState} />
                          </div>
                          <div id="transition-2" style={{width:'100%'}} className={slideform5 ? "auth-form-container active" : "auth-form-container"}>
                            <div style={{width:'100%'}} className="form-settings-transition">
                              <div id="transition-1" style={{width:'100%'}} className={!slideform6 ? "auth-form-container active" : "auth-form-container"}> 
                                <Description slideform5={slideform5} setSlideForm5={setSlideForm5} slideform6={slideform6} setSlideForm6={setSlideForm6} description={description} onChange={onChange} setAlert={setAlert} />
                              </div>
                              <div id="transition-2" style={{width:'100%'}} className={slideform6 ? "auth-form-container active" : "auth-form-container"}>
                                <div style={{width:'100%'}} className="form-settings-transition">
                                  <div id="transition-1" style={{width:'100%'}} className={!slideform7 ? "auth-form-container active" : "auth-form-container"}> 
                                    <Support slideform6={slideform6} setSlideForm6={setSlideForm6} slideform7={slideform7} setSlideForm7={setSlideForm7} email={email} phone={phone} onChange={onChange} setAlert={setAlert} />
                                  </div>
                                  <div id="transition-2" style={{width:'100%'}} className={slideform7 ? "auth-form-container active" : "auth-form-container"}>
                                    <div style={{width:'100%'}} className="form-settings-transition">
                                      <div id="transition-1" style={{width:'100%'}} className={!slideform8 ? "auth-form-container active" : "auth-form-container"}> 
                                        <Zipcode slideform7={slideform7} setSlideForm7={setSlideForm7} slideform8={slideform8} setSlideForm8={setSlideForm8} zipcode={zipcode} onChange={onChange} setAlert={setAlert} />
                                      </div>
                                      <div id="transition-2" style={{width:'100%'}} className={slideform8 ? "auth-form-container active" : "auth-form-container"}>
                                        <div style={{width:'100%'}} className="form-settings-transition">
                                          <div id="transition-1" style={{width:'100%'}} className={!slideform9 ? "auth-form-container active" : "auth-form-container"}> 
                                          <Return 
                                            slideform8={slideform8} 
                                            setSlideForm8={setSlideForm8} 
                                            slideform9={slideform9} 
                                            setSlideForm9={setSlideForm9} 
                                            onChange={onChange}
                                            address={address}
                                            setAddress={setAddress}
                                            handleLocationSelect={handleLocationSelect}
                                            setAlert={setAlert}
                                            formattedAddy={formatted_address}
                                          />
                                          </div>
                                          <div id="transition-2" style={{width:'100%'}} className={slideform9 ? "auth-form-container active" : "auth-form-container"}>
                                            <div style={{width:'100%'}} className="form-settings-transition">
                                              <div id="transition-1" style={{width:'100%'}} className={!slideform10 ? "auth-form-container active" : "auth-form-container"}> 
                                                <Website slideform9={slideform9} setSlideForm9={setSlideForm9} slideform10={slideform10} setSlideForm10={setSlideForm10} website={website} onChange={onChange}/>
                                              </div>
                                              <div id="transition-2" style={{width:'100%'}} className={slideform10 ? "auth-form-container active" : "auth-form-container"}> 
                                                <div style={{width:'100%'}} className="form-settings-transition">
                                                  <div id="transition-1" style={{width:'100%'}} className={!slideform11 ? "auth-form-container active" : "auth-form-container"}> 
                                                    <SocialMedia 
                                                      slideform10={slideform10} 
                                                      setSlideForm10={setSlideForm10} 
                                                      slideform11={slideform11} 
                                                      setSlideForm11={setSlideForm11} 
                                                      youtube={youtube}
                                                      instagram={instagram}
                                                      facebook={facebook}
                                                      twitter={twitter}
                                                      onChange={onChange}
                                                    />
                                                  </div>
                                                  <div id="transition-2" style={{width:'100%'}} className={slideform11 ? "auth-form-container active" : "auth-form-container"}> 
                                                    <PaymentTerms slideform1={slideform11} setSlideForm1={setSlideForm11} slideform2={slideform11} setSlideForm2={setSlideForm11} onChange={onChange} onSubmit={onSubmit}/>
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
  store: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  store: state.store
});

export default connect(mapStateToProps, { createStore, getCurrentStore, setAlert })(
  withRouter(StoreForm)
);