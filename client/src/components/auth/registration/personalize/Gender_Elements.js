import React, { Fragment } from 'react'
import PropTypes from 'prop-types'



const Gender_Elements = ({ slideform1, setSlideForm1, setGender, gender }) => {

    const todo = (value) => {
        setGender(value);
        setSlideForm1(!slideform1);
    };

    return (
        <Fragment>
            <div style={{height:'100%', overflowY:'scroll'}}>
                <h3 style={{marginTop:'36px'}}>What's are you?</h3>
                <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>We'll use this info to personalize our selection</p>
                <div className="gender-form">
                    <div onClick={() => todo('male')} className={gender === 'male' ? "form-square active" : "form-square"}>
                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                            <i style={{fontSize:'24px',}} class="fas fa-mars"></i>
                        </div>
                        <p style={{margin:'10px 0', fontSize:'1rem', color:'#333'}}>Male</p>
                    </div>
                    <div onClick={() => todo('female')} className={gender === 'female' ? "form-square active" : "form-square"}>
                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                            <i style={{fontSize:'24px',}} class="fas fa-venus"></i>
                        </div>
                        <p style={{margin:'10px 0', fontSize:'1rem', color:'#333'}}>Female</p>
                    </div>
                </div>
                <div style={{padding:'10px'}}> 
                    <p onClick={() => todo('N/A')} className="tertiary-form-text">Prefer not to answer?</p>
                    {/* <button onClick={() => setSlideForm1(!slideform1)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        Continue
                    </button>  */}
                    <p style={{margin:'50px 0 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always manage this information in your <span style={{color:'rgb(47, 183, 236)', fontSize:'1rem'}}>Account Settings</span>.</p>
                </div>

            </div>
        </Fragment>
    )
}

Gender_Elements.propTypes = {

}

export default Gender_Elements