import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import AddressMain from './Main_Address';
import AddressHeader from './Header_Address';
import AuthModal from '../../modals/AuthModal';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';
import Modal from 'react-responsive-modal';

import AddName from '../../modals/collection-modal/createNew/new_components/Name_Add';
import AddFullName from '../common/AddFullName';
import AddressBlock from '../../page_components/forms_inventory/common/AddressBlock';
import PhoneBlock from '../common/PhoneBlock';
import InstructionsBlock from '../common/InstructionsBlock';
import ConfirmAddress from '../common/ConfirmAddress';
import AddressType from '../common/Type_Address';


import cardboardLogo from '../../common/logo.jpg';
import { Logo } from '../../Logo';

import { getStoreSubscriptions } from '../../../actions/storeActions';

import { addAddress } from '../../../actions/profileActions';
import { setMainNav, setPage } from '../../../actions/navActions';

const initialState = {
    name: '',
    first_name: '',
    last_name: '',
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
    delivery_instructions: '',
    latLng: '',
    phone: ''
};

const initialFirstName = {
    first: ''
};

const initialLastName = {
    last: ''
};

const Mobile_Address = ({ setMainNav, setPage, addAddress, product, auth: { user, isAuthenticated, loading }, history}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [displayAddressModal, toggleAddressModal] = useState(false);

    const [active, setActive] = useState(false);

    const [addressType, setAddressType] = useState('');

    const [addressEdit, setAddressEdit] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const [firstName, setFirstName] = useState(initialFirstName);

    const [lastName, setLastName] = useState(initialLastName);

    // Location Info  
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null, 
        lng: null
    });

    const [slideform1, setSlideForm1] = useState(false);
    const [slideform2, setSlideForm2] = useState(false);
    const [slideform3, setSlideForm3] = useState(false);
    const [slideform4, setSlideForm4] = useState(false);
    const [slideform5, setSlideForm5] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        setMainNav('store');
        setPage('profile');

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [])

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    // const handleMixpanel = () => {
    //     mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
    //     mixpanel.identify(user._id);
    //     mixpanel.track("View Profile Page", {
    //     // "Entry Point": "Home Landing",
    //     });
    // }

    const handleAddressModal = (bool) => {
        if(!addressEdit && bool) setAddressEdit(true);
        if(addressEdit && !bool) setAddressEdit(false);

        if(displayAddressModal) {
            setFormData(initialState);
            setFirstName(initialFirstName);
            setLastName(initialLastName);
            setActive(false);
            setAddressType('');

            setAddress("");
            setCoordinates({
                lat: null, 
                lng: null
            });

            setSlideForm1(false);
            setSlideForm2(false);
            setSlideForm3(false);
            setSlideForm4(false);
            setSlideForm5(false);
        }

        toggleAddressModal(!displayAddressModal);
    }

    const handleAddressDefault = () => {
        setActive(!active);
    }

    const { 
        name,
        first_name,
        last_name,
        street_name,
        street_number,
        city,
        state,
        postalCode,
        country,
        area,
        placeId,
        stateProvince,
        formatted_address,
        phone,
        delivery_instructions,
        latLng 
    } = formData;


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

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
        console.log("phone: " + phone);
        console.log("location tags: ")
        // console.log(tags);
  
        // let newTags;
        // if (Array.isArray(tags)) {
        //     newTags = tags.join(', ');
        // }
  
        setAddress(value);
        setFormData({
            name: (name) ? name : '',
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
            phone: (phone) ? phone : '',
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

    const onSubmit = async e => {
        e.preventDefault();
            
        const newLocation = {
            address_name: name,
            street_name: street_name,
            street_number: street_number,
            city: city,
            state: state,
            postalcode: postalCode,
            country: country,
            area: area,
            placeId: placeId,
            stateProvince: stateProvince,
            formatted_address: formatted_address,
            first_name: firstName.first,
            last_name: lastName.last,
            delivery_instructions: delivery_instructions,
            phone: phone,
            coordinates: latLng,
            active: active
        }

        console.log('SENDING ADDRESS')
        console.log(firstName.first)
        console.log(lastName.last)

        addAddress(newLocation);

        handleAddressModal();
    }

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    let bg;

    if (isMobile) {
        bg = {
            modal: {
                borderRadius:"5px",
                width: "100vw"
            },
            overlay: {
                background: "rgba(20,20,20, .5)"
            }
        };
    } else {
        bg = {
            modal: {
                borderRadius:"5px",
                width: "600px"
            },
            overlay: {
                background: "rgba(20,20,20, .5)"
            }
        };
    }

    let bg2;

    if(slideform5) {
        bg2 = {
            modal: {
                boxShadow: "none",
                borderRadius: "15px",
                border: "1px solid rgb(214, 214, 214)",
                padding: "0",
                width: "600px",
                transition: "all 1s"
            },
            overlay: {
              background: "rgba(20,20,20, .5)"
            }
        };
    } else {
        bg2 = {
            modal: {
                boxShadow: "none",
                borderRadius: "15px",
                border: "1px solid rgb(214, 214, 214)",
                padding: "0",
                transition: "all 1s"
            },
            overlay: {
              background: "rgba(20,20,20, .5)"
            }
        };
    }
    

    return (
        <Fragment>
            <div className="mobile-profile-table-container" style={{textAlign:'center'}}>
                {/* <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3> */}
                <div className="mobile-profile-table">
                    <div className="profile-table-main">
                        <div className="profile-table-header">
                            <AddressHeader />
                        </div>
                        <div className="profile-table-body">
                            <AddressMain handleAddressModal={handleAddressModal} />
                        </div>
                    </div>
                </div>
            </div>
            {!loading && !isAuthenticated ? <AuthModal /> : null }
            <Modal open={displayAddressModal} onClose={handleAddressModal} center styles={bg2}>
                <div className={slideform5 ? "collection-form active" : "collection-form"}>
                    <div style={{width:'100%', minHeight:'40px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-center', height:'40px'}}>
                    <p style={{margin:'0', fontSize:'12px', color:'#0098d3'}}><i style={{fontSize:'10px'}} class="fas fa-plus"></i> New</p>
                    </div>
                    <Logo>
                        <img src={cardboardLogo} style={{maxHeight: '40px'}} alt="cardboard express logo" />
                    </Logo>
                    <div style={{padding:'0 10px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div style={{width:'100%', fontFamily:'Arial, Helvetica, sans-serif', display:'flex', justifyContent:'center', alignItems:'center', color:'#0098d3', textAlign:'center'}}>
                            <i style={{margin:'10px', fontSize:'1.2rem'}} class="fas fa-plus"></i>
                            <h3> New Address</h3>
                        </div>  
                        <div style={{width:'100%'}} className="form-settings-transition">
                            <div id="transition-1" style={{width:'100%', padding:'0 10px'}} className={!slideform1 ? "auth-form-container active" : "auth-form-container"}>
                                <AddressType setAddressType={setAddressType} addressType={addressType} setSlideForm1={setSlideForm1} slideform1={slideform1} />
                            </div>
                            <div id="transition-2" style={{width:'100%'}} className={slideform1 ? "auth-form-container active" : "auth-form-container"}>
                                <div style={{width:'100%'}} className="form-settings-transition">
                                    <div id="transition-1" style={{width:'100%', padding:'0 10px'}} className={!slideform2 ? "auth-form-container active" : "auth-form-container"}>
                                        {addressType === 'residence' ? (
                                            <AddFullName 
                                                firstName={firstName}
                                                lastName={lastName}
                                                setFirstName={setFirstName}
                                                setLastName={setLastName}
                                                setSlideForm1={setSlideForm1} 
                                                slideform1={slideform1} 
                                                setSlideForm2={setSlideForm2} 
                                                slideform2={slideform2} 
                                            />
                                        ) : (
                                            <AddName 
                                                name={name}
                                                onChange={onChange} 
                                                setSlideForm1={setSlideForm1} 
                                                slideform1={slideform1} 
                                                setSlideForm2={setSlideForm2} 
                                                slideform2={slideform2} 
                                            />
                                        )}
                                    </div>
                                    <div id="transition-2" style={{width:'100%'}} className={slideform2 ? "auth-form-container active" : "auth-form-container"}>
                                        <div style={{width:'100%'}} className="form-settings-transition">
                                            <div id="transition-1" style={{width:'100%', padding:'0 10px'}} className={!slideform3 ? "auth-form-container active" : "auth-form-container"}>
                                                <AddressBlock
                                                    origin="store"
                                                    address={address}
                                                    setAddress={setAddress}
                                                    handleLocationSelect={handleLocationSelect}
                                                    setSlideForm1={setSlideForm2} 
                                                    slideform1={slideform2} 
                                                    setSlideForm2={setSlideForm3} 
                                                    slideform2={slideform3} 
                                                />
                                            </div>
                                            <div id="transition-2" style={{width:'100%'}} className={slideform3 ? "auth-form-container active" : "auth-form-container"}>
                                                <div style={{width:'100%'}} className="form-settings-transition">
                                                    <div id="transition-1" style={{width:'100%', padding:'0 10px'}} className={!slideform4 ? "auth-form-container active" : "auth-form-container"}>
                                                        <PhoneBlock 
                                                            phone={phone}
                                                            onChange={onChange} 
                                                            setSlideForm1={setSlideForm3} 
                                                            slideform1={slideform3} 
                                                            setSlideForm2={setSlideForm4} 
                                                            slideform2={slideform4} 
                                                        />
                                                    </div>
                                                    <div id="transition-2" style={{width:'100%'}} className={slideform4 ? "auth-form-container active" : "auth-form-container"}>
                                                        <div style={{width:'100%'}} className="form-settings-transition">
                                                            <div id="transition-1" style={{width:'100%', padding:'0 10px'}} className={!slideform5 ? "auth-form-container active" : "auth-form-container"}>
                                                                <InstructionsBlock
                                                                    instructions={delivery_instructions}
                                                                    onChange={onChange} 
                                                                    setSlideForm1={setSlideForm4} 
                                                                    slideform1={slideform4} 
                                                                    setSlideForm2={setSlideForm5} 
                                                                    slideform2={slideform5} 
                                                                />
                                                            </div>
                                                            <div id="transition-2" style={{width:'100%'}} className={slideform5 ? "auth-form-container active" : "auth-form-container"}>
                                                                <ConfirmAddress
                                                                    data={formData}
                                                                    firstName={firstName}
                                                                    lastName={lastName}
                                                                    setFirstName={setFirstName}
                                                                    setLastName={setLastName}
                                                                    addressType={addressType}
                                                                    setSlideForm1={setSlideForm5} 
                                                                    slideform1={slideform5} 
                                                                    handleAddressDefault={handleAddressDefault}
                                                                    active={active}
                                                                    onChange={onChange}
                                                                    submit={onSubmit}
                                                                />
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
            </Modal>
        </Fragment>
    )
}

Mobile_Address.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getStoreSubscriptions: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
    setMainNav: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    store: state.store
});

export default connect(mapStateToProps, { 
    setMainNav, 
    setPage, 
    addAddress, 
    getStoreSubscriptions
})(withRouter(Mobile_Address));
