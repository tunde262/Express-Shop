import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../../actions/productActions';
import { setNav1, setPage, setMainNav } from '../../actions/navActions';
import { logout } from '../../actions/authActions';

import mixpanel from 'mixpanel-browser';

import ProfileCircle from '../../components/common/ProfileCircle';

import Footer from '../../components/layout/Footer/Footer';
import Spinner from '../../components/common/Spinner';

import AuthModal from '../../components/modals/AuthModal';
import HomeMain from '../../components/page_components/Home/HomeMain';

// Categoty imports
import CategoryItem from '../../components/TableDetails/CategoryNav/Cat_Nav_Item';

import mainCategoryItems from '../../utils/categoryData/main';
import clothingFashionItems from '../../utils/categoryData/clothing_fashion/clothingFashion_main';
import shoeItems from '../../utils/categoryData/shoes/shoes_main';
import householdEssentialItems from '../../utils/categoryData/household_essentials/householdEss_main';
import personalCareItems from '../../utils/categoryData/personal_care/personalCare_main';
import petItems from '../../utils/categoryData/pets/pets_main';
import schoolOfficeItems from '../../utils/categoryData/school_office/schoolOffice_main';
import womenItems from '../../utils/categoryData/women/women_main';
import menItems from '../../utils/categoryData/men/men_main';
import bathroomItems from '../../utils/categoryData/bathroom/bathroom_main';
import laundryItems from '../../utils/categoryData/laundry/laundry_main';

const CategoryMenu = ({
    product, 
    auth: { 
        user, 
        isAuthenticated, 
        loading
    }, 
    setMainNav,
    setNav1, 
    setPage,
    logout,
    location,
    history
}) => {

    const [skip, setSkip] = useState(0);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('');

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [initPage, setInitPage] = useState(false);

    // Category State
    const [slideForm2, setSlideForm2] = useState(false);
    const [catValue, setCatValue] = useState(null);
    
    useEffect(() => {
        setMainNav('store');
        setPage('menu');
        
    }, []);

    const handleMixpanel = () => {
        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.identify(user._id);
        mixpanel.track("View Menu Page");
    }

    if(!sentMixpanel && user !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }
        
    return (
        <div className="scroll-container clear">
            <div className="store-settings-transition">
                {/** Transition 1 */}
                <div className={!slideForm2 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-1">
                    <Link className="link-decoration" to="/menu">
                        <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-start'}}>
                            <p style={{margin:'0', color:'#808080'}}><span style={{margin:'0 10px'}}><i className="fas fa-arrow-left"></i></span>Back to menu</p>
                        </div>
                    </Link>
                    {mainCategoryItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            slide
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    <div className="store-table-nav-items secondary" style={{width:'234px', margin:'5px 0', padding:'0'}}>
                        
                    </div>
                </div>
                <div className={slideForm2 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-2">
                    <div style={{marginBottom:'5px'}} onClick={() => setSlideForm2(!slideForm2)}>
                        <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-start'}}>
                            <p style={{margin:'0', color:'#808080'}}><span style={{margin:'0 10px'}}><i className="fas fa-arrow-left"></i></span>Back</p>
                        </div>
                    </div>
                    {catValue === 'clothing and fashion' && clothingFashionItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'shoes' && shoeItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'household essentials' && householdEssentialItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'personal care' && personalCareItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'pets' && petItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'school and office' && schoolOfficeItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'women' && womenItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'men' && menItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'bathroom' && bathroomItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    {catValue === 'laundry' && laundryItems.map(item => (
                        <CategoryItem 
                            fullWidth
                            item={item} 
                            setSlideForm2={setSlideForm2} 
                            slideForm2={slideForm2} 
                            setCatValue={setCatValue} 
                            catValue={catValue} 
                        />
                    ))}
                    <div className="store-table-nav-items secondary" style={{width:'234px', margin:'5px 0', padding:'0'}}>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

CategoryMenu.propTypes = {
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setMainNav: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth,
    nav: state.nav
});

export default connect(mapStateToProps, { 
    getCart, 
    setMainNav, 
    setNav1, 
    setPage,
    logout 
})(withRouter(CategoryMenu));
