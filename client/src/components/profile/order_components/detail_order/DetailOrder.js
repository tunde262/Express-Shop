import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

import { getOrderById } from '../../../../actions/orderActions';

import Spinner from '../../../common/Spinner';
import Modal from 'react-responsive-modal';
import DetailOrderHeader from './Header_Detail_Order';
import DetailOrderMain from './Main_Detail_Order';

const DetailOrder = ({ getOrderById, product, store, auth: { user, isAuthenticated, loading }, history, match}) => {
    const [skip, setSkip] = useState(0);
    const [tableShow1, setTableShow1] = useState('completed');
    const [tableShow2, setTableShow2] = useState('orders');

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [displayAddressModal, toggleAddressModal] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        getOrderById(match.params.orderId)
        window.addEventListener('resize', () => handleWindowSizeChange());

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

    let navContent;

    if(isTablet) {
        navContent = (
            <div className="mobile-profile-table-nav">
                <Link to="/profile">
                    <div>
                        <h3 style={{fontWeight:'600'}}>Hey, {user && user.name}</h3>
                    </div>
                </Link>

                <Link to="/profile?show=orders">
                    <div onClick={e => setTableShow2('orders')} className={tableShow2 === "orders" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3 style={{fontWeight:'600'}}>Orders</h3>
                            <p>Track, manage, & return</p>
                        </div>
                    </div>
                </Link>
                {/* <div onClick={e => setTableShow2('payments')} className={tableShow2 === "payments" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                    <h3>Payments</h3>
                    <p>Add payment methods</p>
                </div> */}
                <Link to="/profile?show=addresses">
                    <div onClick={e => setTableShow2('addresses')} className={tableShow2 === "addresses" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3>Addresses</h3>
                            <p>Add new address</p>
                        </div>
                    </div>
                </Link>
                
                <Link to="/profile?show=subscriptions">
                    <div onClick={e => setTableShow2('subscriptions')} className={tableShow2 === "subscriptions" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3>Subscriptions</h3>
                            <p>Store subcriptions & repeat purchases</p>
                        </div>
                    </div>
                </Link>
                
                <Link to="/profile?show=settings">
                    <div onClick={e => setTableShow2('settings')} className={tableShow2 === "settings" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3>Settings</h3>
                            <p>Password, name, etc.</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <Fragment>
            {/* <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll'}}>
                <div style={{textAlign:'center', marginTop:'1rem'}} class="container-fluid">
                    <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3>
                    <ul class="profile-underline">
                        <div onClick={e => setTableShow1('orders')} className={tableShow1 === "orders" && "active"}><li><i class="fas fa-history"></i></li></div>
                        <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" && "active"}><li><p>Payment</p></li></div>
                        <div onClick={e => setTableShow1('addresses')} className={tableShow1 === "addresses" && "active"}><li><p>Address</p></li></div>
                        <div onClick={e => setTableShow1('subcriptions')} className={tableShow1 === "subcriptions" && "active"}><li><p>Subcriptions</p></li></div>
                        <div onClick={e => setTableShow1('settings')} className={tableShow1 === "settings" && "active"}><li><i class="fas fa-cog"></i></li></div>
                    </ul>
                    {tableContent}
                </div>
            </div> */}
            <div style={{textAlign:'center', marginTop:'1rem'}} class="container-fluid">
                {/* <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3> */}
                <div className="profile-table">
                    <div className="profile-table-nav">
                        <Link to="/profile">
                            <div>
                                <h3 style={{fontWeight:'600'}}>Hey, {user && user.name}</h3>
                            </div>
                        </Link>
                        <Link to={{pathname:"/profile",search: "?show=orders"}}>
                            <div onClick={e => setTableShow2('orders')} className={tableShow2 === "orders" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <h3 style={{fontWeight:'600'}}>Orders</h3>
                                <p>Track, manage, & return</p>
                            </div>
                        </Link>
                        {/* <div onClick={e => setTableShow2('payments')} className={tableShow2 === "payments" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                            <h3>Payments</h3>
                            <p>Add payment methods</p>
                        </div> */}
                        <Link to={{pathname:"/profile",search: "?show=addresses"}}>
                            <div onClick={e => setTableShow2('addresses')} className={tableShow2 === "addresses" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <h3>Addresses</h3>
                                <p>Add new address</p>
                            </div>
                        </Link>
                        <Link to={{pathname:"/profile",search: "?show=subscriptions"}}>
                            <div onClick={e => setTableShow2('subscriptions')} className={tableShow2 === "subscriptions" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <h3>Subscriptions</h3>
                                <p>Store subcriptions & repeat purchases</p>
                            </div>
                        </Link>
                        <Link to={{pathname:"/profile",search: "?show=settings"}}>
                            <div onClick={e => setTableShow2('settings')} className={tableShow2 === "settings" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <h3>Settings</h3>
                                <p>Password, name, etc.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="profile-table-main desktop-column">
                        <div className="profile-table-header">
                            <DetailOrderHeader />
                        </div>
                        <div className="profile-table-body">
                            <DetailOrderMain />
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={displayAddressModal} onClose={() => toggleAddressModal(!displayAddressModal)} center styles={bg}>
                <h1>Hello</h1>
            </Modal>
        </Fragment>
    )
}

DetailOrder.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getOrderById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    store: state.store
});

export default connect(mapStateToProps, { getOrderById })(withRouter(DetailOrder));
