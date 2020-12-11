import React, { Fragment, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { reorderItems } from '../../../actions/productActions';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../../common/logo.png';

import ProfileCircle from '../../common/ProfileCircle';

import mixpanel from 'mixpanel-browser';

import sampleImg from '../../../utils/imgs/20484728.jpeg';



const Navbar = ({ reorderItems, drawerClickHandler, toggleCartDrawer, toggleAuthDrawer, backdrop, backdropClickHandler, nav, auth: { isAuthenticated, loading, user }, logout }) => {
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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [isHovering, setIsHovering] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    const [isHoveringHeart, setIsHoveringHeart] = useState(false);
    const [isHoveringCat, setIsHoveringCat] = useState(false);
    

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };
    
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
        reorderItems();
    }

    const toggleCart = () => {
        toggleCartDrawer();
    }

    const toggleAuth = () => {
        toggleAuthDrawer();
    }

    const toggleCreateDrawer = () => {
        drawerClickHandler();
    }

    const isMobile = windowWidth <= 769;
    

    let authLinks;

    if(nav.main === 'store') {
        authLinks = (
            <Fragment>
                <li className={navHighlight === "favorited" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('favorited')}>
                    <a href={`https://www.cardboardexpress.com/profile/saved`}>
                        <div
                            onMouseEnter={handleMouseHoverHeart}
                            onMouseLeave={handleMouseHoverHeart}
                        >
                            {navHighlight === "favorited" || isHoveringHeart ? (
                                <i style={{marginRight:'-14px', fontSize:'1rem', color:'#ff4b2b'}} className="fas fa-heart"></i>
                            ) : (
                                <i style={{marginRight:'-14px', fontSize:'1rem'}} className="far fa-heart"></i>
                            )}
                            
                        </div>  
                    </a>
                </li>
                {/* <li className={navHighlight === "categories" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('categories')}>
                    <div 
                        onMouseEnter={handleMouseHoverCat}
                        onMouseLeave={handleMouseHoverCat}
                        style={{marginRight:'-14px'}}
                    >
                        {navHighlight === "categories" || isHoveringCat ? (
                            <div style={{display:'flex', alignItems:'center'}}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <i style={{color:'#ff4b2b', fontSize:'1rem'}} className="fas fa-ellipsis-v"></i>
                                    <i style={{color:'#ff4b2b', fontSize:'1rem'}} className="fas fa-ellipsis-v"></i>
                                    <i style={{color:'#ff4b2b', fontSize:'1rem'}} className="fas fa-ellipsis-v"></i>
                                </div>
                                <p style={{margin:'10px', color:'#ff4b2b', fontSize:'12px'}}>Categories</p>
                            </div>
                        ) : (
                            <div style={{display:'flex', alignItems:'center'}}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <i style={{fontSize:'1rem'}}  className="fas fa-ellipsis-v"></i>
                                    <i style={{fontSize:'1rem'}}  className="fas fa-ellipsis-v"></i>
                                    <i style={{fontSize:'1rem'}}  className="fas fa-ellipsis-v"></i>
                                </div>
                                <p style={{margin:'10px', fontSize:'12px'}}>Categories</p>
                            </div>
                        )}
                    </div>
                </li> */}
                <li className="nav-offset" onClick={e => setNavHighlight('profile')}>
                    <div  
                        style={{display:'flex', alignItems:'center', justifyContent:'center'}}
                        className={navHighlight === "profile" ? "active" : undefined}
                        onMouseEnter={handleMouseHover}
                        onMouseLeave={handleMouseHover}
                    >
                        {navHighlight === "profile" || isHovering ? (
                            <Fragment>
                                <a href={`https://www.cardboardexpress.com/profile`}>
                                    <ProfileCircle />
                                </a>
                                <div 
                                    className="profile-toggle"
                                    onClick={() => setDropdown(!dropdown)}
                                >
                                    {!isMobile && (
                                        <i 
                                            style={{fontSize:'14px'}} 
                                            className="fas fa-chevron-down"
                                        ></i>
                                    )}
                                </div>
                            </Fragment>
                            ) 
                            : (
                                <Fragment>
                                    <a href={`https://www.cardboardexpress.com/profile`}>
                                        <ProfileCircle />
                                    </a>
                                    <div 
                                        className="profile-toggle"
                                        onClick={() => setDropdown(!dropdown)}
                                    >
                                        {!isMobile && (
                                            <i 
                                                style={{fontSize:'14px', color:'#808080'}} 
                                                className="fas fa-chevron-down"
                                            ></i>
                                        )}
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
                                    <a href="#" className="menu-item" onClick={() => setActiveMenu('profile')}>
                                        <ProfileCircle />
                                        <div style={{marginLeft:'1rem'}}>
                                            <p style={{margin:0}}>{user.name}</p>
                                            <p style={{margin:0}}>4.5 / 5 stars</p>
                                        </div>
                                    </a>
                                    <hr style={{margin:'10px 0'}} />
                                    <a href={`https://www.cardboardexpress.com/profile/saved`} className="menu-item">
                                        <i className="fas fa-heart"></i>{' '}
                                        Saved
                                    </a>
                                    <hr style={{margin:'10px 0'}} />
                                    <a href={`https://www.cardboardexpress.com/profile/orders`} className="menu-item">
                                        My Orders
                                    </a>
                                    {/* <hr style={{margin:'10px 0'}} />
                                    <a href={`https://www.cardboardexpress.com/admin`} className="menu-item">
                                        My Stores
                                    </a> */}
                                    <hr style={{margin:'10px 0'}} />
                                    <a href="#" className="menu-item" onClick={logout}>
                                        <i className="fas fa-sign-out-alt" />{' '}
                                        Logout
                                    </a>
                                </div>
                            </CSSTransition>

                            <CSSTransition 
                                in={activeMenu === 'profile'} 
                                unmountOnExit 
                                timeout={500}
                                classNames="menu-secondary"
                                onEnter={calcHeight}
                            >
                                <div className="menu">
                                    <a href="#" className="menu-item" onClick={() => setActiveMenu('main')}>
                                        <i className="fas fa-arrow-left"></i>
                                    </a>
                                    <a href={`https://www.cardboardexpress.com/profile/orders`} className="menu-item">
                                        My Orders
                                    </a>
                                    <a href={`https://www.cardboardexpress.com/profile/addresses`} className="menu-item">
                                        Saved Locations
                                    </a>
                                    <a href={`https://www.cardboardexpress.com/profile/payments`} className="menu-item">
                                        payment
                                    </a>
                                    <a href={`https://www.cardboardexpress.com/profile/settings`} className="menu-item">
                                        <i className="fas fa-cog"></i>{' '}
                                        Settings
                                    </a>
                                </div>
                            </CSSTransition>
                        </div>
                    )}
                </li>
                <li className="nav-offset" onClick={e => setNavHighlight('cart')}>
                    <div 
                        onClick={() => toggleCartDrawer()} 
                        className={navHighlight === "cart" ? "active" : undefined}
                        onMouseEnter={handleMouseHover2}
                        onMouseLeave={handleMouseHover2}
                    >
                        {navHighlight === "cart" || isHovering2 ? (
                            <div style={{height: '40px', fontSize:'1rem', width:'40px', borderRadius:'56px', color:'#ff4b2b', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                        ) : (
                            <div style={{height: '40px', fontSize:'1rem', width:'40px', borderRadius:'56px', background:'#fff', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <i className="fas fa-shopping-cart"></i>
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
                                        <i className="fas fa-arrow-left"></i>
                                    </a>
                                    <a to="/profile" className="menu-item">
                                        <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                        <div style={{marginLeft:'1rem'}}>
                                            <p style={{margin:0}}>Tunde Adepitan</p>
                                            <p style={{margin:0}}>4.5 / 5 stars</p>
                                        </div>
                                    </a>
                                    <a to="/profile/payments" className="menu-item">
                                        payment
                                    </a>
                                    <a to="/profile/addresses" className="menu-item">
                                        address
                                    </a>
                                    <a to="/profile/orders" className="menu-item">
                                        My Orders
                                    </a>
                                    <a to="/profile/settings" className="menu-item">
                                        <i className="fas fa-cog"></i>{' '}
                                        Settings
                                    </a>
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
                                        <a to="/profile" className="menu-item">My Profile</a>
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
                                    <a to="/admin" className="menu-item">
                                        My Stores
                                    </a>
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
    } else if (nav.main === 'admin') {
        authLinks = (
            <Fragment>
                <li className={navHighlight === "categories" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('categories')}>
                    <div 
                        onMouseEnter={handleMouseHoverCat}
                        onMouseLeave={handleMouseHoverCat}
                        style={{marginRight:'-14px'}}
                    >
                        {navHighlight === "categories" || isHoveringCat ? (
                            <i style={{marginRight:'-14px', fontSize:'1rem'}} className="far fa-plus"></i>
                        ) : (
                            <div style={{display:'flex', alignItems:'center'}}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <i style={{fontSize:'1rem'}}  className="fas fa-plus"></i>
                                </div>
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
                                <a href={`https://www.cardboardexpress.com/profile`}>
                                    <ProfileCircle />
                                </a>
                                <div 
                                    className="profile-toggle"
                                    onClick={() => setDropdown(!dropdown)}
                                >
                                    {!isMobile && (
                                        <i 
                                            style={{fontSize:'14px'}} 
                                            className="fas fa-chevron-down"
                                        ></i>
                                    )}
                                </div>
                            </Fragment>
                            ) 
                            : (
                                <Fragment>
                                    <a href={`https://www.cardboardexpress.com/profile`}>
                                        <div style={{display:'flex', justifyContent:'center', paddingTop:'20px', alignItems:'center', width:'40px', height:'40px', borderRadius:'50%', background:'#ececec'}}>
                                            <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                        </div>
                                    </a>
                                    <div 
                                        className="profile-toggle"
                                        onClick={() => setDropdown(!dropdown)}
                                    >
                                        {!isMobile && (
                                            <i 
                                                style={{fontSize:'14px', color:'#808080'}} 
                                                className="fas fa-chevron-down"
                                            ></i>
                                        )}
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
                                    <a href="#" className="menu-item" onClick={() => setActiveMenu('profile')}>
                                        <div style={{display:'flex', justifyContent:'center', paddingTop:'20px', alignItems:'center', width:'40px', height:'40px', borderRadius:'50%', background:'#ececec', border:'2px solid #ff4b2b'}}>
                                            <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                        </div>
                                        <div style={{marginLeft:'1rem'}}>
                                            <p style={{margin:0}}>{user.name}</p>
                                            <p style={{margin:0}}>4.5 / 5 stars</p>
                                        </div>
                                    </a>
                                    <hr style={{margin:'10px 0'}} />
                                    <a href={`https://www.cardboardexpress.com/profile/saved`} className="menu-item">
                                        <small style={{color:'#ff4b2b', marginRight:'10px'}}><i className="fas fa-arrow-left"></i></small>{' '}
                                        Exit Dashboard
                                    </a>
                                    <hr style={{margin:'10px 0'}} />
                                    <a href={`https://www.cardboardexpress.com/profile/orders`} className="menu-item">
                                        Billing
                                    </a>
                                    <hr style={{margin:'10px 0'}} />
                                    <a href={`https://www.cardboardexpress.com/profile/orders`} className="menu-item">
                                        Settings
                                    </a>
                                    {/* <hr style={{margin:'10px 0'}} />
                                    <a to="/admin" className="menu-item">
                                        My Stores
                                    </a> */}
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
        )
    }

    const guestLinks = (
        <Fragment>
            {/* <li className="nav-offset">
                <a style={{fontSize:'1rem'}} className="cta" to="/about">About</a>
            </li> */}
            <li className="nav-offset">
                <a href="https://business.cardboardexpress.com" target="_blank" style={{fontSize:'1rem'}} className="cta" to="/business">Business</a>
            </li>
            <li className="nav-offset">
                <a href={`https://www.cardboardexpress.com/login`} style={{fontSize:'1rem'}} className="cta">Login</a>
            </li>
            {/* <li className="nav-offset">
                <a style={{fontSize:'1rem'}} className="cta" to="/blog">Blog</a>
            </li> */}
            {/* <li className="nav-offset">
                <a style={{fontSize:'1rem'}} className="cta" to="/login">Login</a>
            </li> */}
            <li className="nav-offset">
                <a style={{fontSize:'1rem'}} className="cta" href={`https://www.cardboardexpress.com/home`}>
                    <button>Start Shopping</button>
                </a>
            </li>
        </Fragment>
    );

    let authMobileLinks;

    if(!nav.admin) {
        authMobileLinks = (
            <div className="nav-mobile-links">
                <li className="nav-offset" onClick={e => setNavHighlight('home')}>
                    <a href={`https://www.cardboardexpress.com/home`}>
                        {navHighlight === "home" ? (
                            <i style={{color:'#ff4b2b', fontSize:'22px'}} className="fas fa-home"></i>
                        ) : (
                            <i style={{fontSize:'22px'}} className="fas fa-home"></i>
                        )}
                    </a>
                </li>
                <li className={navHighlight === "explore" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('explore')}>
                    <a href={`https://www.cardboardexpress.com/explore`}>
                        <i style={{fontSize:'22px'}} className="far fa-compass"></i>
                    </a>
                </li>
                <li className="nav-offset" onClick={e => setNavHighlight('profile')}>
                    <a href={`https://www.cardboardexpress.com/profile`}>
                        <div  
                            style={{display:'flex', alignItems:'center', justifyContent:'center'}}
                            className={navHighlight === "profile" && "active"}
                            onMouseEnter={handleMouseHover}
                            onMouseLeave={handleMouseHover}
                        >
                            {navHighlight === "profile" || isHovering ? (
                                <Fragment>
                                        <ProfileCircle />
                                </Fragment>
                                ) 
                                : (
                                    <Fragment>
                                        <ProfileCircle />
                                    </Fragment>
                                )}
                        </div>
                    </a>
                </li>
                <li className={navHighlight === "favorited" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('favorited')}>
                    <a href={`https://www.cardboardexpress.com/profile/saved`}>
                        <i style={{marginLeft:'-6px', fontSize:'22px'}} className="far fa-heart"></i>
                    </a>
                </li>
                <li onClick={toggleCart}>
                    <a href="#">
                        <i style={{marginLeft:'-6px', fontSize:'22px'}} className="fas fa-shopping-cart"></i>
                    </a>
                </li>
                {/* <a className="cta" to="/register">
                    {/* <button type="button" className="nav-btn nav-icon" onClick={drawerClickHandler}>
                        Sell
                    </button> */}
                    
                {/* </a> */} 
                {/* <div className="mobile">
                    {backdrop ? (
                        <i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-times menu-btn nav-btn close" : "fas fa-times nav-btn menu-btn"} onClick={handleToggle}></i>
                    ) : (<i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-bars nav-btn menu-btn close" : "fas fa-bars nav-btn menu-btn"} onClick={handleToggle}></i>
                    )}
                </div> */}
            </div>
        ) 
    } else {
        authMobileLinks = (
            <div className="nav-mobile-auth">
                <li onClick={toggleCreateDrawer} className={navHighlight === "explore" ? "nav-offset active" : "nav-offset"}>
                    <div>
                        <i style={{fontSize:'22px'}} className="fas fa-plus"></i>
                    </div>
                </li>
                <li className={navHighlight === "explore" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('explore')}>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <p style={{margin:'0 10px', color:'#808080'}}>Tommy Bahama</p>
                        <i style={{color:'#808080'}} className="fas fa-caret-down"></i>
                    </div>
                </li>
                <li onClick={toggleAuth}>
                    <div>
                        <i style={{fontSize:'22px'}} className="fas fa-bars"></i>
                    </div>
                </li>
            </div>
        )
    };

    const guestMobileLinks = (
        <Fragment>
            {/* <li className="nav-offset">
                <a style={{fontSize:'1rem'}} className="cta" to="/about">About</a>
            </li> */}
            <li className="nav-offset">
                <a href="https://business.cardboardexpress.com" target="_blank" style={{fontSize:'1rem'}} className="cta" to="/business">Business</a>
            </li>
            <li className="nav-offset">
                <a style={{fontSize:'1rem'}} className="cta" href={`https://www.cardboardexpress.com/home`}>
                    <button>Start Shopping</button>
                </a>
            </li>
        </Fragment>
    );


    return (
        <header>
            <div className="desktop">
                <div className="nav">
                    <div style={{margin:'0 20px 0 1rem', cursor:'pointer'}}>
                        <i style={{fontSize:'1rem'}} className="fas fa-bars"></i>
                    </div>
                    <div className="branding">
                        <a href={`https://www.cardboardexpress.com/`}><img onClick={logoClicked} src={logo} style={{maxHeight: '40px'}} alt="cardboard express logo" /></a>

                        {/* <div className="social-container">
                            <a href="https://instagram.com/cardboardexpress" target="_blank" className="social"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.facebook.com/Cardboard-Express-106068867830320/?view_public_for=106068867830320" target="_blank" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/cardboardxpress" target="_blank" className="social"><i className="fab fa-twitter"></i></a>
                        </div> */}
                    </div>

                    {/* {!nav.admin && (
                        <Fragment>
                            <li className={navHighlight === "home" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('home')}>
                                <a to="/home" className={navHighlight === "home" && "active"}>
                                    <i className="fas fa-home"></i>{' '}
                                    Home
                                </a>
                            </li>
                            <li className={navHighlight === "explore" ? "nav-offset active" : "nav-offset"} onClick={e => setNavHighlight('explore')}>
                                <a to="/explore">
                                    <i className="far fa-compass"></i>{' '}
                                    Explore
                                </a>
                            </li>
                        </Fragment>
                    )} */}
                    {/* <a className="cta" to="/register">
                        {/* <button type="button" className="nav-btn nav-icon" onClick={drawerClickHandler}>
                            Sell
                        </button> */}
                        
                    {/* </a> */} 
                    {/* <div className="mobile">
                        {backdrop ? (
                            <i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-times menu-btn nav-btn close" : "fas fa-times nav-btn menu-btn"} onClick={handleToggle}></i>
                        ) : (<i style={{fontSize:'1.5rem'}} className={backdrop ? "fas fa-bars nav-btn menu-btn close" : "fas fa-bars nav-btn menu-btn"} onClick={handleToggle}></i>
                        )}
                    </div> */}
                </div>
            </div>

            {nav.admin && (
                <div className="desktop">
                    <div className="nav">
                        {/* <div style={{margin:'0 20px 0 1rem', cursor:'pointer'}}>
                            <i style={{fontSize:'1rem'}} className="fas fa-bars"></i>
                        </div> */}
                            <div style={{height:'50px', width:'50px', borderRadius:'50%', overflow:'hidden'}}>
                                <img 
                                    alt="" 
                                    width="50" 
                                    height="50" 
                                    src="/api/stores/image/31687b0f26adb8cb27ab8ff7acbcbbf7.jpg"
                                />
                            </div>
                            <p style={{margin:'0 10px', color:'#808080'}}>Tommy Bahama</p>
                            <i style={{color:'#808080'}} className="fas fa-caret-down"></i>
                    </div>
                </div>
            )}

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
    nav: PropTypes.object.isRequired,
    reorderItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    nav: state.nav
})

export default connect(mapStateToProps, { reorderItems, logout })(Navbar);