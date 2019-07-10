import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, categoryProducts } from '../actions/productActions';

import Header from '../components/header/Header';
import CartOverview from '../components/Overview/cartOverview/CartOverview';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductList from '../components/ProductList/ProductList';

class BrandPage extends Component {
    componentDidMount() {
        this.props.getProducts();
    } 
    
    render() {
        return (
            <Fragment>
                <Header />
                <hr />
                <h1 style={{margin: '15px 0 0 30px'}}>Forever21</h1>
                <CategoryOverview />
                <ProductList />
            </Fragment>
        )
    }
}

BrandPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts })(BrandPage);
