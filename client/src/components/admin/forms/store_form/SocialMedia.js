import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

const SocialMedia = ({ 
    onChange, 
    instagram, 
    youtube, 
    twitter, 
    facebook,
    slideform10, 
    setSlideForm10,
    slideform11,
    setSlideForm11,
}) => {
    return (
        <Fragment>
            <h3>Social Media (if any):</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>This helps us review your store.</p>
            <div style={{height:'230px', overflow:'scroll'}}>
                <div style={{display:'flex', alignItems:'center', margin:'20px 0 10px 0'}}>
                    <div style={{display:'flex', padding:'5px 10px', alignItems:'center', justifyContent:'center'}}>
                    <i className="fab fa-twitter fa-2x" />
                    </div>
                    
                    <input
                    type="text"
                    name="twitter"
                    className="input_line"
                    value={twitter}
                    onChange={onChange}
                    placeholder="www."
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div style={{display:'flex', alignItems:'center', margin:'15px 0'}}>
                    <div style={{display:'flex', padding:'5px 10px', alignItems:'center', justifyContent:'center'}}>
                    <i className="fab fa-facebook fa-2x" />
                    </div>
                    <input
                    type="text"
                    className="input_line"
                    name="facebook"
                    value={facebook}
                    onChange={onChange}
                    placeholder="www."
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div style={{display:'flex', alignItems:'center', margin:'15px 0'}}>
                    <div style={{display:'flex', padding:'5px 8px', alignItems:'center', justifyContent:'center'}}>
                    <i className="fab fa-youtube fa-2x" />
                    </div>
                    <input
                    type="text"
                    className="input_line"
                    name="youtube"
                    value={youtube}
                    onChange={onChange}
                    placeholder="www."
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div style={{display:'flex', alignItems:'center', margin:'15px 0 25px 0'}}>
                    <div style={{display:'flex', padding:'5px 12px', alignItems:'center', justifyContent:'center'}}>
                    <i className="fab fa-instagram fa-2x" />
                    </div>
                    <input
                    type="text"
                    className="input_line"
                    name="instagram"
                        value={instagram}
                    onChange={onChange}
                    placeholder="www."
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
            </div>
            <button onClick={() => setSlideForm11(!slideform11)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm10(!slideform10)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

SocialMedia.propTypes = {

}

export default SocialMedia
