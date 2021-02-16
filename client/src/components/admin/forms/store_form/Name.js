import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Name = ({ slideform2,setSlideForm2, slideform3, setSlideForm3, name, onChange, setAlert}) => {

    const todo = () => {
        if(name !== '') {
            setSlideForm3(!slideform3)
        } else {
            setAlert('Must enter a name', 'danger');
        }
    }
    
    return (
        <Fragment>
            <h3>Choose A Name</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always change it later.</p>
            <div style={{height:'230px', overflow:'scroll'}}> 
                <input
                    type="text"
                    name="name"
                    className="input_line"
                    value={name}
                    onChange={e => onChange(e)}
                    placeholder="Enter name . . ."
                    autoComplete="off"
                    autoComplete="chrome-off"
                    style={{margin:'50px 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                />
            </div>
            <button onClick={() => todo()} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm2(!slideform2)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Name.propTypes = {
   
}

export default Name;
