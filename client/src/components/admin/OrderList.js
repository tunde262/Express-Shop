import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders, getCustomerOrders } from '../../actions/orderActions';
import { setStores } from '../../actions/storeActions';

import Spinner from '../common/Spinner';
import Title from '../Title';
import Order from './Order';

const OrderList = ({order, admin, getCustomerOrders, getOrders, setStores, profile, auth: {user}}) => {
    const [gotOrderStores, setGotOrderStores] = useState(false);

    useEffect(() => {
        if(admin) {
            getOrders();
        }

        if(profile) {
            getCustomerOrders(user._id);
        }
    },[user])

    const { orders, orderStores, loading } = order;

    const loopOrderStores = (orderStores) => {
        orderStores.map(store => setStores(store.store));
    }

    if(!gotOrderStores && profile && orderStores.length > 0) {
        loopOrderStores(orderStores);

        setGotOrderStores(true);
    }
        
    let orderList;

    if(orders === null || loading) {
        orderList = <Spinner />;
    }
    else {
        if(orders.length > 0) {
            orderList = orders.map(order => (
                <Order key={order._id} order={order} />
            ))
        }
        else {
            orderList = <Title name="No Orders" title="Available" />
        }
    }

    // let headingContent;

    // if(this.props.admin) {
    //     headingContent = (
    //         <Fragment>
    //             <Link to="/admin/all">All Items</Link>
    //             <h1>Orders</h1>
    //             <hr />
    //         </Fragment>
    //     )
    // } else {
    //     headingContent = (
    //         <Fragment>
    //             <h1>Orders</h1>
    //             <hr />
    //         </Fragment>
    //     );
    // }

        

    return (
        <div style={{textAlign: 'center'}}>
            {orderList}
        </div>
    )
}

OrderList.propTypes = {
    getOrders: PropTypes.func.isRequired,
    getCustomerOrders: PropTypes.func.isRequired,
    setStores: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order,
    auth: state.auth
});

export default connect(mapStateToProps, { getOrders, getCustomerOrders, setStores })(OrderList);
