import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

import mixpanel from 'mixpanel-browser';

import Variant from '../../../table/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';

import { incImg, decImg } from '../../../../../actions/productActions';

// Imgs
import BoxEmoji from '../../../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../../../utils/imgs/car.jpg'; 

const DetailProduct = ({ setModal, detailProduct, variant, deleteVariant, setTable, setStoreLocationModal, setImageModal, match, incImg, decImg }) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

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
            <div class="product-admin-main">
                <div className="product-admin-main-container">
                    {imageContent}
                    <div className="addImage" onClick={setImageModal}>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
            </div>
            <div class="product-admin-secondary">
                <div class="product-status-box">
                    <div class="product-status-box-title">
                        {/* <div style={{display:'flex', color:'#808080', height:'50px', alignItems:'flex-start'}}>
                            
                        </div> */}
                    </div>
                    <div class="product-status-box-stats">
                        <div>
                            <img style={{width: '28px'}} src={CarEmoji} alt="img" />
                            <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                        </div>
                        <div>
                            <img style={{width: '28px'}} src={ClosedLockEmoji} alt="img" />
                            <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                        </div>
                        <div>
                            <img style={{width: '25px'}} src={OpenLockEmoji} alt="img" />
                            <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                        </div>
                        <div>
                            <img style={{width: '20px'}} src={BoxEmoji} alt="img" />
                            <h2 style={{color:'#333', fontWeight:'300'}}>2</h2>
                        </div>
                    </div>
                </div>
                <div class="product-description-box">
                    <TableDetails page="product" setModal={setModal} setStoreLocationModal={setStoreLocationModal} description={detailProduct && detailProduct.description} />
                </div>
            </div>
            <div class="content-box container-fluid">
                <div class="table-responsive table-filter">
                    <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                </div>
            </div>
        </Fragment>
    )
}

DetailProduct.propTypes = {
    incImg: PropTypes.func.isRequired,
    decImg: PropTypes.func.isRequired,
};

export default connect(null, { 
    incImg,
    decImg
})(withRouter(DetailProduct));