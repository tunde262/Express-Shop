import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Spinner from '../common/Spinner';
import Orders from './Orders';
import Saved from './Saved';
import Settings from './Settings';
import AuthModal from '../modals/AuthModal';

const Profile = ({ product, auth: { user, isAuthenticated, loading }, history}) => {
    const [skip, setSkip] = useState(0);
    const [tableShow1, setTableShow1] = useState('saved');

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }

    let tableContent;

    if(tableShow1 === 'saved') {
        tableContent = <Saved />;
    } else if(tableShow1 === 'settings') {
        tableContent = <Settings /> 
    } else if(tableShow1 === 'orders') {
        tableContent = <Orders /> 
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
            <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll'}}>
                <div style={{textAlign:'center', marginTop:'1rem'}} class="container-fluid">
                    <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3>
                    <ul class="nav-underline">
                        <li onClick={e => setTableShow1('saved')} className={tableShow1 === "saved" ? "active" : "nav-underline-item"}><i className="fas fa-heart"></i><p>Saved</p></li>
                        <li onClick={e => setTableShow1('orders')} className={tableShow1 === "orders" ? "active" : "nav-underline-item"}><i class="fas fa-history"></i><p>My Orders</p></li>
                        <li onClick={e => setTableShow1('settings')} className={tableShow1 === "settings" ? "active" : "nav-underline-item"}><i class="fas fa-cog"></i><p>Settings</p></li>
                    </ul>
                    {tableContent}
                </div>
                {/* <div style={{marginTop:'100px'}}></div>
                <Link onClick={() => history.goBack()} to="/profile"><i class="fas fa-arrow-left"></i>Back</Link>
                <div className="store-settings-container">
                    {profileContent}
                </div> */}
            </div>
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </Fragment>
    )
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product
});

export default connect(mapStateToProps)(withRouter(Profile));
