import React, { Fragment, Component } from 'react';
import axios from 'axios';

import { CardElement, injectStripe } from 'react-stripe-elements';
import { Container } from '../../auth/Form';
import { ButtonContainer } from '../../Button';

export class FormPayment extends Component {
    continue = async (e) => {
        e.preventDefault();

        const { values: { name, email, address, amount, user } } = this.props;

        let { token } = await this.props.stripe.createToken({ name });
        const data = {
            user,
            name,
            email,
            address,
            token,
            amount
        }
        
        axios.post('/api/stripe/donate', data)
            .then(
                () => {
                    console.log("The payment was succeeded!");
                    // this.props.clearCart();
                    // this.props.history.push('/');
                }
            )
            .catch(err => console.log(err));
        
        console.log("The payment was succeeded!");
        // this.props.clearCart();

        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (
            <Fragment>
                <Container>
                    <div className="container">
                        <h1>Payment</h1>
                        <form onSubmit={this.continue}>
                            <label>Credit / Debit Card</label>
                            <CardElement className="my-2 p-2 border" />
                            <a style={{marginRight: '1rem'}}onClick={this.back}>Back</a>
                            <ButtonContainer>
                                Continue
                            </ButtonContainer>
                        </form>
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default injectStripe(FormPayment);
