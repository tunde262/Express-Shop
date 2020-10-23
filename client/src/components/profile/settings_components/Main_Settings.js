import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';

const Main_Settings = ({deleteAccount, store, auth: { user }, profile: {profile, loading }}) => {

  

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div style={{background:'#fff', margin:'20px 0', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-container">
                    <div className="profile-settings-box">
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', alignItems:'flex-end'}}>
                                <div className="profile-circle big">
                                    <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                </div>
                                <div style={{display: 'flex', margin:'20px 2rem', background: '#e8e8e8',alignItems: 'center',justifyContent: 'center',borderRadius: '56px', height: '56px',padding: '0 1rem'}}>
                                    <p style={{color:'#333', margin:'0'}}>change</p>
                                </div>
                            </div>
                        </div>
                        <hr style={{height:'1px', background:'#e8e8e8'}}/>
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                <p>Name</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                <p>Tunde Adepitan</p>
                            </div>
                            <div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                <p>Gender</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                <p>Male</p>
                            </div>
                            <div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                <p>Birthday</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                <p>May 10</p>
                            </div>
                            <div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                <p>Password</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                <div>
                                    <div style={{display:'flex', alignItems:"center"}}>
                                        <i class="fas fa-ellipsis-h"></i>
                                        <i class="fas fa-ellipsis-h"></i>
                                        <i class="fas fa-ellipsis-h"></i>
                                    </div>
                                    <p style={{color:'#808080'}}>Last changed Jan 18, 2016</p>
                                </div>
                            </div>
                            <div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{background:'#fff', margin:'20px 0', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-container">
                    <div className="profile-settings-box">
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                <p>Email</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                <p>Tunde262@gmail.com</p>
                            </div>
                            <div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                <p>Phone</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'flex-start'}}>
                                <p>214-552-9198</p>
                            </div>
                            <div>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                        <div className="profile-settings-box-element">
                            <div style={{display:'flex', fontSize:'12px', color:'#0098d3', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                <i class="fas fa-plus"></i>
                                <p style={{margin:'0 10px'}}>Add Contact Method</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Main_Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Main_Settings);
