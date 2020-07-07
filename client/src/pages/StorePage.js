import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByStoreId, getCart } from '../actions/productActions';
import { getStoreById } from '../actions/storeActions';

import Header from '../components/header/Header';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';
import Container from '../components/ProductList/Container';

const StorePage = ({getProductsByStoreId, getStoreById, store, product: { products, loading }, history, match}) => {
    useEffect( async () => {
        getStoreById(match.params.id);
        getProductsByStoreId(match.params.id);
    }, [getStoreById, getProductsByStoreId]);

    const goBack = () => {
        history.goBack();
    }

    return (
        <Fragment>
            {store.loading && store.store === null ? <Spinner /> : (
                <Fragment>
                    {store.store !== null ? (
                        <div id="store-content-wrapper">
                            <div id="breadcrumb">
                                <nav className="breadcrumb">
                                    <ol>
                                        <li><b>My Portfolio</b></li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="store-header container-fluid">
                                <div style={{display: 'flex'}}>
                                    {store.store.img_name && <img style={{height: '35px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.store.img_name}`} alt="img" />}
                                    <h3 style={{color: "black"}}>{store.store.name}</h3>
                                </div>
                                <hr/>
                                <div style={{display: 'flex'}} className="p-1">
                                    {store.store.tags.map( (tag, index) => (  
                                        <Fragment key={index}>
                                            <i className="fas fa-check"></i>
                                            <p> {tag}</p>
                                        </Fragment>
                                    ))}
                                </div>
                                <hr/>
                            </div>
                            <div class="store-main">
                                <Header />
                                <Container title="Bottoms" category="bottoms" background="MediumSlateBlue"  />
                            </div>
                        </div>
                    ) : (
                        <h3>This store doesn't exist</h3>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
    
}

StorePage.propTypes = {
    getProductsByStoreId: PropTypes.func.isRequired,
    getStoreById: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    store: state.store
});

export default connect(mapStateToProps, { getProductsByStoreId, getStoreById, getCart })(StorePage);
