import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { addAddress } from '../../../actions/profileActions';

const initialState = {
    address_name: '',
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

const FormAddress = ({ 
    profile,
    setAddressState, 
    addAddress,
}) => {

    const [active, setActive] = useState(false);

    const [addressType, setAddressType] = useState('');

    const [addressEdit, setAddressEdit] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const [firstName, setFirstName] = useState(initialFirstName);

    const [lastName, setLastName] = useState(initialLastName);

    // Location Info  
    const [address1, setAddress1] = useState({
        address_1: ""
    });

    const [gotLocData, setGotLocData] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [coordinates, setCoordinates] = useState({
        lat: null, 
        lng: null
    });

    // const handleAddressModal = (bool) => {
    //     if(!addressEdit && bool) setAddressEdit(true);
    //     if(addressEdit && !bool) setAddressEdit(false);

    //     if(displayAddressModal) {
    //         setFormData(initialState);
    //         setFirstName(initialFirstName);
    //         setLastName(initialLastName);
    //         setActive(false);
    //         setAddressType('');

    //         setAddress("");
    //         setCoordinates({
    //             lat: null, 
    //             lng: null
    //         });
    //     }
    // }

    const handleAddressDefault = () => {
        setActive(!active);
    }

    const { 
        address_name,
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

    const onChangeAddy1 = e => setAddress1({ ...address1, [e.target.name]: e.target.value});

    const onChangeFirst = e => setFirstName({ ...firstName, [e.target.name]: e.target.value});

    const onChangeLast = e => setLastName({ ...lastName, [e.target.name]: e.target.value});

    const getLocationData = async (value) => {
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
  
        setAddress1({
            address_1: value
        });

        setFormData({
            address_name: (address_name) ? address_name : '',
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

    const handleNewAddress = (e) => {
        e.preventDefault();

        getLocationData(address1.address_1);
        if(profile.profile) {
            if(!profile.profile.address_book.length > 0) {
                setActive(true);
            }
        }
        setGotLocData(true);
    }

    const onSubmit = async () => {
        console.log('SUBMISSION HERE')
        console.log(formData);

        const newLocation = {
            address_name: address_name,
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
        console.log(lastName.last);
        console.log('ACTIVE');
        console.log(active);

        addAddress(newLocation);

        setAddressState('list');
    }

    if(gotLocData && !submitted && formatted_address !== '') {
        onSubmit();

        setSubmitted(true);
    }

    return (
        <div className="checkout-address-form"> 
            <div className="checkout-address-form-main">
            <div className="checkout-addy">
                    <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                        <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <p style={{margin:'0'}}>Confirm Details</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <div style={{display:'flex'}}>
                                <input
                                    type="text"
                                    name="first"
                                    className="input_line"
                                    value={firstName.first}
                                    onChange={e => onChangeFirst(e)}
                                    placeholder="First Name"
                                    style={{margin:'10px 10px 10px 0', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                />
                                <input
                                    type="text"
                                    name="last"
                                    className="input_line"
                                    value={lastName.last}
                                    onChange={e => onChangeLast(e)}
                                    placeholder="Last Name"
                                    style={{margin:'10px 0 10px 10px', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                />
                            </div>
                            <div style={{width:'100%'}}>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="address_1"
                                        className="input_line"
                                        value={address1.address_1}
                                        onChange={e => onChangeAddy1(e)}
                                        placeholder="Address 1"
                                        style={{margin:'10px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="city"
                                        className="input_line"
                                        value={city}
                                        onChange={e => onChange(e)}
                                        placeholder="City"
                                        style={{margin:'10px 10px 10px 0', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        className="input_line"
                                        value={postalCode}
                                        onChange={e => onChange(e)}
                                        placeholder="Zipcode"
                                        style={{margin:'10px 0 10px 10px', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="state"
                                        className="input_line"
                                        value={state}
                                        onChange={e => onChange(e)}
                                        placeholder="State/Province"
                                        style={{margin:'10px 10px 10px 0', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        className="input_line"
                                        value={country}
                                        onChange={e => onChange(e)}
                                        placeholder="U.S."
                                        style={{margin:'10px 0 10px 10px', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input_line"
                                        value={phone}
                                        onChange={e => onChange(e)}
                                        placeholder="Phone number (for delivery use only)"
                                        style={{margin:'10px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>

                                <div style={{display:'flex'}}>
                                    <p style={{color:'#0098d3'}}>Add Address 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-pay">
                    <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                        <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <p style={{margin:'0'}}>Delivery Instructions</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <div style={{display:'flex'}}>
                                <textarea
                                    type="text"
                                    name="delivery_instructions"
                                    className="input_line"
                                    value={delivery_instructions}
                                    onChange={e => onChange(e)}
                                    placeholder="Delivery instructions..."
                                    style={{margin:'10px 0', width:'100%', width:'100%', height:'100px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="checkout-deliv">
                    <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                        <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                            <div style={{display: 'flex', flexDirection:'column'}}>
                                <p style={{margin:'0'}}>Default Shipping</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <div>
                                <p style={{color:'#808080'}}>Set as my preferred shipping address</p>
                                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'50px'}}>
                                    <div onClick={handleAddressDefault} style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        {active ? (
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'20px', width:'20px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                            </div>
                                        ) : ( 
                                            <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                        )}
                                        <p style={{margin:'0'}}>Yes</p>
                                    </div>
                                    <div onClick={handleAddressDefault} style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        {active ? (
                                            <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                        ) : ( 
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'20px', width:'20px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                            </div>
                                        )}
                                        <p style={{margin:'0'}}>No</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            
            <div className="address-form-actions" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                <button onClick={() => setAddressState('main')} style={{background:'#ededed', border:'1px solid #ededed', color:'#808080'}}>Cancel</button>
                <button onClick={(e) => handleNewAddress(e)}>Add New</button>
            </div> 
        </div>
    )
}

FormAddress.propTypes = {
    profile: PropTypes.object.isRequired,
    addAddress: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { addAddress })(FormAddress);
