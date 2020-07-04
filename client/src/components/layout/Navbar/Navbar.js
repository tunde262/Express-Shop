import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../../common/logo.png';

const Navbar = ({ drawerClickHandler, auth: { isAuthenticated, loading }, logout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    const authLinks = (
        <Fragment>
            <li><a href="#"><i className="far fa-heart"></i></a></li>
            <li><a href="#"><i className="far fa-comment-alt"></i></a></li>
            <li>
                <Link to="/cart">
                    <i class="fas fa-shopping-cart"></i>
                </Link>
            </li>
            <li onClick={drawerClickHandler}><i className="fas fa-ellipsis-h"></i></li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>Who Are We?</li>
            <li>FAQ</li>
            <li>Contact Us</li>
            <li><Link className="cta" to="/register"><button>Sign Up</button></Link></li>
        </Fragment>
    );

    return (
        <header>
            <div className="nav">
                <div className="branding">
                    <Link to="/"><img src={logo} style={{maxHeight: '50px'}} alt="cardboard express logo" /></Link>
                    <div className="social-container">
                        <a href="https://instagram.com/cardboardexpress" target="_blank" className="social"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Cardboard-Express-106068867830320/?view_public_for=106068867830320" target="_blank" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com/cardboardxpress" target="_blank" className="social"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div>
                    <button type="button" className="nav-btn" onClick={drawerClickHandler}>
                        <FaAlignRight className="nav-icon" />
                    </button>
                </div>
            </div>
            <div className="dropdown">
                <div className={isOpen ? "nav-bar show-nav" : "nav-bar"}>
                    <nav>
                        <ul className="nav-links">
                            {/* <li><Link to="/chat">Chat</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li> */}
                            { !loading && ( isAuthenticated ? authLinks : guestLinks )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);

