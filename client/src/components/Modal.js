import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../actions/productActions';

import { ButtonContainer } from './Button';

class Modal extends Component {
    closeModal() {
        this.props.closeModal();
    }

    render() {
        const { modalOpen, modalProduct } = this.props.product; 

        let modal;

        if(!modalOpen) {
            modal = null;
        }
        else {
            const { title, img, price } = modalProduct;

            modal = (
                <ModalContainer>
                    <div className="container">
                        <div className="row">
                            <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
                                <h5>item added to the cart</h5>
                                <img src={img} className="img-fluid" alt="product" />
                                <h5>{title}</h5>
                                <h5 className="text-muted">price : $ {price}</h5>
                                <Link to='/all'>
                                    <ButtonContainer
                                        onClick={this.closeModal.bind(this)}
                                    >
                                        Continue Shopping
                                    </ButtonContainer>
                                </Link>
                                <Link to='/cart'>
                                    <ButtonContainer
                                        cart
                                        onClick={this.closeModal.bind(this)}
                                    >
                                        go to cart
                                    </ButtonContainer>
                                </Link>
                            </div>
                        </div>
                    </div>
                </ModalContainer>
            );
        }

        return (
            <React.Fragment>
                {modal}
            </React.Fragment>
        )
    }
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
    #modal {
        background: var(--mainWhite);
    }
`;

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { closeModal })(Modal);
