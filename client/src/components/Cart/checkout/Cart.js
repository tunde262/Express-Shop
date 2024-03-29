import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { injectStripe } from 'react-stripe-elements';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import mixpanel from 'mixpanel-browser';

import CartAddress from '../CartAddress';
import CartList from '../CartList';
import CartTotals from '../CartTotals';
import CartColumns from '../CartColumns';
import EmptyCart from '../EmptyCart';

import Spinner from '../../common/Spinner';
import { BackButton } from '../../common/BackButton';
import sampleShoe from '../../../utils/imgs/20484728.jpeg';
import paperTowels from '../../../utils/imgs/paper_towels.jpeg';
import OrderSummary from '../../admin/pages/page_components/common/OrderSummaryBlock';

import { setPage, setMainNav } from '../../../actions/navActions';
import { clearCart } from '../../../actions/productActions';

import paymentSignatures from '../../../utils/imgs/visa_PNG2.png';
import paypalLogo from '../../../utils/imgs/PayPal_logo_logotype_emblem.png';

// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe("pk_test_Hbz4uQovQLzsxsEZ4clF5WfI00TSBRJTac");

const initialState = {
    address_name: '',
    first_name: '',
    last_name: '',
    email: '',
    city: '',
    state: '',
    country: '',
    area: '',
    street_number: '',
    formatted_address: '',
    street_name: '',
    postalCode: '',
    placeId: '',
    delivery_instructions: '',
    latLng: '',
    phone: '',
    amount: ''
};

