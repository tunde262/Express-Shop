import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decrement, removeItem, addToCart } from '../../../actions/productActions';

import './CartDrawer.css';
import cart_logo from '../../../utils/imgs/cart_logo.png';
import cartbags from '../../../utils/imgs/cartbags.png';
import placeholderImg from '../../../utils/imgs/placeholder_img.jpg';

const CartDrawer = ({ 
    drawerClickHandler, 
    toggleCartDrawer, 
    show, 
    product: { 
        cart, 
        loading, 
        cartSubtotal, 
        cartTax, 
        cartTotal, 
        cartQty 
    }, 
    decrement, 
    removeItem, 
    addToCart
}) => {

    const toggleSideDrawer = () => {
        toggleCartDrawer();
        drawerClickHandler();
    }

    const handleIncrement = (id) => {
        addToCart(id);
    }

    const handleDecrement = (id) => {
        decrement(id);
    }

    const onRemoveItem = (id) => {
        removeItem(id);
    }

    if(cartSubtotal !== null && cartSubtotal !== undefined && cart) {
        cartSubtotal = parseFloat(cartSubtotal.toFixed(2));
        cartTax = parseFloat(cartTax.toFixed(2));
        cartTotal = parseFloat(cartTotal.toFixed(2));
    }

    let drawerClasses = 'cart-drawer';
    if (show) {
        drawerClasses = 'cart-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <div style={{width:'100%',position:'relative'}}>
                {/* <i onClick={toggleSideDrawer} style={{color:'#cecece', margin:'1rem', fontSize:'1rem'}} className="fas fa-arrow-left"></i> */}
                {cart.length <= 0 ? (
                    <div style={{marginTop:'1rem'}}>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <img style={{height: '3rem'}} src={cart_logo} alt="cart" />
                            <img style={{width: '75%'}} src={cartbags} alt="cart img" />
                            <h3>Your Cart Is Empty!</h3>
                            <button>Start Shopping Now</button>
                            <p>Browse online stores, add items to your cart, easy checkout, fast delivery.</p>
                        </div>
                    </div>
                ) :
                (
                    <div style={{marginTop:'1rem'}}>
                        <div style={{padding:'0 10px'}}>
                            <a href={`https://www.cardboardexpress.com/cart`}><button onClick={toggleCartDrawer} style={{margin:0, width:'100%'}}>Checkout</button></a>
                        </div>
                        <div style={{overflowY:'scroll', height:'80vh'}}>
                            {cart.map(item => {
                                const { qty, price } = item;
                                const { _id, img_gallery, name} = item.item;
                                const tempTotal = price;
                                const total = parseFloat(tempTotal.toFixed(2));
                                const itemPrice = parseFloat(item.item.price.toFixed(2));
                                return (
                                    <div style={{display:'flex', height:'100px', width:'100%', padding:'10px', borderBottom:'1px solid #cecece'}}>
                                        <div style={{height:'100%', width:'100px'}}>
                                            <img src={img_gallery ? `/api/products/image/${img_gallery[0].img_name}` : placeholderImg} style={{height:'100%'}} alt="product" />
                                        </div>
                                        <div style={{display:'flex', height:'100%', overflow:'hidden', width:'150px', marginLeft:'-10px', flexDirection:'column', alignItems:'flex-start'}}>
                                            <div className="line-clamp" style={{height:'40px', overflow:'hidden', width:'100%'}}>
                                                <p style={{margin:'0', fontSize:'12px', width:'100%'}}>{name}</p>
                                            </div>
                                            {qty > 1 ? (
                                                <p style={{margin:'0', fontSize:'12px', color:'#808080'}}>{qty} for ${total}</p>
                                            ) : (
                                                <p style={{margin:'0', fontSize:'12px', color:'#808080'}}>${itemPrice}</p>
                                            )}
                                            <p style={{color:'#ff4b2b', margin:'0', fontSize:'12px'}} onClick={() => onRemoveItem(_id)}>Remove</p>
                                        </div>
                                        <div style={{display:'flex', margin:'0 10px', color:'#808080', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                            <div className="btn-circle inc" onClick={() => handleIncrement(_id)}><i className="fas fa-chevron-up"></i></div>
                                            <div className="btn-circle num">{qty}</div>
                                            <div className="btn-circle inc" onClick={()=> handleDecrement(_id)}><i class="fas fa-chevron-down"></i></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{padding:'0 10px', marginTop:'-2rem'}}>
                            <a href={`https://www.cardboardexpress.com/cart`}><button onClick={toggleCartDrawer} style={{margin:0, width:'100%'}}>Checkout</button></a>
                        </div>
                        {/* <div className="cart-actions">
                            <div style={{padding:'1rem 1rem 0 1rem', marginTop:'-2rem', boxSizing:'border-box'}}>
                                <h5>
                                    <span>Subtotal: </span>
                                    <strong>$ {cartSubtotal}</strong>
                                </h5>
                                <h5>
                                    <span>Same Day Delivery: </span>
                                    <strong>$ {cartTax}</strong>
                                </h5>
                                <h5>
                                    <span>Total: </span>
                                    <strong>$ {cartTotal}</strong>
                                </h5>
                            </div>
                            <Link to="/cart"><button onClick={toggleCartDrawer} style={{marginTop:0, borderRadius:0, width:'100%'}}>Checkout</button></Link>
                        </div> */}
                    </div>
                )}
            </div>
        </nav>
    )
}

CartDrawer.propTypes = {
    product: PropTypes.object.isRequired,
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { decrement, removeItem, addToCart })(CartDrawer);
