import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartColumns from './CartColumns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStoreById, setCartStores } from '../../actions/storeActions';

import Spinner from '../common/Spinner';
import { openModal } from '../../actions/productActions';

const CartList = ({cart, openModal, getStoreById, setCartStores, product: { cartStores} }) => {
    const [stores, setStoreList] = useState([]);

    useEffect(() => {
        function getCartStores() {
            const storeData = [];
            try {
                cartStores.map(async store => {
                    const res = await axios.get(`/api/stores/${store.store}`);
                    console.log(res.data);
                    setStoreList(stores => [...stores, {
                        id: store.store,
                        name: res.data.name,
                        img: res.data.img_name
                    }])
                });
            } catch (err) {
                console.log(err);
            }
        }

        getCartStores();
    }, []);

    const handleStoreCheckout = (prodId, storeId) => {
        openModal(prodId);
        getStoreById(storeId)
    }
    

    console.log('STORES DATA');
    console.log(stores);
    let cartList;

    if(stores.length > 0) {
        cartList = stores.map(store => {
            let checkoutDisabled = true;
            for(var x = 0; x < cart.length; x++) {
                if(cart[x].item.store.toString() === store.id.toString()) {
                    checkoutDisabled = false;
                    break;
                }
            }
            
            return (
                <Fragment>
                    <div style={{minHeight:'50px', padding:'1rem 20px', width:'100%', borderBottom:'1px solid rgb(214,214,214)'}}>
                        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img style={{height: '40px', width: '40px', border:'1px solid #e8e8e8', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img}`} alt="img" />
                                <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                                    <p style={{margin:'0', fontSize:'1rem'}}>{store.name}:</p>
                                </div>
                                {/* <p style={{margin:'0 0 0 10px', fontSize:'16px', fontFamily:'Arial, Helvetica,sans-serif'}}> $15</p> */}
                            </div>
                            <div className="store-socials store">
                                {!checkoutDisabled ? (
                                    <button
                                        onClick={() =>handleStoreCheckout(cart[0].item.product, store.id)}
                                        style={{width:'100%', margin:'10px 0',}}
                                    >
                                        Checkout with store
                                    </button>
                                ) : (
                                    <div className="detail-sub-btn active">
                                        <p style={{fontWeight:'500', margin:'0'}}>Order Placed <i style={{marginLeft:'10px'}} class="fas fa-check"></i></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {cart.map(item => (
                        <Fragment>
                            {item.item.store === store.id && <CartItem key={item.item.id} item={item} />}
                        </Fragment>
                    ))}
                </Fragment>
            )
        });
    } else {
        cartList = <Spinner />
    }

    return (
        <div class="card-body" style={{padding:'0'}}>
            {cartList}
        </div>
    )
}

CartList.propTypes = {
    getStoreById: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    openModal:  PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store,
    product: state.product
});

export default connect(mapStateToProps, { getStoreById, openModal })(CartList);
