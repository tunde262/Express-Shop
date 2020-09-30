import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { getCurrentProfile, deleteAccount } from '../../../actions/profileActions';

import './CartDrawer.css';
import paper_towels from '../../../utils/imgs/paper_towels.jpeg';

const AuthDrawer = ({ drawerClickHandler, toggleAuthDrawer, getCurrentProfile, deleteAccount, profile: { profile }, auth: { isAuthenticated, loading }, logout, show}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);


    const toggleSideDrawer = () => {
        toggleAuthDrawer();
        drawerClickHandler();
    }

    let drawerClasses = 'cart-drawer';
    if (show) {
        drawerClasses = 'cart-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <div style={{padding:'0 0 0 1rem', width:'100%',}}>
                <i onClick={toggleSideDrawer} style={{color:'#cecece', margin:'1rem', fontSize:'1rem'}} className="fas fa-arrow-left"></i>
                <div className="menu">
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                        <Link to="/profile" className="menu-item">My Profile</Link>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    <hr style={{margin:'10px 0'}} />
                    <a href="#" className="menu-item">
                        <i className="fas fa-heart"></i>{' '}
                        Saved
                    </a>
                    <hr style={{margin:'10px 0'}} />
                    <a href="#" className="menu-item">
                        My Orders
                    </a>
                    {/* <hr style={{margin:'10px 0'}} />
                    <Link to="/admin" className="menu-item">
                        My Stores
                    </Link> */}
                    <hr style={{margin:'10px 0'}} />
                    <a href="#" className="menu-item">
                        <i className="fas fa-cog"></i>{' '}
                        Settings
                        <i className="fas fa-chevron-right"></i>
                    </a>
                    <hr style={{margin:'10px 0'}} />
                    <a href="#" className="menu-item" onClick={logout}>
                        <i className="fas fa-sign-out-alt" />{' '}
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    )
}

AuthDrawer.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, logout })(AuthDrawer);
