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
                                
                                <div style={{display: 'flex', flexDirection:'column', textAlign: 'center', justifyContent:'center', boxSizing:'border-box'}}>
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
                                    <div style={{maxWidth:'600px'}}>
                                        <h1 id="sub-heading">{store.store.description}</h1>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <StoreMain admin='false' />
                            <Footer />
                        </Fragment>
                    ) : (
                        <h3>This store doesn't exist</h3>
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
