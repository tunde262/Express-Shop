import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../../../actions/productActions';

import CheckoutForm from './CheckoutForm';
import { stat } from 'fs';
import { BackButton } from '../../common/BackButton';

const stripePromise = loadStripe("pk_test_Hbz4uQovQLzsxsEZ4clF5WfI00TSBRJTac");

class Checkout extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack();
    }

    render() {
        const { cartTotal, cart } = this.props.product;
        const { _id } = this.props.auth.user;
        
        let checkoutView;

        if(cart.length > 0) {
            checkoutView = (
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        total={Math.floor(cartTotal)} 
                        clearCart={clearCart} 
                        user={_id}
                        history={this.props.history}
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

export default connect(mapStateToProps, { clearCart })(Checkout);
