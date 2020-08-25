import React from 'react'
import PropTypes from 'prop-types'

const Settings = props => {
    return (
        <div className="store-settings-container">
            <div className="store-settings-box" style={{border:'2px solid #cecece', borderRadius:'10px'}}>
                <h2>Profile Settings</h2>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <label>First Name</label>
                    <input  
                        style={{margin:'0.5rem'}}
                        type="text"
                        name="email"
                        className="input_line"
                        placeholder="Enter your email"
                    />
                    <label>Last Name</label>
                    <input  
                        style={{margin:'0.5rem'}}
                        type="text"
                        name="email"
                        className="input_line"
                        placeholder="Enter your email"
                    />
                    <div style={{display:'flex'}}>
                        <label>Birthday</label>
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Month"
                        />
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Day"
                        />
                    </div>

                    <div style={{display:'flex'}}>
                        <label>Gender</label>
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Male"
                        />
                        <input  
                            style={{margin:'0.5rem'}}
                            type="text"
                            name="email"
                            className="input_line"
                            placeholder="Female"
                        />
                    </div>
                    <label>Email</label>
                    <input  
                        style={{margin:'0.5rem'}}
                        type="text"
                        name="email"
                        className="input_line"
                        placeholder="Enter your email"
                    />
                    <label>Phone</label>
                    <input  
                        style={{margin:'0.5rem'}}
                        type="text"
                        name="email"
                        className="input_line"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="store-settings-box-element">
                    <button>Save</button>
                </div>
            </div>
            <div className="store-settings-box" style={{ marginTop:'2rem', border:'2px solid #cecece', borderRadius:'10px'}}>
                <h2>My Addresses</h2>
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
                <div className="store-settings-box-element">
                    <button>Add Address</button>
                </div>
            </div>
            <div className="store-settings-box" style={{ marginTop:'2rem', border:'2px solid #cecece', borderRadius:'10px'}}>
                <h2>Payment Methods</h2>
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
                <div className="store-settings-box-element">
                    <button>Add</button>
                </div>
            </div>
        </div>
    )
}

Settings.propTypes = {

}

export default Settings