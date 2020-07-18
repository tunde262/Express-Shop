import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
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

    const [dropdown, setDropdown] = useState(false);
    // show dropdown submenu
    const [activeMenu, setActiveMenu] = useState('main');
    // dropdown height
    const [menuHeight, setMenuHeight] = useState(null);
    
    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }

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
            <li onClick={drawerClickHandler}>
                <Link to="/home">
                    <i class="fas fa-home"></i>
                </Link>
            </li>
            <li onClick={drawerClickHandler}>
                <Link to="/explore">
                    <i class="far fa-compass"></i>
                </Link>
            </li>
            <li onClick={drawerClickHandler}>
                <a href="#" onClick={() => setDropdown(!dropdown)}>
                    <i className="fas fa-user-circle"></i>
                </a>

                {dropdown && (
                    <div className="dropdown" style={{height: menuHeight}}>
                        <CSSTransition 
                            in={activeMenu === 'main'} 
                            unmountOnExit 
                            timeout={500}
                            classNames="menu-primary"
                            onEnter={calcHeight}
                        >
                            <div className="menu">
                                <Link to="/profile" className="menu-item">
                                   My Profile
                                </Link>
                                <a href="#" className="menu-item">
                                    My Orders
                                </a>
                                <a href="#" className="menu-item">
                                    <i className="fas fa-heart"></i>{' '}
                                    Saved
                                </a>
                                <a href="#" className="menu-item" onClick={() => setActiveMenu('settings')}>
                                    <i className="fas fa-cog"></i>{' '}
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                                <a href="#" className="menu-item" onClick={logout}>
                                    <i className="fas fa-sign-out-alt" />{' '}
                                    Logout
                                </a>
                            </div>
                        </CSSTransition>

                        <CSSTransition 
                            in={activeMenu === 'settings'} 
                            unmountOnExit 
                            timeout={500}
                            classNames="menu-secondary"
                            onEnter={calcHeight}
                        >
                            <div className="menu">
                                <a href="#" className="menu-item" onClick={() => setActiveMenu('main')}>
                                    <i class="fas fa-arrow-left"></i>
                                </a>
                                <a href="#" className="menu-item">
                                    <i className="fas fa-cog"></i>
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                                <a href="#" className="menu-item">
                                    <i className="fas fa-cog"></i>
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                                <a href="#" className="menu-item">
                                    <i className="fas fa-cog"></i>
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                                <a href="#" className="menu-item">
                                    <i className="fas fa-cog"></i>
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                                <a href="#" className="menu-item">
                                    <i className="fas fa-cog"></i>
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                                <a href="#" className="menu-item">
                                    <i className="fas fa-cog"></i>
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a>
                            </div>
                        </CSSTransition>
                    </div>
                )}
            </li>
            <li onClick={drawerClickHandler}>
                <Link to="/cart">
                    <i class="fas fa-shopping-cart"></i>
                </Link>
            </li>
            <li onClick={drawerClickHandler}>
                <Link to="/wallet" style={{fontSize:'2rem', color:'#28c101', position:'absolute', marginTop:'-0.5rem'}}>
                    <i class="far fa-circle"></i>
                </Link>
            </li>
            {/* <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
            <li onClick={drawerClickHandler}><Link to="/explore">Explore</Link></li>
            <li onClick={drawerClickHandler}><Link to="/categories">Categories</Link></li>
            <li onClick={drawerClickHandler}><Link to="/stores">Stores</Link></li>
            {/* <li onClick={drawerClickHandler}>Same Day Delivery</li>
            <li onClick={drawerClickHandler}>Reorder</li>
            <li onClick={drawerClickHandler}>Track Order</li> */}
            {/* <li onClick={drawerClickHandler}><Link to="/profile">My Account</Link></li>    
            <Link onClick={drawerClickHandler} to='/admin' className="btn btn-primary my-1">
                Open A Store
            </Link> */}
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
