import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CartAddress = () => {

    // Mixpanel
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        
    }, []);

    return (
        <Fragment>
            <div className="checkout-address-form">
                <div className="checkout-address-form-main">
                    <div className="address-form-cart">
                        <div style={{margin: '0', borderRadius:'0'}} class="card card-default">
                            <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p style={{margin:'0'}}>Location Name</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <div style={{width:'100%'}}>
                                    <div>
                                        <input
                                            type="text"
                                            name="address_name"
                                            className="input_line"
                                    
                                            placeholder="Name this locaction..."
                                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="address-form-addy">
                        <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                            <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p style={{margin:'0'}}>Address</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <div style={{display:'flex'}}>
                                    <input
                                        type="text"
                                        name="first_name"
                                        className="input_line"
                           
                                        className="input_line"
                                        placeholder="First Name"
                                        style={{margin:'10px 10px 10px 0', width:'50%', height:'50px'}}
                                    />
                                    <input
                                        type="text"
                                        name="last_name"
                                        className="input_line"
                                   
                                        className="input_line"
                                        placeholder="Last Name"
                                        style={{margin:'10px 0 10px 10px', width:'50%', height:'50px'}}
                                    />
                                </div>
                                <div style={{width:'100%'}}>
                                    <div style={{display:'flex'}}>
                                        <input
                                            type="text"
                                            name="address_1"
                                            className="input_line"
                                         
                                            className="input_line"
                                            placeholder="Address 1"
                                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                                        />
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <p style={{color:'#0098d3'}}>Add Address 2</p>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input
                                            type="text"
                                            name="zipcode"
                                            className="input_line"
                                          
                                            className="input_line"
                                            placeholder="Zipcode"
                                            style={{margin:'10px 0', width:'48%', height:'50px'}}
                                        />
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input
                                            type="text"
                                            name="city"
                                            className="input_line"
                                           
                                            className="input_line"
                                            placeholder="City"
                                            style={{margin:'10px 10px 10px 0', width:'50%', height:'50px'}}
                                        />
                                        <input
                                            type="text"
                                            name="state"
                                            className="input_line"
                                            
                                            className="input_line"
                                            placeholder="State/Province"
                                            style={{margin:'10px 0 10px 10px', width:'50%', height:'50px'}}
                                        />
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input
                                            type="text"
                                            name="country"
                                            className="input_line"
                                            
                                            className="input_line"
                                            placeholder="United States"
                                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                                        />
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <input
                                            type="text"
                                            name="phone"
                                            className="input_line"
                                           
                                            className="input_line"
                                            placeholder="Phone number (for delivery issues only)"
                                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="address-form-pay">
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
                                      
                                        placeholder="Delivery instructions..."
                                        style={{margin:'10px 0', width:'100%', background:'#ededed', border:'0', color:'#808080', height:'100px'}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="address-form-deliv">
                        <div style={{marginTop: '-10px', borderRadius:'0'}} class="card card-default">
                            <div className="card-header" style={{background:'rgb(247, 247, 247)'}}>
                                <div>
                                    <p style={{margin:'0', textAlign:'left'}}>Default Shipping</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <div>
                                    <p style={{color:'#808080'}}>Set as my preferred shipping address</p>
                                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'50px'}}>
                                        <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'20px', width:'20px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                            </div>
                                            
                                            <p style={{margin:'0'}}>Yes</p>
                                        </div>
                                        <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                            <p style={{margin:'0'}}>No</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="address-form-actions" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                    <button style={{background:'#ededed', border:'1px solid #ededed', color:'#808080'}}>Cancel</button>
                    <button >Add New</button>
                </div>
                {/* <p>address_name: {address_name}</p>
                <p>address_1: {address_1}</p>
                <p>address_2: {address_2}</p>
                <p>first_name: {first_name}</p>
                <p>last_name: {last_name}</p>
                <p>city: {city}</p>
                <p>state: {state}</p>
                <p>zipcode: {zipcode}</p>
                <p>phone: {phone}</p>
                <p>country: {country}</p> */}
                {/* <h5>item added to the cart</h5>
                <img src={`/api/products/image/${img_gallery[0].img_name}`} className="img-fluid" alt="product" />
                <h5>{title}</h5>
                <h5 className="text-muted">price : $ {price}</h5>
                <button
                    onClick={handleModalClose}
                >
                    Continue Shopping
                </button>
                <Link to='/cart'>
                    <button
                        cart
                        onClick={handleModalClose}
                    >
                        go to cart
                    </button>
                </Link> */}
            </div>
            {/* {!isEditing ? (
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'15px', width:'15px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                            <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                            <p style={{margin:'0'}}>Tunde's House</p>
                            <p style={{margin:'0', color:'#808080'}}>6100 Glenhollow Dr, Plano, Texas, United States, 75093</p>
                        </div>
                    </div>
                    <div>
                        <p onClick={(e) => setIsEditing(true)} style={{color:'rgb(47, 183, 236)', margin:'0'}}>Change</p>
                    </div>
                </div>
            ) : (
                <Fragment>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'15px', width:'15px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>Tunde's House</p>
                                <p style={{margin:'0', color:'#808080'}}>6100 Glenhollow Dr, Plano, Texas, United States, 75093</p>
                            </div>
                        </div>
                        <div>
                            <p style={{color:'rgb(47, 183, 236)', margin:'0'}}>Edit</p>
                        </div>
                    </div>
                    <hr style={{background:'rgb(214,214,214)', margin:'1rem 0', height:'1px'}} />
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'15px', width:'15px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>Tunde's House</p>
                                <p style={{margin:'0', color:'#808080'}}>6100 Glenhollow Dr, Plano, Texas, United States, 75093</p>
                            </div>
                        </div>
                        <div>
                            <p style={{color:'rgb(47, 183, 236)', margin:'0'}}>Edit</p>
                        </div>
                    </div>
                    <hr style={{background:'rgb(214,214,214)', margin:'1rem 0', height:'1px'}} />
                    <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                        <i class="fas fa-plus" style={{fontSize:'13px',color:'rgb(47, 183, 236)'}}></i>
                        <p style={{fontSize:'13px', fontWeight:'bold', color:'rgb(47, 183, 236)', letterSpacing:'2px', margin:'10px'}}>New Address</p>
                    </div>
                </Fragment>
            )} */}
        </Fragment>
    )
}

CartAddress.propTypes = {

}

export default CartAddress
