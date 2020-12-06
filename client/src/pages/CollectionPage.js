import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCollectionById, addView, getCollectionsByTagList } from '../actions/collectionActions';
import { getProductsInCollection } from '../actions/productActions';
import { setMainNav } from '../actions/navActions';

import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Footer from '../components/layout/Footer/Footer';
import Header from '../components/header/Header';
import Container from '../components/ProductList/Container';
import AuthModal from '../components/modals/AuthModal';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';
import CollectionHeader from '../components/page_components/collection/CollectionHeader';
import CollectionMain from '../components/page_components/collection/CollectionMain';

const CollectionPage = ({ 
    setMainNav,
    getCollectionById, 
    getCollectionsByTagList, 
    getProductsInCollection, 
    collection, 
    product, 
    addView,
    auth: { 
        user, 
        isAuthenticated, 
        loading 
    }, 
    match 
}) => {

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('shop');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Has view been added by profile if auth
    const [sentView, setSentView] = useState(false);


    useEffect( async () => {
        setMainNav('store');
        getCollectionById(match.params.id);

        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    if(!sentView && user && collection.collection) {
        addView(collection.collection._id)
        setSentView(true);
    }
    
    return (
        <Fragment>
            <div className="store-table-header" id="collection-header">
                <CollectionHeader setTableShow1={setTableShow1} tableShow1={tableShow1} />
            </div>
            <div className="store-table-body">
                <div style={{background:'rgb(247, 247, 247)'}}>
                    <CollectionMain setTableShow1={setTableShow1} tableShow1={tableShow1} />
                </div>
            </div>
            
            {/* <Footer /> */}
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </Fragment>
    )
}

CollectionPage.propTypes = {
    setMainNav: PropTypes.func.isRequired,
    getCollectionById: PropTypes.func.isRequired,
    addView: PropTypes.func.isRequired,
    getCollectionsByTagList: PropTypes.func.isRequired,
    getProductsInCollection: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { 
    setMainNav,
    getCollectionById, 
    addView, 
    getCollectionsByTagList, 
    getProductsInCollection  
})(CollectionPage);
