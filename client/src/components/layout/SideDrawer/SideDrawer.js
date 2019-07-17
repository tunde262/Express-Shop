import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';

import './SideDrawer.css';

const SideDrawer = ({ auth: { isAuthenticated, loading }, logout, show}) => {
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
            <li><Link to="/profile">Orders</Link></li>
        </ul>
    );

    const guestLinks = (
        <ul className={authClasses}>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Create An Account</Link></li>
        </ul>
    );
    return (
        <nav className={drawerClasses}>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
        </nav>
    )
}

SideDrawer.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(SideDrawer);
