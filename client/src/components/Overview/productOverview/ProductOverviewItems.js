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
        
        let productList;

        if(products === null) {
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
            <HorizontalNav style={{padding: '0 15px'}} background="var(--body-color)">
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