import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../actions/productActions';
import { getStoreById } from '../actions/storeActions';

import mixpanel from 'mixpanel-browser';

import Footer from '../components/layout/Footer/Footer';
import Spinner from '../components/common/Spinner';
import StoreMain from '../components/page_components/store/StoreMain';
import DefaultBanner from '../utils/imgs/placeholderimg.jpg';
import Banner from '../components/common/Banner';


const StorePage = ({getStoreById, store, product: { products, sortedProducts, loading }, history, match}) => {
    const [toggleSocial, setToggleSocial] = useState(false);
    const [sentMixpanel, setSentMixpanel] = useState(false);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('shop');
    
    useEffect( async () => {
        getStoreById(match.params.id);
    }, []);

    const goBack = () => {
        history.goBack();
    }

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

    return (
        <div style={{marginTop:'75px'}}>
            {store.loading && store.store === null ? <Spinner /> : (
                <Fragment>
                    {store.store !== null ? (
                        <Fragment>  
                            {store !== null && <Banner imgLarge={DefaultBanner} imgSmall={DefaultBanner} />} 
                            <div class="store-header container-fluid">
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
                                                {store.store.social && (
                                                    <div className="social-container desktop" style={{marginLeft:'1rem'}}>
                                                        {store.store.social.instagram && <a href={`${store.store.social.instagram}`} className="social" target="_blank"><i class="fab fa-instagram"></i></a>}
                                                        {store.store.social.facebook && <a href={`${store.store.social.facebook}`} className="social" target="_blank"><i class="fab fa-facebook-f"></i></a>}
                                                        {store.store.social.twitter && <a href={`${store.store.social.twitter}`} className="social" target="_blank"><i class="fab fa-twitter"></i></a>}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <p style={{color:'#808080', fontWeight:'600'}}>Wholesaler</p>
                                        </div>
                                        <p id="store-description" className="desktop" style={{color:'#808080'}}>{store.store.description}</p>
                                        
                                        {/* <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} id="store-socials">
                                            <button style={{marginRight:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                Subscibe
                                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                                            </button>
                                            <svg style={{fill:'currentColor', strokeWidth:0, verticalAlign:'middle', color:'#333'}} height="20" width="20" viewBox="0 0 24 24" aria-label="Send" role="img"><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z"></path></svg>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="mobile" style={{marginBottom:'2rem'}}>
                                    <p style={{color:'#808080'}}>{store.store.description}</p>
                                </div>
                                <ul class="nav-underline store">
                                    <div onClick={e => setTableShow1('shop')} className={tableShow1 === "shop" && "active"}><li><i class="fas fa-shopping-bag"></i><p>Shop</p></li></div>
                                    {/* <div onClick={e => setTableShow1('review')} className={tableShow1 === "review" && "active"}><li><i class="fas fa-clipboard-list"></i><p>Reviews</p></li></div>
                                    <div onClick={e => setTableShow1('info')} className={tableShow1 === "info" && "active"}><li><i class="fas fa-info-circle"></i><p>Info</p></li></div> */}
                                </ul>
                                <hr/>
                            </div>
                            <StoreMain admin='false' />
                            {/* <Footer /> */}
                        </Fragment>
                    ) : (
                        // <h3>This store doesn't exist</h3>
                        <Spinner />
                    )}
                </Fragment>
            )}
        </div>
    )
    
}

StorePage.propTypes = {
    getStoreById: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    store: state.store
});

export default connect(mapStateToProps, { getStoreById, getCart })(StorePage);
