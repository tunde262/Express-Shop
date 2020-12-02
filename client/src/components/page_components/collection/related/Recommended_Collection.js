import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';

const Recommended_Collection = ({ collection, products }) => {
    return (
        <Fragment>
            <div style={{minHeight:'50px', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        
                        <div style={{display:'flex', lineHeight:'20px', flexDirection:'column', alignItems:'flex-start'}}>
                            <div style={{display:'flex',alignItems:'center'}}>
                                <i style={{color:'#ff4b2b', fontSize:'14px', marginRight:'5px'}} class="fas fa-tag"></i>
                                <p style={{margin:'0', fontSize:'20px'}}>{collection.name}</p>
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

Recommended_Collection.propTypes = {

}

export default Recommended_Collection
