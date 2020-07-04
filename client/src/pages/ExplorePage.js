import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';
import logo from '../components/common/CE_logo.jpg';
import { Logo } from '../components/Logo';
import Container from '../components/ProductList/Container';

const ExplorePage = ({getProducts, product}) => {
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const { exploreTops, exploreBottoms, exploreHats, exploreSocks } = product;

    let productList;

    const { loading } = product;

    if(exploreTops === null || loading) {
        productList = <Spinner />;
    }
    else {
        productList = (
            <Fragment>

                <div style={{marginBottom: '-1rem'}}><Title title="Explore" /></div>
                <ProductOverview title="Tops" products={exploreTops} link="/top" />
                <ProductOverview title="Bottoms" products={exploreBottoms} link="/bottom" />
                <ProductOverview title="Hats" products={exploreHats} link="/hat" />
            </Fragment>
        );
    }
        
    return (
        <Fragment>
            {/* <Logo>
                <img src={logo} style={{maxHeight: '70px'}} alt="cardboard express logo" />
            </Logo> */}
            <Header />
            <Container title="Bottoms" category="bottoms" background="MediumSlateBlue"  />
        </Fragment>
    )
    
}

ExplorePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, getCart })(ExplorePage);
