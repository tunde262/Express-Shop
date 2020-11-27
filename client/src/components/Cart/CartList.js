import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartColumns from './CartColumns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCartStores } from '../../actions/storeActions';

import Spinner from '../common/Spinner';

const CartList = ({cart, setCartStores, product: { cartStores} }) => {
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
    

    console.log('STORES DATA');
    console.log(stores);
    let cartList;

    if(stores.length > 0) {
        cartList = stores.map(store => {
            return (
                <Fragment>
                    <div style={{minHeight:'50px', padding:'1rem 20px', width:'100%', borderBottom:'1px solid rgb(214,214,214)'}}>
                        <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img}`} alt="img" />
                                <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                                    <p style={{margin:'0'}}>{store.name}</p>
                                    <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
                                </div>
                            </div>
                            <button style={{margin:'0'}}>Checkout with store</button>
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
    setCartStores: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    store: state.store,
    product: state.product
});

export default connect(mapStateToProps, { setCartStores })(CartList);
