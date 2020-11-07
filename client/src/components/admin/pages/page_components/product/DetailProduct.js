import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Map from '../../../../common/map/Map';
import TextEditor from '../../../../common/TextEditor';
import Spinner from '../../../../common/Spinner';

import mixpanel from 'mixpanel-browser';

import Variant from '../../../table/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';

import { incImg, decImg } from '../../../../../actions/productActions';
import { setPage } from '../../../../../actions/navActions';

// Imgs
import BoxEmoji from '../../../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../../../utils/imgs/car.jpg'; 

const DetailProduct = ({ setModal, setPage, detailProduct, variant, deleteVariant, setTable, setStoreLocationModal, setImageModal, match, incImg, decImg }) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [detailNav, setDetailNav] = useState('item');

    useEffect(() => {
        setPage('admin detail product')
    }, [])

    let imageContent;
    let img_gallery = detailProduct.img_gallery.sort((a, b) => a.img_order - b.img_order);

    const imgBack = (imgId) => {
        console.log('DEC IMG');
        decImg(imgId, detailProduct._id);

        mixpanelImgOrderUpdate();
    }

    const imgForward = (imgId) => {
        console.log('INC IMG');
        incImg(imgId, detailProduct._id);

        mixpanelImgOrderUpdate();
    }

    const mixpanelImgOrderUpdate = () => {
        mixpanel.track("Img Order Update", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
          
        });
    } 

    const handleMixpanel = () => {
        mixpanel.track("Admin Product Page View", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
          
        });
    }

    const handleImgClick = () => {
        mixpanel.track("Item Img Click", {
            //   "Entry Point": "Home Landing",
              "Item Name": detailProduct.name,
              "Item Category": detailProduct.category,
              "Item Cost": detailProduct.price,
              "Store Name": detailProduct.store.name,
              "Total Imgs": detailProduct.img_gallery.length,
              "Total Likes": detailProduct.likes.length,
              "Total Comments": detailProduct.comments.length,
              
        });
    }

    if(!sentMixpanel && detailProduct) {
        handleMixpanel();
        setSentMixpanel(true);
    }
    
    if(detailProduct && detailProduct.img_gallery && detailProduct.img_gallery.length > 0 ) {
        imageContent = img_gallery.map(image => (
            <div className="product-admin-image-container">
                <img className="product-admin-image-container-img" onClick={handleImgClick} src={`/api/products/image/${image.img_name}`} alt="img" />
                <div className="product-admin-image-container-actions">
                    <div onClick={() => imgBack(image._id)} className="admin-image-icon-container">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div onClick={() => imgForward(image._id)} className="admin-image-icon-container">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div onClick={handleImgClick} className="admin-image-overlay">
                    <div onClick={() => imgBack(image._id)} className="admin-overlay-icon-container">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div onClick={() => imgForward(image._id)} className="admin-overlay-icon-container">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        ))
    } else {
        imageContent = <h4>No Photos</h4>;
    }

    let mainContent;

    if(detailProduct) {
        if(detailNav === 'item') {
            mainContent = (
                <Fragment>
                    <div className="product-admin-main-container">
                        {imageContent}
                        <div className="addImage" onClick={setImageModal}>
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                    <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
                        <TextEditor />
                    </div>
                    <div class="content-box">
                        <div class="table-responsive table-filter">
                            <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                        </div>
                    </div>
                </Fragment>
            )
        } else if (detailNav === 'inventory') {
            mainContent = (
                <Fragment>
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
                                <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
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

    if(detailProduct) {
        if(detailNav === 'item') {
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
                            <p style={{color:'#808080', margin:'0'}}>Listing Category</p>
                            <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                            <select name="category">
                                <option>* Choose a category</option>
                                <option value="clothing & fashion">Clothing & Fashion</option>
                                <option value="bathroom">Bathroom</option>
                                <option value="household essentials">Household Essential</option>
                                <option value="laundry">Laundry</option>
                                <option value="men">Men</option>
                                <option value="personal care">Personal Care</option>
                                <option value="pets">Pets</option>
                                <option value="school & office">School & Office</option>
                                <option value="shoes">Shoes</option>
                                <option value="women">Women</option>
                            </select>
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
        } else if (detailNav === 'inventory') {
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
                    <p style={{margin:'0'}}>Qty <span style={{fontWeight:'bold'}}>{detailProduct && detailProduct.inventory_qty}</span> in stock for <span style={{fontWeight:'bold'}}>{variant.variants.length}</span> variants</p>
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <Link to={detailProduct && `/details/${detailProduct._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i style={{margin:'0 1rem', fontSize:'1.4rem'}} class="fas fa-share-alt"></i>
                        <button onClick={e => setTable('edit')} style={{ margin:'0 1rem 0 0', background:'#f4f4f4', color:'#7A7A7A', borderColor:'#f4f4f4' }}>Edit</button>
                        <button onClick={e => setTable('storage request')} style={{ margin:'0 1rem 0 0' }}>Request Storage</button>
                    </div>
                    {' '}
                </div>
                <hr style={{margin:'0'}} />
            </div> */}
            <section id="stats" className="stats">
                <div className="stats-box">
                    <div>
                        <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2,000</h2>
                        <p>Active</p>
                    </div>
                    <div>  
                        <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2000</h2>
                        <p>Sold</p>
                    </div>
                    <div>   
                        <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2,056</h2>
                        <p>Shipping</p>
                    </div>
                    <div>   
                        <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>2000</h2>
                        <p>Low Stock</p>
                    </div>
                </div>
                <div>
                    <ul class="profile-underline">
                        <div 
                            onClick={e => setDetailNav('item')} className={detailNav === "item" && "active"}
                        >
                            <li><p>Item</p></li>
                        </div>
                        <div 
                            onClick={e => setDetailNav('inventory')} className={detailNav === "inventory" && "active"}
                        >
                            <li><p>Inventory</p></li>
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

DetailProduct.propTypes = {
    incImg: PropTypes.func.isRequired,
    decImg: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default connect(null, { 
    incImg,
    decImg,
    setPage
})(withRouter(DetailProduct));