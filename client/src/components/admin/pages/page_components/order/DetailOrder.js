import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import { setLocations } from '../../../../../actions/locationActions';

import Map from '../../../../common/map/Map';
import Variant from '../../../table/VariantTable/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';
import ItemTable from '../../../table/ItemTable/ItemTable';
import Spinner from '../../../../common/Spinner';

import OrderTable from '../../../table/OrderTable/OrderTable';
import OrderItem from '../../../table/OrderTable/OrderItem';

import OrderSummaryBlock from '../common/OrderSummaryBlock';
import InventoryActivityBlock from '../common/InventoryActivityBlock';
import TagsBlock from '../common/TagsBlock';
import LocationsBlock from '../common/LocationsBlock';
import MapBlock from '../common/MapBlock';
import StatsBlock from '../common/StatsBlock';

import placeholderImg from '../../../../../utils/imgs/placeholder_img.jpg';


const DetailOrder = ({ 
    setModal, 
    order, 
    store, 
    setTable, 
    storageLocation,
    setLocations
}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [pageNav, setPageNav] = useState('detail');

    const [stores, setStoreList] = useState([]);
    const [gotOrderStores, setGotOrderStores] = useState(false);
    const [orderList, setOrderList] = useState([]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
        window.addEventListener('resize', () => handleWindowSizeChange());

        renderOrderList();
        return () => {
            window.removeEventListener('resize', () => handleWindowSizeChange());
        }

    }, [storageLocation.locations]);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

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

    const getOrderLocations = async () => {
        const locationArray = [];
        let darkstore;

        console.log('GET ORDER LOCATIONS')

        try {
            if(Object.keys(order.order.cart.items).length > 0) {
                for(var j = 0; j < Object.keys(order.order.cart.items).length; j++) {
                    console.log('CART ORDER ITEM')
                    console.log(Object.values(order.order.cart.items)[j])
                  for(var i = 0; i < Object.values(order.order.cart.items)[j].item.locations.length; i++) {
                      console.log('IN FOR LOOP')
                    darkstore = await axios.get(`/api/darkstores/${Object.values(order.order.cart.items)[j].item.locations[i].location}`);
                    console.log('DARKSTORE');
                    console.log(darkstore)
                    if(locationArray.length > 0) {
                      if(locationArray.filter(location => location._id.toString() === darkstore.data._id).length > 0) {
                        return;
                      } else {
                        locationArray.push({
                          _id: darkstore.data._id,
                          location: darkstore.data.location,
                          address_components: darkstore.data.address_components,
                          name: darkstore.data.name,
                          placeId: darkstore.data.placeId,
                          formatted_address: darkstore.data.formatted_address,
                          phone: darkstore.data.phone,
                          qty: Object.values(order.order.cart.items)[j].item.locations[i].qty,
                          price: Object.values(order.order.cart.items)[j].item.locations[i].price,
                          sale_price: Object.values(order.order.cart.items)[j].item.locations[i].sale_price
                        });
                      }
                    } else {
                      locationArray.push({
                        _id: darkstore.data._id,
                        location: darkstore.data.location,
                        address_components: darkstore.data.address_components,
                        name: darkstore.data.name,
                        placeId: darkstore.data.placeId,
                        formatted_address: darkstore.data.formatted_address,
                        phone: darkstore.data.phone,
                        qty: Object.values(order.order.cart.items)[j].item.locations[i].qty,
                        price: Object.values(order.order.cart.items)[j].item.locations[i].price,
                        sale_price: Object.values(order.order.cart.items)[j].item.locations[i].sale_price
                      });

                      console.log('POST ARRAY PUSH')
                      console.log(locationArray)
                    }
                    
                    console.log('LOCATIONS ARRAY');
                    console.log(locationArray);
                  }
                  console.log('EXIT FOR LOOP')
                  console.log(locationArray)
                  //dispatch locationArray HERE
                  
                }
                console.log('FINAL LOCATION ARRAY')
                console.log(locationArray)
                setLocations(locationArray)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const renderOrderList = async () => {
        setOrderList([]);
        try {
            if(storageLocation.locations.length > 0 && order.order !== null && Object.keys(order.order.cart.items).length > 0) {
                storageLocation.locations.map(location => {
                    let locationTotal = 0;
                    Object.values(order.order.cart.items).map(item => {
        
                        for(var i = 0; i < item.item.locations.length; i++) {
                            console.log('Location ID');
                            console.log(item.item.locations[i].location);
        
                            if(item.item.locations[i].location.toString() === location._id) {
                                locationTotal = locationTotal + item.price
                            }
                            
                            break;
                        }
                    });

                    let locItems = Object.values(order.order.cart.items).map(item => {
                        for(var i = 0; i < item.item.locations.length; i++) {
                            console.log('Location ID');
                            console.log(item.item.locations[i].location);
        
                            if(item.item.locations[i].location.toString() === location._id) {
                                return (
                                    <OrderItem 
                                        isTablet={isTablet} 
                                        orderItem={item} 
                                    />
                                )
                            }
                    
                            
                            break;
                        }
                    });
        
                    setOrderList(orderList => [...orderList, (
                        <div style={{background:'#fff', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                            <div style={{background:'rgb(247, 247, 247)', padding:'1rem', width:'100%', justifyContent:'space-between', display:'flex', alignItems:'center', borderBottom:'1px solid rgb(214, 214, 214)'}}>
                                <div style={{display: 'flex', margin:'0 1rem', alignItems: 'center'}}>
                                    {/* {store.img && <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img}`} alt="img" />} */}
                                    <p style={{margin:'1rem 0'}}>{location.name}</p>
                                </div>
                                <div style={{margin:'0 1rem'}}>
                                    <p style={{margin:'0'}}>${locationTotal}</p>
                                </div>
                            </div>
                            {locItems}
                        </div>
                    )])
                })
            } else {
                setOrderList([(
                    <button>Create Order</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }


    if(order.order && !order.loading && !gotOrderStores) {
        getOrderLocations();
        getOrderStores();
        setGotOrderStores(true);
    }
    

    console.log('STORES DATA');
    console.log(stores);


    // if(storageLocation.locations.length > 0 && order.order !== null && Object.keys(order.order.cart.items).length > 0) {
    //     orderList = storageLocation.locations.map(location => {
    //         let locationTotal = 0;
    //         Object.values(order.order.cart.items).map(item => {

    //             for(var i = 0; i < item.item.locations.length; i++) {
    //                 console.log('Location ID');
    //                 console.log(item.item.locations[i].location);

    //                 if(item.item.locations[i].location.toString() === location._id) {
    //                     locationTotal = locationTotal + item.price
    //                 }
                    
    //                 break;
    //             }
    //         });

    //         return (
    //             <div style={{background:'#fff', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
    //                 <div style={{background:'rgb(247, 247, 247)', padding:'1rem', width:'100%', justifyContent:'space-between', display:'flex', alignItems:'center', borderBottom:'1px solid rgb(214, 214, 214)'}}>
    //                     <div style={{display: 'flex', margin:'0 1rem', alignItems: 'center'}}>
    //                         {/* {store.img && <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img}`} alt="img" />} */}
    //                         <p style={{margin:'1rem 0'}}>{location.name}</p>
    //                     </div>
    //                     <div style={{margin:'0 1rem'}}>
    //                         <p style={{margin:'0'}}>${locationTotal}</p>
    //                     </div>
    //                 </div>
    //                 {Object.values(order.order.cart.items).map(item => {
    //                     for(var i = 0; i < item.item.locations.length; i++) {
    //                         console.log('Location ID');
    //                         console.log(item.item.locations[i].location);
        
    //                         if(item.item.locations[i].location.toString() === location._id) {
    //                             return (
    //                                 <Fragment>
    //                                         <div style={{display:'grid', width: '100%', gridGap:'4rem', gridTemplateColumns:'1fr 1fr'}}>
    //                                             <div style={{marginLeft:'2rem', borderBottom:'1px solid #e8e8e8', display:'flex', justifyContent:'flex-start', alignItems:'center', height:'100px', width:'100%'}}>
    //                                                 <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
    //                                                     <div style={{fontSize: '1rem', color:'#cecece',margin: '10px', padding:'2px', width:'80px',height: '80px',display:'flex', justifyContent: 'center',alignItems: 'center'}}>
    //                                                         <img src={item.item.img_gallery ? `/api/products/image/${item.item.img_gallery[0].img_name}` : placeholderImg} style={{height:'100%'}} alt="product" />
    //                                                     </div>
    //                                                     <div style={{display:'flex', width:'100%', flexDirection:'column', alignItems:'flex-start'}}>
    //                                                         <div style={{height:'18px', marginLeft:'0', overflow:'hidden', color:'#808080'}}>
    //                                                             <p className="line-clamp-1" style={{margin:'0', color:'blue'}}>{item.item.name}</p>
    //                                                         </div>
    //                                                         <p style={{margin:'0 15px', color:'#808080'}}><span style={{color:'#ff4b2b'}}>M 12</span> / <span style={{color:'green'}}>Grey</span></p>
    //                                                     </div>
    //                                                 </div>
                                                    
    //                                             </div>
    //                                             <div style={{display:'flex', color:'#808080', alignItems:'center', padding:'0 1rem'}}>
    //                                                 <p style={{margin:'0 1rem'}}>${item.item.price}</p>
    //                                                 <p style={{margin:'0 1rem'}}>x</p>
    //                                                 <p style={{margin:'0 1rem'}}>{item.qty}</p>
    //                                                 <p style={{margin:'0 1rem'}}>${item.price}</p>
    //                                             </div>
    //                                         </div>
    //                                 </Fragment>
    //                             )
    //                         }
                            
    //                         break;
    //                     }
    //                 })}
    //             </div>
    //         )
    //     })
    // }

    let mainContent;

    if(order.order) {
        if(pageNav === 'detail') {
            mainContent = <OrderTable />
        } else if (pageNav === 'inventory') {
            mainContent = (
                <Fragment>
                    {storageLocation.locations.length > 0 && <MapBlock />}
                    <div style={{margin:'10px 0'}}>
                        {/* <div class="table-responsive table-filter">
                            <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                        </div> */}
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
                            {orderList}
                        </div>
                    </div>
                    {/* <div class="content-box">
                        <h3>Hello</h3>
                        <div class="table-responsive table-filter">
                            <ItemTable setModal={setModal} page="collection" product={{sortedProducts: [...product.products], loading: false}} />
                        </div>
                    </div> */}
                </Fragment>
            );
        }
    } else {
        mainContent = <Spinner />;
    }

    let secondaryContent;

    if(order.order) {
        if(pageNav === 'detail') {
            secondaryContent = (
                <Fragment>
                    <OrderSummaryBlock 
                        order={order}
                    />

                    <InventoryActivityBlock
                        isMobile={isMobile}
                    />

                    {/* <TagsBlock 
                        isMobile={isMobile} 
                        onAddItemTag={onAddItemTag}  
                        onDeleteItemTag={onDeleteItemTag}  
                        itemTags={itemTags} 
                        loadItemTags={loadItemTags}
                    /> */}
                </Fragment>
            )
        } else if (pageNav === 'inventory') {
            secondaryContent = (
                <Fragment>
                    <LocationsBlock />

                    <InventoryActivityBlock
                        isMobile={isMobile}
                    />
                </Fragment>
            );
        }
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
            <StatsBlock 
                setPageNav={setPageNav}
                pageNav={pageNav}
            />
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
    setLocations: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    product: state.product,
    storageLocation: state.location
})

export default connect(mapStateToProps, { setLocations })(DetailOrder);

