import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decrement, removeItem, addToCart } from '../../../actions/productActions';

import './CartDrawer.css';
import paper_towels from '../../../utils/imgs/paper_towels.jpeg';

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

    if(cartSubtotal !== null || cartSubtotal !== undefined) {
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
                <i onClick={toggleSideDrawer} style={{color:'#cecece', margin:'1rem', fontSize:'1rem'}} className="fas fa-arrow-left"></i>
                <div style={{overflowY:'scroll', height:'80vh'}}>
                    {cart.map(item => {
                        const { qty, price } = item;
                        const { _id, img_gallery} = item.item;
                        const tempTotal = price;
                        const total = parseFloat(tempTotal.toFixed(2));
                        return (
                            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gridGap:'10px', height:'100px', width:'100%', padding:'10px', alignItems:'center', borderBottom:'1px solid #cecece'}}>
                                <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <div className="btn-circle inc" onClick={() => handleIncrement(_id)}><i className="fas fa-chevron-up"></i></div>
                                    <div className="btn-circle num">{qty}</div>
                                    <div className="btn-circle inc" onClick={()=> handleDecrement(_id)}><i class="fas fa-chevron-down"></i></div>
                                </div>
                                <img src={`/api/products/image/${img_gallery[0].img_name}`} style={{height:'100%'}} alt="product" />
                                <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <p>${total}</p>
                                </div>
                                <i style={{color:'#ff4b2b'}} onClick={() => onRemoveItem(_id)} className="fas fa-times"></i>
                            </div>
                        );
                    })}
                </div>
                <div style={{width:'100%', maxHeight:'119px', height:'119px', position:'absolute', bottom:0, background:'#fff', boxShadow: '0 -2px 2px 0 rgba(0, 0, 0, 0.2)'}}>
                    <div style={{padding:'1rem 1rem 0 1rem', boxSizing:'border-box'}}>
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
                </div>
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
