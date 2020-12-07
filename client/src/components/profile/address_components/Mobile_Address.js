import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import AddressMain from './Main_Address';
import AddressHeader from './Header_Address';
import AuthModal from '../../modals/AuthModal';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';
import Modal from 'react-responsive-modal';

import { getStoreSubscriptions } from '../../../actions/storeActions';

import { addAddress } from '../../../actions/profileActions';
import { setMainNav, setPage } from '../../../actions/navActions';

const Mobile_Address = ({ setMainNav, setPage, addAddress, product, auth: { user, isAuthenticated, loading }, history}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [displayAddressModal, toggleAddressModal] = useState(false);

    const [active, setActive] = useState(false);

    const [addressEdit, setAddressEdit] = useState(false);

    const [formData, setFormData] = useState({
        address_name:'',
        first_name:'',
        last_name:'',
        address_1:'',
        address_2:'',
        city:'',
        state:'',
        country:'',
        zipcode:'',
        phone:'',
        delivery_instructions:''
    });

    useEffect(() => {
        setMainNav('store');
        setPage('profile');
    }, [])

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
        toggleAddressModal(!displayAddressModal);
    }

    const handleAddressDefault = () => {
        setActive(!active);
    }

    const { 
        address_name,
        first_name,
        last_name,
        address_1,
        address_2,
        city,
        state,
        country,
        zipcode,
        phone,
        delivery_instructions
     } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
            
        if(address_name !== '' && first_name !== '' && last_name !== '' && address_1 !== '' && city !== '' && state !== '' && country !== '' && zipcode !== '') {
            let data = new FormData();

            if(address_name !== '')data.append('address_name', address_name);
            if(first_name !== '')data.append('first_name', first_name);
            if(last_name !== '')data.append('last_name', last_name);
            if(address_1 !== '')data.append('address_1', address_1);
            if(address_2 !== '')data.append('address_2', address_2);
            if(city !== '')data.append('city', city);
            if(state !== '')data.append('state', state);
            if(country !== '')data.append('country', country);
            if(zipcode !== '')data.append('zipcode', zipcode);
            if(phone !== '')data.append('phone', phone);
            if(delivery_instructions !== '')data.append('delivery_instructions', delivery_instructions);
            data.append('active', active);

            addAddress(data);

            toggleAddressModal(false)
        }
    }


    const bg = {
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

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
            <Modal open={displayAddressModal} onClose={handleAddressModal} center styles={bg}>
                <div className="checkout-modal">
                    <div className="checkout-modal-main">
                        <div style={{display:'flex'}}>
                            <div style={{margin:'0 10px', color:'#ff4b2b'}}>
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="checkout-confirmed"><p>Add New Location</p></div>
                        </div>
                        <div className="checkout-cart">
                            <div style={{margin: '0', borderRadius:'0'}} class="card card-default">
                                <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p style={{margin:'0'}}>Location Name</p>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div style={{width:'100%'}}>
                                        <div>
                                            <input
                                                type="text"
                                                name="address_name"
                                                className="input_line"
                                                value={address_name}
                                                onChange={e => onChange(e)}
                                                placeholder="Name this locaction..."
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-addy">
                            <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                                <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p style={{margin:'0'}}>Address</p>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div style={{display:'flex'}}>
                                        <input
                                            type="text"
                                            name="first_name"
                                            className="input_line"
                                            value={first_name}
                                            onChange={e => onChange(e)}
                                            className="input_line"
                                            placeholder="First Name"
                                            style={{margin:'10px 10px 10px 0', width:'50%', height:'50px'}}
                                        />
                                        <input
                                            type="text"
                                            name="last_name"
                                            className="input_line"
                                            value={last_name}
                                            onChange={e => onChange(e)}
                                            className="input_line"
                                            placeholder="Last Name"
                                            style={{margin:'10px 0 10px 10px', width:'50%', height:'50px'}}
                                        />
                                    </div>
                                    <div style={{width:'100%'}}>
                                        <div style={{display:'flex'}}>
                                            <input
                                                type="text"
                                                name="address_1"
                                                className="input_line"
                                                value={address_1}
                                                onChange={e => onChange(e)}
                                                className="input_line"
                                                placeholder="Address 1"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <p style={{color:'#0098d3'}}>Add Address 2</p>
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <input
                                                type="text"
                                                name="zipcode"
                                                className="input_line"
                                                value={zipcode}
                                                onChange={e => onChange(e)}
                                                className="input_line"
                                                placeholder="Zipcode"
                                                style={{margin:'10px 0', width:'48%', height:'50px'}}
                                            />
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <input
                                                type="text"
                                                name="city"
                                                className="input_line"
                                                value={city}
                                                onChange={e => onChange(e)}
                                                className="input_line"
                                                placeholder="City"
                                                style={{margin:'10px 10px 10px 0', width:'50%', height:'50px'}}
                                            />
                                            <input
                                                type="text"
                                                name="state"
                                                className="input_line"
                                                value={state}
                                                onChange={e => onChange(e)}
                                                className="input_line"
                                                placeholder="State/Province"
                                                style={{margin:'10px 0 10px 10px', width:'50%', height:'50px'}}
                                            />
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <input
                                                type="text"
                                                name="country"
                                                className="input_line"
                                                value={country}
                                                onChange={e => onChange(e)}
                                                className="input_line"
                                                placeholder="United States"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                value={phone}
                                                onChange={e => onChange(e)}
                                                className="input_line"
                                                placeholder="Phone number (for delivery issues only)"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
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
                                            style={{margin:'10px 0', width:'100%', background:'#ededed', border:'0', color:'#808080', height:'100px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-deliv">
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
                        </div>
                    </div>
                    
                    <div className="checkout-actions" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                        <button style={{background:'#ededed', border:'1px solid #ededed', color:'#808080'}}>Cancel</button>
                        {!addressEdit ? <button onClick={onSubmit}>Add New</button> : <button onClick={onSubmit}>Update</button>}
                    </div>
                    {/* <p>address_name: {address_name}</p>
                    <p>address_1: {address_1}</p>
                    <p>address_2: {address_2}</p>
                    <p>first_name: {first_name}</p>
                    <p>last_name: {last_name}</p>
                    <p>city: {city}</p>
                    <p>state: {state}</p>
                    <p>zipcode: {zipcode}</p>
                    <p>phone: {phone}</p>
                    <p>country: {country}</p> */}
                    {/* <h5>item added to the cart</h5>
                    <img src={`/api/products/image/${img_gallery[0].img_name}`} className="img-fluid" alt="product" />
                    <h5>{title}</h5>
                    <h5 className="text-muted">price : $ {price}</h5>
                    <button
                        onClick={handleModalClose}
                    >
                        Continue Shopping
                    </button>
                    <Link to='/cart'>
                        <button
                            cart
                            onClick={handleModalClose}
                        >
                            go to cart
                        </button>
                    </Link> */}
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
