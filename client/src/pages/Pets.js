import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, categoryProducts } from '../actions/productActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import ProductList from '../components/ProductList/ProductList';
import Container from '../components/ProductList/Container';
import logo from '../components/common/CE_logo.jpg';
import { Logo } from '../components/Logo';

class Pets extends Component {
    componentDidMount() {
        this.props.categoryProducts('pets');
    }

    render() {
        return (
            <Fragment>
                <Logo>
                    <img src={logo} style={{maxHeight: '70px'}} alt="cardboard express logo" />
                </Logo>
                <Header />
                <hr />
                <Container title="Pets" category="pets"  />
            </Fragment>
        )
    }
}

Pets.propTypes = {
    getProducts: PropTypes.func.isRequired,
    categoryProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, categoryProducts })(Pets);
