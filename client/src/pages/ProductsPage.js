import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';

import ReactGA from 'react-ga';

import Header from '../components/header/Header';
import CartOverview from '../components/Overview/cartOverview/CartOverview';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductList from '../components/ProductList/ProductList';
import Container from '../components/ProductList/Container';
import logo from '../components/common/CE_logo.jpg';
import { Logo } from '../components/Logo';

class ProductPage extends Component {
    componentDidMount() {
        this.props.getProducts();
        this.props.history.listen(location => ReactGA.pageview(location.pathname));
    } 
    
    render() {
        return (
            <Fragment>
                <Logo>
                    <img src={logo} style={{maxHeight: '70px'}} alt="cardboard express logo" />
                </Logo>
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
