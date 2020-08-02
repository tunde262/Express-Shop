import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByLocationId } from '../actions/productActions';
import { getLocationById } from '../actions/locationActions';

// Footer
import Footer from '../components/layout/Footer/Footer';

import Header from '../components/header/Header';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';
import Container from '../components/ProductList/Container';

const LocationPage = ({getProductsByLocationId, getLocationById, location, product: { products, loading }, history, match}) => {
    useEffect( async () => {
        getLocationById(match.params.id);
        getProductsByLocationId(match.params.id);
    }, [getLocationById, getProductsByLocationId]);

    const goBack = () => {
        history.goBack();
    }

    return (
        <Fragment>
            {location.loading && location.detailLocation === null ? <Spinner /> : (
                <Fragment>
                    {location.detailLocation !== null ? (
                        <Fragment>
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
                                        {location.detailLocation.img_name && <img style={{height: '35px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${location.detailLocation.img_name}`} alt="img" />}
                                        <h3 style={{color: "black"}}>{location.detailLocation.name}</h3>
                                    </div>
                                    <hr/>
                                    <p>
                                        {location.detailLocation.formatted_address}
                                    </p>
                                    <hr/>
                                </div>
                                <div class="store-main">
                                    <Header />
                                    <Container title="Bottoms" category="bottoms" background="MediumSlateBlue"  />
                                </div>
                            </div>
                            <Footer />
                        </Fragment>
                    ) : (
                        <h3>This location has not yet been added</h3>
                    )}
                </Fragment>
            )}
            
        </Fragment>
    )
    
}

LocationPage.propTypes = {
    getProductsByLocationId: PropTypes.func.isRequired,
    getLocationById: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    location: state.location
});

export default connect(mapStateToProps, { getProductsByLocationId, getLocationById })(LocationPage);
