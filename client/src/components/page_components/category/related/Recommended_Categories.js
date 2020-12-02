import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';
import categoryList from '../../../admin/pages/page_components/edit/categoryList';

const Recommended_Categories = ({ products, category }) => {
    return (
        <Fragment>
            <div style={{minHeight:'50px', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        
                        <div style={{display:'flex', lineHeight:'20px', flexDirection:'column', alignItems:'flex-start'}}>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <img style={{height: '40px', width: '40px', border:'1px solid #e8e8e8', marginRight: '10px', borderRadius: '50px'}} src={category.img} alt="img" />
                                <p style={{margin:'0', color:'#ff4b2b', fontSize:'20px'}}>{category.tag_value}</p>
                                <div className="store-socials" style={{margin:'0 10px'}}>
                                    <button style={{margin:'0', height:'20px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Arial, Helvetica, sans-serif', fontSize:'11px', borderRadius:'30px'}}>
                                        Follow 
                                        <i style={{fontSize:'10px', margin:'0 5px'}} class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <p style={{margin:'0', color:'#808080', fontSize:'12px'}}>2,304 Followers</p>
                        </div>
                    </div>
                    <p style={{margin:'0', color:'#808080', }}><i class="fas fa-shopping-bag"></i> View Shop</p>
                </div>
            </div>
            <ProductOverview products={products} shop={false} link={`/home`} />
        </Fragment>
    )
}

Recommended_Categories.propTypes = {

}

export default Recommended_Categories;
