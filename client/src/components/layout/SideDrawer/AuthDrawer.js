import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/authActions';
import { getCurrentProfile, deleteAccount } from '../../../actions/profileActions';

import ProductSideDrawer from '../../admin/pages/page_components/product/SideDrawerProduct';
import CollectionSideDrawer from '../../admin/pages/page_components/collection/SideDrawerCollection';
import LocationSideDrawer from '../../admin/pages/page_components/location/SideDrawerLocation';

import './CartDrawer.css';
import paper_towels from '../../../utils/imgs/paper_towels.jpeg';

const AuthDrawer = ({ drawerClickHandler, toggleAuthDrawer, getCurrentProfile, deleteAccount, nav, store, profile: { profile }, auth: { isAuthenticated, user, loading }, logout, show, match}) => {

    const [slideForm1, setSlideForm1] = useState(false);

    const [detailPage, setDetailPage] = useState(false);
    const [checkDetail, setCheckDetail] = useState(false);

    if (!checkDetail && !nav.loading) {
        if(nav.page === 'admin detail product' || nav.page === 'admin detail location' || nav.page === 'admin detail collection' || nav.page === 'admin detail order'){
            setDetailPage(true);
            setCheckDetail(true);
            setSlideForm1(true);
        }
    }

    const toggleAuth = () => {
        toggleAuthDrawer();
    }

    const handleSlideAuth = () => {
        setDetailPage(false);
        handleSlide();
    }

    const handleSlideList = () => {
        setDetailPage(true);
        handleSlide();
    }

    const handleSlide = () => {
        setSlideForm1(!slideForm1);
    }

    let detailDrawer;
    if(store.store && detailPage) {
        if(nav.page === 'admin detail product') {
            detailDrawer = <ProductSideDrawer setSlideForm1={setSlideForm1} storeId={store.store._id} />;
        } else if (nav.page === 'admin detail collection') {
            detailDrawer = <CollectionSideDrawer setSlideForm1={setSlideForm1} storeId={store.store._id} />;
        } else if (nav.page === 'admin detail location') {
            detailDrawer = <LocationSideDrawer setSlideForm1={setSlideForm1} storeId={store.store._id} />;
        } else {
            detailDrawer = null;
        }
    }

    let drawerClasses = 'cart-drawer';
    if (show) {
        drawerClasses = 'cart-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <div className="detail-settings-transition">
                {/** Transition 1 */}
                <div className={!slideForm1 ? "admin-nav-drawer active" : "admin-nav-drawer"} id="transition-1">
                    {detailPage && (
                        <div style={{display:'flex', justifyContent:'flex-end'}} className="slide-item" onClick={handleSlideList}>
                            <div>
                                <p style={{margin:'0', color:'#ff4b2b'}}>View products<span style={{margin:'0 10px'}}><i className="fas fa-arrow-right"></i></span></p>
                            </div>
                        </div>
                    )}
                    <a onClick={handleSlideAuth} href="#"style={{paddingLeft:'1rem', display:'grid', gridTemplateColumns:'1fr 3fr 1fr'}}>
                        <div style={{display:'flex', padding:'0', justifyContent:'center', alignItems:'center'}}>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'40px', height:'40px', borderRadius:'50%', background:'#ececec', border:'2px solid #ff4b2b'}}>
                                <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                            </div>
                        </div>
                        <div style={{padding:'5px 10px 0 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'left'}}>
                            <h3 style={{margin:0}}>{user && user.name}</h3>
                            <p style={{margin:0}}>4.5 / 5 stars</p>
                        </div>
                        <div style={{display:'flex', padding:'0', color:'#808080', justifyContent:'center', alignItems:'center'}}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </a>
                    <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=store`}>
                        <div className="profile-table-nav-items active">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                <h3>Store</h3>
                                <p>Track, manage, & return</p>
                            </div>
                        </div>
                    </a>
                    <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=inventory`}>
                        <div className="profile-table-nav-items">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                <h3>Inventory</h3>
                                <p>Track, manage, & return</p>
                            </div>
                        </div>
                    </a>
                    <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=orders`}>
                        <div className="profile-table-nav-items">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                <h3>Orders</h3>
                                <p>Track, manage, & return</p>
                            </div>
                        </div>
                    </a>
                    <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=people`}>
                        <div className="profile-table-nav-items">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                <h3>People</h3>
                                <p>Track, manage, & return</p>
                            </div>
                        </div>
                    </a>
                    <a onClick={toggleAuth} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=settings`}>
                        <div className="profile-table-nav-items">
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                <h3>Settings</h3>
                                <p>Track, manage, & return</p>
                            </div>
                        </div>
                    </a>
                </div>
                {/** Transition 2 */}
                <div className={slideForm1 ? "admin-nav-drawer active" : "admin-nav-drawer"} id="transition-2">
                    {!detailPage ? (
                        <Fragment>
                            <div className="slide-item" onClick={() => setSlideForm1(!slideForm1)}>
                                <div>
                                    <p style={{margin:'0', color:'#808080'}}><span style={{margin:'0 10px'}}><i className="fas fa-arrow-left"></i></span>Back to menu</p>
                                </div>
                            </div>
                            <a onClick={toggleAuth} href={`https://www.cardboardexpress.com/profile/saved`}>
                                <div className="profile-table-nav-items active">
                                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                        <h3>Exit Dashboard</h3>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div className="profile-table-nav-items">
                                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                        <h3>Logout</h3>
                                    </div>
                                </div>
                            </a>
                        </Fragment>
                    ) : (
                        (store.store && detailPage ? detailDrawer : null)
                        
                    )}
                </div>
            </div>
            {/* <i onClick={toggleSideDrawer} style={{color:'#cecece', margin:'1rem', fontSize:'1rem'}} className="fas fa-arrow-left"></i> */}
        </nav>
    )
}

AuthDrawer.propTypes = {
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, logout })(AuthDrawer);
