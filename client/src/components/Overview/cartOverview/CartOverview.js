import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Overview from '../Overview';
import CartOverviewList from './CartOverviewList';

const CartOverview = (props) => (
    <Overview toggle>
        {props.product.cartOverview ? (
            <CartOverviewList cart={props.product.cart} />
        ) : null}
    </Overview>
);

CartOverview.propTypes = {
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps)(CartOverview);
