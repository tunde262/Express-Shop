import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartColumns from './CartColumns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setStores } from '../../actions/storeActions';

const CartList = ({cart, setStores }) => {
    const [stores, setStoreList] = useState([]);

    useEffect( async () => {
        let storeList = [];
        let storeData = [];
        cart.map(item => storeList.includes(item.item.store) ? null : storeList.push(item.item.store));
        try {
            storeList.map(async storeId => {
                const res = await axios.get(`/api/stores/${storeId}`);
                console.log(res.data);
                storeData.push({
                    id: storeId,
                    name: res.data.name,
                    img: res.data.img_name
                })
            });
            console.log('Data:');
            console.log(storeData);
            setStoreList(storeData);
            setStores(storeData);
        } catch (err) {
            console.log(err);
        }
    }, []);
    
    let cartList;

    console.log('STORES DATA');
    console.log(stores);

    cartList = stores.map(store => (
        <div style={{margin: '15px'}} class="card card-default">
            <div className="card-header">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {store.img && <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img}`} alt="img" />}
                        <p style={{margin:'1rem 0'}}>{store.name}</p>
                    </div>
                    <p><strong>Total: </strong>$15</p>
                    <button>Checkout with store</button>
                </div>
            </div>
            <div class="card-body">
                <CartColumns />
                <ul className="list-group">
                    {cart.map(item => (
                        <Fragment>
                            {item.item.store === store.id && <CartItem key={item.item.id} item={item} />}
                        </Fragment>
                    ))}
                </ul>
            </div>
        </div>
    ));

    return (
        <div className="container-fluid">
            {cartList}
        </div>
    )
}

CartList.propTypes = {
    setStores: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    store: state.store
});

export default connect(mapStateToProps, { setStores })(CartList);
