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
                if(product) {
                    return (
                        <ProductCard key={product._id} page={page} product={product} />
                    )
                }
            })
        }
        else {
            // productList = <Title name="No Products" title="Available" />
            productList = (
                <div className="no-rides">
                    <h1>No Products</h1>
                    {page && page === "admin" ? (
                        <h2>
                            Sorry this store is not currently selling anything.{' '} 
                            <a href="#"> Add Product</a>
                        </h2> 
                    ) : (
                        <h2>
                            Sorry we could't find anything. 
                        </h2> 
                    )}
                </div>
            );
        }
    }

    let addBlock = null;

    if (page && products.length > 0) {
        if(page === "collection" || page === "admin") {
            addBlock = (
                <div className="add-to-list">
                    <i class="fas fa-plus"></i>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <div style={{padding: '0', display:'flex', borderRadius:'6px', overflow:'hidden', justifyContent:'center', flexWrap:'wrap'}}>
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
