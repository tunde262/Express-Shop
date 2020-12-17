import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SubscriptionsElement from './Subs_Element';
import ExtrasElement from './Extras_Element';
import CollectionsElement from './Collections_Element';

import { setPage } from '../../../actions/navActions';
import { getCollectionsByIdList } from '../../../actions/collectionActions';
import { getProfileSubscriptions } from '../../../actions/profileActions';

const Main_Store_Nav = ({
    setCollectionModal,
    displayCollectionModal,
    setSlideForm1, 
    slideForm1, 
    setPage, 
    getCollectionsByIdList,
    getProfileSubscriptions,
    nav: { 
        page,
        main
    },
    auth: {
        user
    },
    profile,
    setNavValue,
    navValue
}) => {
    // Page
    const [navHighlight, setNavHighlight] = useState(null);
    const [navHighlight2, setNavHighlight2] = useState(null);

    useEffect(() => { 
        if(page === 'home') {
            setNavHighlight('home');
        }
        if(page === 'explore') {
            setNavHighlight('explore');
        }

        if(page === 'profile') {
            setNavHighlight('profile');
            setSlideForm1(true);
        }

        if(main === 'admin') {
            setNavValue('admin')
        }

        if(profile.profile) {
            getCollectionsByIdList(profile.profile.categories);
        }

        if(user) {
            getProfileSubscriptions(user._id);
        }  
    }, [page, main, profile.profile])

    const todo = (page) => {
        setNavHighlight(page);
        setPage(page);
    }

    const toggleCategory = () => {
        setNavHighlight2('category');
        setNavValue('category');
        setSlideForm1(!slideForm1);
        setTimeout(() => {
            setNavHighlight2(null);
        }, 1000);
    }

    const toggleProfile = (page) => {
        setPage(page);
        setNavHighlight(page);
        setNavValue(page);
        setSlideForm1(!slideForm1);
    }

    const handleBackSlide = (page) => {
        setNavValue(page);
        setSlideForm1(!slideForm1);
    }

    return (
        <Fragment>
            {page === 'profile' && (
                <div className="slide-btn" style={{justifyContent: 'flex-end'}} onClick={() => handleBackSlide('profile')}>
                    <p style={{margin:'0', color:'#808080'}}>View Settings<span style={{margin:'0 0 0 10px'}}><i className="fas fa-arrow-right"></i></span></p>
                </div>
            )}
            <a href="https://www.cardboardexpress.com/home" onClick={() => todo('home')}>
                <div className={navHighlight === "home" ? "store-table-nav-items main active" : "store-table-nav-items main"}>
                    <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'10px'}} className="fas fa-home"></i></span>Home</h3>
                </div>
            </a>
            {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                <h3>Payments</h3>
                <p>Add payment methods</p>
            </div> */}
            <a href="https://www.cardboardexpress.com/explore" onClick={() => todo('explore')}>
                <div className={navHighlight === "explore" ? "store-table-nav-items main active" : "store-table-nav-items main"}>
                    <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-compass"></i></span>Explore</h3>
                </div>
            </a>
            
            <div onClick={toggleCategory} className={navHighlight2 === "category" ? "store-table-nav-items main active": "store-table-nav-items main"} style={{padding:'0 16px 0 0'}}>
                <div style={{width:'100%', display: 'flex',alignItems: 'center',justifyContent: 'flexStart',padding: '0 16px',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
                    <i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-layer-group"></i>
                    <h3 style={{fontWeight:'600'}}>Categories</h3>
                </div>
                <i style={{color:'#808080', fontSize:'12px'}} class="fas fa-chevron-right"></i>
            </div>
            
            <SubscriptionsElement />
            
            <CollectionsElement setCollectionModal={setCollectionModal} displayCollectionModal={displayCollectionModal} />

            <div style={{zIndex:'30', background:'#fff'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}} className="store-table-nav-items header-btn">
                    <h3 style={{fontWeight:'600', color:'#808080'}}>Account</h3>
                </div>
                <a href="https://www.cardboardexpress.com/profile/settings">
                    <div onClick={() => toggleProfile('profile')} className={navHighlight === "profile" ? "store-table-nav-items main active" : "store-table-nav-items main"}>
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
                <a href="https://www.cardboardexpress.com/">
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
                </a>
                <div className="store-table-nav-items header-btn"></div>
            </div>          
            <div style={{height:'auto', zIndex:'30', background:'#fff'}}></div>
        </Fragment>
    )
}

Main_Store_Nav.propTypes = {
    setPage: PropTypes.func.isRequired,
    getCollectionsByIdList: PropTypes.func.isRequired,
    getProfileSubscriptions: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    nav: state.nav,
    profile: state.profile
});

export default connect(mapStateToProps, { setPage, getCollectionsByIdList, getProfileSubscriptions })(Main_Store_Nav);
