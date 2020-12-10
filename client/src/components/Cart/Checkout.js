import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import mixpanel from 'mixpanel-browser';

import Cart from './Cart';

const stripePromise = loadStripe("pk_test_Hbz4uQovQLzsxsEZ4clF5WfI00TSBRJTac");

const Checkout = () => {
 
    return (
        <Fragment>
            <Elements stripe={stripePromise}>
                <Cart />
            </Elements>
        </Fragment>
    )
}

Checkout.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, null)(withRouter(Checkout));
