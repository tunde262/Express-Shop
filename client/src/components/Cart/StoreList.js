import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartColumns from './CartColumns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCartStores } from '../../actions/storeActions';

import Spinner from '../common/Spinner';
import { openModal } from '../../actions/productActions';
import store from '../../store';

const StoreCartList = ({openModal, store, setCartStores, product: { cart } }) => {
    const [storeCart, setStoreCart] = useState([]);

    useEffect(() => {
        renderStoreCart();
    }, [store.store, cart]);
    

    const renderStoreCart = () => {
        setStoreCart([]);
        if(store.store && cart) {
            let cartList;
            cartList = cart.map(item => (
                <Fragment>
                    {item.item.store === store.store._id && <CartItem key={item.item.id} item={item} />}
                </Fragment>
            ))
            
            setStoreCart([(
                <Fragment>
                    <div style={{minHeight:'50px', padding:'1rem 20px', width:'100%', borderBottom:'1px solid rgb(214,214,214)'}}>
                        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img style={{height: '40px', width: '40px', border:'1px solid #e8e8e8', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.store.img_name}`} alt="img" />
                                <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                                    <p style={{margin:'0', fontSize:'1rem'}}>{store.store.name}:</p>
                                </div>
                                {/* <p style={{margin:'0 0 0 10px', fontSize:'16px', fontFamily:'Arial, Helvetica,sans-serif'}}> $15</p> */}
                            </div>
                            <div className="store-socials store">
                                <button
                                    style={{width:'100%', margin:'10px 0',}}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    {cartList}
                </Fragment>
            )])
            
        } else {
            setStoreCart([(
                <p>Empty Cart...</p>
            )])
        }
    }

    return (
        <div class="card-body" style={{padding:'0'}}>
            {!storeCart.length > 0 ? <Spinner /> : storeCart}
        </div>
    )
}

StoreCartList.propTypes = {
    setCartStores: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    openModal:  PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store,
    product: state.product
});

export default connect(mapStateToProps, { setCartStores, openModal })(StoreCartList);
