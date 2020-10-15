import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/productActions';
import Modal from 'react-responsive-modal';

import { ButtonContainer } from '../Button';

const AddToCartModal = (props) => {

    const handleModalClose = () => {
        props.closeModal();
    }

    const { modalOpen, modalProduct } = props.product; 

    let modal;

    if(!modalOpen) {
        modal = null;
    }
    else {
        const { title, img_gallery, price } = modalProduct;

        modal = (
            <Modal open={modalOpen} onClose={handleModalClose} center>
                <div style={{width:'300px'}}>
                    <h5>item added to the cart</h5>
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
                    </Link>
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
