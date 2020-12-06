import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../../actions/alertActions';
import { register } from '../../../../actions/authActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../../common/logo.png';

import ReactGA from 'react-ga';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';

import { HorizontalNav } from '../../../common/HorizontalNav';

import { getProducts } from '../../../../actions/productActions';
import { getCollections } from '../../../../actions/collectionActions';

import GenderElements from './Gender_Elements';
import TagElements from './Tag_Elements';
import CollectionElements from './Collection_Elements';
import ExtraElements from './Extra_Elements';
import StoreRecommendations from './stores-related/ListStores';

import shoeSampleImg from '../../../../utils/imgs/20484728.jpeg';
import paperTowelImg from '../../../../utils/imgs/paper_towels.jpeg';
import { createProfile } from '../../../../actions/profileActions';
import { getStoresByTagList } from '../../../../actions/storeActions';
import { getCollectionsByTagList } from '../../../../actions/collectionActions';


const Personalize = ({ 
    createProfile, 
    getStoresByTagList, 
    getCollectionsByTagList, 
    getProducts, 
    getCollections, 
    product, 
    auth: { 
        isAuthenticated, 
        user 
    }, 
    history 
}) => {
    
    const [gender, setGender] = useState('');

    const [recommendationTags, setRecommendationTags] = useState([]);

    const [gotStores, setGotStores] = useState(false);
    const [skip, setSkip] = useState(0);

    const [slideform1, setSlideForm1] = useState(false);
    const [slideform2, setSlideForm2] = useState(false);
    const [slideform3, setSlideForm3] = useState(false);
    const [slideform4, setSlideForm4] = useState(false);
    const [slideform5, setSlideForm5] = useState(false);
    const [slideform6, setSlideForm6] = useState(false);

    useEffect(() => {
        getProducts(0);
    }, []);

    // const handleScroll = (e) => {
    //     const { offsetHeight, scrollTop, scrollHeight} = e.target
    
    //     if (offsetHeight + scrollTop === scrollHeight) {
    //       setSkip(product.products.length)
    //     }
    // }

    const onSubmit = async e => {
        e.preventDefault();

        let tags = '';
        if (recommendationTags.length > 0) {
          tags = recommendationTags.join(', ');
        }
    
        // let data = new FormData();
        // if(formData.file !== '') data.append('file', formData.file);
        // if(gender !== '')data.append('gender', gender);
        // data.append('registration_complete', true);

        // if(tags !== '')data.append('recommendation_tags', tags);

        createProfile({
            gender: gender,
            recommendation_tags: tags,
            registration_complete: true
        }, true);

        // clicked();
    }

    // const clicked = () => {
    //     ReactGA.event({
    //         category: 'Account',
    //         action: 'Update Profile'
    //     });
    // }

    // if(isAuthenticated) {
    //     history.goBack();
    // }

    const fetchStores = () => {
        getStoresByTagList(recommendationTags, skip);
        getCollectionsByTagList(recommendationTags, skip);
        setGotStores(true);
    }

    if(!user) {
        history.push(`/register`);
    }

    let formClass;

    if(slideform1 && !slideform2 && !slideform3) {
        formClass = {width:'600px', overflow:'hidden', padding:'0'}
    } else if (slideform2 && !slideform3) {
        formClass = {width:'600px', height:'600px', overflowY:'scroll', padding:'0'}
        if(!gotStores) {
            fetchStores(recommendationTags)
        }
    } else if(slideform1 && slideform2 && slideform3 && !slideform4) {
        formClass = {width:'600px', overflowY:'scroll', padding:'0'}
    } else {
        formClass = {padding:'36px 20px 0'}
    }

    return (
        <main id="home" className="store-form-container">
            <div className="store-form" style={formClass}>
                <div style={{width:'100%'}} className="form-settings-transition">
                    <div id="transition-1" style={{width:'100%'}} className={!slideform1 ? "auth-form-container active" : "auth-form-container"}>
                        <GenderElements setGender={setGender} gender={gender} slideform1={slideform1} setSlideForm1={setSlideForm1} />
                    </div>
                    <div id="transition-2" style={{width:'100%'}} className={slideform1 ? "auth-form-container active" : "auth-form-container"}>
                        <div style={{width:'100%'}} className="form-settings-transition">
                        <div id="transition-1" style={{width:'100%'}} className={!slideform2 ? "auth-form-container active" : "auth-form-container"}>
                            <TagElements onSubmit={onSubmit} recommendationTags={recommendationTags} setRecommendationTags={setRecommendationTags} slideform1={slideform1} setSlideForm1={setSlideForm1} slideform2={slideform2} setSlideForm2={setSlideForm2}/>
                        </div>
                        <div id="transition-2" style={{width:'100%'}} className={slideform2 ? "auth-form-container active" : "auth-form-container"}>
                            <div style={{width:'100%'}} className="form-settings-transition">
                            <div id="transition-1" style={{width:'100%'}} className={!slideform3 ? "auth-form-container active" : "auth-form-container"}>
                                <StoreRecommendations slideform2={slideform2} setSlideForm2={setSlideForm2} slideform3={slideform3} setSlideForm3={setSlideForm3} />
                            </div>
                            <div id="transition-2" style={{width:'100%'}} className={slideform3 ? "auth-form-container active" : "auth-form-container"}>
                                <div style={{width:'100%'}} className="form-settings-transition">
                                <div id="transition-1" style={{width:'100%'}} className={!slideform4 ? "auth-form-container active" : "auth-form-container"}>
                                    <CollectionElements slideform3={slideform3} setSlideForm3={setSlideForm3} slideform4={slideform4} setSlideForm4={setSlideForm4} />
                                </div>
                                <div id="transition-2" style={{width:'100%'}} className={slideform4 ? "auth-form-container active" : "auth-form-container"}>
                                    <ExtraElements slideform4={slideform4} setSlideForm4={setSlideForm4} />
                                </div>
                                </div>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                    
                </div>
                {/* <h3 style={{marginTop:'0'}}>Your all set!</h3>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div style={{height:'30px', width:'30px', margin:'0 10px', background:'#ff4b2b', borderRadius:'50%'}}></div>
                    <p style={{margin:'5px 0', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>tunde262@gmail.com</p>
                </div>
                <p style={{margin:'20px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Add a few things to help us work better for you.</p>
    
                <div style={{display:'grid', marginTop:'2rem', gridTemplateColumns:'1fr 1fr'}}>
                    <div style={{height:'150px', color:'#0098d3', padding:'10px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', display:'grid', gridTemplateRows:'1fr 2fr', margin:'auto', borderRadius:'5px', width:'150px'}}>
                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                            <i class="fas fa-home"></i>
                        </div>
                        <p style={{margin:'10px 0'}}>Add a home address</p>
                    </div>
                    <div style={{height:'150px', color:'#0098d3', padding:'10px', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', display:'grid', gridTemplateRows:'1fr 2fr', margin:'auto', borderRadius:'5px', width:'150px'}}>
                        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                            <i class="fas fa-credit-card"></i>
                        </div>
                        <p style={{margin:'10px 0'}}>Add a payment method</p>
                    </div>
                </div>
                <button style={{width:'100%', outline:'none', margin:'36px 0 10px', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    Start Shopping
                </button> 
                <div style={{padding:'10px'}}> 
                    <p style={{margin:'0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always manage this information in your <span style={{color:'rgb(47, 183, 236)', fontSize:'1rem'}}>Account Settings</span>.</p>
                </div> */}

                
            </div>
        </main>

        // <main id="home" className="store-form-container">
        //     <div className="store-form" style={{width:'600px', overflowY:'scroll', padding:'0'}}>

        //         <div style={{height:'421px'}}>
        //             <h3 style={{marginTop:'36px'}}>You may also like...</h3>
        //             <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Follow collections to help you dicover intersting things</p>
        //             <HorizontalNav>
        //                 <div style={{minWidth:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
        //                     <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
        //                     </div>  
        //                     <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                                
        //                         <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
        //                         <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
        //                     </div>
        //                 </div>
        //                 <div style={{minWidth:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
        //                     <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
        //                     </div>  
        //                     <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                                
        //                         <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
        //                         <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
        //                     </div>
        //                 </div>
        //                 <div style={{minWidth:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
        //                     <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
        //                     </div>  
        //                     <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                                
        //                         <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
        //                         <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
        //                     </div>
        //                 </div>
        //                 <div style={{minWidth:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
        //                     <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
        //                     </div>  
        //                     <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                                
        //                         <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
        //                         <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
        //                     </div>
        //                 </div>
        //                 <div style={{minWidth:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
        //                     <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
        //                     </div>  
        //                     <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                                
        //                         <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
        //                         <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
        //                     </div>
        //                 </div>
        //                 <div style={{minWidth:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
        //                     <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
        //                     </div>  
        //                     <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                                
        //                         <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
        //                         <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
        //                     </div>
        //                 </div>
        //                 <div style={{minWidth:'200px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
        //                     <div style={{height:'200px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
        //                         <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
        //                     </div>  
        //                     <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                                
        //                         <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
        //                         <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
        //                     </div>
        //                 </div>
        //             </HorizontalNav>

        //         </div>
            
        //         <button style={{width:'100%', outline:'none', margin:'0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
        //             Continue
        //         </button> 
        //     </div>
        // </main>


        // <main id="home" className="store-form-container">
        //     <div className="store-form" style={{width:'600px', overflowY:'scroll', padding:'0'}}>

        //         <div style={{height:'457px', overflowY:'scroll'}}>
        //             <h3 style={{marginTop:'36px'}}>What's are you?</h3>
        //             <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>We'll use this info to personalize our selection</p>
        //             <div style={{display:'grid', marginTop:'2rem', gridTemplateColumns:'1fr 1fr'}}>
        //                 <div style={{height:'200px', color:'#0098d3', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', display:'flex', justifyContent:'center', alignItems:'center', margin:'auto', borderRadius:'5px', width:'200px'}}>
        //                     <h3>Male</h3>
        //                 </div>
        //                 <div style={{height:'200px', color:'#0098d3', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', display:'flex', justifyContent:'center', alignItems:'center', margin:'auto', borderRadius:'5px', width:'200px'}}>
        //                     <h3>Female</h3>
        //                 </div>
        //             </div>
        //             <div style={{padding:'10px'}}> 
        //                 <p style={{margin:'20px 0 10px', color:'#0098d3', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Prefer not to answer?</p>
        //                 <p style={{margin:'0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>You can always manage this information in your <span style={{color:'rgb(47, 183, 236)', fontSize:'1rem'}}>Account Settings</span>.</p>
        //             </div>

        //         </div>
                
        //         <button style={{width:'100%', outline:'none', margin:'0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
        //             Continue
        //         </button> 
        //     </div>
        // </main>


        // <main id="home" className="store-form-container">
        //     <div className="store-form" style={{width:'600px', height:'600px', overflowY:'scroll', padding:'0'}}>
        //         <h3 style={{marginTop:'36px'}}>Stores you may like</h3>
        //         <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Subscribe to stores you like for easy access</p>
        //         <div style={{height:'454px', borderTop:'1px solid rgb(214,214,214)', overflowY:'scroll'}}>
        //             <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
        //                 <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
        //                     <div style={{display: 'flex', alignItems: 'center'}}>
        //                         <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`} alt="img" />
        //                         <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
        //                             <p style={{margin:'0'}}>Iams</p>
        //                             <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
        //                         </div>
        //                     </div>
        //                     <button style={{margin:'0'}}>Checkout with store</button>
        //                 </div>
        //             </div>
        //             <ProductOverview products={product.products} shop={false} link={`/home`} />
        //             <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
        //                 <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
        //                     <div style={{display: 'flex', alignItems: 'center'}}>
        //                         <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`} alt="img" />
        //                         <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
        //                             <p style={{margin:'0'}}>Iams</p>
        //                             <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
        //                         </div>
        //                     </div>
        //                     <button style={{margin:'0'}}>Checkout with store</button>
        //                 </div>
        //             </div>
        //             <ProductOverview products={product.products} shop={false} link={`/home`} />
        //             <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
        //                 <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
        //                     <div style={{display: 'flex', alignItems: 'center'}}>
        //                         <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`} alt="img" />
        //                         <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
        //                             <p style={{margin:'0'}}>Iams</p>
        //                             <small style={{margin:'0', color:'#ff4b2b'}}><span style={{color:'#808080'}}>Total: </span> $15</small>
        //                         </div>
        //                     </div>
        //                     <button style={{margin:'0'}}>Checkout with store</button>
        //                 </div>
        //             </div>
        //             <ProductOverview products={product.products} shop={false} link={`/home`} />
        //         </div>

        //         <button style={{width:'100%', outline:'none', margin:'0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
        //             Continue
        //         </button> 
        //     </div>
        // </main>
        

        // <main id="home" className="store-form-container">
        //     <div className="store-form" style={{width:'600px', overflowY:'scroll', padding:'0'}}>

        //         <div style={{height:'457px', overflowY:'scroll'}}>
        //             <h3 style={{marginTop:'36px'}}>Click on what interests you</h3>
        //             <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>We'll use this info to recommend items to use</p>
        //             {categoryListContent}
        //         </div>

        //         <button style={{width:'100%', outline:'none', margin:'0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
        //             Continue
        //         </button> 
        //     </div>
        // </main>
    )
}

Personalize.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getStoresByTagList: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    getCollections: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    getCollectionsByTagList: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
});

export default connect(mapStateToProps, { createProfile, getStoresByTagList, getCollectionsByTagList, getProducts, getCollections })(Personalize);