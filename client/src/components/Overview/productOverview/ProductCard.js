import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addLike, handleDetail, addToCart, openModal, closeModal, addTotals } from '../../../actions/productActions';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import fireEmoji from '../../../utils/imgs/fire_emoji.png';
import eyeEmoji from '../../../utils/imgs/eye_emoji.png';

import ButtonSpinner from '../../common/ButtonSpinner';

const ProductCard = ({ auth: { user }, preview, addLike, liked, modalOpen, product, handleDetail, addToCart, openModal, closeModal, addTotals}) => {
    // componentDidMount() {
    //     console.log(this.props.product);
    // }

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Button loader
    const [cartLoading, setCartLoading] = useState(true);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        if(modalOpen) {
            setCartLoading(true);
        } else {
            setCartLoading(false);
        }
    
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [modalOpen]);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

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

    const isMobile = windowWidth <= 500;
    const isTablet = windowWidth <= 1000;

    const { _id, name, img_gallery, price, store, category, inCart, likes, comments, view_count } = product;

    let sorted_img_gallery = img_gallery.sort((a, b) => a.img_order - b.img_order);

    return (
        <ProductWrapper className="mx-1 my-2">
            <div className="product">
                <div 
                    className="imgbox" 
                    onClick={() => onHandleDetailClick(_id)}
                >
                    <a href={`https://www.cardboardexpress.com/details/${_id}`}>
                        {img_gallery[0] && <img src={`/api/products/image/${sorted_img_gallery[0].img_name}`} alt="product" />}
                        <div style={{height:'25px', display:'felx', alignItems:'center', margin:'10px', lineHeight:'14px', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', top:'0', right:'0', padding:'0 10px', borderRadius:'50px', background:'rgba(20,20,20, .5)', color:'#fff', opacity:'1'}}> 
                            <p style={{margin:'0', fontSize:'12px'}}>${price}</p>
                            {view_count > 0 && <img src={fireEmoji} style={{width:'14px', margin:'-3px 0 0 3px', height:'14px'}} alt="fire-emoji" /> }
                        </div>
                    
                        {/* <div className="detail-image-overlay">
                            <div className="detail-overlay-icon-container">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <div className="detail-overlay-icon-container">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div> */}
                    </a>
                </div>
                <div className="specifice">
                    <div className="titles line-clamp">
                        <a href={`https://www.cardboardexpress.com/details/${_id}`}>{name}</a>
                    </div>
                    {/* <div className="price" style={{width:'100%', margin:'3px 0', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <p style={{margin:'0', fontSize:'12px' }}>1,032 sold</p>
                    </div> */}
                </div>
                <div className="sellers">
                    <img src={`/api/stores/image/${store.img_name}`} />
                    <div style={{height:'14px', overflow:'hidden'}}>
                        <a className="line-clamp-1" href={`https://www.cardboardexpress.com/store/${store._id}`}>{store.name}</a>
                    </div>
                </div>
            </div>
            {preview ? null : (
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
                                onClick={() => handleLike(product)} 
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
                                    width:'100%',
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
            )}
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
    position:relative;
    .product {
        position: relative;
        background: #fff;
        width: 14vw;
        height: calc(14vw + 85px);
        border: 0.5px solid #dfe1e5;
        border-radius: 5px;
        overflow: hidden;
    }
    .product .imgbox {
        position: relative;
        height: 72%;
        box-sizing: border-box;
        cursor: pointer;
    }
    .product .imgbox img {
        display: block;
        height: 100%;
        max-width: 14vw
    }
    
    .product .detail-image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        color:#fff;
        display: flex;
        justify-content: space-between;
        opacity: 0;
    }
    
    .product .detail-image-overlay:hover {
        opacity: 1;
    }

    .product .detail-overlay-icon-container {
        height: 100%;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
    }
    
    .product .detail-overlay-icon-container:hover {
        background: rgba(46, 49, 49, 0.2);
    }

    .specifice {
        width: 100%;
        height: 28%;
        bottom: 0;
        display:grid;
        grid-template-rows: auto;
        background: rgb(247, 247, 247);
        padding: calc(1vw - 5px);
        box-sizing: border-box;
        transition: .5s;
        display:flex;
        position:relative;
        flex-direction:column;
        align-items: flex-start;
    }
    .titles {
        width: 100%;
        max-height: calc(2vw + 5px);
        overflow: hidden;
        line-height: calc(1vw + 1px);
        font-weight: 600;
    }
    .titles a {
        margin: 0;
        padding: 0;
        font-size: calc(1vw);
        width: 100%;
    }
    .sellers {
        padding: calc(1vw - 5px);
        height:30px;
        line-height: 15px;
        color: #ccc;
        position:absolute;
        bottom:0;
        margin-bottom: calc(1vw - 10px);
        display: flex; 
        width: 100%; 
        align-items: center 
    }
    .sellers img {
        border: 1px solid #e8e8e8; 
        margin-right: 3px; 
        height: calc(1vw + 12px); 
        width: calc(1vw + 12px); 
        border-radius: 50%; 
        background: #e8e8e8;
    }
    .sellers a {
        font-size: calc(1vw - 1px);
        color: #ccc;
        font-weight: normal;
    }
    .price {
        color: #808080;
        font-size: 12px;
    }
    .actions {
        width: 100%;
        padding: 10px 0 0 0;
        display: flex;
        flex-direction: column;
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
        margin: 0;
        width: 14vw;
        outline: none;
    }

    @media screen and (max-width: 1000px){

        .product {
            width: 20vw;
            height: calc(20vw + 85px);
        }

        .product .imgbox img {
            max-width: 20vw
        }
        .specifice {
            padding: calc(2vw - 10px) 0;
        }

        .specifice .titles {
            max-height: 50px;
            line-height: calc(2vw - 5px);
            padding: 0 calc(2vw - 10px);
            width: 100%;
        }

        .specifice .titles a{
            font-size: calc(2vw - 6px);
        }

        .sellers {
            padding: 0 calc(2vw - 10px);
            margin-bottom: calc(2vw - 15px);
        }

        .sellers img {
            height: calc(2vw + 5px); 
            width: calc(2vw + 5px); 
        }

        .sellers a {
            font-size: calc(2vw - 4px);
        }


        .specifice .price {
            padding: 0 10px;
        }

        .product:hover .specifice {
            bottom: 0;
        }

        button {
            margin: 0;
            width: 20vw;
        }
    }

    
    @media (max-width: 769px){
        .product {
            width: 30vw;
            height: calc(30vw + 85px);
        }

        .product .imgbox img {
            max-width: 30vw
        }

        .specifice {
            padding: calc(2vw - 5px) 0;
        }

        .specifice .titles {
            line-height: calc(2vw);
            padding: 0 calc(2vw - 5px);
            width: 100%;
        }

        .specifice .titles a{
            font-size: calc(2vw);
        }

        .sellers {
            padding: 0 calc(2vw - 5px);
            margin-bottom: calc(2vw - 11px);
        }

        .sellers img {
            height: calc(2vw + 10px); 
            width: calc(2vw + 10px); 
        }

        .sellers a {
            font-size: 14px;
        }

        button: 45vw;

        .desktop-actions {
            display: none;
        }
    }

    @media (max-width: 500px){
        .product {
            border-radius:0;
            width: 45vw;
            height: calc(45vw + 85px);
        }

        .product .imgbox img {
            max-width: 45vw
        }

        .specifice {
            background: #fff;
            padding: 10px 0;
        }

        .specifice .titles {
            line-height: 13px;
            padding: 0 10px;
            width: 100%;
        }

        .specifice .titles a{
            font-size: 13px;
        }

        .sellers {
            padding: 0 10px;
            margin-bottom: 7px;
        }

        .sellers img {
            height: 25px; 
            width: 25px; 
        }

        .sellers a {
            font-size: 14px;
        }
    }

`;
        // .product {
        //     width: 150px;
        //     height: 250px;
        // }
export default connect(mapStateToProps, { addLike, handleDetail, addToCart, openModal, closeModal, addTotals })(ProductCard);

