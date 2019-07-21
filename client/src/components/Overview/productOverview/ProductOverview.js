import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Overview from '../Overview';
import ProductOverviewItems from './ProductOverviewItems';

class ProductOverview extends Component { 
    render() {
        const { products } = this.props.product;

        console.log(products);

        return (
            <Overview shop title="Hoodies">
                <ProductOverviewItems products={products} />
            </Overview>
        )
    }
}

ProductOverview.propTypes = {
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});


export default connect(mapStateToProps)(ProductOverview);
