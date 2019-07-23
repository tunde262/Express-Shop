import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Order extends Component {
    render() {
        const order = this.props.order;
        const { _id, address, name, paymentId, date } = order;
        const { totalPrice, totalQty } = order.cart;

        const arr = [];
        for (const id in order.cart.items) {
            arr.push(order.cart.items[id]);
        }
        
        let orderItems;
        
        orderItems = arr.map(item => {
            const { qty, price } = item;
            const { title, img_name, company } = item.item;
            return (
                <li key={item.item._id} style={{display: 'flex'}} className="list-group-item">
                    <img src={`/api/products/image/${img_name}`} style={{width:'3rem', height:"3rem"}} className="img-fluid" alt="img" />
                    <p>{title} | {qty} Units</p>
                    <div style={{flex: '1'}}></div>
                    <h5 className="text-blue font-italic mb-0">
                        <span className="mr-1">$</span>
                        {price}
                    </h5>
                </li>
            );
        });
        
        return (
            <div style={{margin: '15px'}} class="card card-default">
                <div className="card-header">
                    <div style={{display: 'flex'}}>
                        <p><strong>Name: </strong>{name}</p>
                        <div style={{flex: '1'}}></div>
                        <p><strong>Address: </strong>{address}</p>
                    </div>
                </div>
                <div class="card-body">
                    <ul className="list-group">
                        {orderItems}
                    </ul>
                </div>
                <div class="card-footer">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p><strong>Total: </strong> ${totalPrice}</p>
                        <p><strong>Qty: </strong> {totalQty}</p>
                        <p><strong>Date: </strong> {date}</p>    
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;
