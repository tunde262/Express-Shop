import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Zipcode = ({ slideform7, setSlideForm7, slideform8, setSlideForm8, zipcode, onChange, setAlert }) => {
    const todo = () => {
        if(zipcode!== '') {
            setSlideForm8(!slideform8);
        } else {
            setAlert('Must enter zipcode', 'danger');
        }
    }

    return (
        <Fragment>
            <h3>Where is your business located?</h3>
            <div style={{height:'210px', overflow:'scroll'}}>
                <input
                    type="text"
                    name="zipcode"
                    value={zipcode}
                    onChange={e => onChange(e)}
                    className="input_line"
                    placeholder="Enter zipcode . . ."
                    style={{margin:'50px 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
            </div>
            <button onClick={() => todo()} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm7(!slideform7)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Zipcode.propTypes = {

}

export default Zipcode
