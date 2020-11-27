import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closeModal } from '../../actions/productActions';
import Modal from 'react-responsive-modal';

import paymentSignatures from '../../utils/imgs/visa_PNG2.png';
import paypalLogo from '../../utils/imgs/PayPal_logo_logotype_emblem.png';
import placeholderImg from '../../utils/imgs/placeholder_img.jpg';

import { ButtonContainer } from '../Button';

const AddToCartModal = ({closeModal, product}) => {

    const handleModalClose = () => {
        closeModal();
    }

    const { 
        modalOpen, 
        modalProduct,
        cart, 
        loading, 
        cartSubtotal, 
        cartTax, 
        cartTotal, 
        cartQty 
    } = product; 

    let modal;

    const bg = {
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    if(!modalOpen) {
        modal = null;
    }
    else {
        const { title, img_gallery, price } = modalProduct;

        modal = (
            <Modal open={modalOpen} onClose={handleModalClose} center styles={bg}>
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
                                    {cart.length <= 0 ? (
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
                                    )}
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
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <div>
                                            <p style={{margin:'0'}}>Tunde's House</p>
                                            <p style={{color:'#808080'}}>6100 Glenhollow Dr, Plano, Texas, United States, 75093</p>
                                        </div>
                                        <div>
                                            <p style={{color:'#0098d3', margin:'0'}}>Change</p>
                                        </div>
                                    </div>
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
                                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'50px'}}>
                                            <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                                <img src={paymentSignatures} style={{height:'30px'}} alt="payment signatures" />
                                            </div>
                                            <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                                <img src={paypalLogo} style={{height:'30px'}} alt="payment signatures" />
                                            </div>
                                        </div>
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

AddToCartModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { closeModal })(AddToCartModal);
