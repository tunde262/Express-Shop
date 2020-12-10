import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { decrement, removeItem, addToCart } from '../../actions/productActions';

import placeholderImg from '../../utils/imgs/placeholder_img.jpg';

import ReactGA from 'react-ga';

const CartItem = ({ addToCart, decrement, removeItem, item}) => {
    const [variantProductImgs, setVarProd] = useState([]);
    const [gotProduct, setGotProduct] = useState(null);

    const handleIncrement = (id) => {
        addToCart(id);
    }

    const handleDecrement = (id) => {
        decrement(id);
    }

    const onRemoveItem = (id, name) => {
        removeItem(id);
        ReactGA.event({
            category: 'Cart',
            action: 'Removed From Cart',
            label: name
        });
    }

    const { _id, name, img_gallery, price, product } = item.item;
    const count = item.qty;
    const tempTotal = item.price;
    const total = parseFloat(tempTotal.toFixed(2));

    
    const fetchProduct = async (productId) => {
        try {
            const res = await axios.get(`/api/products/${productId}`);

            let sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);
            setVarProd(sorted_img_gallery);
        } catch (err) {
            console.log(err);
        }
    }

    if(item && !gotProduct) {
        fetchProduct(product)
        setGotProduct(true);
    }

    return (
        <div style={{padding: '1rem',display: 'grid',gridTemplateColumns: '128px 2fr 1fr',gridGap: '5px',borderBottom: '1px solid rgb(214, 214, 214)',width: '100%',minheight: '150px'}}>
            <div style={{height:'128px', width:'128px', borderRadius:'5px', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <img style={{height: '100%'}} src={variantProductImgs.length > 0 ? `/api/products/image/${variantProductImgs[0].img_name}` : placeholderImg} alt="img" />
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                <div className="line-clamp" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>
                    <p style={{textAlign:'left', margin:'0'}}>{name}</p>
                </div>
                <div className="tag-list">
                    <div className="tag-item green">
                        <p>
                            small
                        </p>
                    </div>
                </div>
                <div class="qty-input">
                    <button 
                        class="qty-count qty-count--minus" 
                        type="button" 
                        disabled={count <= 1 ? true : false}
                        onClick={() => handleDecrement(_id)}
                    >
                        -
                    </button>
                    <input class="product-qty" type="number" name="product-qty" value={count} />
                    <button 
                        class="qty-count qty-count--add" 
                        type="button"
                        onClick={() => handleIncrement(_id)}
                    >
                        +
                    </button>
                </div>
                <div 
                    style={{color:'#3c4043'}}
                    onClick={() => onRemoveItem(_id, name)}
                >
                    <p style={{color:'#ff4b2b', margin:'10px 0 0 5px', fontSize:'12px'}}>Remove</p>
                </div>
                {/* <VariantTagList variant={orderItem.item} /> */}
            </div>
            <div style={{display:'flex', color:'#3c4043', justifyContent:'flex-end', alignItems:'flex-start'}}>
                <p style={{margin:'0 1rem', fontSize:'16px'}}>${total}</p>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
}

export default connect(null, { addToCart, decrement, removeItem })(CartItem);
