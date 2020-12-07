import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';

const Main_Settings = ({deleteAccount, store, auth: { user }, profile: {profile, loading }}) => {

    // Toggle Forms
    const [slideForm1, setSlideForm1] = useState(false);
    const [slideForm2, setSlideForm2] = useState(false);
    const [formValue1, setFormValue1] = useState(null);
    const [formValue2, setFormValue2] = useState(null);

    const handleSlideForm1 = (value) => {
        setSlideForm1(!slideForm1);
        if(value && formValue1 !== value) {
            setFormValue1(value);
        }
    }

    const handleSlideForm2 = (value) => {
        setSlideForm2(!slideForm2);
        if(value && formValue2 !== value) {
            setFormValue2(value);
        }
    }

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div style={{background:'#fff', margin:'10px', overflow:'hidden', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-transition">
                    {/** Transition 1 */}
                    <div className={!slideForm1 ? "profile-settings-container active" : "profile-settings-container"} id="transition-1">
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
                            <hr style={{height:'1px', marginBottom:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('name')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0'}}>Name</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0'}}>Tunde Adepitan</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('gender')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0'}}>Gender</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0'}}>Male</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('birthday')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0'}}>Birthday</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0'}}>May 10</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center'}}> 
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('password')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0'}}>Password</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <div>
                                        <div style={{display:'flex', alignItems:"center"}}>
                                            <i class="fas fa-ellipsis-h"></i>
                                            <i class="fas fa-ellipsis-h"></i>
                                            <i class="fas fa-ellipsis-h"></i>
                                        </div>
                                        <p style={{color:'#808080'}}>Last changed Jan 18, 2016</p>
                                    </div>
                                </div>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** Transition 2 */}
                    <div className={slideForm1 ? "profile-settings-container active" : "profile-settings-container"} id="transition-2">
                        <div onClick={() => handleSlideForm1()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                            <i class="fas fa-long-arrow-alt-left"></i>
                            <p style={{margin:'0 10px'}}>  Back</p>
                        </div>
                        <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                            <p style={{fontSize:'1.3rem'}}>Edit Name</p>
                            <p style={{color:'#808080', margin:'0'}}>Changes to your name will be reflected across your Cardboard Express Account.</p>
                        </div>
                        <div className="profile-settings-box">
                            <div className="profile-settings-box-form">
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p>FirstName</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input_line"
                                        className="input_line"
                                        placeholder="First Name"
                                        style={{margin:'10px 0', width:'100%', height:'50px'}}
                                    />
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div className="profile-settings-box-form">
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p>Last Name</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input_line"
                                        className="input_line"
                                        placeholder="Last Name"
                                        style={{margin:'10px 0', width:'100%', height:'50px'}}
                                    />
                                </div>
                            </div>
                            <div style={{display:'grid', marginTop:'3rem', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                                <button>Save</button>
                                <p onClick={() => handleSlideForm1()} style={{background:'#fff', margin:'1rem 0', cursor:'pointer', color:'#808080'}}>Cancel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{background:'#fff', margin:'5px 10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-transition">
                    {/** Transition 1 */}
                    <div className={!slideForm2 ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                        <div className="profile-settings-box">
                            <div onClick={() => handleSlideForm2('email')} className="profile-settings-box-form">
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
                            <div onClick={() => handleSlideForm1('phone')} className="profile-settings-box-form">
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
                    {/** Transition 2 */}
                    <div className={slideForm2 ? "profile-settings-container active" : "profile-settings-container"} id="transition-4">
                        <div onClick={() => handleSlideForm2()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                            <i class="fas fa-long-arrow-alt-left"></i>
                            <p style={{margin:'0 10px'}}>  Back</p>
                        </div>
                        <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                            <p style={{fontSize:'1.3rem'}}>Update Email</p>
                        </div>
                        <div className="profile-settings-box">
                            <div className="profile-settings-box-element">
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p>FirstName</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input_line"
                                        className="input_line"
                                        placeholder="First Name"
                                        style={{margin:'10px 0', width:'100%', height:'50px'}}
                                    />
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div className="profile-settings-box-element">
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p>Last Name</p>
                                </div>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="input_line"
                                        className="input_line"
                                        placeholder="Last Name"
                                        style={{margin:'10px 0', width:'100%', height:'50px'}}
                                    />
                                </div>
                            </div>
                            <div style={{display:'grid', marginTop:'3rem', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                                <button>Save</button>
                                <p onClick={() => handleSlideForm2()} style={{background:'#fff', margin:'1rem 0', cursor:'pointer', color:'#808080'}}>Cancel</p>
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
