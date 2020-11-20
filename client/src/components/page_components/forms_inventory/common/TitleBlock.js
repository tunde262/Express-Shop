import React from 'react'
import PropTypes from 'prop-types'

const TitleBlock = ({
    onChange,
    formData, 
    isLocation
}) => {

    const {
        name
    } = formData;

    return (
        <div className="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
            <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Title:</p>
            <input
                type="text"
                name="name"
                className="input_line"
                placeholder={!isLocation ? "Enter name . . ." : "Give this location a nickname . . ."}
                value={name}
                onChange={e => onChange(e)}
                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
            />
        </div>
    )
}

TitleBlock.propTypes = {

}

export default TitleBlock
