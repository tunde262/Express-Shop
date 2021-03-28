import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CategoryItem from './Cat_Nav_Item';

import mainCategoryItems from '../../../utils/categoryData/main';
import clothingFashionItems from '../../../utils/categoryData/clothing_fashion/clothingFashion_main';
import shoeItems from '../../../utils/categoryData/shoes/shoes_main';
import householdEssentialItems from '../../../utils/categoryData/household_essentials/householdEss_main';
import personalCareItems from '../../../utils/categoryData/personal_care/personalCare_main';
import petItems from '../../../utils/categoryData/pets/pets_main';
import schoolOfficeItems from '../../../utils/categoryData/school_office/schoolOffice_main';
import womenItems from '../../../utils/categoryData/women/women_main';
import menItems from '../../../utils/categoryData/men/men_main';
import bathroomItems from '../../../utils/categoryData/bathroom/bathroom_main';
import laundryItems from '../../../utils/categoryData/laundry/laundry_main';


const Main_Store_Nav = ({slideForm1, setSlideForm1}) => {

    const [slideForm2, setSlideForm2] = useState(false);
    const [catValue, setCatValue] = useState(null);

    return (
        <div className="store-settings-transition">
            {/** Transition 1 */}
            <div className={!slideForm2 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-1">
                <div style={{cursor:'pointer'}} onClick={() => setSlideForm1(!slideForm1)}>
                    <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-start'}}>
                        <p style={{margin:'0', color:'#808080'}}><span style={{margin:'0 10px'}}><i className="fas fa-arrow-left"></i></span>Back to menu</p>
                    </div>
                </div>
                {mainCategoryItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        slide
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                <div className="store-table-nav-items secondary" style={{width:'234px', margin:'5px 0', padding:'0'}}>
                    
                </div>
            </div>
            {/** Transition 2 */}
            <div className={slideForm2 ? "store-side-nav-container active" : "store-side-nav-container"} id="transition-2">
                <div style={{marginBottom:'5px'}} onClick={() => setSlideForm2(!slideForm2)}>
                    <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'flex-start'}}>
                        <p style={{margin:'0', color:'#808080'}}><span style={{margin:'0 10px'}}><i className="fas fa-arrow-left"></i></span>Back</p>
                    </div>
                </div>
                {catValue === 'clothing and fashion' && clothingFashionItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'shoes' && shoeItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'household essentials' && householdEssentialItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'personal care' && personalCareItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'pets' && petItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'school and office' && schoolOfficeItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'women' && womenItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'men' && menItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'bathroom' && bathroomItems.map(item => (
                    <CategoryItem 
                        item={item} 
                        setSlideForm2={setSlideForm2} 
                        slideForm2={slideForm2} 
                        setCatValue={setCatValue} 
                        catValue={catValue} 
                    />
                ))}
                {catValue === 'laundry' && laundryItems.map(item => (
                    <CategoryItem 
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
    )
}

Main_Store_Nav.propTypes = {

}

export default Main_Store_Nav
