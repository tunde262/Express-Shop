import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import mixpanel from 'mixpanel-browser';
import Map from '../../../common/map/Map';
import TableDetails from '../../../TableDetails/TableDetails';

import shoeSample from '../../../../utils/imgs/20484728.jpeg';
import placeholderImg from '../../../../utils/imgs/placeholder_img.jpg';

const Main_Detail_Order = ({deleteAccount, order, store, auth: { user }, profile: {profile, loading }}) => {
    const [stores, setStoreList] = useState([]);
    const [gotOrderStores, setGotOrderStores] = useState(false);

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
    }, [])

    // Toggle Forms
    const [slideForm1, setSlideForm1] = useState(false);
    const [slideForm2, setSlideForm2] = useState(false);
    const [formValue1, setFormValue1] = useState(null);
    const [formValue2, setFormValue2] = useState(null);

    const handleSlideForm1 = (value) => {
        setSlideForm1(!slideForm1);
        if(value && formValue1 !== value) {
            setFormValue1(value);
        }
    }

    const handleSlideForm2 = (value) => {
        setSlideForm2(!slideForm2);
        if(value && formValue2 !== value) {
            setFormValue2(value);
        }
    }

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
                                                <img src={order.item.img_gallery ? `/api/products/image/${order.item.img_gallery[0].img_name}` : placeholderImg} style={{height:'100%'}} alt="product" />
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

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div className="order-container">
                <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
                    <div style={{margin:'0', width:'100%',border:'2px dashed #cecece',borderRadius: '10px'}}>
                        <div style={{height:'250px', maxHeight:'250px', width:'100%'}}>
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

                <div id="order-updates">
                    <div style={{background:'#fff', padding:'2rem 0 0 0', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
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
                                    <div class="divider grey"></div
                                ></li>
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
                <div id="order-actions" style={{background:'#fff', margin:'10px 0', padding:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', height:'50px', width: '100%', borderBottom:'1px solid #e8e8e8'}}>
                        <p style={{margin:'0'}}>Get Help?</p>
                        <i style={{color:'#808080'}} class="fas fa-chevron-right"></i>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', height:'50px', width: '100%', borderBottom:'1px solid #e8e8e8'}}>
                        <p style={{margin:'0'}}>Return Item (s)</p>
                        <i style={{color:'#808080'}} class="fas fa-chevron-right"></i>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', height:'50px', width: '100%', borderBottom:'1px solid #e8e8e8'}}>
                        <p style={{margin:'0'}}>Print QR Code Label</p>
                        <i style={{color:'#808080'}} class="fas fa-chevron-right"></i>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 10px', height:'50px', width: '100%'}}>
                        <p style={{margin:'0'}}>Write A Review</p>
                        <i style={{color:'#808080'}} class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div id="order-items" style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                    {orderList}
                </div>
            </div>
            <div style={{height:'300px'}}></div>
        </Fragment>
    )
}

Main_Detail_Order.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store,
    order: state.order
});

export default connect(mapStateToProps, null)(Main_Detail_Order);
