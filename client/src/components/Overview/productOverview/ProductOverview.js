import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Overview from '../Overview';
import ProductOverviewItems from './ProductOverviewItems';

const ProductOverview = ({ products, title, link, shop }) => { 
    return (
        <Overview shop={shop} title={title} link={link}>
            <ProductOverviewItems shop={shop} products={products} />
        </Overview>
    )
}

ProductOverview.propTypes = {
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});


export default connect(mapStateToProps, null)(ProductOverview);
