import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { getCurrentProfile, deleteAccount } from '../../../actions/profileActions';


import './GuestDrawer.css';

const GuestDrawer = ({ drawerClickHandler, toggleGuestDrawer, getCurrentProfile, deleteAccount, nav, store, profile: { profile }, auth: { isAuthenticated, user, loading }, logout, show, match}) => {

    const [slideForm1, setSlideForm1] = useState(false);

    const toggleGuest = () => {
        toggleGuestDrawer();
    }

    const handleSlideAuth = () => {
        handleSlide();
    }

    const handleSlide = () => {
        setSlideForm1(!slideForm1);
    }

    let drawerClasses = 'guest-drawer';
    if (show) {
        drawerClasses = 'guest-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/business">
                        Solution
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/pricing">
                        Pricing
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/cost-calculator">
                        Cost Calculator
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/about">
                        About Us
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/open-a-store">
                        Start Selling
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/become-a-fulfiller">
                        Become a Fulfiller
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/warehousing">
                        Become a warehouse
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/login">
                        Log In
                    </Link>
                </li>
                <li style={{minHeight:'35px', position:'relative', verticalAlign:'middle', padding:'0', display:'block', width:'100%'}}>
                    <Link onClick={toggleGuest} to="/register">
                        Sign Up
                    </Link>
                </li>
            </ul>
    
            {/* {user && (
                <a onClick={handleSlideAuth} href="#"style={{paddingLeft:'1rem', display:'grid', gridTemplateColumns:'1fr 3fr 1fr'}}>
                    <div style={{display:'flex', padding:'0', justifyContent:'center', alignItems:'center'}}>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'40px', height:'40px', borderRadius:'50%', background:'#ececec', border:'2px solid #ff4b2b'}}>
                            <p style={{fontWeight:'bold', color:'#333'}}>{user && user.first_name.charAt(0)}</p>
                        </div>
                    </div>
                    <div style={{padding:'5px 10px 0 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'left'}}>
                        <h3 style={{margin:0}}>{user && user.first_name} {user && user.last_name.charAt(0)}.</h3>
                        <p style={{margin:0}}>4.5 / 5 stars</p>
                    </div>
                    <div style={{display:'flex', padding:'0', color:'#808080', justifyContent:'center', alignItems:'center'}}>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </a>
            )} */}
        </nav>
    )
}

GuestDrawer.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store,
    nav: state.nav
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, logout })(GuestDrawer);
