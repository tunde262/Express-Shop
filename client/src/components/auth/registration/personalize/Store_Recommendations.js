import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'

import { HorizontalNav } from '../../../common/HorizontalNav';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';

import shoeSampleImg from '../../../../utils/imgs/20484728.jpeg';
import paperTowelImg from '../../../../utils/imgs/paper_towels.jpeg';

const Store_Recommendations = ({ product, slideform2, setSlideForm2, slideform3, setSlideForm3 }) => {

    return (
        <Fragment>
            <div onClick={() => setSlideForm2(!slideform2)} style={{display:'100%', display:'flex', alignItems:'center', color:'#ff4b2b', padding:'15px 20px 0'}}>
                <i style={{fontSize:'12px', margin:'0 10px'}} class="fas fa-arrow-left"></i>
                <p style={{margin:'0'}}>go back</p>
            </div>
            <h3>Stores you may like</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Subscribe to stores you like for easy access</p>
            <div style={{height:'454px', borderTop:'1px solid rgb(214,214,214)', overflowY:'scroll'}}>
                <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                    <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`} alt="img" />
                            <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>Iams</p>
                                <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
                            </div>
                        </div>
                        <button style={{margin:'0'}}>Checkout with store</button>
                    </div>
                </div>
                <ProductOverview products={product.products} shop={false} link={`/home`} />
                <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                    <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`} alt="img" />
                            <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>Iams</p>
                                <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
                            </div>
                        </div>
                        <button style={{margin:'0'}}>Checkout with store</button>
                    </div>
                </div>
                <ProductOverview products={product.products} shop={false} link={`/home`} />
                <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                    <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`} alt="img" />
                            <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>Iams</p>
                                <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
                            </div>
                        </div>
                        <button style={{margin:'0'}}>Checkout with store</button>
                    </div>
                </div>
                <ProductOverview products={product.products} shop={false} link={`/home`} />
            </div>

            <button onClick={() => setSlideForm3(!slideform3)} style={{width:'100%', outline:'none', margin:'0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue
            </button> 
        </Fragment>
    )
}

Store_Recommendations.propTypes = {

}

export default Store_Recommendations;
