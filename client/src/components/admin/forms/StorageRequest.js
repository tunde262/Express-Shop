import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const StorageRequest = ({match, setTable, products, getProductsByStoreId, store, setModal, setLocationModal}) => {
    // useEffect(() => {
    //     if(!products) getProductsByStoreId(store._id);
    // }, [])

    const handleClick = () => {
        if(match.params.productId) {
            setTable('product detail')
        }

        if(match.params.collectionId) {
            setTable('collection detail')
        }
    }
    return (
        <Fragment>
            <div className="product-actions container-fluid">
                <div style={{display:'flex', justifyContent:'space-between', height:'50px', alignItems:'center'}}>
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <i onClick={handleClick} class="fas fa-arrow-left"></i>{' '}
                        <h3 style={{color:'#333', fontWeight:'300'}}>Storage Request</h3>
                    </div>
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <button style={{ margin:'0 1rem 0 0' }}>Submit</button>
                    </div>
                </div>
                <hr style={{margin:'0'}} />
            </div>
            <div class="product-admin-main" style={{padding:'1rem'}}>
                <div style={{border:'2px solid #f4f4f4', margin:'2rem 0', width:'100%', display:'flex', justifyContent:'center'}}>
                    <div style={{width: '100%', padding:'2rem'}}>
                        <h2 style={{color:'#333', fontWeight:'300'}}>Items</h2>
                        <p>Step 1 of 4</p>
                        <div style={{margin: '15px'}} class="card card-default">
                            <div className="card-header">
                            <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                    <div style={{marginLeft:'1rem'}}>
                                        <p style={{margin:0}}>Product name</p>
                                        <p style={{margin:0, color:'blue'}}>small / blue</p>
                                    </div>
                                </div>
                                <i style={{color:'red'}} class="fas fa-times"></i>
                            </div>
                            </div>
                            <div class="card-body">
                                <input 
                                    type="text"
                                    name="phone"
                                    placeholder="Shipment Qty"
                                    style={{margin:'1rem'}}
                                />
                                <input 
                                    type="text"
                                    name="phone"
                                    placeholder="Quantity Per Box"
                                    style={{margin:'1rem'}}
                                />
                                <input 
                                    type="text"
                                    name="phone"
                                    placeholder="# of Boxes"
                                    style={{margin:'1rem'}}
                                />
                            </div>
                            <div class="card-footer">
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <p><strong>Total Qty: </strong> 100</p> 
                                    <p><strong>Total Cost: </strong> $20</p>
                                </div>
                            </div>
                        </div>  
                        <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                            <button onClick={setModal}>Add Items</button>
                        </div>
                    </div>
                </div>
                <div style={{border:'2px solid #f4f4f4', margin:'2rem 0', width:'100%', display:'flex', justifyContent:'center'}}>
                    <div style={{width: '100%', padding:'2rem'}}>
                        <h2 style={{color:'#333', fontWeight:'300'}}>Choose Location</h2>
                        <p>Step 2 of 4</p>
                        <div style={{display:'flex', flexDirection:'column', padding:'1rem', border:'2px solid #f4f4f4'}}>
                            <h5>6100 Glenhollow dr.</h5>
                            <p style={{color:'#808080'}}><i class="fas fa-map-marker-alt"></i>Plano, Tx</p>
                            <p>On the corner of communications in pkwy and main next to the kroger store but on the back of the corner of the back fencing.</p>
                            <p style={{margin:'1rem'}}>
                                <input 
                                    type="checkbox" 
                                    name="visible"
                                    style={{margin:0}}
                                />
                                <label style={{margin:0}} className="form-group">Default location</label>
                            </p>
                        </div>
                        <button onClick={setLocationModal}>Change</button>
                    </div>
                </div>
                <div style={{border:'2px solid #f4f4f4', margin:'2rem 0', width:'100%', display:'flex', justifyContent:'center'}}>
                    <div style={{width: '100%', padding:'2rem'}}>
                        <h2 style={{color:'#333', fontWeight:'300'}}>Packaging & Shippping Type</h2>
                        <p>Step 3 of 4</p>
                        <p>Shipping Type</p>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div style={{display:'flex'}}>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                <label style={{margin:0}} className="form-group">Single Package</label>  
                                </p>
                            </div>
                            <div>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                    <label style={{margin:0}} className="form-group">Multiple Packages</label>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                    <label style={{margin:0}} className="form-group">Pallet</label>
                                </p>
                            </div>
                            <hr />
                            <div style={{display:'flex'}}>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                <label style={{margin:0}} className="form-group">Shipping</label>  
                                </p>
                            </div>
                            <div>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                    <label style={{margin:0}} className="form-group">Pick up</label>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                    <label style={{margin:0}} className="form-group">Drop off</label>
                                </p>
                            </div>
                            <hr />
                            <div style={{display:'flex'}}>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                <label style={{margin:0}} className="form-group">Now</label>  
                                </p>
                            </div>
                            <div>
                                <p>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                    <label style={{margin:0}} className="form-group">Later</label>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{border:'2px solid #f4f4f4', margin:'2rem 0', width:'100%', display:'flex', justifyContent:'center'}}>
                    <div style={{width: '100%', padding:'2rem'}}>
                        <h2 style={{color:'#333', fontWeight:'300'}}>Review Order</h2>
                        <p>Step 4 of 4</p>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <label className="form-group">Condition</label>
                            <select name="condition">
                                <option>* Choose a condition</option>
                                <option value="new">New</option>
                                <option value="refurbished">Refurbished</option>
                                <option value="used fair">Used (fair)</option>
                                <option value="used good">Used (good)</option>
                                <option value="used like new">Used (like new)</option>
                            </select>
                            <small className="form-text">
                                Give us an idea of the condition this item is in?
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-admin-secondary" style={{padding:'2rem 1rem'}}>
                <div>
                    <h5>Order Summary</h5>
                    <hr />
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <p>Item(s):</p>
                        <p>$19.99</p>
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <p>Estimated Taxes:</p>
                        <p>$1.99</p>
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <p>Flat Service Fee:</p>
                        <p>$19.99</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

StorageRequest.propTypes = {

}

export default withRouter(StorageRequest);
