import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const AddFullName = ({
    onChange,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    setSlideForm1,
    slideform1,
    slideform2, 
    setSlideForm2, 
}) => {

    const onChangeFirst = e => setFirstName({ ...firstName, [e.target.name]: e.target.value});

    const onChangeLast = e => setLastName({ ...lastName, [e.target.name]: e.target.value});

    return (
        <Fragment>
            <div style={{height:'200px', width:'100%', overflow:'scroll'}}> 
                <input
                    type="text"
                    name="first"
                    className="input_line"
                    value={firstName.first}
                    onChange={e => onChangeFirst(e)}
                    placeholder="First Name. . ."
                    style={{margin:'10px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
                <input
                    type="text"
                    name="last"
                    className="input_line"
                    value={lastName.last}
                    onChange={e => onChangeLast(e)}
                    placeholder="Last Name. . ."
                    style={{margin:'10px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
                <p style={{margin:'5px 0', textAlign:'center', color:'#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>Who lives here?</p>
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

AddFullName.propTypes = {

}

export default AddFullName
