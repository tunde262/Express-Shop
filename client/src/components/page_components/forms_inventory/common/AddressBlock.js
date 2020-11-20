import React from 'react'
import PropTypes from 'prop-types';

import PlacesAutocomplete from 'react-places-autocomplete';

const AddressBlock = ({
    address,
    setAddress,
    handleLocationSelect,
}) => {
    

    return (
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleLocationSelect}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                    <p style={{color:'#808080', margin:'0 0 0 5px'}}>Address:</p>
                    <input 
                        autoComplete="no"
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
                        {...getInputProps({
                        placeholder: "Enter address . . .",
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
    )
}

AddressBlock.propTypes = {

}

export default AddressBlock
