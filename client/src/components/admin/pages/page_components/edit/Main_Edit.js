import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

import categoryList from './categoryList';
import { NavItem } from '../../../../header/navbar/NavItem';

import paymentSignatures from '../../../../../utils/imgs/visa_PNG2.png';
import paypalLogo from '../../../../../utils/imgs/PayPal_logo_logotype_emblem.png';

// import { deleteStore } from '../../../../../actions/storeActions';

const Main_Edit = ({store, auth: { user }, profile: {profile, loading }}) => {

    // Toggle Forms
    const [slideForm1, setSlideForm1] = useState(false);
    const [slideForm2, setSlideForm2] = useState(false);
    const [slideForm3, setSlideForm3] = useState(false);
    const [formValue1, setFormValue1] = useState(null);
    const [formValue2, setFormValue2] = useState(null);
    const [formValue3, setFormValue3] = useState(null);
    const [storePrivate, setStorePrivate] = useState(false);

    const [displayImageModal, toggleImageModal] = useState(false);

    const [fileUploadState, setFileUploadState] = useState('');

    const [categoryToggle, setCategoryToggle] = useState(false);


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

    const handleSlideForm3 = (value) => {
        setSlideForm3(!slideForm3);
        if(value && formValue3 !== value) {
            setFormValue3(value);
        }
    }

    const switchChange = e => {
        setStorePrivate( e.target.checked );
    }

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
        document.getElementById('fileButton').onchange = () =>{      
            setFileUploadState(document.getElementById('fileButton').value);
        }
    }

    const startStripeAuthorization = async () => {
        console.log('STARTING AUTH!!!!!');

        const res = await axios.get('/api/stripe/authorize');

        console.log('AUTH LINK: ' + res.data)

        window.location.href = res.data; 
    }

    let categoryListContent = categoryList.map((nav_item, index) => (
        <NavItem 
            key={index} 
            background="#fff"
            hover={nav_item.background_color}
            color="#333"
            border="#dfe1e5"
        >
            {nav_item.img && (
                <img 
                    alt="" 
                    width="50" 
                    height="50" 
                    src={nav_item.img}
                />
            )}
            {' '}{nav_item.tag_value}
        </NavItem>
        )
    );

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
                                    <div onClick={() => toggleImageModal(!displayImageModal)} style={{display: 'flex', margin:'20px 2rem', background: '#e8e8e8',alignItems: 'center',justifyContent: 'center',borderRadius: '56px', height: '56px',padding: '0 1rem'}}>
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
                            <div onClick={() => handleSlideForm1('category')} className="profile-settings-box-element">
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', paddingLeft:'55px'}}>
                                    <p style={{margin:'0', color:'#808080'}}>Store Category</p>
                                </div>
                                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                    <div className="category-tag">
                                        <p style={{margin:'5px 0', color:'#444'}}>clothing & fashion</p>
                                    </div>
                                </div>
                                <div>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                            <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                            <div onClick={() => handleSlideForm1('description')} className="profile-settings-box-element">
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
                            <div onClick={() => handleSlideForm1('tags')} className="profile-settings-box-element">
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
                        {formValue1 === 'name' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <p style={{fontSize:'1.3rem'}}>Edit Store Name</p>
                                    <p style={{color:'#808080', margin:'0'}}>Changes to your store name will be reflected across your Cardboard Express Account.</p>
                                </div>
                                <div className="profile-settings-box">
                                    <div className="profile-settings-box-form">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>Store Name</p>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="store_name"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="Store Name"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                    <hr style={{height:'1px', margin:'0', background:'#e8e8e8'}}/>
                                    <div style={{display:'grid', marginTop:'3rem', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                                        <button>Save</button>
                                        <p onClick={() => handleSlideForm1()} style={{background:'#fff', margin:'1rem 0', cursor:'pointer', color:'#808080'}}>Cancel</p>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        {formValue1 === 'category' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                            <p style={{fontSize:'1.3rem'}}>Choose a Category</p>
                                            <p style={{color:'#808080', margin:'0'}}>Help customers easily understand what your store sells.</p>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                </div>
                                <div className="profile-settings-box">
                                    <div className="profile-settings-box-form">
                                        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>Store Category:</p>
                                        </div>
                                        <div onClick={() => setCategoryToggle(!categoryToggle)} style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <div id="dropdown-el" class={categoryToggle ? "dropdown-el expanded" : "dropdown-el"}>
                                                <div><p>Product Popularity</p><i class="fas fa-caret-down"></i></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                                <div><p>Product Popularity</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        {formValue1 === 'description' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                            <p style={{fontSize:'1.3rem'}}>Edit Store Description</p>
                                            <p style={{color:'#808080', margin:'0'}}>Helps customers and search engines to further understand your what your store is all about.</p>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                </div>
                                <div className="profile-settings-box">
                                    <div className="profile-settings-box-form">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>Store Description:</p>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <textarea
                                                type="text"
                                                name="store_name"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="Describe your store..."
                                                style={{margin:'10px 0', width:'100%', height:'100px'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        {formValue1 === 'tags' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                            <p style={{fontSize:'1.3rem'}}>Choose a category: <span style={{color:'#3CB371', fontSize:'1.3rem'}}>clothing & fashion</span></p>
                                            <p style={{color:'#808080', margin:'0'}}>Help customers easily know what type of items your store sells.</p>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                </div>
                                <div className="profile-settings-box">
                                    <div style={{width:'100%'}}>
                                        <div style={{display:'flex', flexWrap:'wrap', width:'100%'}}>
                                            {categoryListContent}
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        {formValue1 === 'password' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                            <p style={{fontSize:'1.3rem'}}>Change Password</p>
                                            <p style={{color:'#0098d3', margin:'0'}}>Forgot Password?</p>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                </div>
                                <div className="profile-settings-box">
                                    <div className="profile-settings-box-form">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>Old Password:</p>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                className="input_line"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="profile-settings-box-form">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>New Password:</p>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                className="input_line"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="profile-settings-box-form">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>Confirm New Password:</p>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                className="input_line"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
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
                            <div onClick={() => handleSlideForm2('phone')} className="profile-settings-box-form">
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
                        {formValue2 === 'email' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                            <p style={{fontSize:'1.3rem'}}>Edit Support Email</p>
                                            <p style={{color:'#808080', margin:'0'}}>Provide your customers with a support email.</p>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                </div>
                                <div className="profile-settings-box">
                                    <div className="profile-settings-box-element">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>Support Email</p>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="email"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="Email"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        {formValue2 === 'phone' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                            <p style={{fontSize:'1.3rem'}}>Edit Support Number</p>
                                            <p style={{color:'#808080', margin:'0'}}>Provide your customers with a support email.</p>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                </div>
                                <div className="profile-settings-box">
                                    <div className="profile-settings-box-element">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', paddingLeft:'55px'}}>
                                            <p>Support Number</p>
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="email"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="123-456-7890"
                                                style={{margin:'10px 0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
            <div style={{background:'#fff', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-transition">
                    {/** Transition 1 */}
                    <div className={!slideForm3 ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                        <div className="profile-settings-box">
                            <div onClick={() => handleSlideForm3('socials')} className="profile-settings-box-form">
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
                            <div onClick={() => handleSlideForm3('socials')} className="profile-settings-box-form">
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
                            <div onClick={() => handleSlideForm3('socials')} className="profile-settings-box-form">
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
                            <div onClick={() => handleSlideForm3('socials')} className="profile-settings-box-form">
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
                            <div onClick={() => handleSlideForm3('socials')} className="profile-settings-box-form">
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
                    <div className={slideForm3 ? "profile-settings-container active" : "profile-settings-container"} id="transition-4">
                        <div onClick={() => handleSlideForm3()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                            <i class="fas fa-long-arrow-alt-left"></i>
                            <p style={{margin:'0 10px'}}>  Back</p>
                        </div>
                        {formValue3 === 'socials' && (
                            <Fragment>
                                <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                                    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                            <p style={{fontSize:'1.3rem'}}>Update Socials</p>
                                            <p style={{color:'#808080', margin:'0'}}>Provide your customers with a support email.</p>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                </div>
                                <div className="profile-settings-box">
                                    <div className="profile-settings-box-element">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'55px'}}>
                                            <i style={{fontSize:'1.5rem'}} className="fas fa-globe fa-2x" />
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="First Name"
                                                style={{margin:'0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="profile-settings-box-element">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'55px'}}>
                                            <i style={{fontSize:'1.5rem'}} className="fab fa-twitter fa-2x" />
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="Last Name"
                                                style={{margin:'0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="profile-settings-box-element">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'55px'}}>
                                            <i style={{fontSize:'1.5rem'}} className="fab fa-facebook fa-2x" />
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="Last Name"
                                                style={{margin:'0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="profile-settings-box-element">
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'55px'}}>
                                            <i style={{fontSize:'1.5rem'}} className="fab fa-youtube fa-2x" />
                                        </div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <input
                                                type="text"
                                                name="phone"
                                                className="input_line"
                                                className="input_line"
                                                placeholder="Last Name"
                                                style={{margin:'0', width:'100%', height:'50px'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>

            <div style={{background:'#fff', height:'300px', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                <div className="profile-settings-container">
                    <div style={{width:'100%', padding:'1rem 3rem 0 3rem', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end'}}>
                        <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', width:'100%'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                <p style={{fontSize:'1.3rem'}}>Choose Payment Methods</p>
                                <p style={{color:'#808080', margin:'0'}}>Choose how you would like to collect payments.</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-settings-box">
                        <div>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', height:'50px'}}>
                                <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                    <img src={paymentSignatures} style={{height:'30px'}} alt="payment signatures" />
                                </div>
                                <div style={{width:'100%', height:'100%', border:'1px solid #e8e8e8', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                    <img src={paypalLogo} style={{height:'30px'}} alt="payment signatures" />
                                </div>
                            </div>
                            <button onClick={startStripeAuthorization} style={{width:'300px', background:'#0098d3', borderColor:'#0098d3', outline:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>Set Up</button>
                        </div>
                    </div>
                    
                </div>
            </div>

            <Modal open={displayImageModal} onClose={toggleImageModal} center>
                <div style={{height:'300px', borderRadius:'5px', width:'300px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'50px', borderBottom:'1px solid rgb(214,214,214', width:'100%'}}>
                        <h5 style={{margin:'0'}}>Change Store Photo</h5>
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'50px', borderBottom:'1px solid rgb(214,214,214', width:'100%'}}>
                        <div>
                            <input id="fileButton" type="file" hidden />
                            <p onClick={fileUploadButton} style={{margin:'0', fontSize:'1rem', color:'#0098d3'}}>Update Photo</p>
                            {fileUploadState}
                            </div>
                        </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'50px', color:'#ff4b2b', borderBottom:'1px solid rgb(214,214,214', width:'100%'}}>
                        <p style={{margin:'0', fontSize:'1rem'}}>Remove Photo</p>
                    </div>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'50px', width:'100%'}}>
                        <p style={{margin:'0'}}>Cancel</p>
                    </div>
                </div>
            </Modal>
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
