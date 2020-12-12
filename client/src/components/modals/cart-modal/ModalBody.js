import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { injectStripe } from 'react-stripe-elements';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import { closeCartModal, removeItem } from '../../../actions/productActions';
import Modal from 'react-responsive-modal';

import paymentSignatures from '../../../utils/imgs/visa_PNG2.png';
import paypalLogo from '../../../utils/imgs/PayPal_logo_logotype_emblem.png';
import placeholderImg from '../../../utils/imgs/placeholder_img.jpg';

import StoreList from '../../Cart/StoreList';
import CartAddress from '../../Cart/CartAddress';


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

const ModalBody = ({closeCartModal, removeItem, product, auth: { user }, store, profile }) => {

    const [formData, setFormData] = useState(initialState);

    const [gotProfileAddress, setGotProfileAddress] = useState(false);
    const [foundProfileAddress, setFoundProfileAddress] = useState(false);
    const [cartAddressId, setCartAddressId] = useState(null);

    useEffect(() => {
        let total;
        if(product.cart.length > 0) {
            total = Number(product.cartTotal).toFixed(2);

            setFormData({...formData, amount: `${total}`});
        }

        setActiveAddress();
    }, [product.cart, cartAddressId])


    const { 
        cartModalOpen, 
        cart, 
        cartStores,
        loading, 
        cartSubtotal, 
        cartTax, 
        cartTotal, 
        cartQty 
    } = product; 

    if(!gotProfileAddress && cartModalOpen && profile.profile) {
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

        if(store.store) {
            const detailStore = store.store;

            let notStoreItemArray = [];
            let yesStoreItemArray = [];
            
            for(var x = 0; x < cart.length; x++) {
                if(cart[x].item.store.toString() !== store.store._id.toString()) {
                    notStoreItemArray.push(cart[x].item._id);
                }
            }
            
            for(var x = 0; x < cart.length; x++) {
                if(cart[x].item.store.toString() === store.store._id.toString()) {
                    yesStoreItemArray.push(cart[x].item._id);
                }
            }

            console.log('NOT A STORE ITEM ARRAY');
            console.log(notStoreItemArray);

            try {
                const data = {
                    user: user._id,
                    stores: [detailStore],
                    notStoreItems: notStoreItemArray,
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

                const res = await axios.post('/api/stripe/store-checkout', data);
            
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
                        yesStoreItemArray.map(itemId => removeItem(itemId))
                        // nextStep();
                        // history.push(`/profile/order/${res.data.orderId}`);
                        // clearCart();
                    }
                }

                // this.props.clearCart();
                // this.props.history.push('/');
                
            } catch (err) {
                console.log(err)
            }
        }

    };

    const handleModalClose = () => {
        closeCartModal();
    }

    let modal;

    const bg = {
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    if(!cartModalOpen) {
        modal = null;
    }
    else {

        modal = (
            <Modal open={cartModalOpen} onClose={handleModalClose} center styles={bg}>
                <div className="checkout-modal">
                    <div className="checkout-modal-main">
                        <div className="checkout-confirmed"><p>Quick Checkout</p></div>
                        <div className="checkout-cart">
                            <div style={{margin: '0', borderRadius:'0'}} class="card card-default">
                                <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p style={{margin:'0'}}>Items In Cart</p>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <StoreList />
                                    {/* {cart.length <= 0 ? (
                                        <div style={{fontSize: '1rem', color:'#cecece',margin: '10px',width: '75px',height: '75px',border: '2px dashed #cecece',display:'flex', justifyContent: 'center',alignItems: 'center'}}>
                                            <i class="fas fa-plus"></i>
                                        </div>
                                    ):(
                                        <Fragment>
                                            {cart.map(item => {
                                                const { qty, price } = item;
                                                const { _id, img_gallery} = item.item;
                                                const tempTotal = price;
                                                const total = parseFloat(tempTotal.toFixed(2));
                                                return (
                                                    <div style={{fontSize: '1rem', color:'#cecece',margin: '10px',width: '100px',height: '100px',border: '2px dashed #cecece',display:'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                        <img src={img_gallery ? `/api/products/image/${img_gallery[0].img_name}` : placeholderImg} style={{height:'100%', width:'100%'}} alt="product" />
                                                    </div>
                                                );
                                            })}
                                        </Fragment>
                                    )} */}
                                </div>
                            </div>
                        </div>
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
                                        <p style={{margin:'0'}}>Order Summary</p>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div style={{width:'100%', color:'#808080', display:'flex', justifyContent:'space-between'}}>
                                        <p>Item Total</p>
                                        <p>$20.00</p>
                                    </div>
                                    <div style={{width:'100%', color:'#808080', display:'flex', justifyContent:'space-between'}}>
                                        <p>Shipping</p>
                                        <p>$7.00</p>
                                    </div>
                                    <div style={{width:'100%', color:'#808080', display:'flex', justifyContent:'space-between'}}>
                                        <p>Tax</p>
                                        <p>$4.00</p>
                                    </div>
                                    <div style={{width:'100%', color:'#808080', display:'flex', justifyContent:'space-between'}}>
                                        <p>Order Total</p>
                                        <p>$31.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="checkout-actions">
                        <button onClick={(e) => onSubmit(e)}>Place Order</button>
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
            </Modal>
        );
    }

    return (
        <React.Fragment>
            {modal}
        </React.Fragment>
    )
}

const ModalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
    #modal {
        background: #fff;
    }
`;

ModalBody.propTypes = {
    closeCartModal: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    store: state.store,
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { closeCartModal, removeItem })(injectStripe(ModalBody));
