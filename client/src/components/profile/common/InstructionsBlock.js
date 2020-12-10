import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const InstructionsBlock = ({
    // origin,
    onChange,
    instructions,
    setSlideForm1,
    slideform1,
    slideform2, 
    setSlideForm2, 
}) => {
    return (
        <Fragment>
            <div style={{height:'230px', overflow:'scroll'}}>
                <textarea
                    type="text"
                    name="delivery_instructions"
                    className="input_line"
                    value={instructions}
                    onChange={e => onChange(e)}
                    placeholder="Describe your store..."
                    style={{margin:'50px 0 20px 0', width:'100%', height:'100px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
            </div>
            
            <button onClick={() => setSlideForm2(!slideform2)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm1(!slideform1)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

InstructionsBlock.propTypes = {

}

export default InstructionsBlock
