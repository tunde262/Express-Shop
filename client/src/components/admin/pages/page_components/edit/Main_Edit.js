import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { deleteStore } from '../../../../../actions/storeActions';

const Main_Edit = ({store, auth: { user }, profile: {profile, loading }}) => {

    // Toggle Forms
    const [slideForm1, setSlideForm1] = useState(false);
    const [slideForm2, setSlideForm2] = useState(false);
    const [formValue1, setFormValue1] = useState(null);
    const [formValue2, setFormValue2] = useState(null);
    const [storePrivate, setStorePrivate] = useState(false);


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

    const switchChange = e => {
        setStorePrivate( e.target.checked );
    }

    return (
        <Fragment>
            <div style={{background:'#fff', margin:'10px 0', overflow:'hidden', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-transition">
                    {/** Transition 1 */}
                    <div className={!slideForm1 ? "profile-settings-container active" : "profile-settings-container"} id="transition-1">
                        <div className="profile-settings-box">
                            <div className="profile-settings-box-element">
                                <div style={{display:'flex', alignItems:'flex-end'}}>
                                    {/* <div className="profile-circle big">
                                        <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                    </div> */}
                                    {store.store && <img className="store-img" src={`/api/stores/image/${store.store.img_name}`} alt="img" />}
                                    <div style={{display: 'flex', margin:'20px 2rem', background: '#e8e8e8',alignItems: 'center',justifyContent: 'center',borderRadius: '56px', height: '56px',padding: '0 1rem'}}>
                                        <p style={{color:'#333', margin:'0'}}>change</p>
                                    </div>
                                </div>
                            </div>
                            <hr style={{height:'1px', marginBottom:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('name')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0', color:'#808080'}}>Store Name</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0'}}>Tunde Adepitan</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('name')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0', color:'#808080'}}>Store Category</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <div style={{background:'#99ff99', justifyContent:'center', alignItems:'center', height:'30px', borderRadius:'30px', padding:'0 1rem'}}>
                                        <p style={{margin:'5px 0', color:'green'}}>clothing & fashion</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('gender')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0', color:'#808080'}}>Store Description</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0', textAlign:'start'}}>#1 Dermatologist-Recommended Skincare Brand Cleanse, treat & moisturize to restore the skin’s barrier</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('gender')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0', color:'#808080'}}>Store Tags</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <div style={{background:'#99ff99', justifyContent:'center', alignItems:'center', height:'30px', borderRadius:'30px', padding:'0 1rem'}}>
                                        <p style={{margin:'5px 0', color:'green'}}>clothing & fashion</p>
                                    </div>
                                    <div style={{background:'#99ff99', justifyContent:'center', alignItems:'center', height:'30px', borderRadius:'30px', padding:'0 1rem'}}>
                                        <p style={{margin:'5px 0', color:'green'}}>furniture</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('birthday')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0', color:'#808080'}}>Store Privacy</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{color:'#3CB371', margin:'0'}}>Public</p>
                                </div>
                                <div> 
                                    <input 
                                        class="toggle-button" 
                                        type="checkbox" 
                                        name="privacy"
                                        checked={storePrivate}
                                        onChange={switchChange}
                                    />
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('password')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0', color:'#808080'}}>Store Code</p>
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
                                <div>
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
            <div style={{background:'#fff', height:'300px', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-transition">
                    {/** Transition 1 */}
                    <div className={!slideForm2 ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                        <div className="profile-settings-box">
                            <div onClick={() => handleSlideForm2('email')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p style={{color:'#808080'}}>Store Email</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>support@cardboardexpress.com</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('phone')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p style={{color:'#808080'}}>Support Number</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>214-552-9198</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div style={{margin:'1rem 0'}}>
                                <div style={{display:'flex', cursor:'pointer', fontSize:'12px', color:'#0098d3', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
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
            <div style={{background:'#fff', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-transition">
                    {/** Transition 1 */}
                    <div className={!slideForm2 ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                        <div className="profile-settings-box">
                            <div onClick={() => handleSlideForm1('phone')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <i style={{fontSize:'1.5rem'}} className="fas fa-globe fa-2x" />
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>https://www.cardboardexpress.com</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('phone')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <i style={{fontSize:'1.5rem'}} className="fab fa-twitter fa-2x" />
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>foxytunde</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('phone')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <i style={{fontSize:'1.5rem'}} className="fab fa-facebook fa-2x" />
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>foxytunde</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('phone')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <i style={{fontSize:'1.5rem'}} className="fab fa-youtube fa-2x" />
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>foxytunde</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('phone')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <i style={{fontSize:'1.5rem'}} className="fab fa-instagram fa-2x" />
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>foxytunde</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
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

Main_Edit.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Main_Edit);
