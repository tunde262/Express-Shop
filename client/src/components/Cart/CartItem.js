import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { decrement, removeItem, addToCart } from '../../actions/productActions';

import placeholderImg from '../../utils/imgs/placeholder_img.jpg';

import ReactGA from 'react-ga';

class CartItem extends Component {
    handleIncrement(id) {
        this.props.addToCart(id);
    }

    handleDecrement(id) {
        this.props.decrement(id);
    }

    onRemoveItem(id, name) {
        this.props.removeItem(id);
        ReactGA.event({
            category: 'Cart',
            action: 'Removed From Cart',
            label: name
        });
    }

    render() {
        const item = this.props.item;
        const { _id, name, img_gallery, price } = item.item;
        const count = item.qty;
        const tempTotal = item.price;
        const total = parseFloat(tempTotal.toFixed(2));

        return (
            <div style={{padding: '1rem',display: 'grid',gridTemplateColumns: '128px 2fr 1fr',gridGap: '5px',borderBottom: '1px solid rgb(214, 214, 214)',width: '100%',minheight: '150px'}}>
                <div style={{height:'128px', width:'128px', borderRadius:'5px', overflow:'hidden', background:'yellow', display:'flex', flexDirection:'center', alignItems:'center'}}>
                    <img style={{width: '100%'}} src={img_gallery ? `/api/products/image/${img_gallery[0].img_name}` : placeholderImg} alt="img" />
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
                            onClick={this.handleDecrement.bind(this, _id)}
                        >
                            -
                        </button>
                        <input class="product-qty" type="number" name="product-qty" value={count} />
                        <button 
                            class="qty-count qty-count--add" 
                            type="button"
                            onClick={this.handleIncrement.bind(this, _id)}
                        >
                            +
                        </button>
                    </div>
                    <div 
                        style={{color:'#3c4043'}}
                        onClick={this.onRemoveItem.bind(this, _id, name)}
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
}

CartItem.propTypes = {
    decrement: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
}

export default connect(null, { addToCart, decrement, removeItem })(CartItem);
