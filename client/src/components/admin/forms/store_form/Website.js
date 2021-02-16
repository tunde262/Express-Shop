import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Website = ({ slideform9, setSlideForm9, slideform10, setSlideForm10, website, onChange }) => {
    return (
        <Fragment>
            <h3>Link to website (if any):</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>This helps us review your store.</p>
            <div style={{height:'230px', overflow:'scroll'}}>
                <input
                    type="url"
                    name="website"
                    className="input_line"
                    placeholder="www.example.com"
                    value={website}
                    onChange={e => onChange(e)}
                    style={{margin:'50px 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
            </div>
            <button onClick={() => setSlideForm10(!slideform10)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm9(!slideform9)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Website.propTypes = {

}

export default Website
