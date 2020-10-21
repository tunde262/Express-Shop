import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../../common/logo.png';

import mixpanel from 'mixpanel-browser';

import sampleImg from '../../../utils/imgs/20484728.jpeg';



const Navbar = ({ drawerClickHandler, toggleCartDrawer, toggleAuthDrawer, backdrop, backdropClickHandler, auth: { isAuthenticated, loading, user }, logout }) => {
    // Page
    const [navHighlight, setNavHighlight] = useState('home');
    // Toggle Sidebar
    const [isOpen, setIsOpen] = useState(false);
    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);
    // Toggle Cart Popup
    const [cartPopup, setCartPopup] = useState(false);
    // const [cart, toggleCart] = useState(false);
    // show dropdown submenu
    const [activeMenu, setActiveMenu] = useState('main');
    // dropdown height
    const [menuHeight, setMenuHeight] = useState(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    const [isHoveringHeart, setIsHoveringHeart] = useState(false);
    const [isHoveringCat, setIsHoveringCat] = useState(false);
    
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


    const handleMouseHoverHeart = () => {
        setIsHoveringHeart(!isHoveringHeart)
    }

    const handleMouseHoverCat = () => {
        setIsHoveringCat(!isHoveringCat)
    }

    const logoClicked = () => {
        mixpanel.track("Logo Click");
    }

    const toggleCart = () => {
        drawerClickHandler();
        toggleCartDrawer();
    }

    const toggleAuth = () => {
        drawerClickHandler();
        toggleAuthDrawer();
    }
    

    const authLinks = (
        <Fragment>
            <li className={navHighlight === "favorited" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('favorited')}>
                <a href="https://www.cardboardexpress.com/profile/saved">
                    <div
                        onMouseEnter={handleMouseHoverHeart}
                        onMouseLeave={handleMouseHoverHeart}
                    >
                        {navHighlight === "favorited" || isHoveringHeart ? (
                            <i style={{marginRight:'-14px', fontSize:'1rem', color:'#ff4b2b'}} class="fas fa-heart"></i>
                        ) : (
                            <i style={{marginRight:'-14px', fontSize:'1rem'}} class="far fa-heart"></i>
                        )}
                        
                    </div>  
                </a>
            </li>
            <li className={navHighlight === "categories" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('categories')}>
                <div 
                    onMouseEnter={handleMouseHoverCat}
                    onMouseLeave={handleMouseHoverCat}
                    style={{marginRight:'-14px'}}
                >
                    {navHighlight === "categories" || isHoveringCat ? (
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <i style={{color:'#ff4b2b', fontSize:'1rem'}} class="fas fa-ellipsis-v"></i>
                                <i style={{color:'#ff4b2b', fontSize:'1rem'}} class="fas fa-ellipsis-v"></i>
                                <i style={{color:'#ff4b2b', fontSize:'1rem'}} class="fas fa-ellipsis-v"></i>
                            </div>
                            <p style={{margin:'10px', color:'#ff4b2b', fontSize:'12px'}}>Categories</p>
                        </div>
                    ) : (
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <i style={{fontSize:'1rem'}}  class="fas fa-ellipsis-v"></i>
                                <i style={{fontSize:'1rem'}}  class="fas fa-ellipsis-v"></i>
                                <i style={{fontSize:'1rem'}}  class="fas fa-ellipsis-v"></i>
                            </div>
                            <p style={{margin:'10px', fontSize:'12px'}}>Categories</p>
                        </div>
                    )}
                </div>
            </li>
            <li className="nav-offset" onClick={e => setNavHighlight('profile')}>
                <div  
                    style={{display:'flex', alignItems:'center', justifyContent:'center'}}
                    className={navHighlight === "profile" && "active"}
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseHover}
                >
                    {navHighlight === "profile" || isHovering ? (
                        <Fragment>
                            <a href="https://www.cardboardexpress.com/profile">
                                <div className="profile-circle">
                                    <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                </div>
                            </a>
                            <div 
                                className="profile-toggle"
                                onClick={() => setDropdown(!dropdown)}
                            >
                                <i 
                                    style={{fontSize:'14px'}} 
                                    class="fas fa-chevron-down"
                                ></i>
                            </div>
                        </Fragment>
                        ) 
                        : (
                            <Fragment>
                                <a href="https://www.cardboardexpress.com/profile">
                                    <div style={{display:'flex', justifyContent:'center', paddingTop:'20px', alignItems:'center', width:'40px', height:'40px', borderRadius:'50%', background:'#ececec'}}>
                                        <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                    </div>
                                </a>
                                <div 
                                    className="profile-toggle"
                                    onClick={() => setDropdown(!dropdown)}
                                >
                                    <i 
                                        style={{fontSize:'14px', color:'#808080'}} 
                                        class="fas fa-chevron-down"
                                    ></i>
                                </div>
                            </Fragment>
                        )}
                </div>

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
                                {/* <Link to="/profile" className="menu-item">
                                    <div style={{display:'flex', justifyContent:'center', paddingTop:'20px', alignItems:'center', width:'40px', height:'40px', borderRadius:'50%', background:'#ececec', border:'2px solid #ff4b2b'}}>
                                        <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                    </div>
                                    <div style={{marginLeft:'1rem'}}>
                                        <p style={{margin:0}}>{user.name}</p>
                                        <p style={{margin:0}}>4.5 / 5 stars</p>
                                    </div>
                                </Link>
                                <hr style={{margin:'10px 0'}} /> */}
                                <Link to="/profile/saved" className="menu-item">
                                    <i className="fas fa-heart"></i>{' '}
                                    Saved
                                </Link>
                                <hr style={{margin:'10px 0'}} />
                                <Link to="/profile/orders" className="menu-item">
                                    My Orders
                                </Link>
                                {/* <hr style={{margin:'10px 0'}} />
                                <Link to="/admin" className="menu-item">
                                    My Stores
                                </Link> */}
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
                <div 
                    onClick={() => toggleCartDrawer()} 
                    className={navHighlight === "cart" && "active"}
                    onMouseEnter={handleMouseHover2}
                    onMouseLeave={handleMouseHover2}
                >
                    {navHighlight === "cart" || isHovering2 ? (
                        <div style={{height: '40px', fontSize:'1rem', width:'40px', borderRadius:'56px', color:'#ff4b2b', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    ) : (
                        <div style={{height: '40px', fontSize:'1rem', width:'40px', borderRadius:'56px', background:'#fff', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    )}
                </div>

                {cartPopup && (
                    <div className="cartPopup" style={{height: menuHeight}}>
                        <CSSTransition 
                            in={activeMenu === 'main'} 
                            unmountOnExit 
                            timeout={500}
                            classNames="menu-primary"
                            onEnter={calcHeight}
                        >
                            <div className="menu">
                                <img src={sampleImg} style={{height:'100px', width:'100px', margin:'15px', zIndex:'0'}} alt="product" />
                                <div className="cart-popup-overlay">
                                    <h2 style={{fontSize:'20px'}}>Added!</h2>
                                </div>
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

                {/* {cart && (
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
                )} */}
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            {/* <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/about">About</Link>
            </li> */}
            <li className="nav-offset">
                <a href="https://business.cardboardexpress.com" target="_blank" style={{fontSize:'1rem'}} className="cta" to="/business">Business</a>
            </li>
            <li className="nav-offset">
                <a href="https://www.cardboardexpress.com/login" style={{fontSize:'1rem'}} className="cta">Login</a>
            </li>
            {/* <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/blog">Blog</Link>
            </li> */}
            {/* <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/login">Login</Link>
            </li> */}
            <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/home">
                    <button>Start Shopping</button>
                </Link>
            </li>
        </Fragment>
    );

    const authMobileLinks = (
        <div className="nav-mobile-links">
            <li className="nav-offset" onClick={e => setNavHighlight('home')}>
                <a href="https://www.cardboardexpress.com/home">
                    {navHighlight === "home" ? (
                        <i style={{color:'#ff4b2b', fontSize:'22px'}} class="fas fa-home"></i>
                    ) : (
                        <i style={{fontSize:'22px'}} class="fas fa-home"></i>
                    )}
                </a>
            </li>
            <li className={navHighlight === "explore" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('explore')}>
                <a href="https://www.cardboardexpress.com/explore">
                    <i style={{fontSize:'22px'}} class="far fa-compass"></i>
                </a>
            </li>
            <li className="nav-offset" onClick={e => setNavHighlight('profile')}>
                <div  
                    style={{display:'flex', alignItems:'center', justifyContent:'center'}}
                    className={navHighlight === "profile" && "active"}
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseHover}
                >
                    {navHighlight === "profile" || isHovering ? (
                        <Fragment>
                            <a href="https://www.cardboardexpress.com/profile">
                                <div className="profile-circle">
                                    <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                </div>
                            </a>
                        </Fragment>
                        ) 
                        : (
                            <Fragment>
                                <div className="profile-circle">
                                    <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                </div>
                            </Fragment>
                        )}
                </div>
            </li>
            <li className={navHighlight === "favorited" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('favorited')}>
                <a href="localhost:3000/profile/saved">
                    <i style={{marginLeft:'-6px', fontSize:'22px'}} class="far fa-heart"></i>
                </a>
            </li>
            <li onClick={toggleCart}>
                <a href="#">
                    <i style={{marginLeft:'-6px', fontSize:'22px'}} class="fas fa-shopping-cart"></i>
                </a>
            </li>
            {/* <Link className="cta" to="/register">
                {/* <button type="button" className="nav-btn nav-icon" onClick={drawerClickHandler}>
                    Sell
                </button> */}
                
            {/* </Link> */} 
            {/* <div className="mobile">
                {backdrop ? (
                    <i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-times menu-btn nav-btn close" : "fas fa-times nav-btn menu-btn"} onClick={handleToggle}></i>
                ) : (<i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-bars nav-btn menu-btn close" : "fas fa-bars nav-btn menu-btn"} onClick={handleToggle}></i>
                )}
            </div> */}
        </div>
    );

    const guestMobileLinks = (
        <Fragment>
            {/* <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/about">About</Link>
            </li> */}
            <li className="nav-offset">
                <a href="https://business.cardboardexpress.com" target="_blank" style={{fontSize:'1rem'}} className="cta" to="/business">Business</a>
            </li>
            <li className="nav-offset">
                <Link style={{fontSize:'1rem'}} className="cta" to="/home">
                    <button>Start Shopping</button>
                </Link>
            </li>
        </Fragment>
    );


    return (
        <header>
            <div className="desktop">
                <div className="nav">
                    {/* <div style={{margin:'0 20px 0 1rem', cursor:'pointer'}}>
                        <i style={{fontSize:'1rem'}} class="fas fa-bars"></i>
                    </div> */}
                    <div className="branding">
                        <a href="https://www.cardboardexpress.com"><img onClick={logoClicked} src={logo} style={{maxHeight: '40px'}} alt="cardboard express logo" /></a>

                        {/* <div className="social-container">
                            <a href="https://instagram.com/cardboardexpress" target="_blank" className="social"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.facebook.com/Cardboard-Express-106068867830320/?view_public_for=106068867830320" target="_blank" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/cardboardxpress" target="_blank" className="social"><i className="fab fa-twitter"></i></a>
                        </div> */}
                    </div>

                    <li className={navHighlight === "home" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('home')}>
                        <a href="https://www.cardboardexpress.com/home" className={navHighlight === "home" && "active"}>
                            <i class="fas fa-home"></i>{' '}
                            Home
                        </a>
                    </li>
                    {/* <li className={navHighlight === "explore" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('explore')}>
                        <Link to="/explore">
                            <i class="far fa-compass"></i>{' '}
                            Explore
                        </Link>
                    </li> */}
                    {/* <Link className="cta" to="/register">
                        {/* <button type="button" className="nav-btn nav-icon" onClick={drawerClickHandler}>
                            Sell
                        </button> */}
                        
                    {/* </Link> */} 
                    {/* <div className="mobile">
                        {backdrop ? (
                            <i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-times menu-btn nav-btn close" : "fas fa-times nav-btn menu-btn"} onClick={handleToggle}></i>
                        ) : (<i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-bars nav-btn menu-btn close" : "fas fa-bars nav-btn menu-btn"} onClick={handleToggle}></i>
                        )}
                    </div> */}
                </div>
            </div>

            {/** Mobile Only Nav */}
            <div style={{height:'100%', width:'100%'}} className="mobile"> 
                <div className="nav-mobile">
                    { !loading && ( isAuthenticated ? authMobileLinks : guestMobileLinks )}
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

