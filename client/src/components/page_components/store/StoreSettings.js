import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StoreSettings = ({ store: { store, loading }, setTable }) => {
    useEffect(() => {
 
    }, []);


    return (
        <Fragment>
            <i onClick={e => setTable('store')} class="fas fa-arrow-left backbutton"></i>
            <div className="store-settings-container">
                <div className="store-settings-box">
                    <h2>Store Settings</h2>
                    <p>Store logo</p>
                    <div className="store-settings-box-element">
                        <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                        <p style={{color:'blue'}}>change</p>
                    </div>
                    <div className="store-settings-box-element">
                        <button>Customize Theme</button>
                    </div>
                    <div className="store-settings-box-element">
                        <p>Show Banner:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
                        <p>Make Store Public: </p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
                        <p>Store code:</p>
                        <p>password1</p>
                    </div>
                    <hr/>
                    <h3 style={{color:'#333', fontWeight:'300'}}>Product Settings</h3>
                    <div className="store-settings-box-element">
                        <p>Comments on products:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
                        <p>User photos on products:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
                        <p>Show product locations:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <hr/>
                    <h3 style={{color:'#333', fontWeight:'300'}}>Navigation Settings</h3>
                    <div className="store-settings-box-element">
                        <button>Edit Navigation</button>
                    </div>
                    <hr/>
                    <h3 style={{color:'#333', fontWeight:'300'}}>Checkout Settings</h3>
                    <div className="store-settings-box-element">
                        <p>Scheduled Orders:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
                        <p>Taxes included in product:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
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