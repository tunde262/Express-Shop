import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../../actions/productActions';

import Spinner from '../common/Spinner';
import ProductCard from '../Overview/productOverview/ProductCard';
import Title from '../Title';

const ProductList = ({products, page, product, auth: { user }, handleScroll}) => {
 
    const { loading } = product;
    
    let productList;

    if(products === null || loading) {
        productList = <Spinner />;
    }
    else {
        if(products.length > 0) {
            productList = products.map(product => {
                return (
                    <ProductCard key={product._id} product={product} />
                )
            })
        }
        else {
            // productList = <Title name="No Products" title="Available" />
            productList = <p>Sorry no items...</p>;
        }
    }

    let addBlock = null;

    if (page) {
        if(page === "collection") {
            addBlock = (
                <div className="add-to-list">
                    <i class="fas fa-plus"></i>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <div style={{padding: '0', display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                {addBlock}
                {productList}
            </div>
        </Fragment>
    )
}

ProductList.propTypes = {
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, null)(ProductList);
