import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCollectionById, getCollectionsByTagList } from '../actions/collectionActions';
import { getProductsInCollection } from '../actions/productActions';

import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Footer from '../components/layout/Footer/Footer';
import Header from '../components/header/Header';
import Container from '../components/ProductList/Container';
import AuthModal from '../components/modals/AuthModal';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';
import CollectionHeader from '../components/page_components/collection/CollectionHeader';
import CollectionMain from '../components/page_components/collection/CollectionMain';

const CollectionPage = ({ getCollectionById, getCollectionsByTagList, getProductsInCollection, collection, product, auth: { user, isAuthenticated, loading },  match }) => {

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('shop');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect( async () => {
        getCollectionById(match.params.id);

        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    
    
    return (
        <Fragment>
            <div className="store-table-header" style={{padding:'20px 20px 0 20px'}}>
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
    getCollectionById: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getCollectionById, getCollectionsByTagList, getProductsInCollection  })(CollectionPage);
