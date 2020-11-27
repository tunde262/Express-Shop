import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Login = ({ slideform1, setSlideForm1 }) => {
    return (
        <Fragment>
            <h3>Sign In</h3>
            <p style={{margin:'5px 0', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>to continue <span style={{color:'rgb(47, 183, 236)', fontSize:'1rem'}}>creating a new store</span>.</p>
            <div style={{height:'230px', overflow:'scroll'}}>
                <input
                    type="email"
                    name="email"
                    className="input_line"
                    placeholder="Enter Email"
                    style={{margin:'30px 0 20px 0', width:'100%', height:'50px'}}
                />
                <input
                    type="email"
                    name="email"
                    className="input_line"
                    placeholder="Enter Email"
                    style={{margin:'0', width:'100%', height:'50px'}}
                />
            </div>
            <button onClick={() => setSlideForm1(!slideform1)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-arrow-right"></i>
            </button>
            <p style={{margin:'0', color:'#808080'}}>Don't have an account?</p>
        </Fragment>
    )
}

Login.propTypes = {

}

export default Login
