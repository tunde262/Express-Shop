import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';

const Order = ({ order, store: { store, loading } }) => {

    let orderList; 
    
    if(order.orders === null || order.orders.loading) {
        orderList = <Spinner />; 
    } else {
        if(order.orders.length > 0) {
            orderList = order.orders.map(order => (
                <tr key={order._id}>
                    <td>{order._id}</td>
                    <td className="hide-sm"><Moment format='MM/DD/YYYY'>{order.date}</Moment></td>
                    <td>{order.name}</td>
                    <td>{order.status}</td>
                    <td>{order.cart.totalPrice}</td>
                    <td><i style={{transform: "scale(1.5)"}} className="fas fa-trash"></i></td>
                </tr>

            ));
        } else {
            orderList = <h3>No Orders</h3>
        }
    }
    return (
        <Fragment>
            <h2 className="my-2">Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order</th>
                        <th className="hide-sm">Date</th>
                        <th className="hide-sm">Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{orderList}</tbody>
            </table>
        </Fragment>
    )
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    getStoreOrders: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    store: state.store,
    order: state.order
})

export default connect(mapStateToProps)(Order);
