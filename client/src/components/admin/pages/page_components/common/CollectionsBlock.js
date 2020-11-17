import React from 'react'
import PropTypes from 'prop-types'

const CollectionsBlock = ({
    isMobile
}) => {
    return (
        <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
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
    )
}

CollectionsBlock.propTypes = {

}

export default CollectionsBlock
