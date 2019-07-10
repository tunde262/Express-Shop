import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCart } from '../../../actions/productActions';

import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
    render() {
        const { cartTotal, cart } = this.props.product;
        
        let checkoutView;

        if(cart.length > 0) {
            checkoutView = (
                <Elements>
                    <CheckoutForm 
                        total={Math.floor(cartTotal)} 
                        clearCart={clearCart} 
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
    clearCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { clearCart })(Checkout);
