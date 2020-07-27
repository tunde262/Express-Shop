import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../../../actions/productActions';

import styled from 'styled-components';

import Spinner from '../../common/Spinner';
import ProductCard from './ProductCard';
import Title from '../../Title';

import { HorizontalNav } from '../../common/HorizontalNav';

class ProductOverviewItems extends Component {
    render() {
        const { products } = this.props;
        const { loading } = this.props.product;
        
        let productList;

        if(products === null || loading) {
            productList = <Spinner />;
        }
        else {
            if(products.length > 0) {
                productList = products.map(product => (
                    <div style={{margin:'0 1.5rem'}}>
                        <ProductCard key={product._id} product={product} />
                    </div>
                ))
            }
            else {
                productList = <Title name="No Products" title="Available" />
            }
        }

        return (
            <HorizontalNav style={{padding: '0 1rem'}} background="var(--body-color)">
                {productList}
            </HorizontalNav>
        )
    }
}

ProductOverviewItems.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, getCart })(ProductOverviewItems);