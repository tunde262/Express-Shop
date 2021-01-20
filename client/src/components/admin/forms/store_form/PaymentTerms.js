import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';

const PaymentTerms = ({ slideform1, setSlideForm1, slideform2, setSlideForm2 }) => {
    const startStripeAuthorization = async () => {
        console.log('STARTING AUTH!!!!!');

        const res = await axios.get('/api/stripe/authorize');

        console.log('AUTH LINK: ' + res.data)

        window.location.href = res.data; 
    }

    return (
        <Fragment>
            <div style={{height:'297px', overflow:'scroll'}}>
                <p style={{fontFamily:'Arial, Helvetica, sans-serif', margin:'10px 0', textAlign:'left'}}>We use <span style={{color:'rgb(47, 183, 236)', fontWeight:'600', fontSize:'14px'}}>Stripe</span> to make sure you get paid on time and to keep your personal bank and details secure. Click <span style={{color:'rgb(47, 183, 236)', fontWeight:'600', fontSize:'14px'}}>Save and continue</span> to set up your payments on Stripe.</p>
            </div>

            <button /* onClick={() => setSlideForm2(!slideform2)} */ onClick={startStripeAuthorization} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Save & Continue <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm1(!slideform1)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

PaymentTerms.propTypes = {

}

export default PaymentTerms
