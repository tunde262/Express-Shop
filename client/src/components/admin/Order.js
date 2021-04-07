import React, { Component, Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment'

import placeholderImg from '../../utils/imgs/placeholder_img.jpg';

const Order = ({ order }) => {
    const { _id, address, telephone, name, paymentId, date } = order;
    const { totalPrice, totalQty } = order.cart;

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        // window.addEventListener('resize', () => handleWindowSizeChange());
        renderOrderItems();

        // return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [order]);

    const renderOrderItems = async () => {
        const arr = [];
        for (const id in order.cart.items) {
            arr.push(order.cart.items[id]);
        }

        setOrderItems([]);

        try {
            if(arr.length > 0) {
                arr.map(async item => {
                    if (item) {
                        const { qty, price } = item;
                        const { name, img_gallery, product, company, _id } = item.item;

                        const res = await axios.get(`/api/products/${product}`);

                        let sorted_img_gallery = null;

                        if(res.data.img_gallery) {
                            sorted_img_gallery = res.data.img_gallery.sort((a, b) => a.img_order - b.img_order);
                        }

                        setOrderItems(orderItems => [...orderItems, (
                            <img key={_id} src={sorted_img_gallery ? `/api/products/image/${sorted_img_gallery[0].img_name}` : placeholderImg} style={{height:'100%', width:'70px', margin:'0 15px', zIndex:'0'}} alt="product" />
                            // <li key={item.item._id} style={{display: 'flex'}} className="list-group-item">
                            //     <img src={`/api/products/image/${img_gallery[0].img_name}`} style={{width:'3rem', height:"3rem"}} className="img-fluid" alt="img" />
                            //     <p>{name} | {qty} Units</p>
                            //     <div style={{flex: '1'}}></div>
                            //     <h5 className="text-blue font-italic mb-0">
                            //         <span className="mr-1">$</span>
                            //         {price}
                            //     </h5>
                            // </li>
                        )])
                    }
                });

                // setGotProducts(true);
            } else {
                setOrderItems([(
                    <div>
                        <p>Something's wrong...</p>
                    </div>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    
    return (
        <a href={`/profile/order/${_id}`} style={{textDecoration:'none'}}>
            <div className="customer-order-item">
                <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr 1fr'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div>
                            <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>{moment(date).format("MMMM Do")}</h3>
                            <h3 style={{color: '#808080',fontWeight: '300',fontSize: '12px'}}>{moment(date).format("h:mm a")}</h3>
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-start', height:'70px', width:'100%', overflow:'hidden'}}>
                        {!orderItems.length > 0 ? null : orderItems}
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

export default Order;
