import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import FormDetails from './FormDetails';
import FormAddress from './FormAddress';
import Cart from './Cart';
import Confirm from './Confirm';
import Success from './Success';

const CheckoutForm = ({total, user, product: { cart, cartStores, cartQty, cartTax, cartSubtotal, cartTotal }, clearCart, history}) => {
    const [formData, setFormData] = useState({
        step: 1,
        userId: `${user}`,
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        telephone: '',
        amount: `${total}`
    });




    // Go To Next Page
    const nextStep = () => {
        const { step } = formData;
        setFormData({ ...formData, step: step + 1 });
    }

    // Go To Prev Page
    const prevStep = () => {
        const { step } = formData;
        setFormData({ ...formData, step: step - 1 });
    }

    const handleHistory = () => {
        history.goBack();
    }

    const onChange = input => e => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    // onSubmit = async (e) => {
    //     e.preventDefault();
        
    //     let { token } = await stripe.createToken({ name: this.state.name });
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
    //                 clearCart();
    //                 history.push('/');
    //             }
    //         )
    //         .catch(err => console.log(err));
        
    //     console.log("The payment was succeeded!");
    //     clearCart();
    //     history.push('/profile');

    //     // redirect, clear inputs, thank alert
    // }

        const { step } = formData;
        const { firstname, lastname, email, address, city, state, zipcode, telephone, amount, userId } = formData;
        const values = { firstname, lastname, email, address, city, state, zipcode, telephone, amount, userId };

        return (
            <Elements>
                <Cart history={history} />
            </Elements>
        )
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

CheckoutForm.propTypes = {
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
});

export default connect(mapStateToProps, null)(withRouter(CheckoutForm));


