import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import Variant from '../../../table/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';

// Imgs
import BoxEmoji from '../../../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../../../utils/imgs/car.jpg'; 

const ProductDetail = ({ setModal, detailProduct, deleteVariant, setTable, match }) => {
    let imageContent;
    
    if(detailProduct && detailProduct.img_gallery && detailProduct.img_gallery.length > 0 ) {
        imageContent = detailProduct.img_gallery.map(image => (
            <div style={{margin:'10px'}}>
                <img style={{width: '100%'}} src={`/api/products/image/${image.img_name}`} alt="img" />
            </div>
        ))
    } else {
        imageContent = <h4>No Photos</h4>;
    }
    return (
        <Fragment>
            <div className="product-actions container-fluid">
                <div style={{display:'flex', justifyContent:'space-between', height:'50px', alignItems:'center'}}>
                    <p style={{margin:'0'}}>Qty <span style={{fontWeight:'bold'}}>{detailProduct && detailProduct.inventory_qty}</span> in stock for <span style={{fontWeight:'bold'}}>{detailProduct && detailProduct.variants.length}</span> variants</p>
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <Link to={detailProduct && `/details/${detailProduct._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i style={{margin:'0 1rem', fontSize:'1.4rem'}} class="fas fa-share-alt"></i>
                        <button onClick={e => setTable('edit')} style={{ margin:'0 1rem 0 0', background:'#f4f4f4', color:'#7A7A7A', borderColor:'#f4f4f4' }}>Edit</button>
                        <button onClick={e => setTable('storage request')} style={{ margin:'0 1rem 0 0' }}>Request Storage</button>
                    </div>
                    {' '}
                </div>
                <hr style={{margin:'0'}} />
            </div>
            <div class="product-admin-main">
                <div style={{width:'100%', height:'100%', display:'grid', gridTemplateColumns:'repeat(3,1fr)', border:'2px dashed #cecece'}}>
                    {imageContent}
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
                    <TableDetails page="product" setModal={setModal} description={detailProduct && detailProduct.description} />
                </div>
            </div>
            <div class="content-box container-fluid">
                <div class="table-responsive table-filter">
                    <Variant setModal={setModal} page="product" varId={match.params.productId} deleteVariant={deleteVariant} />
                </div>
            </div>
        </Fragment>
    )
}

ProductDetail.propTypes = {

}

export default withRouter(ProductDetail);
