import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Support = ({ slideform6, setSlideForm6, slideform7, setSlideForm7 }) => {
    return (
        <Fragment>
            <h3>Customer Support</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Give customers a place to reach you.</p>
            <div style={{height:'230px', overflow:'scroll'}}>
                <input
                    type="text"
                    name="email"
                    className="input_line"
                    placeholder="Enter email . . ."
                    style={{margin:'50px 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
            <input
                type="text"
                name="phone"
                className="input_line"
                placeholder="Enter phone # . . ."
                style={{margin:'0 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
            />
            </div>
            <button onClick={() => setSlideForm7(!slideform7)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm6(!slideform6)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Support.propTypes = {

}

export default Support
