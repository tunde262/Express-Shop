import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { getCurrentProfile, deleteAccount } from '../../../actions/profileActions';

import './SideDrawer.css';

const SideDrawer = ({ drawerClickHandler, getCurrentProfile, deleteAccount, profile: { profile }, auth: { isAuthenticated, loading }, logout, show}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    let drawerClasses = 'side-drawer';
    if (show) {
        drawerClasses = 'side-drawer open';
    }

    let authClasses = 'sidedrawer-items guest';
    if (isAuthenticated) {
        authClasses = 'sidedrawer-items auth';
    }

    const authLinks = (
        <ul className={authClasses}>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
            <li onClick={drawerClickHandler}><Link to="/">Explore</Link></li>
            <li onClick={drawerClickHandler}><Link to="/categories">Categories</Link></li>
            <li onClick={drawerClickHandler}><Link to="/stores">Stores</Link></li>
            <li onClick={drawerClickHandler}>Same Day Delivery</li>
            <li onClick={drawerClickHandler}>Reorder</li>
            <li onClick={drawerClickHandler}>Track Order</li>
            <li onClick={drawerClickHandler}>Contact Us</li>
            <li onClick={drawerClickHandler}>    
                <Link to='/admin' className="btn btn-primary my-1">
                    Open A Store
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className={authClasses}>
            <li onClick={drawerClickHandler}><Link to="/login">Login</Link></li>
            <li onClick={drawerClickHandler}><Link to="/register">Create An Account</Link></li>
            <hr />
            <li onClick={drawerClickHandler}>Who Are We?</li>
            <li onClick={drawerClickHandler}>FAQ</li>
            <li onClick={drawerClickHandler}>Contact Us</li>
            
        </ul>
    );


    return (
        <nav className={drawerClasses}>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
        </nav>
    )
}

SideDrawer.propTypes = {
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, logout })(SideDrawer);
