import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Overview from '../Overview';
import ProductOverviewItems from './ProductOverviewItems';

class ProductOverview extends Component { 
    render() {
        const { products } = this.props;

        return (
            <Overview shop title={this.props.title} link={this.props.link}>
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
