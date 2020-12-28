import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { getCurrentProfile, deleteAccount } from '../../../actions/profileActions';

import './SideDrawer.css';
import paper_towels from '../../../utils/imgs/paper_towels.jpeg';

const SideDrawer = ({ drawerClickHandler, toggleCartDrawer, toggleAuthDrawer, store, getCurrentProfile, deleteAccount, profile: { profile }, auth: { isAuthenticated, loading }, logout, show}) => {
    // useEffect(() => {
    //     getCurrentProfile();
    // }, [getCurrentProfile]);

    // const [cart, toggleCart] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    // show dropdown submenu
    const [activeMenu, setActiveMenu] = useState('main');
    // dropdown height
    const [menuHeight, setMenuHeight] = useState(null);
    
    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }

    const toggleCart = () => {
        drawerClickHandler();
        toggleCartDrawer();
    }

    const toggleAuth = () => {
        drawerClickHandler();
        toggleAuthDrawer();
    }

    let drawerClasses = 'cart-drawer';
    if (show) {
        drawerClasses = 'cart-drawer open';
    }

    const authLinks = (
        <ul className={drawerClasses}>
            <li onClick={drawerClickHandler}>
                <a href={`https://www.cardboardexpress.com/home`}>
                    <i className="fas fa-home"></i>
                </a>
            </li>
            {/* <li onClick={drawerClickHandler}>
                <Link to="/explore">
                    <i className="far fa-compass"></i>
                </Link>
            </li> */}
            <li onClick={toggleAuth}>
                <a href="#">
                    <i className="fas fa-user-circle"></i>
                </a>
            </li>
            <li onClick={toggleCart}>
                <a href="#">
                    <i className="fas fa-shopping-cart"></i>
                </a>
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


    return (
        <nav className={drawerClasses}>
            <div className="admin-nav-drawer">
                {/* <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=people`}>
                    <div className="profile-table-nav-items">
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3>Create Order</h3>
                        </div>
                    </div>
                </a> */}
                <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=store`}>
                    <div className="profile-table-nav-items active">
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3>Add Item</h3>
                        </div>
                    </div>
                </a>
                <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=inventory`}>
                    <div className="profile-table-nav-items">
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3>New Collection</h3>
                        </div>
                    </div>
                </a>
                <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=orders`}>
                    <div className="profile-table-nav-items">
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                            <h3>New Location</h3>
                        </div>
                    </div>
                </a>
            </div>
            {/* <div style={{display:'flex'}}>
                { !loading && (<Fragment>{authLinks}</Fragment>) } */}
                {/* <div style={{margin:'0 0 0 1rem', width:'100%',}}>
                    <button style={{marginBottom:'1rem'}}>Checkout</button>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridGap:'10px', height:'100px', width:'100%', padding:'10px', alignItems:'center', borderBottom:'1px solid #cecece'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <i style={{color:'#ff4b2b'}} className="fas fa-chevron-up"></i>
                            <p>2</p>
                            <i style={{color:'#cecece'}} className="fas fa-chevron-down"></i>
                        </div>
                        <img style={{height: '100%'}} src={paper_towels} alt="img" />
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <p>$2.42</p>
                        </div>
                        <i style={{color:'#ff4b2b'}} className="fas fa-times"></i>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridGap:'10px', height:'100px', width:'100%', padding:'10px', alignItems:'center', borderBottom:'1px solid #cecece'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <i style={{color:'#ff4b2b'}} className="fas fa-chevron-up"></i>
                            <p>2</p>
                            <i style={{color:'#cecece'}} className="fas fa-chevron-down"></i>
                        </div>
                        <img style={{height: '100%'}} src={paper_towels} alt="img" />
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <p>$2.42</p>
                        </div>
                        <i style={{color:'#ff4b2b'}} className="fas fa-times"></i>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridGap:'10px', height:'100px', width:'100%', padding:'10px', alignItems:'center', borderBottom:'1px solid #cecece'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <i style={{color:'#ff4b2b'}} className="fas fa-chevron-up"></i>
                            <p>2</p>
                            <i style={{color:'#cecece'}} className="fas fa-chevron-down"></i>
                        </div>
                        <img style={{height: '100%'}} src={paper_towels} alt="img" />
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <p>$2.42</p>
                        </div>
                        <i style={{color:'#ff4b2b'}} className="fas fa-times"></i>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridGap:'10px', height:'100px', width:'100%', padding:'10px', alignItems:'center', borderBottom:'1px solid #cecece'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <i style={{color:'#ff4b2b'}} className="fas fa-chevron-up"></i>
                            <p>2</p>
                            <i style={{color:'#cecece'}} className="fas fa-chevron-down"></i>
                        </div>
                        <img style={{height: '100%'}} src={paper_towels} alt="img" />
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <p>$2.42</p>
                        </div>
                        <i style={{color:'#ff4b2b'}} className="fas fa-times"></i>
                    </div>
                </div> */}
            {/* </div> */}
        </nav>
    )
}

SideDrawer.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, logout })(SideDrawer);
