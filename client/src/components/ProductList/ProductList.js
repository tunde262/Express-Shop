import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../../actions/productActions';

import Spinner from '../common/Spinner';
import ProductCard from '../Overview/productOverview/ProductCard';
import Title from '../Title';

const ProductList = ({products, product, handleScroll}) => {
 
    const { loading } = product;
    
    let productList;

    if(products === null || loading) {
        productList = <Spinner />;
    }
    else {
        if(products.length > 0) {
            productList = products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))
        }
        else {
            productList = <Title name="No Products" title="Available" />
        }
    }

    return (
        <Fragment>
            <div style={{padding: '0 30px'}} className="py-5">
                <div className="row">
                    {productList}
                </div>
            </div>
        </Fragment>
    )
}

ProductList.propTypes = {
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, null)(ProductList);
