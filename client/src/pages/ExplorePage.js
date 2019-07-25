import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';


class ExplorePage extends Component{
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { exploreTops, exploreBottoms, exploreHats, exploreSocks } = this.props.product;

        let productList;

        const { loading } = this.props.product;

        if(exploreTops === null || loading) {
            productList = <Spinner />;
        }
        else {
            productList = (
                <Fragment>
                    <div style={{marginBottom: '-1rem'}}><Title title="Explore" /></div>
                    <ProductOverview title="Tops" products={exploreTops} link="/top" />
                    <ProductOverview title="Bottoms" products={exploreBottoms} link="/bottom" />
                    <ProductOverview title="Hats" products={exploreHats} link="/hat" />
                    <ProductOverview title="Socks" products={exploreSocks} link="/socks" />
                </Fragment>
            );
        }
        
        return (
            <Fragment>
                <Header />
                <hr />
                {productList}
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
