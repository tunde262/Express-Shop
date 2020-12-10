import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Type_Address = ({
    // origin,
    setAddressType,
    addressType,
    setSlideForm1,
    slideform1,
}) => {

    const handleClick = (value) => {
        setAddressType(value);
        setSlideForm1(!slideform1)
    }

    return (
        <Fragment>
            <div style={{height:'230px', width:'100%', overflow:'scroll'}}> 
                <div style={{display:'grid', margin:'20px 0 10px', gridTemplateColumns:'1fr 1fr'}}>
                    <div onClick={() => handleClick('residence')} className={addressType === 'residence' ? "form-square active" : "form-square"}>
                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                            <i class="fas fa-home"></i>
                        </div>
                        <p style={{margin:'10px 0', color:'#333'}}>Residence</p>
                    </div>
                    <div onClick={() => handleClick('other')} className={addressType === 'other' ? "form-square active" : "form-square"}>
                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                            <i class="fas fa-credit-card"></i>
                        </div>
                        <p style={{margin:'10px 0', color: '#333'}}>Other</p>
                    </div>
                </div>
                <p style={{margin:'5px 0', textAlign:'center', color:'#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>Please select an address type.</p>
            </div>
            
            <button 
                onClick={() => setSlideForm1(!slideform1)} 
                style={{width:'100%', outline:'none', margin:'20px 0 10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue 
                <i 
                    style={{margin:'0 10px', fontSize:'1rem'}} 
                    class="fas fa-arrow-right"
                ></i>
            </button>
        </Fragment>
    )
}

Type_Address.propTypes = {

}

export default Type_Address;
