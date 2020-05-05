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

class Health extends Component {
    componentDidMount() {
        this.props.categoryProducts('health');
    }

    render() {
        return (
            <Fragment>
                <Logo>
                    <img src={logo} style={{maxHeight: '70px'}} alt="cardboard express logo" />
                </Logo>
                <Header />
                <hr />
                <Container title="Health" category="health" />
            </Fragment>
        )
    }
}

Health.propTypes = {
    getProducts: PropTypes.func.isRequired,
    categoryProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, categoryProducts })(Health);
