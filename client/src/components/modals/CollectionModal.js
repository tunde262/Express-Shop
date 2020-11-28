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

const CollectionModal = ({displayCollectionModal, setCollectionModal, collection}) => {

    const handleModalClose = () => {
        setCollectionModal(false);
    }

    let modal;

    const bg2 = {
        modal: {
            boxShadow: "none",
            borderRadius: "15px",
            border: "1px solid rgb(214, 214, 214)",
            padding: "0"
        },
        closeButton: {
            display: "none"
        },
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    if(!displayCollectionModal) {
        modal = null;
    }
    else {
        modal = (
            <Modal open={displayCollectionModal} onClose={setCollectionModal} center styles={bg2}>
                <div className="itemUploadContainer">
                    <div style={{width:'100%', minHeight:'40px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'40px'}}>
                        <p style={{margin:'0', color:'#0098d3'}}>Add Variant</p>
                    </div>
                </div>
                <div style={{width:'100%', height:'75px', display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1px solid rgb(214, 214, 214)'}}>
                    <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                        <button style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Add Variants</button>
                    </div>
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

CollectionModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    collection: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { closeModal })(CollectionModal);