const Cart = ({ 
    setPage, 
    setMainNav, 
    auth: { user }, 
    product, 
    clearCart, 
    profile, 
    history, 
    match 
}) => {

    const [formData, setFormData] = useState(initialState);

    // Mixpanel
    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [gotProfileAddress, setGotProfileAddress] = useState(false);
    const [foundProfileAddress, setFoundProfileAddress] = useState(false);
    const [cartAddressId, setCartAddressId] = useState(null);

    useEffect(() => {
        setMainNav('store');
        setPage('profile');

        let total;
        if(product.cart.length > 0) {
            total = Number(product.cartTotal).toFixed(2);

            setFormData({...formData, amount: `${total}`});
        }

        setActiveAddress();
    }, [product.cart, cartAddressId]);

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

    const { 
        loading, 
        cart, 
        cartStores, 
        cartQty, 
    } = product;

    if(!gotProfileAddress && profile.profile) {
        let activeAddress;

        setFormData({...formData, email: user.email});

        if(profile.profile.address_book.length > 0) {
            activeAddress = profile.profile.address_book.find(address => address.active === true); 

            console.log('ACTIVE ADDRESS HERE');
            console.log(user.email)
            if(activeAddress) setFoundProfileAddress(true);
            console.log(activeAddress);

            const tempFields = {};

            if(activeAddress) {
                setCartAddressId(activeAddress._id);
                console.log('DEFUALT ADDRESS ID')
                console.log(activeAddress._id);

                if(activeAddress.first_name)tempFields.first_name = activeAddress.first_name;
                if(activeAddress.last_name)tempFields.last_name = activeAddress.last_name;
                tempFields.email = user.email;
                if(activeAddress.address_name)tempFields.address_name = activeAddress.address_name;
                if(activeAddress.address_components.city) tempFields.city = activeAddress.address_components.city;
                if(activeAddress.address_components.postalcode) tempFields.postalCode = activeAddress.address_components.postalcode;
                if(activeAddress.address_components.state) tempFields.state = activeAddress.address_components.state;
                if(activeAddress.address_components.country) tempFields.country = activeAddress.address_components.country;
                if(activeAddress.address_components.area) tempFields.area = activeAddress.address_components.area;
                if(activeAddress.address_components.street_name) tempFields.street_name= activeAddress.address_components.street_name;
                if(activeAddress.address_components.street_number) tempFields.street_number = activeAddress.address_components.street_number;
                if(activeAddress.formatted_address) tempFields.formatted_address = activeAddress.formatted_address;
                if(activeAddress.placeId) tempFields.placeId = activeAddress.placeId;
                if(activeAddress.delivery_instructions) tempFields.delivery_instructions = activeAddress.delivery_instructions;
                if(activeAddress.phone) tempFields.phone = activeAddress.phone;
                if(activeAddress.location) tempFields.latLng = `${activeAddress.location.coordinates[0]}, ${activeAddress.location.coordinates[1]}`;
            } 
            

            setFormData({ 
                ...formData, 
                ...tempFields
            })
            
            // setDefaultAddress(activeAddress);
        }
        setGotProfileAddress(true);
     }

     const setActiveAddress = () => {
        let tempAddress;

        if(profile.profile) {
            if(profile.profile.address_book.length > 0 && cartAddressId) {
                tempAddress = profile.profile.address_book.find(address => address._id === cartAddressId); 
    
                const tempAddressFields = {};
    
                if(tempAddress) {
                    if(tempAddress.first_name)tempAddressFields.first_name = tempAddress.first_name;
                    if(tempAddress.last_name)tempAddressFields.last_name = tempAddress.last_name;
                    tempAddressFields.email = user.email;
                    if(tempAddress.address_name)tempAddressFields.address_name = tempAddress.address_name;
                    if(tempAddress.address_components.city) tempAddressFields.city = tempAddress.address_components.city;
                    if(tempAddress.address_components.postalcode) tempAddressFields.postalCode = tempAddress.address_components.postalcode;
                    if(tempAddress.address_components.state) tempAddressFields.state = tempAddress.address_components.state;
                    if(tempAddress.address_components.country) tempAddressFields.country = tempAddress.address_components.country;
                    if(tempAddress.address_components.area) tempAddressFields.area = tempAddress.address_components.area;
                    if(tempAddress.address_components.street_name) tempAddressFields.street_name= tempAddress.address_components.street_name;
                    if(tempAddress.address_components.street_number) tempAddressFields.street_number = tempAddress.address_components.street_number;
                    if(tempAddress.formatted_address) tempAddressFields.formatted_address = tempAddress.formatted_address;
                    if(tempAddress.placeId) tempAddressFields.placeId = tempAddress.placeId;
                    if(tempAddress.delivery_instructions) tempAddressFields.delivery_instructions = tempAddress.delivery_instructions;
                    if(tempAddress.phone) tempAddressFields.phone = tempAddress.phone;
                    if(tempAddress.location) tempAddressFields.latLng = `${tempAddress.location.coordinates[0]}, ${tempAddress.location.coordinates[1]}`;
                } 
                
    
                setFormData({ 
                    ...formData, 
                    ...tempAddressFields
                })
            }
        }   
     }

    const { address_name, first_name, last_name, email, city, state, country, area, stateProvince, street_number, formatted_address, street_name, postalCode, placeId, delivery_instructions, latLng, phone, amount } = formData;


    const stripe = useStripe();
    const elements = useElements();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                user: user._id,
                stores: cartStores,
                name: `${first_name} ${last_name}`,
                email,
                address: {
                    address_name,
                    first_name,
                    last_name,
                    coordinates: latLng, 
                    formatted_address,
                    address_components: {
                        street_name,
                        street_number,
                        city,
                        state,
                        country,
                        postalCode,
                        area
                    },
                    placeId,
                },
                // address_2,
                phone,
                delivery_instructions,
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
                    name: `${first_name} ${last_name}`,
                    email: user.email,
                    phone,
                    address: {
                        city,
                        state,
                        postal_code: postalCode,
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

                    // nextStep();
                    clearCart();
                    history.push(`/profile/order/${res.data.orderId}`);
                }
            }

            // this.props.clearCart();
            // this.props.history.push('/');
            
        } catch (err) {
            console.log(err)
        }

    };

    let { cartSubtotal, cartTax, cartTotal } = product;
    cartSubtotal = parseFloat(cartSubtotal.toFixed(2));
    cartTax = parseFloat(cartTax.toFixed(2));
    cartTotal = parseFloat(cartTotal.toFixed(2));

    return (
        <div className="collection-page-container">
            <div className="store-table-header" style={{padding:'20px 20px 0 20px'}}>
                <div onClick={() => history.goBack()} className="back-btn">
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
                                                    <CartAddress cartAddressId={cartAddressId} setCartAddressId={setCartAddressId} profile={profile} />
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
 
                                                            <CardElement className="my-2 p-2 border" />
  
                                                        
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

                                    <div id="order-totals" className="sticky mobile" style={{background:'#fff', width:'100%', margin:'10px 0', padding:'10px', height:'300px', border:'1px solid rgb(214, 214, 214)'}}>
                                        <p>Order Summary</p>
                                        <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                            <p>Item(s) Subtotal:</p>
                                            <p>${cartSubtotal}</p>
                                        </div>
                                        <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                            <p>Shipping & Handling:</p>
                                            <p>$0.00</p>
                                        </div>
                                        <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                            <p>Estimated Tax:</p>
                                            <p>${cartTax}</p>
                                        </div>
                                        <div style={{display:'flex', color:'#ff4b2b', justifyContent:'space-between'}}>
                                            <p>Completed Total:</p>
                                            <p>${cartTotal}</p>
                                        </div>
                                        <div className="store-socials store">
                                            <button className="active" onClick={(e) => onSubmit(e)}>Place Order</button>
                                        </div>
                                    </div>
                                    
                                    {/* <div className="checkout-actions store-socials store">
                                        <button className="active" onClick={(e) => onSubmit(e)}>Place Order</button>
                                    </div> */}
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
                        <div id="order-totals" className="sticky" style={{background:'#fff', margin:'10px 0', padding:'10px', height:'300px', border:'1px solid rgb(214, 214, 214)'}}>
                            <p>Order Summary</p>
                            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                <p>Item(s) Subtotal:</p>
                                <p>${cartSubtotal}</p>
                            </div>
                            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                <p>Shipping & Handling:</p>
                                <p>$0.00</p>
                            </div>
                            <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                                <p>Estimated Tax:</p>
                                <p>${cartTax}</p>
                            </div>
                            <div style={{display:'flex', color:'#ff4b2b', justifyContent:'space-between'}}>
                                <p>Completed Total:</p>
                                <p>${cartTotal}</p>
                            </div>
                            <div className="store-socials store">
                                <button className="active" onClick={(e) => onSubmit(e)}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired, 
    setMainNav: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    clearCart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { setPage, setMainNav, clearCart })(injectStripe(Cart));
