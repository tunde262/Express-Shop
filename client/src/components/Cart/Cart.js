import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart } from '../../actions/productActions';
import { withRouter } from 'react-router-dom';

import CartList from './CartList';
import CartTotals from './CartTotals';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import Title from '../Title';
import Spinner from '../common/Spinner';
import { BackButton } from '../common/BackButton';

const Cart = ({ history, getCart, product }) => {

    useEffect(() => {
        getCart();
    }, [])

    const goBack = () => {
        history.goBack();
    }

    const { cart, loading } = product;

    let cartContent;

    if(loading) {
        cartContent = <Spinner />;
    }
    else {
        if(cart.length > 0) {
            cartContent = (
                <React.Fragment>
                    <Title name="your" title="cart" />
                    <div className="cart-container">
                        <CartList cart={cart} />
                        <CartTotals totals={product} history={history} />
                    </div>
                </React.Fragment>
            );
        } 
        else {
            cartContent = <EmptyCart />;
        }
    }

    return (
        <section>
            <BackButton onClick={goBack}><i className="fas fa-arrow-left"></i></BackButton>
            {cartContent}
        </section>
    )
}

Cart.propTypes = {
    product: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getCart })(withRouter(Cart));
