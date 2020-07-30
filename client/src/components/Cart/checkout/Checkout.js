import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../../../actions/productActions';

import CheckoutForm from './CheckoutForm';
import { stat } from 'fs';
import { BackButton } from '../../common/BackButton';

const stripePromise = loadStripe("pk_test_Hbz4uQovQLzsxsEZ4clF5WfI00TSBRJTac");

const Checkout = ({history, product: { cart, cartStores, cartTotal}, auth: { user }}) => {

    const goBack = () => {
        history.goBack();
    }

    const { _id } = user;
    
    let checkoutView;

    if(cart.length > 0) {
        checkoutView = (
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    total={Math.floor(cartTotal)} 
                    clearCart={clearCart} 
                    cartStores={cartStores}
                    user={_id}
                    history={history}
                />
            </Elements>
        );
    }
    else {
        checkoutView = <h1>You have not yet added anything to your cart</h1>;
    }
    return (
        <React.Fragment>
            {checkoutView}
        </React.Fragment>
    )
}

Checkout.propTypes = {
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    clearCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { clearCart })(withRouter(Checkout));
