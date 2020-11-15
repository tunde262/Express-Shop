import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import { addToProducts } from '../../../../../actions/productActions';

import Map from '../../../../common/map/Map';
import Variant from '../../../table/VariantTable/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';
import ItemTable from '../../../table/ItemTable/ItemTable';
import Spinner from '../../../../common/Spinner';

// Imgs
import BoxEmoji from '../../../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../../../utils/imgs/car.jpg'; 

const DetailOrder = ({ setModal, order, store, setTable, storageLocation }) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [orderNav, setOrderNav] = useState('items');

    const [stores, setStoreList] = useState([]);
    const [gotOrderStores, setGotOrderStores] = useState(false);
    // TODO : map markers
    
    // let imageContent;
    
    // if(detailProduct && detailProduct.img_gallery && detailProduct.img_gallery.length > 0 ) {
    //     imageContent = detailProduct.img_gallery.map(image => (
    //         <div style={{margin:'10px'}}>
    //             <img style={{width: '100%'}} src={`/api/products/image/${image.img_name}`} alt="img" />
    //         </div>
    //     ))
    // } else {
    //     imageContent = <h4>No Photos</h4>;
    // }

    useEffect(() => {

        var list = document.getElementById('progress'),
            next = document.getElementById('next'),
            clear = document.getElementById('clear'),
            children = list.children,
            completed = 1;
        // simulate activating a node
        next.addEventListener('click', function() {
            
            // count the number of completed nodes.
            completed = (completed === 0) ? 1 : completed + 2;
            if (completed > children.length) return;
            
            // for each node that is completed, reflect the status
            // and show a green color!
            for (var i = 0; i < completed; i++) {
                children[i].children[0].classList.remove('grey');
                children[i].children[0].classList.add('green');
                
                // if this child is a node and not divider, 
                // make it shine a little more
                if (i % 2 === 0) {
                    children[i].children[0].classList.add('activated', );            
                }
            }
            
        }, false);

        // clear the activated state of the markers
        clear.addEventListener('click', function() {
            for (var i = 0; i < children.length; i++) {
                children[i].children[0].classList.remove('green');
                children[i].children[0].classList.remove('activated');
                children[i].children[0].classList.add('grey');
            }
            completed = 0;
        }, false);

        return () => {
            next.removeEventListener('click', function() {
            
                // count the number of completed nodes.
                completed = (completed === 0) ? 1 : completed + 2;
                if (completed > children.length) return;
                
                // for each node that is completed, reflect the status
                // and show a green color!
                for (var i = 0; i < completed; i++) {
                    children[i].children[0].classList.remove('grey');
                    children[i].children[0].classList.add('green');
                    
                    // if this child is a node and not divider, 
                    // make it shine a little more
                    if (i % 2 === 0) {
                        children[i].children[0].classList.add('activated', );            
                    }
                }
                
            });
            clear.removeEventListener('click', function() {
                for (var i = 0; i < children.length; i++) {
                    children[i].children[0].classList.remove('green');
                    children[i].children[0].classList.remove('activated');
                    children[i].children[0].classList.add('grey');
                }
                completed = 0;
            });
        }

    }, []);

    // const handleMixpanel = () => {
    //     mixpanel.track("Admin Order Page View", {
    //     //   "Entry Point": "Home Landing",
    //       "Collection Name": collection.name,
    //     //   "Location Zipcode": collection.address_components.postalcode,
    //       "Store Name": collection.store.name,
    //       "Item Count": collection.items.length,
          
    //     });
    // }

    // if(!sentMixpanel && collection) {
    //     handleMixpanel();
    //     setSentMixpanel(true);
    // }

    const getOrderStores = async () => {
        const storeData = [];
        try {
            order.orderStores.map(async store => {
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

    if(order.order && !order.loading && !gotOrderStores) {
        getOrderStores();
        setGotOrderStores(true);
    }
    

    console.log('STORES DATA');
    console.log(stores);

    let orderList;

    if(order.order) console.log(Object.keys(order.order.cart.items).length);

    if(stores.length > 0 && order.order !== null && Object.keys(order.order.cart.items).length > 0) {
        orderList = stores.map(store => {
            let storeTotal = 0;
            Object.values(order.order.cart.items).map(item => {
                if(item.item.store === store.id) {
                    storeTotal = storeTotal + item.price
                }
            });

            return (
                <div style={{background:'#fff', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                    <div style={{background:'rgb(247, 247, 247)', padding:'1rem', width:'100%', justifyContent:'space-between', display:'flex', alignItems:'center', borderBottom:'1px solid rgb(214, 214, 214)'}}>
                        <div style={{display: 'flex', margin:'0 1rem', alignItems: 'center'}}>
                            {store.img && <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img}`} alt="img" />}
                            <p style={{margin:'1rem 0'}}>{store.name}</p>
                        </div>
                        <div style={{margin:'0 1rem'}}>
                            <p style={{margin:'0'}}>${storeTotal}</p>
                        </div>
                    </div>
                    {Object.values(order.order.cart.items).map(order => (
                        <Fragment>
                            {order.item.store === store.id && (
                                <div style={{display:'grid', width: '100%', gridGap:'4rem', gridTemplateColumns:'1fr 1fr'}}>
                                    <div style={{marginLeft:'2rem', borderBottom:'1px solid #e8e8e8', display:'flex', justifyContent:'flex-start', alignItems:'center', height:'100px', width:'100%'}}>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                            <div style={{fontSize: '1rem', color:'#cecece',margin: '10px', padding:'2px', width:'80px',height: '80px',display:'flex', justifyContent: 'center',alignItems: 'center'}}>
                                                <img src={`/api/products/image/${order.item.img_gallery[0].img_name}`} style={{height:'100%'}} alt="product" />
                                            </div>
                                            <div style={{display:'flex', width:'100%', flexDirection:'column', alignItems:'flex-start'}}>
                                                <div style={{height:'18px', marginLeft:'0', overflow:'hidden', color:'#808080'}}>
                                                    <p className="line-clamp-1" style={{margin:'0', color:'blue'}}>{order.item.name}</p>
                                                </div>
                                                <p style={{margin:'0 15px', color:'#808080'}}><span style={{color:'#ff4b2b'}}>M 12</span> / <span style={{color:'green'}}>Grey</span></p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div style={{display:'flex', color:'#808080', alignItems:'center', padding:'0 1rem'}}>
                                        <p style={{margin:'0 1rem'}}>${order.item.price}</p>
                                        <p style={{margin:'0 1rem'}}>x</p>
                                        <p style={{margin:'0 1rem'}}>{order.qty}</p>
                                        <p style={{margin:'0 1rem'}}>${order.price}</p>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            )
        })
    }

    let mainContent;

    if(order.order) {
        if(orderNav === 'items') {
            mainContent = (
                <Fragment>
                    <div class="content-box">
                        <h3>Hello</h3>
                        {/* <div class="table-responsive table-filter">
                            <ItemTable setModal={setModal} page="collection" product={{sortedProducts: [...product.products], loading: false}} />
                        </div> */}
                    </div>
                </Fragment>
            )
        } else if (orderNav === 'inventory') {
            mainContent = (
                <Fragment>
                    <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
                        <div style={{margin:'0', width:'100%',border:'2px dashed #cecece',borderRadius: '10px'}}>
                            <div style={{height:'250px', maxHeight:'250px', width:'100%'}}>
                                {/* {!storageLocation.loading && storageLocation.locations.length > 0 && !product.switchMaps ? (
                                    <Map storageLocation={storageLocation} />
                                ) : null} */}
                                <Map 
                                    defaultZoom="8"
                                    centerLat="33.0300238"
                                    centerLng="-96.83283879999999"
                                    markerLat="33.0300238"
                                    markerLng="-96.83283879999999"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{margin:'10px 0'}}>
                        {/* <div class="table-responsive table-filter">
                            <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                        </div> */}
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                            {orderList}
                        </div>
                    </div>
                </Fragment>
            );
        }
    } else {
        mainContent = <Spinner />;
    }

    let secondaryContent;

    if(order.order) {
        if(orderNav === 'items') {
            secondaryContent = (
                <Fragment>
                    <div style={{background:'#fff', height:'min-content', padding:'2rem 0 0 0', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                        <div className="vertical-step-bar">
                            <ul id="progress">
                                <li>
                                    <div class="node green"></div>
                                    <p>Order Placed</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div>
                                </li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>Collecting Items</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div></li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>Awaiting Delivery</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div>
                                </li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>En Route Started</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div>
                                </li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>Left At Door</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                            </ul>
                        </div>
        
                        <div style={{margin:'1rem 0 10px'}}>
                            <input type="button" value="Next" id="next"/>
                            <input type="button" value="Clear" id="clear"/>
                        </div>
                    </div>
                    <div id="order-totals" style={{background:'#fff', margin:'10px 0', padding:'10px', height:'300px', border:'1px solid rgb(214, 214, 214)'}}>
                        <p>Order Summary</p>
                        <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                            <p>Item(s) Subtotal:</p>
                            <p>${order.order && order.order.cart.totalPrice}</p>
                        </div>
                        <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                            <p>Shipping & Handling:</p>
                            <p>$0.00</p>
                        </div>
                        <div style={{display:'flex', color:'#808080', justifyContent:'space-between'}}>
                            <p>Estimated Tax:</p>
                            <p>$3.98</p>
                        </div>
                        <div style={{display:'flex', color:'#ff4b2b', justifyContent:'space-between'}}>
                            <p>Completed Total:</p>
                            <p>${order.order && order.order.cart.totalPrice}</p>
                        </div>
                    </div>
                    <div class="product-privacy-box">
                        <div class="product-privacy-box-title">
                            <p style={{color:'#808080', margin:'0'}}>Tags</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <input
                                type="email"
                                name="email"
                                className="input_line"
                                placeholder="Enter Email"
                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
                            <div style={{display:'flex', flexWrap:'wrap', width:'100%'}}>
                                <div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'30px', width:'fit-content',  borderRadius:'30px', padding:'1px 1rem 0 1rem'}}>
                                    <p style={{margin:'auto', color:'green'}}>hat</p>
                                    <i style={{color:'green', marginLeft:'10px',fontSize:'12px'}} class="fas fa-times"></i>
                                </div>
                                <div style={{background:'#ffc0cb', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'30px', width:'fit-content',  borderRadius:'30px', padding:'1px 1rem 0 1rem'}}>
                                    <p style={{margin:'auto', color:'#db0026'}}>dad cap</p>
                                    <i style={{color:'#db0026', marginLeft:'10px',fontSize:'12px'}} class="fas fa-times"></i>
                                </div>
                                <div style={{background:'#a0edf3', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'30px', width:'fit-content',  borderRadius:'30px', padding:'1px 1rem 0 1rem'}}>
                                    <p style={{margin:'auto', color:'#105e82'}}>dragon ball z</p>
                                    <i style={{color:'#105e82', marginLeft:'10px',fontSize:'12px'}} class="fas fa-times"></i>
                                </div>
                                <div style={{background:'#f0ef89', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'30px', width:'fit-content',  borderRadius:'30px', padding:'1px 1rem 0 1rem'}}>
                                    <p style={{margin:'auto', color:'#828211'}}>50%off</p>
                                    <i style={{color:'#828211', marginLeft:'10px',fontSize:'12px'}} class="fas fa-times"></i>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="product-privacy-box">
                        <div class="product-privacy-box-title">
                            <p style={{color:'#808080', margin:'0'}}>Notes</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <input
                                type="email"
                                name="email"
                                className="input_line"
                                placeholder="Enter Email"
                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                    <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                                </div>
                            </div>
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                    <p style={{margin:'0', color:'#333'}}>Wholesale order coming oct. 24</p>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                                </div>
                            </div>
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                    <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        } else if (orderNav === 'inventory') {
            secondaryContent = (
                <Fragment>
                    <div style={{background:'#fff', height:'min-content', padding:'2rem 0 0 0', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                        <div className="vertical-step-bar">
                            <ul id="progress">
                                <li>
                                    <div class="node green"></div>
                                    <p>Order Placed</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div>
                                </li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>Collecting Items</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div></li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>Awaiting Delivery</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div>
                                </li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>En Route Started</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                                <li>
                                    <div class="divider grey"></div>
                                </li>
                                <li>
                                    <div class="node grey"></div>
                                    <p>Left At Door</p>
                                    <p style={{marginTop:'20px', color:'#808080'}}><small>05/10/2001 5:35pm</small></p>
                                </li>
                            </ul>
                        </div>
        
                        <div style={{margin:'1rem 0 10px'}}>
                            <input type="button" value="Next" id="next"/>
                            <input type="button" value="Clear" id="clear"/>
                        </div>
                    </div>
                    <div class="product-privacy-box">
                        <div class="product-privacy-box-title">
                            <p style={{color:'#808080', margin:'0'}}>Locations</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <p style={{margin:'0'}}>Shorts <span style={{color:'#ff4b2b'}}>(43)</span></p>
                                    <small style={{color:'#ccc', margin:'0'}}>Auto</small>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-times"></i>
                                </div>
                            </div>
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <p style={{margin:'0'}}>Halloween <span style={{color:'#ff4b2b'}}>(43)</span></p>
                                    <small style={{color:'#ccc', margin:'0'}}>Auto</small>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-times"></i>
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <p style={{margin:'0'}}>Tops <span style={{color:'#ff4b2b'}}>(43)</span></p>
                                    <small style={{color:'#ccc', margin:'0'}}>Auto</small>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-times"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-privacy-box">
                        <div class="product-privacy-box-title">
                            <p style={{color:'#808080', margin:'0'}}>Notes</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <input
                                type="email"
                                name="email"
                                className="input_line"
                                placeholder="Enter Email"
                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                    <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                                </div>
                            </div>
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                    <p style={{margin:'0', color:'#333'}}>Wholesale order coming oct. 24</p>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                                </div>
                            </div>
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                    <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                                </div>
                                <div>
                                    <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    } else {
        secondaryContent = null;
    }


    return (
        <Fragment>
            {/* <div className="product-actions container-fluid">
                <div style={{display:'flex', justifyContent:'space-between', height:'50px', alignItems:'center'}}>
                    <p>Qty 20 in stock for 3 varients</p>
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <Link to={collection && `/collections/${collection._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i style={{margin:'0 1rem', fontSize:'1.4rem'}} class="fas fa-share-alt"></i>
                        <button onClick={e => setTable('edit collection')} style={{ margin:'0 1rem 0 0', background:'#f4f4f4', color:'#7A7A7A', borderColor:'#f4f4f4' }}>Edit</button>
                        <button onClick={e => setTable('storage request')} style={{ margin:'0 1rem 0 0' }}>Request Storage</button>
                    </div>
                    {' '}
                </div>
                <hr style={{margin:'0'}} />
            </div> */}
            <section id="stats" className="stats">
                <div className="stats-box">
                    <div>
                        <h2 style={{color:'#333', fontWeight:'300'}}>2,000</h2>
                        <p>Active</p>
                    </div>
                    <div>  
                        <h2 style={{color:'#333', fontWeight:'300'}}>2000</h2>
                        <p>Sold</p>
                    </div>
                    <div>   
                        <h2 style={{color:'#333', fontWeight:'300'}}>2,056</h2>
                        <p>Shipping</p>
                    </div>
                    <div>   
                        <h2 style={{color:'#333', fontWeight:'300'}}>2000</h2>
                        <p>Low Stock</p>
                    </div>
                </div>
                <div>
                    <ul class="profile-underline">
                        <div 
                            onClick={e => setOrderNav('items')} className={orderNav === "items" && "active"}
                        >
                            <li><p>Items<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(36)</span></p></li>
                        </div>
                        <div 
                            onClick={e => setOrderNav('inventory')} className={orderNav === "inventory" && "active"}
                        >
                            <li><p>Inventory<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(108)</span></p></li>
                        </div>
                    </ul>
                </div>
            </section>
            <div class="product-admin-main">
                {mainContent}
            </div>
            <div class="product-admin-secondary">
                {secondaryContent}
            </div>
        </Fragment>
    )
}

DetailOrder.propTypes = {
    order: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    storageLocation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    product: state.product,
    storageLocation: state.location
})

export default connect(mapStateToProps, null)(withRouter(DetailOrder));

