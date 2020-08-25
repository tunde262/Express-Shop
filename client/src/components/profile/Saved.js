import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLikedProducts } from '../../actions/productActions';

import Container from '../ProductList/Container';

const Saved = ({getLikedProducts, product, auth: { user, isAuthenticated, loading}}) => {
    useEffect(() => {
        if(user) {
            getLikedProducts(user._id);
        }
    }, [user]);
    return (
        <div>
            <h3>Saved</h3>
            <Container />
        </div>
    )
}

Saved.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { getLikedProducts })(Saved);
