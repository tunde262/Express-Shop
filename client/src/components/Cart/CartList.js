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
            <div style={{margin: '15px'}} className="card card-default">
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
        )});
    } else {
        cartList = <Spinner />
    }

    return (
        <div className="container-fluid">
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
