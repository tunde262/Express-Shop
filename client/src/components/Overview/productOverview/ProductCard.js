import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addLike, handleDetail, addToCart, openModal, closeModal, addTotals } from '../../../actions/productActions';

import ReactGA from 'react-ga';

const ProductCard = ({addLike, product, handleDetail, addToCart, openModal, closeModal, addTotals}) => {
    // componentDidMount() {
    //     console.log(this.props.product);
    // }

    const onHandleDetailClick = (id) => {
        handleDetail(id);
    }

    const onAddToCart = (id) => {
        addToCart(id);
        // addTotals();
    }

    const setModalOpen = (id) => {
        openModal(id);
    }

    const setModalClose = (e) => {
        closeModal();
    }

    const todo = (id, title) => {
        onAddToCart(id);
        // onHandleDetailClick(id);
        setModalOpen(id);
        clicked(title);
    }

    const clicked = (title) => {
        ReactGA.event({
            category: 'Cart',
            action: 'Added From Product Card',
            label: title
        });
    }

    const { _id, name, img_gallery, price, store, category, inCart, likes, comments } = product;

    return (
        <ProductWrapper className="mx-auto my-3">
                <div className="product">
                    <div 
                        className="imgbox" 
                        onClick={() => onHandleDetailClick(_id)}
                    >
                        <Link to={"/details/" + _id}>
                            {product.img_gallery[0] &&<img src={`/api/products/image/${img_gallery[0].img_name}`} alt="product" />}
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
                            <h2><Link to={"/details/" + _id}>{name}</Link></h2>
                        </div>
                        <div className="price">${price}</div>
                        <div className="sellers">
                            <Link to={"/store/" + store._id}>{store.name}</Link>
                        </div>
                        <div className="actions">
                            <i onClick={() => todo(_id, name)} className="far fa-plus-square"></i>
                            <i className="far fa-heart detail-heart"></i>
                        </div>
                    </div>
                </div>
        </ProductWrapper>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired,
    addLike: PropTypes.func.isRequired,
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
        width: 21vw;
        height: calc(21vw + 200px);
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
        bottom: 0;
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        transition: .5s;
    }
    .specifice .titles {
        width: 60%;
        overflow: hidden;
        max-height: 50px;
    }
    .specifice h2 {
        margin: 0;
        padding: 0;
        font-size: 20px;
        width: 100%;
    }
    .specifice .sellers a {
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
    .specifice .actions {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px 0 0 10px;
        align-items: center;
    }

    .specifice .actions i {
        color: #808080; 
        margin-right: 1rem; 
        font-size: 20px;
    }
    .card_stats {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        background: #f4f4f4;
    }

    .card_stats .stat {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
        color: #929292;
    }

    .fa-heart:hover {
        color: #ff4b2b;
    }

    .type {
        font-size: 11px;
        font-weight: 300;
        text-transform: uppercase;
    }

    .value {
        font-size: 22px;
        font-weight: 500;

        sup {
            font-size: 12px;
        }
    }

    .border {
        border-left: 1px solid #ff4b2b;
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

    @media screen and (max-width: 1000px){
        .product {
            width: 30vw;
        }

        .specifice .titles {
            width: 100%;
            max-height: 50px;
        }
        .specifice .price {
            position: relative;
            top: 0;
            margin: 10px 0 5px 1.5rem;
            font-size: 1rem;
        }

        .product:hover .specifice {
            bottom: 0;
        }
    }

    
    @media (max-width: 500px){
        .product {
            border: none
            border-radius:0;
            width: 45vw;
            height: calc(45vw + 200px);
        }
    }

`;
        // .product {
        //     width: 150px;
        //     height: 250px;
        // }
export default connect(null, { addLike, handleDetail, addToCart, openModal, closeModal, addTotals })(ProductCard);

