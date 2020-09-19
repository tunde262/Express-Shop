import React, { Fragment } from 'react';
import axios from 'axios';

import { injectStripe } from 'react-stripe-elements';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { Container } from '../../auth/Form';
import { ButtonContainer } from '../../Button';

import mixpanel from 'mixpanel-browser';

const FormPayment = ({ cartStores, cart, cartQty, cartTax, cartSubtotal, cartTotal, nextStep, prevStep, values: { firstname, lastname, email, address, city, state, zipcode, telephone, amount, userId }}) => {
    const stripe = useStripe();
    const elements = useElements();
    const complete = async (e) => {
        e.preventDefault();

        try {
            const data = {
                user: userId,
                stores: cartStores,
                name: `${firstname} ${lastname}`,
                email,
                address: {
                    street: address,
                    city,
                    state,
                    zipcode
                },
                telephone,
                amount,
                store: 'acct_1Ga5xHEcxd8GBhWp'
            }

            console.log('ALMOST');
            if (!stripe || !elements) {
                console.log('FAIL');
                // Stripe.js has not yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return;
            }

            console.log('PASS');

            const res = await axios.post('/api/stripe/donate', data);
          
            const result = await stripe.confirmCardPayment(res.data.client_secret, {
                payment_method: {
                  card: elements.getElement(CardElement),
                  billing_details: {
                    name: `${firstname} ${lastname}`,
                    email,
                    phone: telephone,
                    address: {
                        city,
                        state,
                        postal_code: zipcode,
                        country: 'US'
                    }
                  },
                }
            });
          
            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                  // Show a success message to your customer
                  // There's a risk of the customer closing the window before callback
                  // execution. Set up a webhook or plugin to listen for the
                  // payment_intent.succeeded event that handles any business critical
                  // post-payment actions.
                  console.log("The payment was succeeded!");
                    // this.props.clearCart();

                    nextStep();
                }
            }

            // this.props.clearCart();
            // this.props.history.push('/');
            
        } catch (err) {
            console.log(err)
        }

    };

    const back = e => {
        e.preventDefault();
        prevStep();
    };

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
        
        mixpanel.track("Complete Purchase", {
            // "Delivery Method": deliveryMethod,
            // "Delivery Amount": deliveryAmount,
            "Cart Size": cartQty,
            "Cart Value": cartSubtotal,
            "Cart Item IDs": cartIds,
            "Cart Item Categories": cartCategories,
            "Cart Item Names": cartNames,
            "Total Amount": cartTotal,
            "Tax Amount": cartTax,
            // "Payment Type": paymentMethod,
        });
        
        mixpanel.people.increment("Lifetime Value", cartTotal);
    }

    return (
        <Fragment>
            <Container>
                <div className="container">
                    <h1>Payment</h1>
                    <form onSubmit={complete}>
                        <label>Credit / Debit Card</label>
                        <CardElement className="my-2 p-2 border" />
                        <a style={{marginRight: '1rem'}}onClick={back}>Back</a>
                        <button onClick={handleMixpanel}>
                            Continue
                        </button>
                    </form>
                </div>
            </Container>
        </Fragment>
    )

}

export default injectStripe(FormPayment);
