import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../../common/logo.png';


const Navbar = ({ drawerClickHandler, auth: { isAuthenticated, loading }, logout }) => {
    // Page
    const [navHighlight, setNavHighlight] = useState('home');
    // Toggle Sidebar
    const [isOpen, setIsOpen] = useState(false);
    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);
    // show dropdown submenu
    const [activeMenu, setActiveMenu] = useState('main');
    // dropdown height
    const [menuHeight, setMenuHeight] = useState(null);
    
    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }
    const authLinks = (
        <Fragment>
            <li onClick={e => setNavHighlight('home')}>
                <Link to="/home" className={navHighlight === "home" && "active"}>
                    <i class="fas fa-home"></i>
                </Link>
            </li>
            <li onClick={e => setNavHighlight('explore')}>
                <Link to="/explore" className={navHighlight === "explore" && "active"}>
                    <i class="far fa-compass"></i>
                </Link>
            </li>
            <li onClick={e => setNavHighlight('cart')}>
                <Link to="/cart" className={navHighlight === "cart" && "active"}>
                    <i class="fas fa-shopping-cart"></i>
                </Link>
            </li>
            <li onClick={e => setNavHighlight('profile')}>
                <a className={navHighlight === "profile" && "active"} href="#" onClick={() => setDropdown(!dropdown)}>
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
                                <Link to="/admin" className="menu-item">
                                    Admin
                                </Link>
                                {/* <a href="#" className="menu-item" onClick={() => setActiveMenu('settings')}>
                                    <i className="fas fa-cog"></i>{' '}
                                    Settings
                                    <i className="fas fa-chevron-right"></i>
                                </a> */}
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
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-offset"><Link style={{marginTop: '15px', fontSize: '1rem'}}
style={{marginTop: '15px', fontSize: '1rem'}} className="cta" to="/register">New User?</Link></li>
            <li className="nav-offset"><Link style={{marginTop: '15px', fontSize: '1rem'}}
style={{marginTop: '15px', fontSize: '1rem'}} className="cta" to="/login">Login</Link></li>
            <li><Link className="cta" to="/register"><button>Sell</button></Link></li>
        </Fragment>
    );

    return (
        <header>
            <div className="nav">
                <div className="branding">
                    <Link to="/"><img src={logo} style={{maxHeight: '40px'}} alt="cardboard express logo" /></Link>
                    <div className="social-container">
                        <a href="https://instagram.com/cardboardexpress" target="_blank" className="social"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Cardboard-Express-106068867830320/?view_public_for=106068867830320" target="_blank" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com/cardboardxpress" target="_blank" className="social"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div className="force-right">
                <Link className="cta" to="/register">
                    <button type="button" className="nav-btn nav-icon" onClick={drawerClickHandler}>
                        Sell
                    </button>
                </Link>
                </div>
            </div>
            <div className={isOpen ? "nav-bar show-nav" : "nav-bar"}>
                <nav>
                    <ul className="nav-links">
                        {/* <li><Link to="/chat">Chat</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li> */}
                        { !loading && ( isAuthenticated ? authLinks : guestLinks )}
                    </ul>
                </nav>
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

