import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decrement, removeItem, addToCart } from '../../actions/productActions';

class CartItem extends Component {
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
        const item = this.props.item;
        const { _id, title, img, price } = item.item;
        const count = item.qty;
        const total = item.price;

        return (
            <div className="row my-2 text-capitalize text-center">
                <div className="col-10 mx-auto col-lg-2">
                    <img src={img} style={{width:'5rem', height:"5rem"}} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">product : </span>
                    {title}
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">price : </span>
                    {price}
                </div>
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <div>
                            <span className="btn btn-black mx-1" onClick={this.handleDecrement.bind(this, _id)}>
                                -
                            </span>
                            <span className="btn btn-black mx-1">{count}</span>
                            <span className="btn btn-black mx-1" onClick={this.handleIncrement.bind(this, _id)}>
                                +
                            </span>
                        </div>
                    </div>
                </div>
                {/* */}
                <div className="col-10 mx-auto col-lg-2">
                    <div className="cart-icon" onClick={this.onRemoveItem.bind(this, _id)}>
                        <i className="fas fa-trash"></i>
                    </div>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <strong>item total : $ {total}</strong>
                </div>
            </div>
        )
    }
}

CartItem.propTypes = {
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
}

export default connect(null, { addToCart, decrement, removeItem })(CartItem);
