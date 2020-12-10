import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';
import moment from 'moment';



import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';

import { setAlert } from '../../../actions/alertActions';
import { editUserName, changePassword, changeUserEmail } from '../../../actions/authActions';
import { createProfile } from '../../../actions/profileActions';

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: ''
};

const initialProfileState = {
    gender: ''
};

const Main_Settings = ({deleteAccount, setAlert, editUserName, changePassword, changeUserEmail, createProfile, store, auth, profile: {profile, loading }}) => {

    const [formData, setFormData] = useState(initialState);
    const [profileData, setProfileData] = useState(initialProfileState);

    useEffect(() => {
        if (!auth.loading && auth.user) {
            const userData = { ...initialState };
            for (const key in auth.user) {
                if (key in userData) userData[key] = auth.user[key];
            }

            userData.password = '';
            userData.password2 = '';

            setFormData(userData);
        }

        if (!auth.loading && profile) {
            setProfileData({gender: profile.gender});
        }

    }, [auth.user, profile])


    const { first_name, last_name, email, password, password2 } = formData;
    const { gender } = profileData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onChangeProfile = e => setProfileData({ ...profileData, [e.target.name]: e.target.value});

    const nameTodo = (e) => {
        onSubmitName(e);
    }

    const emailTodo = (e) => {
        onSubmitEmail(e);
    }

    const passwordTodo = (e) => {
        onSubmitPassword(e);
    }

    const genderTodo = (e) => {
        onSubmitGender(e);
    }

    const { _id} = auth.user;

    const onSubmitName = async e => {
        e.preventDefault();

        if(auth.user) {
            const userId = auth.user._id; 

            editUserName({ 
                first_name,  
                last_name, 
                userId
            });
            
            console.log('FRONT END ID')
            console.log(userId);
            console.log(first_name);
            console.log(last_name);
        }
    }

    const onSubmitEmail = async e => {
        e.preventDefault();

        if(auth.user) {
            const userId = auth.user._id; 


            changeUserEmail({ 
                email,
                userId
            });

            console.log('FRONT END ID')
            console.log(userId);
            console.log(email);
        }
    }

    const onSubmitPassword = async e => {
        e.preventDefault();

        if(auth.user) {
            const userId = auth.user._id; 


            if(password !== password2) {
                setAlert('Passwords do not match', 'danger');
            } else {
                changePassword({ 
                    password, 
                    userId 
                });
            }
        }
    }

    const onSubmitGender = async e => {
        e.preventDefault();

        createProfile({gender}, true)
    }

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

    const userCreated = auth.user.date;

    let formContent1;

    if(formValue1 === 'name') {
        formContent1 = (
            <Fragment>
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
                                name="first_name"
                                className="input_line"
                                value={first_name}
                                onChange={(e) => onChange(e)}
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
                                name="last_name"
                                className="input_line"
                                value={last_name}
                                onChange={(e) => onChange(e)}
                                placeholder="Last Name"
                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
                        </div>
                    </div>
                    <div style={{display:'grid', marginTop:'3rem', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                        <button onClick={(e) => nameTodo(e)}>Save</button>
                        <p onClick={() => handleSlideForm1()} style={{background:'#fff', margin:'1rem 0', cursor:'pointer', color:'#808080'}}>Cancel</p>
                    </div>
                </div>
            </Fragment>
        )
    } else if (formValue1 === 'email') {
        formContent1 = (
            <Fragment>
                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                    <p style={{fontSize:'1.3rem'}}>Change Email</p>
                    <p style={{color:'#808080', margin:'0'}}>Changes to your email will be reflected across your Cardboard Express Account.</p>
                </div>
                <div className="profile-settings-box">
                    <div className="profile-settings-box-form">
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                            <p>Email</p>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                            <input
                                type="text"
                                name="email"
                                className="input_line"
                                value={email}
                                onChange={(e) => onChange(e)}
                                placeholder="Enter Email"
                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
                        </div>
                    </div>
                    <div style={{display:'grid', marginTop:'3rem', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                        <button onClick={(e) => emailTodo(e)}>Save</button>
                        <p onClick={() => handleSlideForm1()} style={{background:'#fff', margin:'1rem 0', cursor:'pointer', color:'#808080'}}>Cancel</p>
                    </div>
                </div>
            </Fragment>
        )
    } else if (formValue1 === 'password') {
        formContent1 = (
            <Fragment>
                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                    <p style={{fontSize:'1.3rem'}}>Change Password</p>
                    <p style={{color:'#808080', margin:'0'}}>Changes to your password will be reflected across your Cardboard Express Account.</p>
                </div>
                <div className="profile-settings-box">
                    <div className="profile-settings-box-form">
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                            <p>Password</p>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                            <input
                                type="password"
                                name="password"
                                className="input_line"
                                value={password}
                                onChange={(e) => onChange(e)}
                                placeholder="Enter password"
                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
                        </div>
                    </div>
                    <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                    <div className="profile-settings-box-form">
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                            <p>Confirm Password</p>
                        </div>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                            <input
                                type="password"
                                name="password2"
                                className="input_line"
                                value={password2}
                                onChange={(e) => onChange(e)}
                                placeholder="Confirm password"
                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
                        </div>
                    </div>
                    <div style={{display:'grid', marginTop:'3rem', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                        <button onClick={(e) => passwordTodo(e)}>Save</button>
                        <p onClick={() => handleSlideForm1()} style={{background:'#fff', margin:'1rem 0', cursor:'pointer', color:'#808080'}}>Cancel</p>
                    </div>
                </div>
            </Fragment>
        )
    } else if (formValue1 === 'gender') {
        formContent1 = (
            <Fragment>
                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                    <p style={{fontSize:'1.3rem'}}>Confirm Gender</p>
                    <p style={{color:'#808080', margin:'0'}}>Help us personalize your account.</p>
                </div>
                <div className="profile-settings-box">
                    <div className="profile-settings-box-form">
                        <div style={{ padding:'0 10px', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <div onClick={() => setProfileData({gender: 'male'})} className="button-hover-class" style={{margin:'10px 0', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {gender === 'male' ? (
                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'25px', width:'25px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                        <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                    </div>
                                ) : (
                                    <div style={{height:'24px', width:'24px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                )}
                                <p style={{margin:'0', fontSize:'1rem'}}>Male</p>
                            </div>
                            <div onClick={() => setProfileData({gender: 'female'})} className="button-hover-class" style={{margin:'10px 0', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {gender === 'female' ? (
                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'25px', width:'25px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                        <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                    </div>
                                ) : (
                                    <div style={{height:'24px', width:'24px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                )}
                                <p style={{margin:'0', fontSize:'1rem'}}>Female</p>
                            </div>
                            <div onClick={() => setProfileData({gender: 'other'})} className="button-hover-class" style={{margin:'10px 0', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {gender === 'other' ? (
                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'25px', width:'25px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                        <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                    </div>
                                ) : (
                                    <div style={{height:'24px', width:'24px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                )}
                                <p style={{margin:'0', fontSize:'1rem'}}>Other</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'grid', marginTop:'3rem', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                        <button onClick={(e) => genderTodo(e)}>Save</button>
                        <p onClick={() => handleSlideForm1()} style={{background:'#fff', margin:'1rem 0', cursor:'pointer', color:'#808080'}}>Cancel</p>
                    </div>
                </div>
            </Fragment>
        )
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
                            <div onClick={() => handleSlideForm1('name')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0'}}>Name</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0'}}>{auth.user && auth.user.first_name + ' ' + auth.user.last_name}</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('email')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p>Email</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0'}}>{auth.user && auth.user.email}</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('gender')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0'}}>Gender</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={profile && profile.gender ? {margin:'0', } : {margin:'0', color:'#808080'}}>{profile && profile.gender ? profile.gender : 'N/A'}</p>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('birthday')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0'}}>Birthday</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={profile && profile.birthday ? {margin:'0', } : {margin:'0', color:'#808080'}}>{profile && profile.birthday ? profile.birthday.month + ' ' + profile.birthday.day : 'N/A'}</p>
                                </div>
                                <div> 
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
                                        <p style={{color:'#808080'}}>Created {auth.user && moment(userCreated).format("MMMM Do")}</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            {/* <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div className="profile-settings-box-element img-block">
                                <div style={{display:'flex', alignItems:'flex-end'}}>
                                    <div style={{display: 'flex', margin:'20px 2rem', background: '#e8e8e8',alignItems: 'center',justifyContent: 'center',borderRadius: '56px', height: '56px',padding: '0 1rem'}}>
                                        <p style={{color:'#333', margin:'0'}}>change</p>
                                    </div>
                                    <div className="profile-circle big">
                                        <p style={{fontWeight:'bold', color:'#333'}}>T</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/** Transition 2 */}
                    <div className={slideForm1 ? "profile-settings-container active" : "profile-settings-container"} id="transition-2">
                        <div onClick={() => handleSlideForm1()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                            <i class="fas fa-long-arrow-alt-left"></i>
                            <p style={{margin:'0 10px'}}>  Back</p>
                        </div>
                        {formContent1}
                    </div>
                </div>
            </div>
            <div style={{height:'100px'}}></div>
            {/* <div style={{background:'#fff', margin:'5px 10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-transition">
                    // Transition 1
                    <div className={!slideForm2 ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                        <div className="profile-settings-box">
                            <div onClick={() => handleSlideForm2('email')} className="profile-settings-box-form">
                                <div style={{display:'flex', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                    <p>Email</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <p>{user && auth.user.email}</p>
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
                    // Transition 2
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
            </div> */}
        </Fragment>
    )
}

Main_Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired, 
    editUser: PropTypes.func.isRequired,
    editUserName: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired, 
    changeUserEmail: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps, { setAlert, editUserName, changePassword, changeUserEmail, createProfile })(Main_Settings);
