import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { decrement, removeItem, addToCart } from '../../../actions/productActions';

import { HorizontalNav } from '../../common/HorizontalNav';
import { CartOverviewItem } from './CartOverviewItem';

class CartOverviewList extends Component {
    handleIncrement(id) {
        this.props.addToCart(id);
    }

    handleDecrement(id) {
        this.props.decrement(id);
    }

    onRemoveItem(id) {
        this.props.removeItem(id);
    }

    render() {
        const { cartSubtotal, cartTax, cartTotal, cartQty } = this.props.product;
        return (
            <div style={{background: 'var(--body-color)'}}>
                <HorizontalNav background="var(--body-color)">
                    {this.props.cart.map(item => {
                        const { qty } = item;
                        const { _id, img_name } = item.item;
                        return (
                                <CartOverviewItem key={item.item.id}>
                                    <Link to={"/" + _id}>
                                        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            <img src={`/api/products/image/${img_name}`} style={{width:'6rem', height:'6rem'}} alt="product" />
                                        </div>
                                    </Link>
                                    <div className="btn-container">
                                        <div className="btn-circle inc" onClick={this.handleDecrement.bind(this, _id)}><i class="fas fa-minus"></i></div>
                                        <div className="btn-circle num">{qty}</div>
                                        <div className="btn-circle inc" onClick={this.handleIncrement.bind(this, _id)}><i className="fas fa-plus"></i></div>
                                    </div>
                                </CartOverviewItem>
                        );
                    })}
                </HorizontalNav>
                <hr />
                {this.props.cart.length > 0 ? (
                    <CartOverviewFooter>
                        <h4><strong>Qty: </strong>{cartQty}</h4>
                        <h4><strong>subtotal: </strong>${cartSubtotal}</h4>
                        <h4><strong>tax: </strong>${cartTax}</h4>
                        <h4><strong>total: </strong>${cartTotal}</h4>
                    </CartOverviewFooter>
                ) : null}
            </div>
        )
    }
}

CartOverviewList.propTypes = {
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

const CartOverviewFooter = styled.div`
    display: flex;
    padding: 10px 30px;

    h4 {
        color: grey;
        font-size: .8rem;
        margin: 0 10px;
    }
`;

export default connect(mapStateToProps, { addToCart, decrement, removeItem })(CartOverviewList);
