import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';

const Recommended_Store = ({ store, products }) => {
    return (
        <Fragment>
            <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img_name}`} alt="img" />
                        <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{margin:'0'}}>{store.name}</p>
                            <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
                        </div>
                    </div>
                    <button style={{margin:'0'}}>Checkout with store</button>
                </div>
            </div>
            <ProductOverview products={products} shop={false} link={`/home`} />
        </Fragment>
    )
}

Recommended_Store.propTypes = {

}

export default Recommended_Store
