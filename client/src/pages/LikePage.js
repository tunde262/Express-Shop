import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLikedProducts } from '../actions/productActions';
import { getLikedCollections } from '../actions/collectionActions';
import { getStoreSubscriptions } from '../actions/storeActions';
import { setMainNav, setNav1 } from '../actions/navActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Spinner from '../components/common/Spinner';
import Container from '../components/ProductList/Container';
import AuthModal from '../components/modals/AuthModal';
import BrandOverview from '../components/Overview/brandOverview/BrandOverview';
import LikedCollections from '../components/explore_components/collections_featured/CollectionsList';

const LikePage = ({
    getLikedProducts, 
    getLikedCollections,
    getStoreSubscriptions, 
    setMainNav,
    setNav1, 
    profile, 
    collection,
    store, 
    product, 
    auth: { 
        user, 
        isAuthenticated, 
        loading
    }
}) => {
    const [skip, setSkip] = useState(0);
    const [tableShow1, setTableShow1] = useState('saved');

    useEffect(() => {
        setMainNav('store');
        if(user) {
            getStoreSubscriptions(user._id);
            getLikedCollections(user._id);
            getLikedProducts(user._id);
            setNav1('explore')
        }
    }, [user]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }
        
    return (
        <div className="collection-page-container">
            <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll', background:'#f7fafc'}}>
                <div style={{textAlign:'center', display:'flex', alignItems:' center', justifyContent:'center', marginTop:'1rem'}} class="container-fluid">
                    <i style={{color: '#ff4b2b', margin:'0 1rem', fontSize:'24px'}} className="fas fa-heart"></i>
                    <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.first_name}</h3>
                </div>
                <div style={{margin:'10px', background:'#fff', border: '1px solid #e3e8ee'}}>
                    <BrandOverview stores={store.subscriptions} profile={profile} />
                </div>

                {/* <div className="header-nav-container">
                    <div style={{padding:'10px 30px'}}>
                        <h5 style={{fontWeight:'300'}}>
                            My Collections
                        </h5>
                    </div>
                    <div style={{marginTop:'-2rem'}}>
                        <Header />
                    </div>
                </div> */}

                <LikedCollections collections={collection.collections} title="My Collections" />
                
                <div className="product-list-container">
                    <div style={{padding:'10px 30px'}}>
                        <h5 style={{fontWeight:'300'}}>
                            Favorites
                        </h5>
                    </div>
                    <Container />
                </div>
            </div>
            {/* <Footer /> */}
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </div>
    )
    
}

LikePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    getStoreSubscriptions: PropTypes.func.isRequired,
    getLikedProducts: PropTypes.func.isRequired,
    getLikedCollections: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setMainNav: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth,
    store: state.store,
    profile: state.profile,
    collection: state.collection
});

export default connect(mapStateToProps, { 
    getLikedProducts, 
    getLikedCollections,
    getStoreSubscriptions, 
    setMainNav,
    setNav1 
})(LikePage);
