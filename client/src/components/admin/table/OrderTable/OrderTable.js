import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getLocationsByStoreId, deleteLocation } from '../../../../actions/locationActions';
import { editVarLocation } from '../../../../actions/variantActions';

import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';

import OrderItem from './OrderItem';


const OrderTable = ({ 
    store, 
    order,
    product,
    page
}) => {
    const [orderList, setOrderList] = useState([]);
    const [gotOrders, setGotOrders] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
      }, [order])



    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const renderOrderList = () => {
        console.log('IN ORDER LIST')
        console.log(order.order)
        setOrderList([]);
        if(Object.keys(order.order.cart.items).length > 0) {
            Object.values(order.order.cart.items).map(orderItem => {
                if (orderItem.item.store.toString() === store.store._id.toString()) {
                    setOrderList(orderList => [...orderList, (
                        <OrderItem 
                            isTablet={isTablet}
                            orderItem={orderItem} 
                        />
                    )])
                }
            });
        } else {
            setOrderList([(
                <button>Create Order</button>
            )])
        }
    }

    if(!order.loading && order.order && !gotOrders && store.store) {
        renderOrderList();
        setGotOrders(true);
    }
    

    // let orderList;

    // if(order.order) console.log(Object.keys(order.order.cart.items).length);

    // if(!order.loading && order.order !== null && Object.keys(order.order.cart.items).length > 0) {
    //     orderList = Object.values(order.order.cart.items).map(orderItem => (
    //         <Fragment>
    //             {orderItem.item.store === store.id && (
    //                 <OrderItem orderItem={orderItem} />
    //             )}
    //         </Fragment>
    //     ));
    // }

    return (
        <div class="content-box">
            <div class="table-responsive table-filter">
                <div className="table">
                    <div className="thead">
                        {!isTablet && (
                            <Fragment>
                                <div>
                                    <input type="checkbox" value=""/>
                                </div>
                                <div></div>
                                <div><p>Name</p></div>
                                <div></div>
                                <div><p>Total</p></div>
                                <div></div>
                            </Fragment>
                        )}
                    </div>
                    <div className="tbody">{!orderList.length > 0 ? <Spinner /> : orderList}</div>
                </div>
            </div>
        </div>
    )
}

OrderTable.propTypes = {
    store: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    store: state.store,
    order: state.order,
});

export default connect(mapStateToProps, null)(OrderTable);