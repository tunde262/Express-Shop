import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Support = ({ slideform6, setSlideForm6, slideform7, setSlideForm7, email, phone, onChange, setAlert }) => {

    const todo = () => {
        if(email !== '' || phone !== '') {
            setSlideForm7(!slideform7);
        } else {
            setAlert('Support method required', 'danger');
        }
    }

    return (
        <Fragment>
            <h3>Customer Support</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Give customers a place to reach you.<br/>(1 Required)*</p>
            <div style={{height:'210px', overflow:'scroll'}}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    className="input_line"
                    autoComplete="off"
                    autoComplete="chrome-off"
                    placeholder="Enter email . . ."
                    style={{margin:'25px 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
                <input
                    type="text"
                    name="phone"
                    className="input_line"
                    value={phone}
                    onChange={e => onChange(e)}
                    autoComplete="off"
                    autoComplete="chrome-off"
                    placeholder="Enter phone # . . ."
                    style={{margin:'0 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
            </div>
            <button onClick={() => todo()} style={{width:'100%', outline:'none', margin:'5px 0 10px', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm6(!slideform6)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Support.propTypes = {

}

export default Support
