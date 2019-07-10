import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart } from '../../actions/productActions';

import CartList from './CartList';
import CartTotals from './CartTotals';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import Title from '../Title';
import Spinner from '../common/Spinner';

class Cart extends Component {
    componentDidMount() {
        this.props.getCart();
    }
    render() {
        const { cart, loading } = this.props.product;

        let cartContent;

        if(loading) {
            cartContent = <Spinner />;
        }
        else {
            if(cart.length > 0) {
                cartContent = (
                    <React.Fragment>
                        <Title name="your" title="cart" />
                        <CartColumns />
                        <CartList cart={cart} />
                        <CartTotals totals={this.props.product} history={this.props.history} />
                    </React.Fragment>
                );
            } 
            else {
                cartContent = <EmptyCart />;
            }
        }

        return (
            <section>
                {cartContent}
            </section>
        )
    }
}

Cart.propTypes = {
    product: PropTypes.object.isRequired,
    getCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getCart })(Cart);
