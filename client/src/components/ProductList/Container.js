import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';


import ProductList from './ProductList';
import CategoryOverview from '../Overview/categoryOverview/CategoryOverview';
import Spinner from '../common/Spinner';
import Title from '../Title';

const Container = ({ product, getProducts, page }) => {

    const { products, sortedProducts, loading } = product;

    // const header = this.props.title;
    
    let productList;

    if(products === null || loading) {
        productList = <Spinner />;
    }
    else {
        productList = (
            <Fragment>
                {/* <CategoryOverview products={products} category={this.props.category} background={this.props.background} /> */}
                {/* <div style={{marginBottom: '-3rem'}}><Title title={header} /></div> */}
                <ProductList page={page} products={sortedProducts} />
                {/* <Spinner /> */}
            </Fragment>
        );
    }

    return (
        <Fragment>
            {productList}
        </Fragment>
    )
}

Container.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts })(Container);
