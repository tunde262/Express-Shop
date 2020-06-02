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

        const header = this.props.title;
        
        let productList;

        if(products === null || loading) {
            productList = <Spinner />;
        }
        else {
            if(products.length > 0) {
                productList = (
                    <Fragment>
                        {/* <CategoryOverview products={products} category={this.props.category} /> */}
                        <div style={{marginBottom: '-3rem'}}><Title title={header} /></div>
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
