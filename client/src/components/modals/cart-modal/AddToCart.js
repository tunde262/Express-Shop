import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { closeModal, removeItem } from '../../../actions/productActions';
import Modal from 'react-responsive-modal';

import paymentSignatures from '../../../utils/imgs/visa_PNG2.png';
import paypalLogo from '../../../utils/imgs/PayPal_logo_logotype_emblem.png';
import placeholderImg from '../../../utils/imgs/placeholder_img.jpg';

import StoreList from '../../Cart/StoreList';
import CartAddress from '../../Cart/CartAddress';


const AddToCart = ({closeModal, product, auth: { user } }) => {

    useEffect(() => {

    }, [])


    const { 
        modalOpen, 
        modalProduct,
        loading,
    } = product; 


    const handleModalClose = () => {
        closeModal();
    }

    let modal;

    const bg = {
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    const bg2 = {
        modal: {
            boxShadow: "none",
            borderRadius: "15px",
            border: "1px solid rgb(214, 214, 214)",
            padding: "10px"
        },
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
            <Modal open={modalOpen} onClose={handleModalClose} center styles={bg2}>
                <div style={{width:'300px'}}>
                    <p style={{fontSize:'1rem'}}>Item added to the cart</p>
                    <img src={`/api/products/image/${img_gallery[0].img_name}`} className="img-fluid" alt="product" />
                    {/* <h5>{title}</h5> */}
                    {/* <h5 className="text-muted">price : $ {price}</h5> */}
                    <div style={{width:'100%', marginTop:'10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        <div className="store-socials store">
                            <Link to='/cart'>
                                <button
                                    className="active"
                                    cart
                                    onClick={handleModalClose}
                                >
                                    View Cart
                                </button>
                            </Link>
                        </div>
                
                        <p
                            className="skinny-text"
                            onClick={handleModalClose}
                        >
                            Continue Shopping
                        </p>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <Fragment>
            {modal}
        </Fragment>
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

AddToCart
.propTypes = {
    closeModal: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    removeItem: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { closeModal, removeItem })(AddToCart);
