import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCart } from '../../../actions/productActions';

import CheckoutForm from './CheckoutForm';
import { stat } from 'fs';
import { BackButton } from '../../common/BackButton';

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
                <Elements>
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
