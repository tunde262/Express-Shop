import React from 'react'
import PropTypes from 'prop-types'

const NotesBlock = props => {
    return (
        <div class="product-privacy-box">
            <div class="product-privacy-box-title">
                <p style={{color:'#808080', margin:'0'}}>Notes</p>
                <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                <input
                    type="email"
                    name="email"
                    className="input_line"
                    placeholder="Enter Email"
                    style={{margin:'10px 0', width:'100%', height:'50px'}}
                />
                <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                        <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                        <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                    </div>
                    <div>
                        <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                    </div>
                </div>
                <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                        <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                        <p style={{margin:'0', color:'#333'}}>Wholesale order coming oct. 24</p>
                    </div>
                    <div>
                        <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                    </div>
                </div>
                <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                        <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                        <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                    </div>
                    <div>
                        <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

NotesBlock.propTypes = {

}

export default NotesBlock
