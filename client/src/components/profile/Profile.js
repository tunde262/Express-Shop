import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

import Spinner from '../common/Spinner';
import OrdersMain from './order_components/Main_Orders';
import OrdersHeader from './order_components/Header_Orders';
import PaymentsMain from './pay_components/Main_Pay';
import PaymentsHeader from './pay_components/Header_Pay';
import AddressMain from './address_components/Main_Address';
import AddressHeader from './address_components/Header_Address';
import SubscriptionsMain from './sub_components/Main_Sub';
import SubscriptionsHeader from './sub_components/Header_Sub';
import SettingsMain from './settings_components/Main_Settings';
import SettingsHeader from './settings_components/Header_Settings';
import MyStoresMain from './my_stores_components/Main_Stores';
import MyStoresHeader from './my_stores_components/Header_Stores';
import Saved from './Saved';
import Settings from './Settings';
import AuthModal from '../modals/AuthModal';
import BrandOverview from '../Overview/brandOverview/BrandOverview';
import Modal from 'react-responsive-modal';
import DetailOrderHeader from './order_components/detail_order/Header_Detail_Order';
import DetailOrderMain from './order_components/detail_order/Main_Detail_Order';

import { getStoreSubscriptions } from '../../actions/storeActions';

import sampleImg from '../../utils/imgs/20484728.jpeg';
import { addAddress } from '../../actions/profileActions';
import { setPage } from '../../actions/navActions';

const Profile = ({ addAddress, product, store, getStoreSubscriptions, auth: { user, isAuthenticated, loading }, location, nav: { page }, setPage}) => {
    const [skip, setSkip] = useState(0);
    const [tableShow1, setTableShow1] = useState('completed');
    const [tableShow2, setTableShow2] = useState('orders');

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [displayAddressModal, toggleAddressModal] = useState(false);

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

    const [active, setActive] = useState(false);

    const [addressEdit, setAddressEdit] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        setPage('profile');
        if(user) {
            getStoreSubscriptions(user._id);
        }

        console.log(location);
        console.log(new URLSearchParams(location.search).get('show'));
        

        if (location.search) {
            let query = new URLSearchParams(location.search).get('show')
            if(query === 'settings') {
                setTableShow2('settings');
            } else if (query === 'orders') {
                setTableShow2('orders');
            }
            else if (query === 'addresses') {
                setTableShow2('addresses');
            }
            else if (query === 'subscriptions') {
                setTableShow2('subscriptions');
            }
            else if (query === 'stores') {
                setTableShow2('my stores');
            }
        }

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [user]);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };


    const handleMixpanel = () => {
        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.identify(user._id);
        mixpanel.track("View Profile Page", {
        // "Entry Point": "Home Landing",
        });
    }

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }

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

            addAddress(formData);

            toggleAddressModal(false)
        }
    }

    let tableHeader;

    if(tableShow2 === 'addresses') {
        tableHeader = <AddressHeader />;
    } else if(tableShow2 === 'payments') {
        tableHeader = <PaymentsHeader />;
    } else if(tableShow2 === 'orders') {
        tableHeader = <OrdersHeader /> 
    } else if(tableShow2 === 'order detail') {
        tableHeader = <DetailOrderHeader /> 
    } else if(tableShow2 === 'subscriptions') {
        tableHeader = <SubscriptionsHeader /> 
    } else if(tableShow2 === 'settings') {
        tableHeader = <SettingsHeader /> 
    } else if(tableShow2 === 'my stores') {
        tableHeader = <MyStoresHeader /> 
    }

    let tableContent;

    if(tableShow2 === 'addresses') {
        tableContent = <AddressMain handleAddressModal={handleAddressModal} />;
    } else if(tableShow2 === 'payments') {
        tableContent = <PaymentsMain />; 
    } else if(tableShow2 === 'orders') {
        tableContent = <OrdersMain setTableShow2={setTableShow2} />; 
    } else if(tableShow2 === 'order detail') {
        tableContent = <DetailOrderMain />; 
    } else if(tableShow2 === 'subscriptions') {
        tableContent = <SubscriptionsMain />; 
    } else if(tableShow2 === 'settings') {
        tableContent = <SettingsMain />; 
    } else if(tableShow2 === 'my stores') {
        tableContent = <MyStoresMain />; 
    }

    if(!sentMixpanel && user !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    const bg = {
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    return (
        <Fragment>
            <div className="store-table-header" style={{padding:'20px 20px 0 20px'}}>
                {tableHeader}
            </div>
            <div className="store-table-body" style={{padding:'0 10px'}}>
                {tableContent}
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
        // <Link to="/profile">
        // <Link to={isTablet ? "/profile/orders" : {pathname:"/profile",search: "?show=orders"}}>
        //     <div onClick={e => setTableShow2('orders')} className={tableShow2 === "orders" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
        // <Link to={isTablet ? "/profile/addresses" : {pathname:"/profile",search: "?show=addresses"}}>
        //     <div onClick={e => setTableShow2('addresses')} className={tableShow2 === "addresses" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
        // <Link to={isTablet ? "/profile/subscriptions" : {pathname:"/profile",search: "?show=subscriptions"}}>
        //     <div onClick={e => setTableShow2('subscriptions')} className={tableShow2 === "subscriptions" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
        // <Link to={isTablet ? "/profile/settings" : {pathname:"/profile",search: "?show=settings"}}>
        //     <div onClick={e => setTableShow2('settings')} className={tableShow2 === "settings" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getStoreSubscriptions: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    store: state.store,
    nav: state.nav
});

export default connect(mapStateToProps, { addAddress, getStoreSubscriptions, setPage })(withRouter(Profile));
