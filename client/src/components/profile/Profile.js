import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

import Spinner from '../common/Spinner';
import Orders from './Orders';
import Saved from './Saved';
import Settings from './Settings';
import AuthModal from '../modals/AuthModal';
import BrandOverview from '../Overview/brandOverview/BrandOverview';

import { getStoreSubscriptions } from '../../actions/storeActions';

import sampleImg from '../../utils/imgs/20484728.jpeg';

const Profile = ({ product, store, getStoreSubscriptions, auth: { user, isAuthenticated, loading }, history}) => {
    const [skip, setSkip] = useState(0);
    const [tableShow1, setTableShow1] = useState('completed');
    const [tableShow2, setTableShow2] = useState('orders');

    const [sentMixpanel, setSentMixpanel] = useState(false);

    useEffect(() => {
        if(user) {
            getStoreSubscriptions(user._id);
        }
    }, [user]);


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

    let tableContent;

    if(tableShow2 === 'saved') {
        tableContent = <Saved />;
    } else if(tableShow2 === 'settings') {
        tableContent = <Settings /> 
    } else if(tableShow2 === 'orders') {
        tableContent = <Orders /> 
    }

    if(!sentMixpanel && user !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    let profileContent;

    if(user === null) {
        profileContent = <Spinner />;
    }
    else {
        profileContent = (
            <Fragment>
                <div className="store-settings-box" style={{border:'2px solid #cecece', borderRadius:'10px'}}>
                    <h2>Profile Settings</h2>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label>First Name</label>
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Enter your email"
                        />
                        <label>Last Name</label>
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Enter your email"
                        />
                        <div style={{display:'flex'}}>
                            <label>Birthday</label>
                            <input  
                                style={{margin:'0.5rem'}}
                                type="text"
                                name="email"
                                className="input_line"
                                placeholder="Month"
                            />
                            <input  
                                style={{margin:'0.5rem'}}
                                type="text"
                                name="email"
                                className="input_line"
                                placeholder="Day"
                            />
                        </div>

                        <div style={{display:'flex'}}>
                            <label>Gender</label>
                            <input  
                                style={{margin:'0.5rem'}}
                                type="text"
                                name="email"
                                className="input_line"
                                placeholder="Male"
                            />
                            <input  
                                style={{margin:'0.5rem'}}
                                type="text"
                                name="email"
                                className="input_line"
                                placeholder="Female"
                            />
                        </div>
                        <label>Email</label>
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Enter your email"
                        />
                        <label>Phone</label>
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="store-settings-box-element">
                        <button>Save</button>
                    </div>
                </div>
                <div className="store-settings-box" style={{ marginTop:'2rem', border:'2px solid #cecece', borderRadius:'10px'}}>
                    <h2>My Addresses</h2>
                    <div style={{display:'flex', flexDirection:'column', padding:'1rem', border:'2px solid #f4f4f4'}}>
                        <h5>6100 Glenhollow dr.</h5>
                        <p style={{color:'#808080'}}><i class="fas fa-map-marker-alt"></i>Plano, Tx</p>
                        <p>On the corner of communications in pkwy and main next to the kroger store but on the back of the corner of the back fencing.</p>
                        <p style={{margin:'1rem'}}>
                            <input 
                                type="checkbox" 
                                name="visible"
                                style={{margin:0}}
                            />
                            <label style={{margin:0}} className="form-group">Default location</label>
                        </p>
                    </div>
                    <div className="store-settings-box-element">
                        <button>Add Address</button>
                    </div>
                </div>
                <div className="store-settings-box" style={{ marginTop:'2rem', border:'2px solid #cecece', borderRadius:'10px'}}>
                    <h2>Payment Methods</h2>
                    <div style={{display:'flex', flexDirection:'column', padding:'1rem', border:'2px solid #f4f4f4'}}>
                        <h5>6100 Glenhollow dr.</h5>
                        <p style={{color:'#808080'}}><i class="fas fa-map-marker-alt"></i>Plano, Tx</p>
                        <p>On the corner of communications in pkwy and main next to the kroger store but on the back of the corner of the back fencing.</p>
                        <p style={{margin:'1rem'}}>
                            <input 
                                type="checkbox" 
                                name="visible"
                                style={{margin:0}}
                            />
                            <label style={{margin:0}} className="form-group">Default location</label>
                        </p>
                    </div>
                    <div className="store-settings-box-element">
                        <button>Add</button>
                    </div>
                </div>
            </Fragment>
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
                        <div>
                            <h3 style={{fontWeight:'600'}}>Hey, {user && user.name}</h3>
                        </div>
                        <div>
                            <h3 style={{fontWeight:'600'}}>Orders</h3>
                            <p>Track, manage, & return</p>
                        </div>
                        <div>
                            <h3>Payments</h3>
                            <p>Add payment methods</p>
                        </div>
                        <div>
                            <h3>Addresses</h3>
                            <p>Add new address</p>
                        </div>
                        <div>
                            <h3>Subscriptions</h3>
                            <p>Manage repeat deliveries</p>
                        </div>
                        <div>
                            <h3>Settings</h3>
                            <p>Password, name, etc.</p>
                        </div>
                    </div>
                    <div className="profile-table-main desktop-column">
                        <div className="profile-table-header">
                            <div>
                                <p>Account / Orders</p>
                            </div>
                            <div>
                                <h3>Orders</h3>
                            </div>
                            <div>
                                <ul class="profile-underline">
                                    <div 
                                        onClick={e => setTableShow1('completed')} className={tableShow1 === "completed" && "active"}
                                    >
                                        <li><p>Completed</p></li>
                                    </div>
                                    <div 
                                        onClick={e => setTableShow1('in progress')} className={tableShow1 === "in progress" && "active"}
                                    >
                                        <li><p>In Progress</p></li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="profile-table-body">
                            <div className="filter-container profile">
                                <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                                <i class="fas fa-sliders-h"></i>
                            </div>
                            <div style={{background:'#fff', border:'1px solid #e8e8e8'}}>
                                <BrandOverview title={`Recently purchased from`} stores={store.stores} />
                            </div>

                            <div style={{marginTop:'1rem', width:'100%', padding:'10px', display:'flex', justifyContent:'space-around'}}>
                                <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}> 
                                    <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>Date</h3>
                                </div>
                                <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}> 
                                    <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>Products</h3>
                                </div>
                                <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}> 
                                    <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>Order Total</h3>
                                </div>
                                <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}> 
                                </div>
                            </div>
                            {tableContent}
                        </div>
                    </div>
                </div>
            </div>
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </Fragment>
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getStoreSubscriptions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    store: state.store
});

export default connect(mapStateToProps, {getStoreSubscriptions})(withRouter(Profile));
