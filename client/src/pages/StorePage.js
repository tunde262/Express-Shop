import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../actions/productActions';
import { getStoreById } from '../actions/storeActions';

import Footer from '../components/layout/Footer/Footer';
import Spinner from '../components/common/Spinner';
import StoreMain from '../components/page_components/store/StoreMain';

const StorePage = ({getStoreById, store, product: { products, loading }, history, match}) => {
    useEffect( async () => {
        getStoreById(match.params.id);
    }, []);

    const goBack = () => {
        history.goBack();
    }

    return (
        <div style={{marginTop:'75px'}}>
            {store.loading && store.store === null ? <Spinner /> : (
                <Fragment>
                    {store.store !== null ? (
                        <Fragment>   
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
                                <div style={{display: 'flex', flexDirection:'column', textAlign: 'center', alignItems:'center', justifyContent:'center', boxSizing:'border-box'}}>
                                    {store.store.img_name && <img style={{height: '120px', width:'120px', margin: '1rem', borderRadius: '50%'}} src={`/api/stores/image/${store.store.img_name}`} alt="img" />}
                                    <h3 style={{color: "black"}}>{store.store.name}</h3>
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
