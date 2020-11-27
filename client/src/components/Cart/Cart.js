import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart } from '../../actions/productActions';
import { withRouter, Link } from 'react-router-dom';

import {useStripe, Elements, useElements, CardElement} from '@stripe/react-stripe-js';

import mixpanel from 'mixpanel-browser';

import CartAddress from './CartAddress';
import CartList from './CartList';
import CartTotals from './CartTotals';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import Title from '../Title';
import Spinner from '../common/Spinner';
import { BackButton } from '../common/BackButton';
import sampleShoe from '../../utils/imgs/20484728.jpeg';
import paperTowels from '../../utils/imgs/paper_towels.jpeg';
import OrderSummary from '../admin/pages/page_components/common/OrderSummaryBlock';

import paymentSignatures from '../../utils/imgs/visa_PNG2.png';
import paypalLogo from '../../utils/imgs/PayPal_logo_logotype_emblem.png';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_Hbz4uQovQLzsxsEZ4clF5WfI00TSBRJTac");

const Cart = ({ history, getCart, product, match }) => {

    // Mixpanel
    const [sentMixpanel, setSentMixpanel] = useState(false);

    useEffect(() => {
        getCart();
    }, []);

    const handleMixpanel = () => {
        let cartIds = [];
        let cartNames = [];
        let cartCategories = [];

        product.cart.map(cartItemId => {
            cartIds.push(cartItemId.item._id);
        });

        product.cart.map(cartItemCategory => {
            cartCategories.push(cartItemCategory.item.category);
        });

        product.cart.map(cartItemName => {
            cartNames.push(cartItemName.item.name);
        })
        
        mixpanel.track("View Cart Page", {
            // "Entry Point": "Home Page",
            "Cart Size": product.cartQty,
            "Cart Value": product.cartSubtotal,
            "Cart Item IDs": cartIds,
            "Tax Amount": product.cartTax,
            "Cart Item Categories": cartCategories,
            "Cart Item Names": cartNames,
            "Estimated Total Amount": product.cartTotal, 
        });
    }

    const goBack = () => {
        history.goBack();
    }

    const { cart, loading } = product;

    let cartContent;

    if(loading) {
        cartContent = <Spinner />;
    }
    else {
        if(cart.length > 0) {
            if(!sentMixpanel) {
                handleMixpanel();
                setSentMixpanel(true);
            }

            cartContent = (
                <React.Fragment>
                    <Title name="your" title="cart" />
                    <div className="cart-container">
                        <CartList cart={cart} />
                        <CartTotals totals={product} history={history} />
                    </div>
                </React.Fragment>
            );
        } 
        else {
            cartContent = <EmptyCart />;
        }
    }

    return (
        <Fragment>
            <div className="store-table-header" style={{padding:'20px 20px 0 20px'}}>
                <div style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                    <i class="fas fa-long-arrow-alt-left"></i>
                    <p style={{margin:'0 10px'}}>  Back</p>
                </div>
                <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                    <h3>Cart</h3>
                </div>
            </div>
            <div className="store-table-body">
                <div id="product-content-wrapper">
                    <div class="product-admin-main">
                        <div style={{background: '#fff', margin: '10px 0 10px 10px'}}>
                            <div style={{textAlign:'center'}}>
                                <div style={{width:'100%'}} className="checkout-panel">
                                    <div className="checkout-panel-main">
                                        <div className="checkout-addy">
                                            <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                                                <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                        <p style={{margin:'0'}}>Shipping Information</p>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <CartAddress />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="checkout-pay">
                                            <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                                                <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                        <p style={{margin:'0'}}>Payment Information</p>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <div>
                                                        <p>Choose Payment Method</p>
                                                        <div style={{width:'100%', height:'50px', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'flex-start', paddingLeft:'62px', alignItems:'center'}}>
                                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'20px', width:'20px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                                            </div>
                                                            <img src={paymentSignatures} style={{height:'30px'}} alt="payment signatures" />
                                                        </div>
                                                        <div style={{fontSize:'10px', marginTop:'5px', color:'rgb(126, 154, 166)', paddingLeft:'10px', display:'flex', alignItems:'center'}}>
                                                            <i class="fas fa-lock"></i>
                                                            <p style={{margin:'0 10px', letterSpacing:'0', fontSize:'12px', color:'#808080', fontFamily:'"Courier New", Courier, monospace'}}>Payment data protection powered Stripe</p>
                                                        </div>
                                                        <Elements stripe={stripePromise}>
                                                            <CardElement className="my-2 p-2 border" />
                                                        </Elements>
                                                        
                                                        {/* <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'50px'}}>
                                                            <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                                <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                                                <img src={paymentSignatures} style={{height:'30px'}} alt="payment signatures" />
                                                            </div>
                                                            <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                                <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                                                <img src={paypalLogo} style={{height:'30px'}} alt="payment signatures" />
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="checkout-deliv">
                                            <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                                                <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                        <p style={{margin:'0'}}>Delivery</p>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <div>
                                                        <div style={{width:'100%', height:'50px', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'flex-start', paddingLeft:'62px', alignItems:'center'}}>
                                                            <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                                            <p style={{margin:'1rem 0'}}>Est. Delivery Time: <span style={{color:'#ff4b2b', fontSize:'14px'}}>5:15pm</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="checkout-totals">
                                            <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                                                <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                        <p style={{margin:'0'}}>Items in cart</p>
                                                    </div>
                                                </div>
                                                <div class="card-body" style={{padding:'0'}}>
                                                    <CartList cart={cart} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="checkout-actions">
                                        <button>Place Order</button>
                                    </div>
                                    {/* <h5>item added to the cart</h5>
                                    <img src={`/api/products/image/${img_gallery[0].img_name}`} className="img-fluid" alt="product" />
                                    <h5>{title}</h5>
                                    <h5 className="text-muted">price : $ {price}</h5>
                                    <button
                                        onClick={handleModalClose}
                                    >
                                        Continue Shopping
                                    </button>
                                    <Link to='/cart'>
                                        <button
                                            cart
                                            onClick={handleModalClose}
                                        >
                                            go to cart
                                        </button>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-admin-secondary">
                        <div id="order-totals" style={{background:'#fff', margin:'10px 0', padding:'10px', height:'300px', border:'1px solid rgb(214, 214, 214)'}}>
                            <p>Order Summary</p>
                            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                <p>Item(s) Subtotal:</p>
                                <p>$5</p>
                            </div>
                            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                <p>Shipping & Handling:</p>
                                <p>$0.00</p>
                            </div>
                            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                <p>Estimated Tax:</p>
                                <p>$3.98</p>
                            </div>
                            <div style={{display:'flex', color:'#ff4b2b', justifyContent:'space-between'}}>
                                <p>Completed Total:</p>
                                <p>$10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        // <section>
        //     <BackButton onClick={goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {/* {cartContent} */} 
        // </section>
    )
}

Cart.propTypes = {
    product: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getCart })(withRouter(Cart));
