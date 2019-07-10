import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, categoryProducts } from '../actions/productActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import ProductList from '../components/ProductList/ProductList';

class HouseholdEssentials extends Component {
    componentDidMount() {
        this.props.categoryProducts('household essentials');
    }

    render() {
        return (
            <Fragment>
                <Header />
                <hr />
                <CategoryOverview />
                <ProductList />
            </Fragment>
        )
    }
}

HouseholdEssentials.propTypes = {
    getProducts: PropTypes.func.isRequired,
    categoryProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, categoryProducts })(HouseholdEssentials);
