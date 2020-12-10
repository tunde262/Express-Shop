import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ConfirmAddress = ({
    // origin,
    data,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    addressType,
    setSlideForm1,
    slideform1,
    handleAddressDefault,
    active,
    onChange,
    submit
}) => {

    const onChangeFirst = e => setFirstName({ ...firstName, [e.target.name]: e.target.value});

    const onChangeLast = e => setLastName({ ...lastName, [e.target.name]: e.target.value});

    return (
        <Fragment>
            <div style={{height:'400px', padding:'9px 0', borderTop:'1px solid #cecece', borderBottom:'2px dashed #cecece', overflow:'scroll'}}>
                <div className="checkout-addy">
                    <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                        <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <p style={{margin:'0'}}>Confirm Details</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <div style={{display:'flex'}}>
                                {addressType === 'residence' ? (
                                    <Fragment>
                                        <input
                                            type="text"
                                            name="first"
                                            className="input_line"
                                            value={firstName.first}
                                            onChange={e => onChangeFirst(e)}
                                            className="input_line"
                                            placeholder="First Name"
                                            style={{margin:'10px 10px 10px 0', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                        />
                                        <input
                                            type="text"
                                            name="last"
                                            className="input_line"
                                            value={lastName.last}
                                            onChange={e => onChangeLast(e)}
                                            className="input_line"
                                            placeholder="Last Name"
                                            style={{margin:'10px 0 10px 10px', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                        />
                                    </Fragment>
                                ) : (
                                    <input
                                        type="text"
                                        name="name"
                                        className="input_line"
                                        value={data.name}
                                        onChange={e => onChange(e)}
                                        placeholder="Name this locaction..."
                                        style={{margin:'10px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                )}
                            </div>
                            <div style={{width:'100%'}}>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="address_1"
                                        className="input_line"
                                        value={data.formatted_address}
                                        onChange={e => onChange(e)}
                                        className="input_line"
                                        placeholder="Address 1"
                                        style={{margin:'10px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="city"
                                        className="input_line"
                                        value={data.city}
                                        onChange={e => onChange(e)}
                                        className="input_line"
                                        placeholder="City"
                                        style={{margin:'10px 10px 10px 0', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        className="input_line"
                                        value={data.postalCode}
                                        onChange={e => onChange(e)}
                                        className="input_line"
                                        placeholder="Zipcode"
                                        style={{margin:'10px 0 10px 10px', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="state"
                                        className="input_line"
                                        value={data.state}
                                        onChange={e => onChange(e)}
                                        className="input_line"
                                        placeholder="State/Province"
                                        style={{margin:'10px 10px 10px 0', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        className="input_line"
                                        value={data.country}
                                        onChange={e => onChange(e)}
                                        className="input_line"
                                        placeholder="U.S."
                                        style={{margin:'10px 0 10px 10px', width:'50%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input_line"
                                        value={data.phone}
                                        onChange={e => onChange(e)}
                                        className="input_line"
                                        placeholder="Phone number (for delivery use only)"
                                        style={{margin:'10px 0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                    />
                                </div>

                                <div style={{display:'flex'}}>
                                    <p style={{color:'#0098d3'}}>Add Address 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-pay">
                    <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                        <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <p style={{margin:'0'}}>Delivery Instructions</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <div style={{display:'flex'}}>
                                <textarea
                                    type="text"
                                    name="delivery_instructions"
                                    className="input_line"
                                    value={data.delivery_instructions}
                                    onChange={e => onChange(e)}
                                    placeholder="Delivery instructions..."
                                    style={{margin:'10px 0', width:'100%', width:'100%', height:'100px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-deliv">
                    <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                        <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                            <div style={{display: 'flex', flexDirection:'column'}}>
                                <p style={{margin:'0'}}>Default Shipping</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <div>
                                <p style={{color:'#808080'}}>Set as my preferred shipping address</p>
                                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'50px'}}>
                                    <div onClick={handleAddressDefault} style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        {active ? (
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'20px', width:'20px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                            </div>
                                        ) : ( 
                                            <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                        )}
                                        <p style={{margin:'0'}}>Yes</p>
                                    </div>
                                    <div onClick={handleAddressDefault} style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        {active ? (
                                            <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                        ) : ( 
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'20px', width:'20px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                            </div>
                                        )}
                                        <p style={{margin:'0'}}>No</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={submit} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    Add New
                </button>
                <p onClick={() => setSlideForm1(!slideform1)} style={{margin:'0', color:'#808080'}}>Back</p>
                {/* <p style={{margin:'0'}}>placeid: {data.placeId}</p>
                <p style={{margin:'0'}}>latlng: {data.latLng}</p> */}
            </div>
            
        </Fragment>
    )
}

ConfirmAddress.propTypes = {

}

export default ConfirmAddress
