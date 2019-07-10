import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';

import Spinner from '../common/Spinner';
import Title from '../Title';
import Products from './Products';

class ProductList extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { products, loading } = this.props.product;
        
        let productList;

        if(products === null || loading) {
            productList = <Spinner />;
        }
        else {
            if(products.length > 0) {
                productList = <Products products={products} />;
            }
            else {
                productList = <Title name="No Products" title="Available" />
            }
        }

        return (
            <Fragment>
                <div>
                    {productList}
                </div>
            </Fragment>
        )
    }
}

ProductList.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts })(ProductList);
