import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { decrement, removeItem, addToCart } from '../../../../actions/productActions';

import placeholderImg from '../../../../utils/imgs/placeholder_img.jpg';

import ReactGA from 'react-ga';

const CartDrawerItem = ({ addToCart, decrement, removeItem, item}) => {
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

    const count = item.qty;
    const tempTotal = item.price;

    const { _id, name, img_gallery, price, product } = item.item;

    const total = parseFloat(tempTotal.toFixed(2));
    const itemPrice = parseFloat(item.item.price.toFixed(2));

    
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
        // <div style={{display:'flex', height:'100px', width:'100%', padding:'10px', borderBottom:'1px solid #cecece'}}>
        //     <div style={{height:'100%', width:'100px'}}>
        //         <img src={variantProductImgs.length > 0 ? `/api/products/image/${variantProductImgs[0].img_name}` : placeholderImg} style={{height:'100%'}} alt="product" />
        //     </div>
        //     <div style={{display:'flex', height:'100%', overflow:'hidden', width:'150px', marginLeft:'-10px', flexDirection:'column', alignItems:'flex-start'}}>
        //         <div className="line-clamp" style={{height:'40px', overflow:'hidden', width:'100%'}}>
        //             <p style={{margin:'0', fontSize:'12px', width:'100%'}}>{name}</p>
        //         </div>
        //         {/* {count > 1 ? (
        //             <p style={{margin:'0', fontSize:'12px', color:'#808080'}}>{count} for ${total}</p>
        //         ) : (
        //             <p style={{margin:'0', fontSize:'12px', color:'#808080'}}>${itemPrice}</p>
        //         )} */}
        //         <div class="qty-input">
        //             <button 
        //                 class="qty-count qty-count--minus" 
        //                 type="button" 
        //                 disabled={count <= 1 ? true : false}
        //                 onClick={() => handleDecrement(_id)}
        //             >
        //                 -
        //             </button>
        //             <input class="product-qty" type="number" name="product-qty" value={count} />
        //             <button 
        //                 class="qty-count qty-count--add" 
        //                 type="button"
        //                 onClick={() => handleIncrement(_id)}
        //             >
        //                 +
        //             </button>
        //         </div>
        //         <p style={{color:'#ff4b2b', margin:'0', fontSize:'12px'}} onClick={() => onRemoveItem(_id)}>Remove</p>
        //     </div>
        //     <p style={{margin:'0', fontSize:'12px', color:'#808080'}}>${total}</p>
        //     {/* <div style={{display:'flex', margin:'0 10px', color:'#808080', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        //         <div className="btn-circle inc" onClick={() => handleIncrement(_id)}><i className="fas fa-chevron-up"></i></div>
        //         <div className="btn-circle num">{count}</div>
        //         <div className="btn-circle inc" onClick={()=> handleDecrement(_id)}><i class="fas fa-chevron-down"></i></div>
        //     </div> */}
        // </div>

        <div style={{padding:'10px', height:'100px', maxHeight:'100px', display: 'grid',gridTemplateColumns: '128px 2fr 1fr',borderBottom: '1px solid #cecece',width: '100%'}}>
            <div style={{height:'100%', width:'100px', borderRadius:'5px', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <img style={{height: '100%'}} src={variantProductImgs.length > 0 ? `/api/products/image/${variantProductImgs[0].img_name}` : placeholderImg} alt="img" />
            </div>
            <div style={{display:'flex', marginLeft:'-20px', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                {/* <div className="line-clamp" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>
                    <p style={{textAlign:'left', margin:'0'}}>{name}</p>
                </div> */}
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
                    <p className="back-btn cart">Remove</p>
                </div>
                {/* <VariantTagList variant={orderItem.item} /> */}
            </div>
            <div style={{display:'flex', color:'#3c4043', justifyContent:'center', alignItems:'center'}}>
                <p style={{margin:'0 1rem', fontSize:'16px'}}>${total}</p>
            </div>
        </div>
    )
}

CartDrawerItem.propTypes = {
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
}

export default connect(null, { addToCart, decrement, removeItem })(CartDrawerItem);
