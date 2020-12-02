import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Name_Add = ({
    origin,
    onChange,
    name,
    setSlideForm1,
    slideform1,
    slideform2, 
    setSlideForm2, 
}) => {
    return (
        <Fragment>
            <div style={{height:'200px', width:'100%', overflow:'scroll'}}> 
                <input
                    type="text"
                    name="name"
                    className="input_line"
                    value={name}
                    onChange={e => onChange(e)}
                    placeholder="Enter name. . ."
                    style={{margin:'50px 0 5px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
                <p style={{margin:'5px 0', textAlign:'center', color:'#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always change it later.</p>
            </div>
            
            <button 
                onClick={origin === 'side-drawer' ? () => setSlideForm1(!slideform1) : () => setSlideForm2(!slideform2)} 
                style={{width:'100%', outline:'none', margin:'50px 0 10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue 
                <i 
                    style={{margin:'0 10px', fontSize:'1rem'}} 
                    class="fas fa-arrow-right"
                ></i>
            </button>
            {origin !== 'side-drawer' ? (
                <p 
                    onClick={() => setSlideForm1(!slideform1)} 
                    style={{margin:'0', textAlign:'center', color:'#808080'}}
                >
                    Back
                </p>
            ) : (
                <p 
                    style={{margin:'0', textAlign:'center', color:'#808080'}}
                >
                    Cancel
                </p>
            )}
        </Fragment>
    )
}

Name_Add.propTypes = {

}

export default Name_Add
