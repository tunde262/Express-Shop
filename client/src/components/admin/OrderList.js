import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../../actions/productActions';

import Spinner from '../common/Spinner';
import Title from '../Title';
import Order from './Order';

class OrderList extends Component {
    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        const { orders, loading } = this.props.product;
        
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

        return (
            <div style={{textAlign: 'center'}} className="container">
                <Link to="/admin/all">All Items</Link>
                <h1>Orders</h1>
                <hr />
                {orderList}
            </div>
        )
    }
}

OrderList.propTypes = {
    getOrders: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getOrders })(OrderList);
