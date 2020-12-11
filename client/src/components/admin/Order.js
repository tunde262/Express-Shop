import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment'

import placeholderImg from '../../utils/imgs/placeholder_img.jpg';

class Order extends Component {
    render() {
        const order = this.props.order;
        const { _id, address, telephone, name, paymentId, date } = order;
        const { totalPrice, totalQty } = order.cart;

        const arr = [];
        for (const id in order.cart.items) {
            arr.push(order.cart.items[id]);
        }
        
        let orderItems;
        
        orderItems = arr.map(item => {
            const { qty, price } = item;
            const { name, img_gallery, company, _id } = item.item;
            return (
                <img key={item.item._id} src={img_gallery ? `/api/products/image/${img_gallery[0].img_name}` : placeholderImg} style={{height:'100%', width:'70px', margin:'0 15px', zIndex:'0'}} alt="product" />
                // <li key={item.item._id} style={{display: 'flex'}} className="list-group-item">
                //     <img src={`/api/products/image/${img_gallery[0].img_name}`} style={{width:'3rem', height:"3rem"}} className="img-fluid" alt="img" />
                //     <p>{name} | {qty} Units</p>
                //     <div style={{flex: '1'}}></div>
                //     <h5 className="text-blue font-italic mb-0">
                //         <span className="mr-1">$</span>
                //         {price}
                //     </h5>
                // </li>
            );
        });
        
        return (
            <a href={`https://www.cardboardexpress.com/profile/order/${_id}`} style={{textDecoration:'none'}}>
                <div className="customer-order-item">
                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr 1fr'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>{moment(date).format("MMMM Do")}</h3>
                                <h3 style={{color: '#808080',fontWeight: '300',fontSize: '12px'}}>{moment(date).format("h:mm a")}</h3>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-start', height:'70px', width:'100%', overflow:'hidden'}}>
                            {orderItems}
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>${totalPrice}</h3>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button>View Details</button>
                        </div>
                    </div>
                </div>
            </a>


            // <div style={{margin: '15px'}} class="card card-default">
            //     <div className="card-header" style={{background:'#fff'}}>
            //         <div style={{display: 'flex', justifyContent: 'space-between'}}>
            //             <p><strong>Date: </strong> <Moment>{date}</Moment></p> 
            //             <p><strong>Total: </strong> ${totalPrice}</p>
            //         </div>
            //     </div>
            //     <div class="card-body">
            //         <ul className="list-group">
            //             {orderItems}
            //         </ul>
            //     </div>
            //     <div class="card-footer" style={{background:'#fff'}}>
            //         <div style={{display: 'flex', justifyContent: 'space-between'}}>
            //             <p><strong>Address: </strong>{address.street} {address.city}, {address.state} {address.zipcode}</p>
            //             <p><strong>Qty: </strong> {totalQty}</p>   
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default Order;
