import React, { Component } from 'react';
import axios from 'axios';

import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: `${this.props.user}`,
            name: '',
            email: '',
            address: '',
            amount: `${this.props.total}`
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = async (e) => {
        e.preventDefault();
        
        let { token } = await this.props.stripe.createToken({ name: this.state.name });
        const data = {
            user: this.state.user,
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            token,
            amount: this.state.amount
        }
        
        axios.post('/api/stripe/donate', data)
            .then(
                () => {
                    console.log("The payment was succeeded!");
                    this.props.clearCart();
                    this.props.history.push('/');
                }
            )
            .catch(err => console.log(err));
        
        console.log("The payment was succeeded!");
        this.props.clearCart();
        this.props.history.push('/all');

        // redirect, clear inputs, thank alert
    }

    render() {
        return (
            <main className="container">
                <form 
                    className="form-group mt-3 border-primary rounded p-3"
                    onSubmit={this.onSubmit}
                >
                    <label>Name</label>
                    <input 
                        type="text"
                        name="name"
                        className="input-group my-1 p-1"
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        className="input-group my-1 p-1"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <label>Address</label>
                    <input 
                        type="text"
                        name="address"
                        className="input-group my-1 p-1"
                        value={this.state.address}
                        onChange={this.onChange}
                    />
                    <label>Credit Card Number -- Exp. Date -- CVC</label>
                    <CardElement className="my-2 p-2 border" />
                    <button className="btn btn-primary">Complete Purchase</button>
                </form>
            </main>
        )
    }
}

export default injectStripe(CheckoutForm);
