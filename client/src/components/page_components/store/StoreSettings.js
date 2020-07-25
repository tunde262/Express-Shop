import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StoreSettings = ({ store: { store, loading }, setTable }) => {
    useEffect(() => {
 
    }, []);


    return (
        <Fragment>
            <i onClick={e => setTable('store')} style={{color:'#808080', position:'absolute',margin:'2rem 0 0 5rem', fontSize:'2rem'}} class="fas fa-arrow-left"></i>
            <div style={{margin:'2rem 0', width:'100%', display:'flex', justifyContent:'center'}}>
                <div style={{width: '50%', padding:'2rem'}}>
                    <h2 style={{color:'#333', fontWeight:'300'}}>Store Settings</h2>
                    <p>Store logo</p>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                        <p style={{color:'blue'}}>change</p>
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <button>Customize Theme</button>
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>Show Banner:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>Make Store Public: </p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>Store code:</p>
                        <p>password1</p>
                    </div>
                    <hr/>
                    <h3 style={{color:'#333', fontWeight:'300'}}>Product Settings</h3>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>Comments on products:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>User photos on products:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>Show product locations:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <hr/>
                    <h3 style={{color:'#333', fontWeight:'300'}}>Navigation Settings</h3>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <button>Edit Navigation</button>
                    </div>
                    <hr/>
                    <h3 style={{color:'#333', fontWeight:'300'}}>Checkout Settings</h3>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>Scheduled Orders:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>Taxes included in product:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div style={{display:'flex', margin:'1rem 0', width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                        <p>% of delivery cost charge to customers:</p>
                        <div style={{display:'flex', alignItems:'flex-end'}}>
                            <input
                                type="email"
                                name="email"
                                className="input_line"
                                value="0"
                                style={{width:'75px'}}
                            />
                            <p>%</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

StoreSettings.propTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(StoreSettings);