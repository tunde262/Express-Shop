import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Description = ({ slideform5, setSlideForm5, slideform6, setSlideForm6, description, onChange, setAlert }) => {

    const todo = () => {
        if(description!== '') {
            setSlideForm6(!slideform6);
        } else {
            setAlert('Must enter a description', 'danger');
        }
    }

    return (
        <Fragment>
            <h3>Description</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Kindly tell us what this store is all about...</p>
            <div style={{height:'230px', overflow:'scroll'}}>
                <textarea
                    type="text"
                    name="description"
                    className="input_line"
                    value={description}
                    onChange={e => onChange(e)}
                    autoComplete="off"
                    autoComplete="chrome-off"
                    placeholder="Describe your store..."
                    style={{margin:'50px 0 20px 0', width:'100%', height:'100px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
            </div>
            
            <button onClick={() => todo()} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm5(!slideform5)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Description.propTypes = {

}

export default Description
