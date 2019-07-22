import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleDetail, addToCart, openModal, closeModal, addTotals } from '../../../actions/productActions';

import ReactGA from 'react-ga';

class ProductCard extends Component {
    // componentDidMount() {
    //     console.log(this.props.product);
    // }

    onHandleDetailClick(id) {
        this.props.handleDetail(id);
    }

    onAddToCart(id) {
        this.props.addToCart(id);
        // this.props.addTotals();
    }

    openModal(id) {
        this.props.openModal(id);
    }

    closeModal(e) {
        this.props.closeModal();
    }

    todo(id, title){
        this.onAddToCart(id);
        // this.onHandleDetailClick(id);
        this.openModal(id);
        this.clicked(title);
    }

    clicked(title) {
        ReactGA.event({
            category: 'Cart',
            action: 'Added From Product Card',
            label: title
        });
    }

    render() {
        const { _id, title, img_name, price, company, inCart } = this.props.product;

        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="product">
                    <div 
                        className="imgbox" 
                        onClick={this.onHandleDetailClick.bind(this, _id)}
                    >
                        <Link to={"/" + _id}>
                            <img src={`/api/products/image/${img_name}`} alt="product" />
                        </Link>
                        {/* <button 
                            className="cart-btn" 
                            disabled={inCart ? true : false} 
                            onClick={this.todo.bind(this, _id)}
                        >
                            {inCart ? (
                                <p className="text-capitalize mb-0" disabled>
                                    {" "}
                                    in cart
                                </p>
                            ) : (
                                <i className="fas fa-cart-plus" />
                            )}
                        </button> */}
                    </div>
                    <div className="specifice">
                        <div className="titles">
                            <h2>{title}<br/><span>{company}</span></h2>
                        </div>
                        <div className="price">${price}</div>
                        <label>Size</label>
                        <ul>
                            <li>20mm</li>
                            <li>25mm</li>
                            <li>30mm</li>
                            <li>35mm</li>
                            <li>40mm</li>
                        </ul>
                        <label>Colors</label>
                        <ul className="colors"> 
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <button onClick={this.todo.bind(this, _id, title)}>Add To Cart</button>
                    </div>
                </div>
            </ProductWrapper>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired,
    handleDetail: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired
};

const ProductWrapper = styled.div`
    display: inline-block;
    .product {
        position: relative;
        background: #fff;
        width: 300px;
        height: 500px;
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
    }
    .product .imgbox {
        height: 80%;
        box-sizing: border-box;
    }
    .product .imgbox img {
        display: block;
        width: 100%;
    }
    .specifice {
        position: absolute;
        width: 100%;
        bottom: -168px;
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        transition: .5s;
    }
    .product:hover .specifice {
        bottom: 0;
    }
    .specifice .titles {
        width: 60%;
        overflow: hidden;
    }
    .specifice h2 {
        margin: 0;
        padding: 0;
        font-size: 20px;
        width: 100%;
    }
    .specifice h2 span {
        font-size: 15px;
        color: #ccc;
        font-weight: normal;
    }
    .specifice .price {
        position: absolute;
        top: 12px;
        right: 25px;
        font-weight: bold;
        color: #000;
        font-size: 1.3rem;
    }
    label {
        display: block;
        margin-top: 5px;
        font-weight: bold;
        font-size: 15px;
    }
    ul {
        display: flex;
        margin: 0;
        padding: 0;
    }
    ul li {
        list-style: none;
        margin: 5px 5px 0;
        font-size: 15px;
        font-weight: normal;
        color: #ccc;
    }
    ul li:first-child {
        margin-left: 0;
    }
    
    ul.colors li {
        width: 15px;
        height: 15px;
    }
    ul.colors li:nth-child(1) {
        background: #00f;
    }
    ul.colors li:nth-child(2) {
        background: #f00;
    }
    ul.colors li:nth-child(3) {
        background: #0ff;
    }
    ul.colors li:nth-child(4) {
        background: #ff0;
    }
    ul.colors li:nth-child(5) {
        background: #f0f;
    }
    button {
        display: block;
        padding: 5px;
        color: #fff;
        margin: 10px 0 0;
        background: #45b90e;
        text-align: center;
        text-decoration: none;
        border-radius: 5px;
        transition: .02s;
        cursor: pointer;
    }
    button:hover {
        background: #5acef4;
    }

`;

export default connect(null, { handleDetail, addToCart, openModal, closeModal, addTotals })(ProductCard);

