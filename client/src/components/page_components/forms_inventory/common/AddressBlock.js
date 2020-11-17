import React from 'react'
import PropTypes from 'prop-types'

const AddressBlock = props => {
    return (
        <div class="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
            <input
                type="text"
                name="address"
                className="input_line"
                placeholder="Enter address . . ."
                autocomplete="no"
                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
            />
        </div>
    )
}

AddressBlock.propTypes = {

}

export default AddressBlock
