import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders, getCustomerOrders } from '../../actions/productActions';

import Spinner from '../common/Spinner';
import Title from '../Title';
import Order from './Order';

class OrderList extends Component {
    componentDidMount() {
        if(this.props.admin) {
            this.props.getOrders();
        }

        if(this.props.profile) {
            this.props.getCustomerOrders(this.props.user);
        }
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
}

OrderList.propTypes = {
    getOrders: PropTypes.func.isRequired,
    getCustomerOrders: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { getOrders, getCustomerOrders })(OrderList);
