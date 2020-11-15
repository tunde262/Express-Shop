import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { getProductsByStoreId } from '../../../../../actions/productActions';

import Spinner from '../../../../common/Spinner';

const SideDrawerProduct = ({setSlideForm1, getProductsByStoreId, storeId, product: { sortedProducts, loading }}) => {
    useEffect(() => {
        renderProductList();
    }, [sortedProducts]);

    const [productList, setProductList] = useState([]);
    const [gotProducts, setGotProducts] = useState(false);

    const renderProductList = async () => {
        setProductList([]);
        try {
            if(sortedProducts.length > 0) {
                sortedProducts.map(async product => {
                    const res = await axios.get(`/api/variants/product/${product._id}`);
                    console.log(res.data);
                    setProductList(productList => [...productList, (
                        <Link style={{textDecoration:'none'}} to={{pathname:`/admin/product/${storeId}/${product._id}`,search: "?show=detail"}}>
                            <div key={product._id} style={{display:'flex', height:'100px', width:'100%', padding:'10px', borderBottom:'1px solid #cecece'}}>
                                <div style={{height:'100%', width:'100px', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    {product.img_gallery[0] && <img src={`/api/products/image/${product.img_gallery[0].img_name}`} style={{height:'100%'}} />}
                                </div>
                                <div style={{display:'flex', height:'100%', overflow:'hidden', width:'200px', paddingLeft:'10px', flexDirection:'column', alignItems:'flex-start'}}>
                                    <div className="line-clamp" style={{height:'40px', overflow:'hidden', width:'100%'}}>
                                        <p style={{margin:'0', fontSize:'12px', width:'100%'}}>{product.name}</p>
                                    </div>
                                    <p style={{margin:'0', fontSize:'12px', color:'#ff4b2b'}}>{product.inventory_qty} Stock / {res.data.length} Variants</p>
                                    <p style={{margin:'0', fontSize:'12px', color:'#808080'}}>${product.price}</p>
                                </div>
                            </div>
                        </Link>
                    )])
                });
            } else {
                setProductList([(
                    <button>Add Item</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotProducts) {
        getProductsByStoreId(storeId);
        setGotProducts(true);
    }

    console.log('PRODCUT LIST DATA');
    console.log(productList);
        

    return (
        <Fragment>
            <div onClick={() => setSlideForm1(false)} style={{display:'flex', color:'#808080', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                <i class="fas fa-long-arrow-alt-left"></i>
                <p style={{margin:'0 10px'}}>  Back to menu</p>
            </div>
            <div style={{overflowY:'scroll', borderTop:'1px solid #f2f2f2', marginTop:'10px', height:'80vh'}}>
                {!productList.length > 0 ? <Spinner /> : productList}
            </div>
        </Fragment>
    )
}

SideDrawerProduct.propTypes = {
    product: PropTypes.object.isRequired,
    getProductsByStoreId: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
})

export default connect(mapStateToProps, { getProductsByStoreId})(SideDrawerProduct);
