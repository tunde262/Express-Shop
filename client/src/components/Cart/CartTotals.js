import React from 'react';
import {Link} from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { ButtonContainer } from '../Button';

export default function CartTotals({totals, history}) {
    let { cartSubtotal, cartTax, cartTotal } = totals;
    cartSubtotal = parseFloat(cartSubtotal.toFixed(2));
    cartTax = parseFloat(cartTax.toFixed(2));
    cartTotal = parseFloat(cartTotal.toFixed(2));

    return (
        <div style={{position:'fixed'}}>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        {/* <Link to="/">
                            <button 
                                className="btn btn-outline-danger text-uppercase mb-3 px-5" 
                                type="button"
                                // onClick={() => clearCart()}
                            >
                                clear cart
                            </button>
                        </Link> */}
                        <h5>
                            <span>Subtotal : </span>
                            <strong>$ {cartSubtotal}</strong>
                        </h5>
                        <h5>
                            <span>Same Day Delivery : </span>
                            <strong>$ {cartTax}</strong>
                        </h5>
                        <h5>
                            <span>Total : </span>
                            <strong>$ {cartTotal}</strong>
                        </h5>
                        {/* <PayPalButton 
                            total={cartTotal} 
                            clearCart={clearCart} 
                            history={history} 
                        /> */}
                        <Link to='/checkout'>
                            <button>
                                Checkout All
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}
