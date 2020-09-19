import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart } from '../../actions/productActions';
import { withRouter } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

import CartList from './CartList';
import CartTotals from './CartTotals';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import Title from '../Title';
import Spinner from '../common/Spinner';
import { BackButton } from '../common/BackButton';

const Cart = ({ history, getCart, product }) => {

    // Mixpanel
    const [sentMixpanel, setSentMixpanel] = useState(false);

    useEffect(() => {
        getCart();
    }, []);

    const handleMixpanel = () => {
        let cartIds = [];
        let cartNames = [];
        let cartCategories = [];

        product.cart.map(cartItemId => {
            cartIds.push(cartItemId.item._id);
        });

        product.cart.map(cartItemCategory => {
            cartCategories.push(cartItemCategory.item.category);
        });

        product.cart.map(cartItemName => {
            cartNames.push(cartItemName.item.name);
        })
        
        mixpanel.track("View Cart Page", {
            // "Entry Point": "Home Page",
            "Cart Size": product.cartQty,
            "Cart Value": product.cartSubtotal,
            "Cart Item IDs": cartIds,
            "Tax Amount": product.cartTax,
            "Cart Item Categories": cartCategories,
            "Cart Item Names": cartNames,
            "Estimated Total Amount": product.cartTotal, 
        });
    }

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
            if(!sentMixpanel) {
                handleMixpanel();
                setSentMixpanel(true);
            }

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
