import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../../../actions/productActions';

import mixpanel from 'mixpanel-browser';

import CheckoutForm from './CheckoutForm';
import { stat } from 'fs';
import { BackButton } from '../../common/BackButton';

const stripePromise = loadStripe("pk_test_Hbz4uQovQLzsxsEZ4clF5WfI00TSBRJTac");

const Checkout = ({history, product: { cart, cartStores, cartQty, cartTax, cartSubtotal, cartTotal}, auth: { user }}) => {

    // Mixpanel
    const [sentMixpanel, setSentMixpanel] = useState(false);

    const goBack = () => {
        history.goBack();
    }

    const handleMixpanel = () => {
        let cartIds = [];
        let cartNames = [];
        let cartCategories = [];

        cart.map(cartItemId => {
            cartIds.push(cartItemId.item._id);
        });

        cart.map(cartItemCategory => {
            cartCategories.push(cartItemCategory.item.category);
        });

        cart.map(cartItemName => {
            cartNames.push(cartItemName.item.name);
        })
        
        mixpanel.track("View Checkout Page", {
            // "Entry Point": "Home Page",
            "Cart Size": cartQty,
            "Cart Value": cartSubtotal,
            "Cart Item IDs": cartIds,
            "Tax Amount": cartTax,
            "Cart Item Categories": cartCategories,
            "Cart Item Names": cartNames,
            "Estimated Total Amount": cartTotal, 
        });
    }

    const { _id } = user;
    
    let checkoutView;

    if(cart.length > 0) {
        if(!sentMixpanel) {
            handleMixpanel();
            setSentMixpanel(true);
        }

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
