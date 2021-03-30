import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../../actions/productActions';
import { setNav1, setPage, setMainNav } from '../../actions/navActions';
import { logout } from '../../actions/authActions';

import mixpanel from 'mixpanel-browser';

import ProfileCircle from '../../components/common/ProfileCircle';

import Footer from '../../components/layout/Footer/Footer';
import Spinner from '../../components/common/Spinner';

import AuthModal from '../../components/modals/AuthModal';
import HomeMain from '../../components/page_components/Home/HomeMain';

const MainMenu = ({
    product, 
    auth: { 
        user, 
        isAuthenticated, 
        loading
    }, 
    setMainNav,
    setNav1, 
    setPage,
    logout,
    location,
    history
}) => {

    const [skip, setSkip] = useState(0);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('');

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [initPage, setInitPage] = useState(false);
    
    useEffect(() => {
        setMainNav('store');
        setPage('menu');
        
    }, []);

    const handleMixpanel = () => {
        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.identify(user._id);
        mixpanel.track("View Menu Page");
    }

    if(!sentMixpanel && user !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }
        
    return (
        <div className="scroll-container clear">
            <div className="store-side-nav-container menu">
                {/* <a href="#"style={{paddingLeft:'1rem', display:'grid', gridTemplateColumns:'1fr 3fr 1fr'}}>
                    <div style={{display:'flex', padding:'0', justifyContent:'center', alignItems:'center'}}>
                        <ProfileCircle />
                    </div>
                    <div style={{padding:'5px 10px 0 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center', textAlign:'left'}}>
                        <h3 style={{margin:0}}>{user && user.name}</h3>
                        <p style={{margin:0}}>4.5 / 5 stars</p>
                    </div>
                    <div style={{display:'flex', padding:'0', color:'#808080', justifyContent:'center', alignItems:'center'}}>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </a> */}
                <a href="https://www.cardboardexpress.com/">
                    <div className="store-table-nav-items main">
                        <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'10px'}} className="fas fa-home"></i></span>Home</h3>
                    </div>
                </a>
                {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                    <h3>Payments</h3>
                    <p>Add payment methods</p>
                </div> */}
                <a href="https://www.cardboardexpress.com/explore">
                    <div className="store-table-nav-items main">
                        <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-compass"></i></span>Explore</h3>
                    </div>
                </a>
                
                {/* <div className="store-table-nav-items main" style={{padding:'0 16px 0 0'}}>
                    <div style={{width:'100%', display: 'flex',alignItems: 'center',justifyContent: 'flexStart',padding: '0 16px',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
                        <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-layer-group"></i>
                        <h3 style={{fontWeight:'600'}}>Categories</h3>
                    </div>
                    <i style={{color:'#808080', fontSize:'12px'}} class="fas fa-chevron-right"></i>
                </div> */}

                <Link to="/categories">
                    <div className="store-table-nav-items main">
                        <h3 style={{fontWeight:'600'}}>
                            <span>
                                <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-layer-group"></i>
                            </span>
                            Categories
                        </h3>
                    </div>
                </Link>
                
                <a href="https://www.cardboardexpress.com/profile/subscriptions">
                    <div className="store-table-nav-items main">
                        <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-compass"></i></span>Subscriptions</h3>
                    </div>
                </a>

                <a href="https://www.cardboardexpress.com/profile/saved">
                    <div className="store-table-nav-items main">
                        <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-heart"></i></span>Saved</h3>
                    </div>
                </a>

                <div style={{zIndex:'30', background:'#fff'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className="store-table-nav-items header-btn">
                        <h3 style={{fontWeight:'600', color:'#808080'}}>Account</h3>
                    </div>
                    <a href="https://www.cardboardexpress.com/profile">
                        <div className="store-table-nav-items main">
                            <h3 style={{fontWeight:'600'}}>
                                <span>
                                    <i style={{fontSize:'22px', marginRight:'10px'}} class="fas fa-user-circle"></i>
                                </span>
                                My Profile
                            </h3>
                        </div>
                    </a>
                    <a href="https://www.cardboardexpress.com/profile/settings">
                        <div className="store-table-nav-items main">
                            <h3 style={{fontWeight:'600'}}>
                                <span>
                                    <i style={{fontSize:'22px', marginRight:'10px'}} className="fas fa-cog"></i>
                                </span>
                                Settings
                            </h3>
                        </div>
                    </a>
                    {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                        <h3>Payments</h3>
                        <p>Add payment methods</p>
                    </div> */}
                    {/* <a href="https://www.cardboardexpress.com/history">
                        <div className="store-table-nav-items secondary">
                            <h3 style={{fontWeight:'600'}}>
                                <span>
                                    <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-history"></i>
                                </span>
                                View History
                            </h3>
                        </div>
                    </a>
                    
                    <a href="https://www.cardboardexpress.com/">
                        <div className="store-table-nav-items secondary">
                            <h3 style={{fontWeight:'600'}}>
                                <span>
                                    <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-question-circle"></i>
                                </span>
                                Help
                            </h3>
                        </div>
                    </a>
                    <a href="https://www.cardboardexpress.com/">
                        <div className="store-table-nav-items secondary">
                            <h3 style={{fontWeight:'600'}}>
                                <span>
                                    <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-flag"></i>
                                </span>
                                Send Feedback
                            </h3>
                        </div>
                    </a> */}
                    <a href="/" onClick={logout}>
                        <div className="store-table-nav-items secondary">
                            <h3 style={{fontWeight:'600'}}>
                                <span>
                                    <i style={{fontSize:'22px', marginRight:'1rem'}} class="fas fa-sign-out-alt"></i>
                                </span>
                                Logout
                            </h3>
                        </div>
                    </a>
                    <div className="store-table-nav-items header-btn"></div>
                </div>          
                <div style={{height:'auto', zIndex:'30', background:'#fff'}}></div>
            </div>
        </div>
    )
    
}

MainMenu.propTypes = {
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setMainNav: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth,
    nav: state.nav
});

export default connect(mapStateToProps, { 
    getCart, 
    setMainNav, 
    setNav1, 
    setPage,
    logout 
})(withRouter(MainMenu));