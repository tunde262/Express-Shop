import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import { addToVariants } from '../../../../../actions/variantActions';
import { setPage } from '../../../../../actions/navActions';

import Map from '../../../../common/map/Map';
import Variant from '../../../table/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';
import Inventory from '../../../table/Inventory';

import Spinner from '../../../../common/Spinner';
import InputTag from '../../../../common/InputTag/InputTag';

const DetailLocation = ({ 
    setModal, 
    setPage, 
    addToVariants, 
    storageLocation, 
    storageLocation: { 
        detailLocation, 
        loading 
    }, 
    variant, 
    setTable,
    setVarModal,
    onAddItemTag,
    onDeleteItemTag,
    itemTags,
    formData,
    setFormData,
    switchChange,
    onChange
}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [locationNav, setLocationNav] = useState('items');
    
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
        setPage('admin detail location');
        if(detailLocation) {
            for(var i = 0; i < detailLocation.variants.length; i++) {
                console.log('ITEM ID');
                console.log(detailLocation.variants[i]);
                addToVariants(detailLocation.variants[i])
            }
        }

    }, [loading]);

    const {
        visible,
    } = formData;

    const handleMixpanel = () => {
        mixpanel.track("Admin Location Page View", {
        //   "Entry Point": "Home Landing",
          "Location Name": detailLocation.name,
          "Location City": detailLocation.address_components.city,
        //   "Location Zipcode": detailLocation.address_components.postalcode,
          "Store Name": detailLocation.store.name,
        //   "Item Count": detailLocation.img_gallery.length,
          
        });
    }

    if(!sentMixpanel && detailLocation) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    let mainContent;

    if(detailLocation) {
        if(locationNav === 'items') {
            mainContent = (
                <Fragment>
                    <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
                        <div style={{margin:'0', width:'100%',border:'2px dashed #cecece',borderRadius: '10px'}}>
                            <div style={{height:'250px', maxHeight:'250px', width:'100%'}}>
                                {!storageLocation.loading && storageLocation.locations.length > 0 ? (
                                    <Map storageLocation={storageLocation} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div class="content-box">
                        <div class="table-responsive table-filter">
                            <Inventory setModal={setModal} page="location" variant={{sortedVariants: [...variant.variants], loading: false}} />
                        </div>
                    </div>
                </Fragment>
            )
        } else if (locationNav === 'inventory') {
            mainContent = (
                <Fragment>
                    <div style={{margin:'10px 0'}}>
                        {/* <div class="table-responsive table-filter">
                            <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                        </div> */}
                        <div class="content-box">
                            <div class="table-responsive table-filter">
                                <Inventory setModal={setModal} page="location" variant={{sortedVariants: [...variant.variants], loading: false}} />
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

    if(detailLocation) {
        if(locationNav === 'items') {
            secondaryContent = (
                <Fragment>
                    <div class="product-privacy-box">
                        <div class="product-privacy-box-title">
                            <p style={{color:'#808080', margin:'0'}}>Visibility</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <div style={{display:'flex', justifyContent:'space-between', height:'50px', width:'100%', alignItems:'center'}}>
                                <p style={{color:'#3CB371', margin:'0'}}>Public</p>
                                <input 
                                    class="toggle-button" 
                                    type="checkbox" 
                                    name="visible"
                                    checked={visible}
                                    onChange={switchChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="product-privacy-box">
                        <div class="product-privacy-box-title">
                            <p style={{color:'#808080', margin:'0'}}>Collections</p>
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
                            <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
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
                            <p style={{color:'#808080', margin:'0'}}>Tags</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <InputTag  
                                onAddTag ={onAddItemTag}
                                onDeleteTag = {onDeleteItemTag}
                                defaultTags={itemTags}
                                placeholder="enter tags separated by comma"
                            />
                        </div>
                        
                    </div>
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
                    {/* <div class="product-privacy-box">
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
                    </div> */}
                </Fragment>
            )
        } else if (locationNav === 'inventory') {
            secondaryContent = null;
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
                        <Link to={detailLocation && `/locations/${detailLocation._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i style={{margin:'0 1rem', fontSize:'1.4rem'}} class="fas fa-share-alt"></i>
                        <button onClick={e => setTable('edit location')} style={{ margin:'0 1rem 0 0', background:'#f4f4f4', color:'#7A7A7A', borderColor:'#f4f4f4' }}>Edit</button>
                        <button onClick={e => setTable('storage request')} style={{ margin:'0 1rem 0 0' }}>Request Storage</button>
                    </div>
                    {' '}
                </div>
                <hr style={{margin:'0'}} />
            </div> */}
            {locationNav === 'inventory' ? (
                <section id="stats">
                    <div className="stats">
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
                                    onClick={e => setLocationNav('items')} className={locationNav === "items" && "active"}
                                >
                                    <li><p>Items<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(36)</span></p></li>
                                </div>
                                <div 
                                    onClick={e => setLocationNav('inventory')} className={locationNav === "inventory" && "active"}
                                >
                                    <li><p>Inventory<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(108)</span></p></li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    
                    <div style={{margin:'10px 0', width:'100%'}}>
                        {/* <div class="table-responsive table-filter">
                            <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                        </div> */}
                        <div class="content-box">
                            <div class="table-responsive table-filter">
                                <Inventory setModal={setModal} page="location" variant={{sortedVariants: [...variant.variants], loading: false}} />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <Fragment>
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
                                    onClick={e => setLocationNav('items')} className={locationNav === "items" && "active"}
                                >
                                    <li><p>Items<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(36)</span></p></li>
                                </div>
                                <div 
                                    onClick={e => setLocationNav('inventory')} className={locationNav === "inventory" && "active"}
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
            )}
        </Fragment>
    )
}

DetailLocation.propTypes = {
    storageLocation: PropTypes.object.isRequired,
    addToVariants: PropTypes.func.isRequired,
    variant: PropTypes.object.isRequired,
    setPage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    storageLocation: state.location,
    variant: state.variant
})

export default connect(mapStateToProps, { addToVariants, setPage })(withRouter(DetailLocation));

