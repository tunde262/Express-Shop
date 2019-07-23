import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';


import ProductList from './ProductList';
import CategoryOverview from '../Overview/categoryOverview/CategoryOverview';
import Spinner from '../common/Spinner';
import Title from '../Title';

class Container extends Component {
    render() {
        const { products, sortedProducts, loading } = this.props.product;
        
        let productList;

        if(products === null || loading) {
            productList = <Spinner />;
        }
        else {
            if(products.length > 0) {
                productList = (
                    <Fragment>
                        <CategoryOverview products={products} />
                        <h1 style={{margin: '0 0 -2rem 2rem'}}>{this.props.title}</h1>
                        <ProductList products={sortedProducts} />
                    </Fragment>
                );
            }
            else {
                productList = <Title name="No Products" title="Available" />
            }
        }

        return (
            <Fragment>
                {productList}
            </Fragment>
        )
    }
}

Container.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts })(Container);
