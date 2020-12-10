import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PhoneBlock = ({
    // origin,
    onChange,
    phone,
    setSlideForm1,
    slideform1,
    slideform2, 
    setSlideForm2, 
}) => {
    return (
        <Fragment>
            <div style={{height:'200px', width:'100%', overflow:'scroll'}}> 
                <input
                    type="text"
                    name="phone"
                    className="input_line"
                    value={phone}
                    onChange={e => onChange(e)}
                    placeholder="Phone #. . ."
                    style={{margin:'50px 0 5px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
                <p style={{margin:'5px 0', textAlign:'center', color:'#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always change it later.</p>
            </div>
            
            <button 
                onClick={() => setSlideForm2(!slideform2)} 
                style={{width:'100%', outline:'none', margin:'50px 0 10px 0', fontSize:'11px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue 
                <i 
                    style={{margin:'0 10px', fontSize:'1rem'}} 
                    class="fas fa-arrow-right"
                ></i>
            </button>
        
            <p onClick={() => setSlideForm1(!slideform1)} style={{margin:'0', textAlign:'center', color:'#808080'}}>
                Back
            </p>
            
        </Fragment>
    )
}

PhoneBlock.propTypes = {

}

export default PhoneBlock
