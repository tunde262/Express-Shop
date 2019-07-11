import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';


class ExplorePage extends Component{
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        return (
            <Fragment>
                <Header />
                <hr />
                <CategoryOverview />
                <ProductOverview />
                <ProductOverview />
                <ProductOverview />
                <ProductOverview />
                <ProductOverview />
            </Fragment>
        )
    }
}

ExplorePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, getCart })(ExplorePage);
