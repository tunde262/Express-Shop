import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addToProducts } from '../../../../../actions/productActions';

import Map from '../../../../common/map/Map';
import Variant from '../../../table/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';
import Item from '../../../table/Item';

// Imgs
import BoxEmoji from '../../../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../../../utils/imgs/car.jpg'; 

const DetailCollection = ({ setModal, addToProducts, collection: { collection, loading }, product, setTable, storageLocation }) => {
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

        if(collection) {
            for(var i = 0; i < collection.items.length; i++) {
                console.log('ITEM ID');
                console.log(collection.items[i]);
                addToProducts(collection.items[i].item)
            }
        }

    }, [loading]);


    return (
        <Fragment>
            <div className="product-actions container-fluid">
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
            </div>
            <div class="product-admin-main">
                <div style={{width:'100%', height:'100%', border:'2px dashed #cecece'}}>
                    {!storageLocation.loading && storageLocation.locations.length > 0 && !product.switchMaps ? (
                        <Map storageLocation={storageLocation} />
                    ) : null}
                </div>
            </div>
            <div class="product-admin-secondary">
                <div class="product-status-box">
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
                    <TableDetails page="collection" setModal={setModal} />
                </div>
            </div>
            <div class="content-box container-fluid">
                <div class="table-responsive table-filter">
                    <Item setModal={setModal} page="collection" product={{sortedProducts: [...product.products], loading: false}} />
                </div>
            </div>
        </Fragment>
    )
}

DetailCollection.propTypes = {
    collection: PropTypes.object.isRequired,
    addToProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    storageLocation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product,
    storageLocation: state.location
})

export default connect(mapStateToProps, { addToProducts })(withRouter(DetailCollection));

