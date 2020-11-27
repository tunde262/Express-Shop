import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Terms = ({ slideform1, setSlideForm1, slideform2, setSlideForm2 }) => {
    return (
        <Fragment>
            <div style={{height:'297px', overflow:'scroll'}}>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'0', textAlign:'justify'}}>
                    <span style={{color:'rgb(47, 183, 236)', fontWeight:'600', fontSize:'14px'}}>Cardboard Express</span> is a premium business to consumer online retail space.
                </p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'10px 0', textAlign:'left'}}>This marketplace is reserved for real brand owners and authentic distributors.</p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'0', textAlign:'left'}}>In order to become a seller, you must agree to our policies:</p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', textIndent: '25px', margin:'0', textAlign:'left'}}>•    Items are 100% authentic.</p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', textIndent: '25px', margin:'0', textAlign:'left'}}>•    15-day <span style={{color:'rgb(47, 183, 236)', fontWeight:'600', fontSize:'14px'}}>return/refund policy</span>.</p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'0 0 0 25px', textAlign:'left'}}>•    Free shipping for all items OR subscribe to our <span style={{color:'rgb(47, 183, 236)', fontWeight:'600', fontSize:'14px'}}>integrated logistical channels</span>.</p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'0 0 0 25px', textAlign:'left'}}>•    Cardboard Express <span style={{color:'rgb(47, 183, 236)', fontWeight:'600', fontSize:'14px'}}>sellers</span> would be subject to standard commission charges:</p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'10px 0', textAlign:'left'}}>Commission Fee is the service charge on all successful orders.</p>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'0', textAlign:'left'}}>A fixed percentage will be charged depending on the categories of the items.</p>
            </div>

            <button onClick={() => setSlideForm2(!slideform2)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Accept & Continue <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm1(!slideform1)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Terms.propTypes = {

}

export default Terms
