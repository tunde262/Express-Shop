import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import { addToProducts } from '../../../../../actions/productActions';
import { setPage } from '../../../../../actions/navActions';

import Map from '../../../../common/map/Map';
import Variant from '../../../table/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';
import Item from '../../../table/Item';
import Spinner from '../../../../common/Spinner';

// Imgs
import BoxEmoji from '../../../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../../../utils/imgs/car.jpg'; 

const DetailCollection = ({ setModal, setPage, addToProducts, collection: { collection, loading }, product, setTable, storageLocation }) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [collectionNav, setCollectionNav] = useState('items');
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
        setPage('admin detail collection');
        if(collection) {
            for(var i = 0; i < collection.items.length; i++) {
                console.log('ITEM ID');
                console.log(collection.items[i]);
                addToProducts(collection.items[i].item)
            }
        }

    }, [loading]);

    const handleMixpanel = () => {
        mixpanel.track("Admin Collection Page View", {
        //   "Entry Point": "Home Landing",
          "Collection Name": collection.name,
        //   "Location Zipcode": collection.address_components.postalcode,
          "Store Name": collection.store.name,
          "Item Count": collection.items.length,
          
        });
    }

    if(!sentMixpanel && collection) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    let mainContent;

    if(collection) {
        if(collectionNav === 'items') {
            mainContent = (
                <Fragment>
                    <div class="content-box">
                        <div class="table-responsive table-filter">
                            <Item setModal={setModal} page="collection" product={{sortedProducts: [...product.products], loading: false}} />
                        </div>
                    </div>
                </Fragment>
            )
        } else if (collectionNav === 'inventory') {
            mainContent = (
                <Fragment>
                    <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
                        <div style={{margin:'0', width:'100%',border:'2px dashed #cecece',borderRadius: '10px'}}>
                            <div style={{height:'250px', maxHeight:'250px', width:'100%'}}>
                                {!storageLocation.loading && storageLocation.locations.length > 0 && !product.switchMaps ? (
                                    <Map storageLocation={storageLocation} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div style={{margin:'10px 0'}}>
                        {/* <div class="table-responsive table-filter">
                            <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                        </div> */}
                        <div style={{background:'#fff', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                            <div style={{background:'rgb(247, 247, 247)', padding:'1rem', width:'100%', justifyContent:'space-between', display:'flex', alignItems:'center', borderBottom:'1px solid rgb(214, 214, 214)'}}>
                                <div style={{display: 'flex', margin:'0 1rem', alignItems: 'center'}}>
                                    <i style={{color:'#3CB371', margin:'0 10px', fontSize:'1.1rem'}} class="fas fa-map-marker-alt"></i>
                                    <p style={{margin:'1rem 0'}}>Tunde's House</p>
                                </div>
                                <div style={{margin:'0 1rem'}}>
                                    <button style={{background: "#42b499", color:"#fff"}} className="btn">Edit Stock</button>
                                </div>
                            </div>
                            <div class="table-responsive table-filter">
                                <Item setModal={setModal} page="collection" product={{sortedProducts: [...product.products], loading: false}} />
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    } else {
        mainContent = <Spinner />;
    }

    let secondaryContent;

    if(collection) {
        if(collectionNav === 'items') {
            secondaryContent = (
                <Fragment>
                    <div class="product-privacy-box">
                        <div class="product-privacy-box-title">
                            <p style={{color:'#808080', margin:'0'}}>Visibility</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <div style={{display:'flex', justifyContent:'space-between', height:'50px', alignItems:'center'}}>
                                <p style={{color:'#3CB371', margin:'0'}}>Public</p>
                                <input 
                                    class="toggle-button" 
                                    type="checkbox" 
                                    name="privacy"
                                    checked={true}
                                />
                            </div>
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
        } else if (collectionNav === 'inventory') {
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
                            onClick={e => setCollectionNav('items')} className={collectionNav === "items" && "active"}
                        >
                            <li><p>Items<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(36)</span></p></li>
                        </div>
                        <div 
                            onClick={e => setCollectionNav('inventory')} className={collectionNav === "inventory" && "active"}
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

DetailCollection.propTypes = {
    collection: PropTypes.object.isRequired,
    addToProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    storageLocation: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product,
    storageLocation: state.location
})

export default connect(mapStateToProps, { addToProducts, setPage })(withRouter(DetailCollection));

