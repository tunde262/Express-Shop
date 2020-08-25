import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../../common/logo.png';


const Navbar = ({ drawerClickHandler, toggleCartDrawer, backdrop, backdropClickHandler, auth: { isAuthenticated, loading }, logout }) => {
    // Page
    const [navHighlight, setNavHighlight] = useState('home');
    // Toggle Sidebar
    const [isOpen, setIsOpen] = useState(false);
    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);
    const [cart, toggleCart] = useState(false);
    // show dropdown submenu
    const [activeMenu, setActiveMenu] = useState('main');
    // dropdown height
    const [menuHeight, setMenuHeight] = useState(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    
    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }

    const handleToggle = () => {
        if(backdrop) {
            backdropClickHandler()
        } else {
            drawerClickHandler();
        }
    }

    const handleMouseHover = () => {
        setIsHovering(!isHovering)
    }

    const handleMouseHover2 = () => {
        setIsHovering2(!isHovering2)
    }
    

    const authLinks = (
        <Fragment>
            <li className="nav-offset" onClick={e => setNavHighlight('profile')}>
                <a  
                    className={navHighlight === "profile" && "active"}
                    href="#" 
                    onClick={() => setDropdown(!dropdown)}
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseHover}
                >
                    {navHighlight === "profile" || isHovering ? (
                        <i style={isHovering && navHighlight !== "profile" ? {transform: 'scale(1.3)', color:'#bebebe'} : {transform: 'scale(1.3)'}} className="fas fa-user-circle"></i>
                        ) 
                        : (
                            <i class="fas fa-user"></i>
                        )}
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
                                    <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                    <div style={{marginLeft:'1rem'}}>
                                        <p style={{margin:0}}>Tunde Adepitan</p>
                                        <p style={{margin:0}}>4.5 / 5 stars</p>
                                    </div>
                                </Link>
                                <hr style={{margin:'10px 0'}} />
                                <Link to="/profile/saved" className="menu-item">
                                    <i className="fas fa-heart"></i>{' '}
                                    Saved
                                </Link>
                                <hr style={{margin:'10px 0'}} />
                                <Link to="/profile/orders" className="menu-item">
                                    My Orders
                                </Link>
                                <hr style={{margin:'10px 0'}} />
                                <Link to="/admin" className="menu-item">
                                    My Stores
                                </Link>
                                <hr style={{margin:'10px 0'}} />
                                <a href="#" className="menu-item" onClick={logout}>
                                    <i className="fas fa-sign-out-alt" />{' '}
                                    Logout
                                </a>
                            </div>
                        </CSSTransition>

                        {/* <CSSTransition 
                            in={activeMenu === 'profile'} 
                            unmountOnExit 
                            timeout={500}
                            classNames="menu-secondary"
                            onEnter={calcHeight}
                        >
                            <div className="menu">
                                <a href="#" className="menu-item" onClick={() => setActiveMenu('main')}>
                                    <i class="fas fa-arrow-left"></i>
                                </a>
                                <Link to="/profile" className="menu-item">
                                    <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                    <div style={{marginLeft:'1rem'}}>
                                        <p style={{margin:0}}>Tunde Adepitan</p>
                                        <p style={{margin:0}}>4.5 / 5 stars</p>
                                    </div>
                                </Link>
                                <Link to="/profile/payments" className="menu-item">
                                    payment
                                </Link>
                                <Link to="/profile/addresses" className="menu-item">
                                    address
                                </Link>
                                <Link to="/profile/orders" className="menu-item">
                                    My Orders
                                </Link>
                                <Link to="/profile/settings" className="menu-item">
                                    <i className="fas fa-cog"></i>{' '}
                                    Settings
                                </Link>
                            </div>
                        </CSSTransition> */}
                    </div>
                )}
            </li>
            <li className="nav-offset" onClick={e => setNavHighlight('cart')}>
                <a 
                    onClick={() => toggleCartDrawer()} 
                    href="#" 
                    className={navHighlight === "cart" && "active"}
                    onMouseEnter={handleMouseHover2}
                    onMouseLeave={handleMouseHover2}
                >
                    {navHighlight === "cart" || isHovering2 ? (
                        <div style={isHovering2 && navHighlight !== "cart" ? {
                            height: '40px', width:'40px', borderRadius:'56px', background:'#bebebe', color:'#fff', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'
                        } : {
                            height: '40px', width:'40px', borderRadius:'56px', background:'#333', color:'#fff', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'
                        }}>
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    ) : (
                        <div style={{height: '40px', width:'40px', borderRadius:'56px', background:'#fff', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    )}
                </a>

                {cart && (
                    <div className="dropdown" style={{height: menuHeight}}>
                        <CSSTransition 
                            in={activeMenu === 'main'} 
                            unmountOnExit 
                            timeout={500}
                            classNames="menu-primary"
                            onEnter={calcHeight}
                        >
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
                                <hr style={{margin:'10px 0'}} />
                                <Link to="/admin" className="menu-item">
                                    My Stores
                                </Link>
                                <hr style={{margin:'10px 0'}} />
                                <a href="#" className="menu-item" onClick={logout}>
                                    <i className="fas fa-sign-out-alt" />{' '}
                                    Logout
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
            {/* <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/about">About</Link>
            </li> */}
            <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/business">Business</Link>
            </li>
            {/* <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/blog">Blog</Link>
            </li> */}
            <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/login">Login</Link>
            </li>
            <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/register">
                    <button>Sign Up</button>
                </Link>
            </li>
        </Fragment>
    );

    return (
        <header>
            <div className="nav">
                <div className="branding">
                    <Link to="/"><img src={logo} style={{maxHeight: '40px'}} alt="cardboard express logo" /></Link>

                    {/* <div className="social-container">
                        <a href="https://instagram.com/cardboardexpress" target="_blank" className="social"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/Cardboard-Express-106068867830320/?view_public_for=106068867830320" target="_blank" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com/cardboardxpress" target="_blank" className="social"><i className="fab fa-twitter"></i></a>
                    </div> */}
                </div>

                <li className={navHighlight === "home" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('home')}>
                    <Link to="/home" className={navHighlight === "home" && "active"}>
                        <i class="fas fa-home"></i>{' '}
                        Home
                    </Link>
                </li>
                <li className={navHighlight === "explore" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('explore')}>
                    <Link to="/explore">
                        <i class="far fa-compass"></i>{' '}
                        Explore
                    </Link>
                </li>
                {/* <Link className="cta" to="/register">
                    {/* <button type="button" className="nav-btn nav-icon" onClick={drawerClickHandler}>
                        Sell
                    </button> */}
                    
                {/* </Link> */} 
                <div className="mobile">
                    {backdrop ? (
                        <i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-times menu-btn nav-btn close" : "fas fa-times nav-btn menu-btn"} onClick={handleToggle}></i>
                    ) : (<i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-bars nav-btn menu-btn close" : "fas fa-bars nav-btn menu-btn"} onClick={handleToggle}></i>
                    )}
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

