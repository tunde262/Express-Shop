import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';

import Header from '../components/header/Header';
import CartOverview from '../components/Overview/cartOverview/CartOverview';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductList from '../components/ProductList/ProductList';
import Container from '../components/ProductList/Container';

class ProductPage extends Component {
    componentDidMount() {
        this.props.getProducts();
    } 
    
    render() {
        return (
            <Fragment>
                <Header />
                <hr />
                <Container />
            </Fragment>
        )
    }
}

ProductPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, getCart })(ProductPage);
