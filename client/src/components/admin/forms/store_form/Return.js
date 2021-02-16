import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PlacesAutocomplete from 'react-places-autocomplete';

const Return = ({ slideform8, setSlideForm8, slideform9, setSlideForm9, address, setAddress, handleLocationSelect, setAlert, formattedAddy }) => {
    const todo = () => {
        if(formattedAddy!== '') {
            setSlideForm9(!slideform9);
        } else {
            setAlert('Return address required', 'danger');
        }
    }
     
    return (
        <Fragment>
            <h3>Return Address:</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always change this later.</p>
            <div style={{height:'230px', overflow:'scroll'}}>
                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleLocationSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <input 
                                autoComplete="off"
                                autocomplete="chrome-off"
                                style={{margin:'50px 0 20px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                {...getInputProps({
                                placeholder: "Enter return address . . .",
                                type:"text",
                                name:"address",
                                className:"input_line",
                                })}  
                            />

                            <div
                                style={{width:'100%',}}
                            >
                                {loading ? (
                                    <div>...loading</div>
                                ) : null} 

                                {suggestions.map((suggestion) => {
                                    const className = suggestion.active 
                                        ?  "" 
                                        : "";
                                    const style = {
                                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                    }
                                    console.log(suggestion)
                                    return <div key={suggestion.index} {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
            </div>
            <button onClick={() => todo()} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm8(!slideform8)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Return.propTypes = {

}

export default Return
