import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, categoryProducts } from '../actions/productActions';

import ReactGA from 'react-ga';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import ProductList from '../components/ProductList/ProductList';
import Container from '../components/ProductList/Container';

const CollectionPage = () => {

        return (
            <Fragment>
                <Header />
                <hr />
                <h1>Collection Page</h1>
                <Container title="Tops" category="tops" background="DeepSkyBlue" />
            </Fragment>
        )
}

Tops.propTypes = {
    getProducts: PropTypes.func.isRequired,
    categoryProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, categoryProducts })(Tops);
