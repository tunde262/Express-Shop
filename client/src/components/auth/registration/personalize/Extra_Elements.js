import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import ProfileCircle from '../../../common/ProfileCircle';

const Extra_Elements = ({ slideform1, setSlideForm1, history }) => {
    return (
        <Fragment>
            {/* <div style={{display:'100%', display:'flex', alignItems:'center', color:'#ff4b2b', padding:'20px 20px 0'}}>
                <i style={{fontSize:'12px', margin:'0 10px'}} class="fas fa-arrow-left"></i>
                <p style={{margin:'0'}}>go back</p>
            </div> */}
            <h3 style={{marginTop:'0'}}>Your all set!</h3>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <ProfileCircle small />
                <p style={{margin:'5px 0', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>tunde262@gmail.com</p>
            </div>
            <p style={{margin:'20px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Add a few things to help us work better for you.</p>

            <div style={{display:'grid', marginTop:'2rem', gridTemplateColumns:'1fr 1fr'}}>
                <div onClick={() => history.push('/profile/addresses')} className="form-square">
                    <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                        <i class="fas fa-home"></i>
                    </div>
                    <p style={{margin:'10px 0', color:'#333'}}>Add address</p>
                </div>
                <div onClick={() => history.push('/create-store')} className="form-square">
                    <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                        <i class="fas fa-tags"></i>
                    </div>
                    <p style={{margin:'10px 0', color:'#333'}}>Become a seller</p>
                </div>
            </div>
            <button onClick={() => history.push('/home')} style={{width:'100%', outline:'none', margin:'36px 0 10px', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Start Shopping Now
            </button> 
            <div style={{padding:'10px'}}> 
                <p style={{margin:'0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always manage this information in your <span style={{color:'rgb(47, 183, 236)', fontSize:'1rem'}}>Account Settings</span>.</p>
            </div>
        </Fragment>
    )
}

Extra_Elements.propTypes = {

}

export default Extra_Elements
