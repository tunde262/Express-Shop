import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import FormDetails from './FormDetails';
import FormAddress from './FormAddress';
import FormPayment from './FormPayment';
import Confirm from './Confirm';
import Success from './Success';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            user: `${this.props.user}`,
            name: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            telephone: '',
            amount: `${this.props.total}`
        };

        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    };

    // Go To Next Page
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // Go To Prev Page
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    history = () => {
        this.props.history.goBack();
    }

    onChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    // onSubmit = async (e) => {
    //     e.preventDefault();
        
    //     let { token } = await this.props.stripe.createToken({ name: this.state.name });
    //     const data = {
    //         user: this.state.user,
    //         name: this.state.name,
    //         email: this.state.email,
    //         address: this.state.address,
    //         token,
    //         amount: this.state.amount
    //     }
        
    //     axios.post('/api/stripe/donate', data)
    //         .then(
    //             () => {
    //                 console.log("The payment was succeeded!");
    //                 this.props.clearCart();
    //                 this.props.history.push('/');
    //             }
    //         )
    //         .catch(err => console.log(err));
        
    //     console.log("The payment was succeeded!");
    //     this.props.clearCart();
    //     this.props.history.push('/profile');

    //     // redirect, clear inputs, thank alert
    // }

    render() {
        const { step } = this.state;
        const { name, email, address, city, state, zipcode, telephone, amount, user } = this.state;
        const values = { name, email, address, city, state, zipcode, telephone, amount, user };

        switch(step) {
            case 1:
                return (
                    <FormDetails
                        nextStep = {this.nextStep}
                        onChange = {this.onChange}
                        history = {this.history}
                        values = {values}
                    />
                )
            case 2:
                return (
                    <FormAddress
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        onChange = {this.onChange}
                        values = {values}
                    />
                )
            case 3:
                return (
                    <Confirm
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        values = {values}
                    />
                )
            case 4:
                return (
                    <Elements>
                        <FormPayment
                            nextStep = {this.nextStep}
                            prevStep = {this.prevStep}
                            values = {values}
                        />
                    </Elements>
                )
            case 5:
                return <Success />;
        }
        // return (
        //     <main className="container">
        //         <form 
        //             className="form-group mt-3 border-primary rounded p-3"
        //             onSubmit={this.onSubmit}
        //         >
        //             <label>Name</label>
        //             <input 
        //                 type="text"
        //                 name="name"
        //                 className="input-group my-1 p-1"
        //                 value={this.state.name}
        //                 onChange={this.onChange}
        //                 placeholder="Enter Full Name"
        //             />
        //             <label>Email</label>
        //             <input 
        //                 type="text"
        //                 name="email"
        //                 className="input-group my-1 p-1"
        //                 value={this.state.email}
        //                 onChange={this.onChange}
        //             />
        //             <label>Address</label>
        //             <input 
        //                 type="text"
        //                 name="address"
        //                 className="input-group my-1 p-1"
        //                 value={this.state.address}
        //                 onChange={this.onChange}
        //             />
        //             <label>Credit Card Number -- Exp. Date -- CVC</label>
        //             <CardElement className="my-2 p-2 border" />
        //             <button className="btn btn-primary">Complete Purchase</button>
        //         </form>
        //     </main>
        // )
    }
}

export default CheckoutForm;
