import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addLike, handleDetail, addToCart, openModal, closeModal, addTotals } from '../../../actions/productActions';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import ButtonSpinner from '../../common/ButtonSpinner';

const ProductCard = ({ auth: { user }, addLike, liked, modalOpen, product, handleDetail, addToCart, openModal, closeModal, addTotals}) => {
    // componentDidMount() {
    //     console.log(this.props.product);
    // }

    // Button loader
    const [cartLoading, setCartLoading] = useState(true);

    useEffect(() => {
        if(modalOpen) {
            setCartLoading(true);
        } else {
            setCartLoading(false);
        }
    }, [modalOpen]);

    const onHandleDetailClick = (id) => {
        handleDetail(id);
    }

    const setModalOpen = (id) => {
        openModal(id);
    }

    const setModalClose = (e) => {
        closeModal();
    }
    
    const handleLike = (item) => {
        addLike(item._id);

        // Check if product already liked by same user
        if(item.likes.filter(like => like.user.toString() === user._id).length > 0) {
            mixpanel.track("Product Un-Bookmark", {
                "Product Name": item.name,
                "Product Category": item.category,
                // "Product Rating": cartIds,
                "Total Likes": item.likes.length - 1,
                "Total Comments": item.comments.length,
                "Product ID": item._id,
            });
            
            mixpanel.people.increment("Saved Products", -1);
        } else {
            mixpanel.track("Product Bookmark", {
                "Product Name": item.name,
                "Product Category": item.category,
                // "Product Rating": cartIds,
                "Total Likes": item.likes.length + 1,
                "Total Comments": item.comments.length,
                "Product ID": item._id,
            });
            
            mixpanel.people.increment("Saved Products");
        }
    }

    const onAddToCart = (id) => {
        addToCart(id);
        addTotals();
    }

    const handleModalOpen = (id) => {
        openModal(id);
    }

    const todo = (id, item) => {
        onAddToCart(id);
        setModalOpen(id);
        clicked(item);
        setCartLoading(true);
    }

    const clicked = (title) => {
        ReactGA.event({
            category: 'Cart',
            action: 'Added From Product Card',
            label: title
        });
    }

    const { _id, name, img_gallery, price, store, category, inCart, likes, comments } = product;

    let sorted_img_gallery = img_gallery.sort((a, b) => a.img_order - b.img_order);

    return (
        <ProductWrapper className="mx-auto my-3">
                <div className="product">
                    <div 
                        className="imgbox" 
                        onClick={() => onHandleDetailClick(_id)}
                    >
                        <a href={"https://www.cardboardexpress.com/details/" + _id}>
                            {img_gallery[0] &&<img src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="product" />}
                        </a>
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
                            <h2><a href={"https://www.cardboardexpress.com/details/" + _id}>{name}</a></h2>
                        </div>
                        <div className="price">${price}</div>
                        <div className="sellers">
                            <a href={"https://www.cardboardexpress.com/store/" + store._id}>{store.name}</a>
                        </div>
                        <div className="actions">
                            <div className="desktop-actions" style={{width:'100%', alignItems:'center', paddingRight:'10px'}}>
                                {/* <button 
                                    onClick={() =>todo(_id, name)}
                                    disabled={cartLoading ? true : false} 
                                >
                                    {cartLoading ? <ButtonSpinner /> : "Add To Cart"}
                                </button> */}
                                {liked ? (
                                    <button 
                                        onClick={() => addLike(_id)} 
                                        style={{
                                            background:'#ff4b2b', 
                                            color:'#fff', 
                                            borderColor:'#ff4b2b',
                                            marginTop:0
                                        }}
                                    >
                                        Favorited 
                                        <i 
                                            style={{
                                                marginLeft:'10px', 
                                                color:'#fff', 
                                                outline:'none', 
                                                fontSize:'13px',
                                                marginTop:0
                                            }} 
                                                className="fas fa-heart"
                                        ></i> 
                                    </button> ): (
                                    <button 
                                        onClick={() => handleLike(product)} 
                                        className="likeButton"
                                    >
                                        Favorite 
                                        <i 
                                            style={{
                                                marginLeft:'10px', 
                                                color:'#ff4b2b', 
                                                fontSize:'13px'
                                            }} 
                                            className="fas fa-heart"
                                        ></i> 
                                    </button> 
                                )}
                                {likes.length > 2 && (
                                    <div style={{width:'100%', textAlign:'center'}}>
                                        <span style={{color:'#808080',}}> 
                                            <span>{likes.length} </span> 
                                            <i 
                                                style={{
                                                    marginLeft:'5px', 
                                                    color:'#ff4b2b', 
                                                    fontSize:'13px'
                                                }} 
                                                className="fas fa-heart"
                                            ></i>
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="mobile" style={{width:'100%', marginLeft:'-5px'}}>
                                {liked ? (
                                    <button 
                                        onClick={() => addLike(_id)} 
                                        style={{
                                            background:'#ff4b2b', 
                                            color:'#fff', 
                                            borderColor:'#ff4b2b',
                                            display:'flex',
                                            justifyContent:'center',
                                            margin:'auto'
                                        }}
                                        className="mobile"
                                    >
                                        <div style={{display:'flex', justifyContent:'center', width:'100%', alignItems:'center'}}>
                                            <span style={{marginTop:0}}>Favorited </span>
                                            <i 
                                                style={{
                                                    marginLeft:'10px', 
                                                    color:'#fff', 
                                                    outline:'none', 
                                                    fontSize:'13px'
                                                }} 
                                                    className="fas fa-heart"
                                            ></i> 
                                        </div>
                                    </button> ): (
                                    <button 
                                        onClick={() => handleLike(product)} 
                                        className="likeButton mobile"
                                        style={{
                                            width:'100%',
                                            margin:'auto',
                                            display:'flex',
                                            justifyContent:'center',
                                        }}
                                    >
                                        <div style={{display:'flex', justifyContent:'center', width:'100%', alignItems:'center'}}>
                                            <span style={{marginTop:0}}>Favorite</span>
                                            <i 
                                                style={{
                                                    marginLeft:'10px', 
                                                    color:'#ff4b2b', 
                                                    fontSize:'13px'
                                                }} 
                                                className="fas fa-heart"
                                            ></i> 
                                        </div>
                                    </button> 
                                )}
                                {/* <button 
                                    className="mobile"
                                    onClick={() =>todo(_id, name)}
                                    disabled={cartLoading ? true : false} 
                                >
                                    {cartLoading ? <ButtonSpinner /> : <span style={{margin:'auto'}}>Add To Cart</span>}
                                </button> */}
                                {/* <div className="mobile">
                                    {liked ? <i style={{color:'#ff4b2b'}} onClick={() => handleLike(product)} className="fas fa-heart"></i> : <i onClick={() => handleLike(product)} className="far fa-heart detail-heart"></i>}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
        </ProductWrapper>
    );
}

ProductCard.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    modalOpen: state.product.modalOpen
});

const ProductWrapper = styled.div`
    display: inline-block;
    .product {
        position: relative;
        background: #fff;
        width: 21vw;
        height: calc(21vw + 200px);
        border: 0.5px solid #dfe1e5;
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
        display:flex;
        flex-direction:column;
        align-items: flex-start;
    }
    .titles {
        width: 100%;
        overflow: hidden;
        max-height: 50px;
    }
    h2 {
        margin: 0;
        padding: 0;
        font-size: 14px;
        width: 100%;
    }
    .sellers a {
        font-size: 15px;
        color: #ccc;
        font-weight: normal;
    }
    .price {
        margin-top:5px;
        color: #000;
        font-size: 14px;
    }
    .actions {
        width: 100%;
        padding: 10px 0 0 10px;
        align-items: center;
    }

    .actions i {
        color: #808080; 
        margin-right: 1rem; 
        font-size: 20px;
    }

    .desktop-actions {
        display: flex;
        flex-direction: column;
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
        width: 100%;
    }

    @media screen and (max-width: 1000px){
        .product {
            width: 30vw;
        }

        .specifice {
            padding: 10px 0;
        }

        .specifice .titles {
            padding: 0 10px;
            width: 100%;
            max-height: 50px;
        }

        .specifice .sellers {
            padding: 0 10px;
        }
        .specifice .price {
            padding: 0 10px;
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

    @media (max-width: 768px){
        .desktop-actions {
            display: none;
        }
    }

`;
        // .product {
        //     width: 150px;
        //     height: 250px;
        // }
export default connect(mapStateToProps, { addLike, handleDetail, addToCart, openModal, closeModal, addTotals })(ProductCard);

