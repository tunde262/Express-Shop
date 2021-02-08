import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

import PlacesAutocomplete from 'react-places-autocomplete';

const AddressBlock = ({
    origin,
    address,
    setAddress,
    handleLocationSelect,
    setSlideForm1,
    slideform1,
    slideform2, 
    setSlideForm2
}) => {
    

    return (
        <Fragment>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleLocationSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        <input 
                            autoComplete="no"
                            style={{margin:'50px 0 5px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
                            {...getInputProps({
                            placeholder: "Enter address . . .",
                            type:"text",
                            name:"address",
                            className:"input_line",
                            })}  
                        />
                        <p style={{margin:'5px 0', textAlign:'center', color:'#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>We'll fill out the details.</p>

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
            {origin === 'store' && (
                <Fragment>
                    <button 
                        onClick={origin === 'store' ? () => setSlideForm2(!slideform2) : () => console.log('SUBMIT')} 
                        style={{width:'100%', outline:'none', margin:'83px 0 10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        Continue 
                        <i 
                            style={{margin:'0 10px', fontSize:'1rem'}} 
                            class="fas fa-arrow-right"
                        ></i>
                    </button>
                    <p 
                        onClick={() => setSlideForm1(!slideform1)}
                        style={{margin:'0', textAlign:'center', color:'#808080'}}
                    >
                        Cancel
                    </p>
                </Fragment>
            )}
        </Fragment>
    )
}

AddressBlock.propTypes = {

}

export default AddressBlock
