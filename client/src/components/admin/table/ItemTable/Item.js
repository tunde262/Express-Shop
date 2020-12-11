import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductLocations } from '../../../../actions/locationActions';
import { setDetailProduct } from '../../../../actions/productActions';

const Item = ({ 
    detailProduct,
    deleteProduct,
    store,
    itemVariants,
    page,
    handleToggle,
    getProductLocations,
    setDetailProduct
}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleItemLocModal = async (prodId) => {
        getProductLocations(prodId);
        handleToggle();

        const res = await axios.get(`/api/products/${prodId}`);
        setDetailProduct(res.data);
    }

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    let rowClassName;

    if(page === "detail") {
        if(isTablet) {
            rowClassName = "detail-table-row-mobile";
        } else {
            rowClassName = "detail-table-row"
        }
    } else {
        if(isTablet) {
            rowClassName = "table-row-mobile";
        } else {
            rowClassName = "table-row"
        }
    }
     

    return (
        <div onClick={page === "detail" ? () => handleItemLocModal(detailProduct._id) : null} className={rowClassName} key={detailProduct._id}>
            {page === "detail" ? (
                (isTablet ? (
                    <Fragment>
                        <div className="table-row-img"><div>{detailProduct.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} alt="img" />}</div></div>
                        <div>
                            <a 
                                className="line-clamp-1" 
                                style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}
                                href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}
                            >
                                {detailProduct.name}
                            </a>
                            <div><p style={{margin:'0'}}><span style={{color:'#ff4b2b', fontSize:'14px'}}>{detailProduct.inventory_qty}</span> Stock / <span style={{color:'#ff4b2b', fontSize:'14px'}}>{itemVariants.length}</span> Variants</p></div>
                            <div><p style={{margin:'0'}}>${detailProduct.price}</p></div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>
                            <input type="checkbox" value=""/>
                        </div>
                        <div className="table-row-img"><div>{detailProduct.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} alt="img" />}</div></div>
                        <div>
                            <a 
                                className="line-clamp-1" 
                                style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}
                                href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}
                            >
                                {detailProduct.name}
                            </a>
                            <div><span style={{color:'#ff4b2b', fontSize:'14px'}}>{detailProduct.inventory_qty}</span> Stock / <span style={{color:'#ff4b2b', fontSize:'14px'}}>{itemVariants.length}</span> Variants</div>
                            <div>${detailProduct.price}</div>
                        </div>
                        <div><div className="line-clamp" style={{maxHeight:'40px', overflow:'hidden'}}>5</div></div>
                        <div><div>6</div></div>
                        <div><div style={{width:'50px'}}><i onClick={() => deleteProduct(detailProduct._id)} className="fas fa-trash"></i></div></div>
                    </Fragment>
                ) )
            ) : (
                (isTablet ? (
                    <Fragment>
                        <a className="table-row-img" href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}><div>{detailProduct.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} alt="img" />}</div></a>
                        <a href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}>
                            <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{detailProduct.name}</div>
                            <div><p style={{margin:'0'}}><span style={{color:'#ff4b2b', fontSize:'14px'}}>{detailProduct.inventory_qty}</span> Stock / <span style={{color:'#ff4b2b', fontSize:'14px'}}>{itemVariants.length}</span> Variants</p></div>
                            <div><p style={{margin:'0'}}>${detailProduct.price}</p></div>
                        </a>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div>
                            <input type="checkbox" value=""/>
                        </div>
                        <a className="table-row-img" href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}><div>{detailProduct.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} alt="img" />}</div></a>
                        <a href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}>
                            <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{detailProduct.name}</div>
                            <div><span style={{color:'#ff4b2b', fontSize:'14px'}}>{detailProduct.inventory_qty}</span> Stock / <span style={{color:'#ff4b2b', fontSize:'14px'}}>{itemVariants.length}</span> Variants</div>
                            <div>${detailProduct.price}</div>
                        </a>
                        <a href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}><div className="line-clamp" style={{maxHeight:'40px', overflow:'hidden'}}>5</div></a>
                        <a href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}><div>6</div></a>
                        <a href={`https://www.cardboardexpress.com/admin/product/${store.store._id}/${detailProduct._id}?show=detail`}><div style={{width:'50px'}}><i onClick={() => deleteProduct(detailProduct._id)} className="fas fa-trash"></i></div></a>
                    </Fragment>
                ) )
            )}
        </div>
    )
}

Item.propTypes = {
    store: PropTypes.object.isRequired,
    getProductLocations: PropTypes.func.isRequired,
    setDetailProduct: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { getProductLocations, setDetailProduct })(Item);
