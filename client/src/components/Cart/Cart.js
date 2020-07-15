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
import { BackButton } from '../common/BackButton';

class Cart extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.props.getCart();
    }

    goBack(){
        this.props.history.goBack();
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
                        <div className="cart-container">
                            <CartList cart={cart} />
                            <CartTotals totals={this.props.product} history={this.props.history} />
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
                <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
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
