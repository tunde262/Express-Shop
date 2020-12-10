import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Elements } from 'react-stripe-elements';

import ModalBody from './ModalBody';

const AddToCartModal = () => {


    useEffect(() => {

    }, [])

    return (
        <Fragment>
            <Elements>
                <ModalBody />
            </Elements>
        </Fragment>
    )
}

AddToCartModal.propTypes = {

}

const mapStateToProps = state => ({

});

export default AddToCartModal;
