import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../actions/productActions';
import { favorite, addView, getStoreById } from '../actions/storeActions';
import { getProfileSubscriptions } from '../actions/profileActions';
import { setMainNav } from '../actions/navActions';

import mixpanel from 'mixpanel-browser';

import Footer from './Home/Footer';
import AuthModal from '../components/modals/AuthModal';

import Spinner from '../components/common/Spinner';
import StoreMain from '../components/page_components/store/StoreMain';
import DefaultBanner from '../utils/imgs/placeholderimg.jpg';
import Banner from '../components/common/Banner';


const StorePage = ({
    getStoreById, 
    setMainNav,
    getProfileSubscriptions, 
    favorite, 
    addView,
    profile, 
    store, 
    product: { 
        products, 
        sortedProducts, 
        loading 
    }, 
    auth, 
    history, 
    match
}) => {
    const [toggleSocial, setToggleSocial] = useState(false);
    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [subscribedToo, setSubscribedToo] = useState(false);
    const [checkSub, setCheckSub] = useState(false);

    // Has view been added by profile if auth
    const [sentView, setSentView] = useState(false);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('shop');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    
    useEffect( async () => {
        setMainNav('store');
        getStoreById(match.params.id);
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    if(!userLoaded && auth.user) {
        // getProfileSubscriptions(user._id);
        setUserLoaded(true);
    }  

    const goBack = () => {
        history.goBack();
    }

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleMixpanel = () => {
        mixpanel.track("Store Page View", {
        //   "Entry Point": "Home Landing",
          "# of Results Returned": products.length,
          "Store Name": store.store.name,
        //   "Store Category": store.store.category,
          "Store ID": store.store._id,
        });
    }

    if(!sentMixpanel && store.store !== null && !loading && products.length > 0) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    const handleSubscribe= (detailStore) => {
        if (profile.profile) {
            favorite(detailStore._id, auth.user._id);
            setSubscribedToo(!subscribedToo);

            // Check if product already liked by same user
            if(detailStore.favorites.filter(favorite => favorite.user.toString() === auth.user._id).length > 0) {
                mixpanel.track("Store Un-Bookmark", {
                    "Store Name": detailStore.name,
                    "Store Category": detailStore.category,
                    // "Store Rating": cartIds,
                    "Total Favorites": detailStore.favorites.length - 1,
                    "Total Reviews": detailStore.reviews.length,
                    "Store ID": detailStore._id,
                });
                
                mixpanel.people.increment("Saved Stores", -1);
            } else {
                mixpanel.track("Store Bookmark", {
                    "Store Name": detailStore.name,
                    "Store Category": detailStore.category,
                    // "Store Rating": cartIds,
                    "Total Favorites": detailStore.favorites.length + 1,
                    "Total Reviews": detailStore.reviews.length,
                    "Store ID": detailStore._id,
                });
                
                mixpanel.people.increment("Saved Stores");
            }
        }
    }



    const isMobile = windowWidth <= 769;

    if(!sentView && auth.user && store.store) {
        addView(store.store._id)
        setSentView(true);
    }

    if(userLoaded && profile.subscriptions.length > 0 && !checkSub) {
        profile.subscriptions.map(subscription => {
            if (subscription._id === match.params.id.toString()) {
                setSubscribedToo(true);
            }
        })
        
        setCheckSub(true);
    }  

    return (
        <div style={{marginTop:'10px', background:'rgb(247, 247, 247)'}}>
            {store.loading && store.store === null ? <Spinner /> : (
                <div className="store-page-container">
                    {store.store !== null ? (
                        <Fragment>  
                            {store !== null && <Banner imgLarge={DefaultBanner} imgSmall={DefaultBanner} />} 
                            <div>
                                {/* <div id="breadcrumb">
                                    <nav className="breadcrumb">
                                        <ol>
                                            <li style={{display: 'flex'}}>
                                                <Link to="/stores">Stores</Link>{' '}
                                                <p style={{margin:'0 5px'}}> /
                                                    <span style={{fontWeight:'bold'}}>
                                                        {' '}
                                                        {store.store.name}
                                                    </span>
                                                </p>
                                            </li>
                                        </ol>
                                    </nav>
                                </div> */}
                                <div className="store-header">
                                    <div style={{display: 'flex', boxSizing:'border-box'}}>
                                        {store.store.img_name && <img className="store-img" src={`/api/stores/image/${store.store.img_name}`} alt="img" />}
                                        {/* <div style={{display:'flex'}}>
                                            <h3 style={{color: "black"}}>{store.store.name}</h3>
                                            {store.store.social && (
                                                <div  class="social" onClick={() => setToggleSocial(!toggleSocial)}>
                                                    <i className={toggleSocial ? "fas fa-minus social-toggle" : "fas fa-plus social-toggle"}></i>
                                                    <div className={toggleSocial ? "social-drop social-drop-show" : "social-drop social-drop-hide"}>
                                                        <ul>
                                                            {store.store.social.twitter && <a href={`${store.store.social.twitter}`} target="_blank"><li class="fa fa-twitter tw"></li></a>}
                                                            {store.store.social.facebook && <a href={`${store.store.social.facebook}`} target="_blank"><li class="fab fa-facebook"></li></a>}
                                                            {store.store.social.instagram && <a href={`${store.store.social.instagram}`} target="_blank"><li class="fab fa-instagram"></li></a>}
                                                            {store.store.social.youtube && <a href={`${store.store.social.youtube}`} target="_blank"><li class="fab fa-youtube"></li></a>}
                                                        </ul>
                                                        
                                                    </div>
                                                </div>
                                            )}
                                        </div> */}
                                        <div className="store-details">
                                            <div id="store-titles">
                                                <div style={{display:'flex', alignItems:'center'}}>
                                                    <h2 className="store-title">{store.store.name}</h2>
                                                    {store.store.social && !isMobile ? (
                                                        <div className="social-container desktop" style={{marginLeft:'1rem'}}>
                                                            {store.store.social.instagram && <a href={`${store.store.social.instagram}`} className="social" target="_blank"><i class="fab fa-instagram"></i></a>}
                                                            {store.store.social.facebook && <a href={`${store.store.social.facebook}`} className="social" target="_blank"><i class="fab fa-facebook-f"></i></a>}
                                                            {store.store.social.twitter && <a href={`${store.store.social.twitter}`} className="social" target="_blank"><i class="fab fa-twitter"></i></a>}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                
                                                <p style={{color:'#808080', fontWeight: '600'}}>Clothing & Fashion</p>
                                            </div>
                                            <div style={{maxHeight:'30px', overflow:'hidden', lineHeight:'15px'}} id="store-description">
                                                <p className="line-clamp desktop" style={{color:'#808080', fontFamily:' Arial, Helvetica,sans-serif'}}>{store.store.description}</p>
                                            </div>
                                            
                                            <div className="store-socials desktop" id="store-socials">
                                                {subscribedToo ? (
                                                    <button 
                                                        className="active"
                                                        onClick={() => handleSubscribe(store.store)}
                                                    >
                                                        Subscribed
                                                        <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSubscribe(store.store)}
                                                    >
                                                        Subscribe
                                                        <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                                                    </button>
                                                )}
                                                <div style={{border:'1px solid #0098d3', background:'#0098d3', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center', height:'40px', width:'35px', borderRadius:'5px'}}>
                                                    <i class="fas fa-ellipsis-v"></i>
                                                </div>
                                                {/* <svg style={{fill:'currentColor', strokeWidth:0, verticalAlign:'middle', color:'#333'}} height="20" width="20" viewBox="0 0 24 24" aria-label="Send" role="img"><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z"></path></svg> */}
                                            </div>
                                        </div>
                                    </div>
                                    {isMobile && (
                                        <Fragment>
                                            <div style={{maxHeight:'40px', overflow:'hidden', lineHeight:'15px'}} id="store-description-mobile">
                                                <p className="line-clamp" style={{color:'#808080', fontFamily:' Arial, Helvetica,sans-serif'}}>{store.store.description}</p>
                                            </div>
                                            <div className="store-socials" id="store-socials-mobile">
                                                {subscribedToo ? (
                                                    <button 
                                                        className="active"
                                                        onClick={() => handleSubscribe(store.store)}
                                                    >
                                                        Subscribed
                                                        <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSubscribe(store.store)}
                                                    >
                                                        Subscribe
                                                        <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                                                    </button>
                                                )}
                                                <div style={{border:'1px solid #0098d3', fontSize:'1.3rem', color:'#0098d3', display:'flex', justifyContent:'center', alignItems:'center', height:'40px', width:'55px', borderRadius:'5px', marginLeft:'10px'}}>
                                                    <i class="fab fa-instagram"></i>
                                                </div>
                                                <div style={{border:'1px solid #0098d3', background:'#0098d3', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center', height:'40px', width:'35px', borderRadius:'5px'}}>
                                                    <i class="fas fa-ellipsis-v"></i>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                                <ul class="profile-underline store">
                                    <div onClick={e => setTableShow1('shop')} className={tableShow1 === "shop" && "active"}><li><i class="fas fa-shopping-bag"></i><p>Shop</p></li></div>
                                    {/* <div onClick={e => setTableShow1('info')} className={tableShow1 === "info" && "active"}><li><i class="fas fa-info-circle"></i><p>Info</p></li></div> */}
                                    <div onClick={e => setTableShow1('related')} className={tableShow1 === "related" && "active"}><li><i class="fas fa-clipboard-list"></i><p>Related</p></li></div>
                                </ul>
                            </div>
                            <div className="product-list-container">
                                <StoreMain tableShow1={tableShow1} setTableShow1={setTableShow1} admin='false' />
                            </div>
                            <Footer />
                        </Fragment>
                    ) : (
                        // <h3>This store doesn't exist</h3>
                        <Spinner />
                    )}
                </div>
            )}
            
            {!auth.loading && !auth.isAuthenticated ? <AuthModal /> : null }
        </div>
    )
    
}

StorePage.propTypes = {
    getStoreById: PropTypes.func.isRequired,
    setMainNav: PropTypes.func.isRequired,
    getProfileSubscriptions: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    favorite: PropTypes.func.isRequired,
    addView: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    store: state.store,
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { 
    getStoreById, 
    setMainNav,
    getProfileSubscriptions, 
    getCart, 
    favorite,
    addView 
})(StorePage);
