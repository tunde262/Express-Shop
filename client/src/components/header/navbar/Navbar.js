import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoryProducts, setSortedProducts, removeTags, clearProducts } from '../../../actions/productActions';
import { setNav1, setNav2, setNav3, removeNav1, removeNav2, removeNav3 } from '../../../actions/navActions';

import { HorizontalNav } from '../../common/HorizontalNav';
import { NavItem } from './NavItem';

import mainList from '../../../utils/categoryData/main';
import mainClothingFashionList from '../../../utils/categoryData/clothing_fashion/clothingFashion_main';
import mainShoesList from '../../../utils/categoryData/shoes/shoes_main';
import mainHouseholdEssList from '../../../utils/categoryData/household_essentials/householdEss_main';
import mainPersonalCareList from '../../../utils/categoryData/personal_care/personalCare_main';
import mainPetsList from '../../../utils/categoryData/pets/pets_main';
import mainSchoolOfficeList from '../../../utils/categoryData/school_office/schoolOffice_main';
import mainWomenList from '../../../utils/categoryData/women/women_main';
import mainMenList from '../../../utils/categoryData/men/men_main';
import mainBathroomList from '../../../utils/categoryData/bathroom/bathroom_main';
import mainLaundryList from '../../../utils/categoryData/laundry/laundry_main';

import menClothingFashionList from '../../../utils/categoryData/clothing_fashion/men/men_clothingFashion';
import womenClothingFashionList from '../../../utils/categoryData/clothing_fashion/women/women_clothingFashion';
import clothingTopsList from '../../../utils/categoryData/clothing_fashion/tops/clothing_tops';
import clothingBottomsList from '../../../utils/categoryData/clothing_fashion/bottoms/clothing_bottoms';
import clothingHatsList from '../../../utils/categoryData/clothing_fashion/hats/clothing_hats';

import shoeActivityList from '../../../utils/categoryData/shoes/shoe_activity';
import shoeBrandList from '../../../utils/categoryData/shoes/shoe_brand';

import essentialPaperPlasticList from '../../../utils/categoryData/household_essentials/paper_plastic/ess_paperPlastic';
import essentialCleaningSuppliesList from '../../../utils/categoryData/household_essentials/cleaning_supplies/ess_cleaningSupplies';
import essentialLaundryCareList from '../../../utils/categoryData/household_essentials/laundry/ess_laundryCare';
import essentialKitchenList from '../../../utils/categoryData/household_essentials/kitchen/ess_kitchen';
import essentialBathroomList from '../../../utils/categoryData/household_essentials/bathroom/ess_bathroom';
import essentialPartySuppliesList from '../../../utils/categoryData/household_essentials/party_supplies/ess_partySupplies';

import personalSkinCareList from '../../../utils/categoryData/personal_care/skin_care/personal_skinCare';
import personalBathBodyList from '../../../utils/categoryData/personal_care/bath_body/personal_bathBody';
import personalOralCareList from '../../../utils/categoryData/personal_care/oral_care/personal_oralCare';
import personalHealthWellnessList from '../../../utils/categoryData/personal_care/health_wellness/personal_healthWellness';
import personalToolsAccessoriesList from '../../../utils/categoryData/personal_care/tools_accessories/personal_toolsAcc';

import petsDogList from '../../../utils/categoryData/pets/dogs/pet_dogs';
import petsCatList from '../../../utils/categoryData/pets/cats/pet_cats';

import officeWritingDrawingList from '../../../utils/categoryData/school_office/writing_drawing/office_writingDrawing';
import officePaperOrgsList from '../../../utils/categoryData/school_office/paperProd_orgs/office_paperOrgs';

import womensClothingList from '../../../utils/categoryData/women/clothing/women_clothing';
import womensShoesList from '../../../utils/categoryData/women/shoes/women_shoes';
import womensSkinCareList from '../../../utils/categoryData/women/skin_care/women_skinCare';
import womensBathBodyList from '../../../utils/categoryData/women/bath_body/women_bathBody';
import womensHealthWellnessList from '../../../utils/categoryData/women/health_wellness/women_healthWellness';

import menClothingList from '../../../utils/categoryData/men/clothing/men_clothing';
import menShoesList from '../../../utils/categoryData/men/shoes/men_shoes';
import menSkinCareList from '../../../utils/categoryData/men/skin_care/men_skinCare';
import menBathBodyList from '../../../utils/categoryData/men/bath_body/men_bathBody';
import menHealthWellnessList from '../../../utils/categoryData/men/health_wellness/men_healthWellness';

const Navbar = ({
    product, 
    nav, 
    getCategoryProducts, 
    setSortedProducts, 
    removeTags,
    setNav1, 
    setNav2, 
    setNav3, 
    removeNav1, 
    removeNav2, 
    removeNav3,
    clearProducts
}) => {
    let navList1;
    let navList2;
    let navList3 = null;

    const onFilterClick = async (filter) => { 
        // ReactGA.event({
        //     category: 'Filter',
        //     action: 'Category-Overview',
        //     label: filter
        // });
          
        // if (product.tags.includes(filter)) {
        //     await removeTags(filter);
        //     unFilterProducts();
        // } else {
        //     await getCategoryProducts(filter);
        //     filterProducts();
        // }

        getCategoryProducts(filter);
    }

    const filterProducts = () => {
        let tempProd = [...product.sortedProducts];
        const tags = [...product.tags];
        let res;
        let sortProd = [];
        for(var i = 0; i < tags.length; i++) {
            res = tempProd.filter(prod => prod.tags.includes(tags[i]));
        }
        setSortedProducts(res);
    }

    const unFilterProducts = () => {
        if (product.tags.length > 0) {
            let tempProd = [...product.products];
            const tags = [...product.tags];
            let res;
            let sortProd = [];
            for(var i = 0; i < tags.length; i++) {
                res = tempProd.filter(prod => prod.tags.includes(tags[i]));
            }
            setSortedProducts(res);
        } else {
            setSortedProducts(product.products);
        }
        // let res = [];
        // tempProd.map(product => tags.map(tag => product.tags.includes(tag) ? res.push(product) : null));
        // res = [...new Set(res)]
        // console.log(res);
    }

    const handleNavClick1 = async (filter) => {
        setNav1(filter);
        clearProducts();
        const tags = [...product.tags];

        for(var i = 0; i < tags.length; i++) {
            await removeTags(tags[i]);
        }
        unFilterProducts();

        // onFilterClick(filter);    
    }

    const handleNavClick2 = async (filter) => {
        setNav2(filter);
        clearProducts();
        const tags = [...product.tags];

        if(tags.length > 1) {
            await removeTags(tags[1]);
            
            if(tags.length > 2) {
                await removeTags(tags[2]);
            }

            unFilterProducts();
        } 

        // onFilterClick(filter);
    }

    const handleNavClick3 = async (filter) => {
        setNav3(filter);
        clearProducts();
        const tags = [...product.tags];

        if(tags.length > 2) {
            await removeTags(tags[2]);
            unFilterProducts();
        }

        // onFilterClick(filter);
    }

    if(nav.nav1 !== '') {
        navList1 = mainList;
    } else {
        navList1 = null;
    };

    if(nav.nav1 !== '') {
        if(nav.nav1 === 'explore') {
            navList2 =  null
        } else if(nav.nav1 === 'clothing and fashion') {
            navList2 = mainClothingFashionList;
        } else if(nav.nav1 === 'shoes') {
            navList2 =  mainShoesList;
        } else if(nav.nav1 === 'household essentials') {
            navList2 = mainHouseholdEssList;
        } else if(nav.nav1 === 'personal care') {
            navList2 = mainPersonalCareList; 
        } else if(nav.nav1 === 'pets') {
            navList2 = mainPetsList;
        } else if(nav.nav1 === 'school and office supplies') {
            navList2 = mainSchoolOfficeList;
        } else if(nav.nav1 === 'women') {
            navList2 = mainWomenList;
        } else if(nav.nav1 === 'men') {
            navList2 = mainMenList;
        } else if(nav.nav1 === 'bathroom') {
            navList2 = mainBathroomList; 
        } else if(nav.nav1 === 'laundry') {
            navList2 = mainLaundryList; //, "collections", "inventory", "storage locations"
        } else {
            navList2 = null
        }
    } else {
        navList2 =  null
    }

    if(nav.nav2 !== '') {
        if(nav.nav2 === 'mens clothing and fashion') {
            navList3 =  menClothingFashionList;
        } else if (nav.nav2 === 'womens clothing and fashion') {
            navList3 = womenClothingFashionList;
        } else if (nav.nav2 === 'tops') {
            navList3 = clothingTopsList;
        } else if (nav.nav2 === 'bottoms') {
            navList3 = clothingBottomsList;
        } else if (nav.nav2 === 'hats') {
            navList3 = clothingHatsList;
        }
        // } else if (nav.nav2 === 'activity') {
        //     navList3 = shoeActivityList;
        // } else if (nav.nav2 === 'brand') {
        //     navList3 = shoeBrandList;
        // } 
        else if (nav.nav2 === 'formal shoes') {
            navList3 =  null;
        } else if (nav.nav2 === 'boat shoes') {
            navList3 =  null;
        } else if (nav.nav2 === 'flip flops and slides') {
            navList3 =  null;
        } else if (nav.nav2 === 'paper and plastic') {
            navList3 = essentialPaperPlasticList;
        } else if (nav.nav2 === 'cleaning supplies') {
            navList3 = essentialCleaningSuppliesList;
        } else if (nav.nav2 === 'laundry care') {
            navList3 = essentialLaundryCareList;
        } else if (nav.nav2 === 'kitchen') {
            navList3 = essentialKitchenList;
        } else if (nav.nav2 === 'bathroom essentials') {
            navList3 = essentialBathroomList;
        } else if (nav.nav2 === 'party supplies') {
            navList3 = essentialPartySuppliesList;
        } else if (nav.nav2 === 'air fresheners') {
            navList3 = null;
        } else if (nav.nav2 === 'hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'skin care') {
            navList3 =  personalSkinCareList;
        } else if (nav.nav2 === 'bath and body') {
            navList3 = personalBathBodyList;
        } else if (nav.nav2 === 'oral care') {
            navList3 = personalOralCareList;
        } else if (nav.nav2 === 'womens makeup') {
            navList3 = null;
        } else if (nav.nav2 === 'health and wellness') {
            navList3 = personalHealthWellnessList;
        } else if (nav.nav2 === 'personal care tools and accessories') {
            navList3 = personalToolsAccessoriesList;
        } else if (nav.nav2 === 'dogs') {
            navList3 = petsDogList;
        } else if (nav.nav2 === 'cats') {
            navList3 = petsCatList;
        } else if (nav.nav2 === 'writing and drawing') {
            navList3 = officeWritingDrawingList;
        } else if (nav.nav2 === 'paper products and organizers') {
            navList3 = officePaperOrgsList;
        } else if (nav.nav2 === 'womens clothing') {
            navList3 = womensClothingList;
        } else if (nav.nav2 === 'womens shoes') {
            navList3 = womensShoesList;
        } else if (nav.nav2 === 'womens hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'womens skin care') {
            navList3 = womensSkinCareList;
        } else if (nav.nav2 === 'womens makeup') {
            navList3 = null;
        } else if (nav.nav2 === 'womens bath and body') {
            navList3 = womensBathBodyList;
        } else if (nav.nav2 === 'womens health and wellness') {
            navList3 = womensHealthWellnessList;
        } else if (nav.nav2 === 'mens clothing') {
            navList3 = menClothingList;
        } else if (nav.nav2 === 'mens shoes') {
            navList3 = menShoesList;
        } else if (nav.nav2 === 'mens hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'mens skin care') {
            navList3 = menSkinCareList;
        } else if (nav.nav2 === 'shaving') {
            navList3 = null;
        } else if (nav.nav2 === 'mens bath and body') {
            navList3 = menBathBodyList;
        } else if (nav.nav2 === 'mens health and wellness') {
            navList3 = menHealthWellnessList;
        } else if (nav.nav2 === 'toilet paper') {
            navList3 = null;
        } else if (nav.nav2 === 'flushable wipes') {
            navList3 = null;
        } else if (nav.nav2 === 'bathroom cleaners') {
            navList3 = null;
        } else if (nav.nav2 === 'bathroom tools and accessories') {
            navList3 = null;
        } else if (nav.nav2 === 'laundry detergents') {
            navList3 = null;
        } else if (nav.nav2 === 'fabric refreshers') {
            navList3 = null;
        } else if (nav.nav2 === 'laundry tools and accessories') {
            navList3 = null;
        } else {
            navList3 = null;
        }
    }

    let navList = null;
    let secondNavList = null;
    let thirdNavList = null;

    if(navList1 !== null) {
        navList = navList1.map((nav_item, index) => (
            <a style={{outline:'none'}} href={`https://www.cardboardexpress.com/category?filter=${nav_item.tag_value}`}>
                <NavItem 
                    key={index} 
                    background={nav.nav1 === nav_item.tag_value ? nav_item.background_color : "#fff"}
                    hover={nav_item.background_color}
                    color={nav.nav1 === nav_item.tag_value ? "#fff" : "#333"}
                    border={nav.nav1 === nav_item.tag_value ? "#fff" : "#dfe1e5"}
                    onClick={() => handleNavClick1(nav_item.tag_value)}
                >
                    {nav_item.img && (
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            src={nav_item.img}
                        />
                    )}
                    {/* <i className={nav_item.icon}></i> */}
                    {' '}{nav_item.text_value}
                </NavItem>
            </a>
        ));
    };

    if(navList2 !== null) {
        secondNavList = navList2.map((nav_item, index) => (
            <a style={{outline:'none'}} href={`https://www.cardboardexpress.com/category?filter=${nav_item.tag_value}`}>
                <NavItem 
                    key={index} 
                    background={nav.nav2 === nav_item.tag_value ? nav_item.background_color : "#fff"}
                    hover={nav_item.background_color}
                    color={nav.nav2 === nav_item.tag_value ? "#fff" : "#333"}
                    border={nav.nav2 === nav_item.tag_value ? "#fff" : "#dfe1e5"}
                    onClick={() => handleNavClick2(nav_item.tag_value)}
                >
                    {nav_item.img && (
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            src={nav_item.img}
                        />
                    )}
                    {' '}{nav_item.text_value}
                </NavItem>
            </a>
        ));
    };

    if(navList3 !== null) {
        thirdNavList = navList3.map((nav_item, index) => (
            <a style={{outline:'none'}} href={`https://www.cardboardexpress.com/category?filter=${nav_item.tag_value}`}>
                <NavItem 
                    key={index} 
                    background={nav.nav3 === nav_item.tag_value ? nav_item.background_color : "#fff"}
                    hover={nav_item.background_color}
                    color={nav.nav3 === nav_item.tag_value ? "#fff" : "#333"}
                    border={nav.nav3 === nav_item.tag_value ? "#fff" : "#dfe1e5"}
                    onClick={() => handleNavClick3(nav_item.tag_value)}
                >
                    {nav_item.img && (
                        <img 
                            alt="" 
                            width="50" 
                            height="50" 
                            src={nav_item.img}
                        />
                    )}
                    <i className={nav_item.icon}></i>
                    {' '}{nav_item.text_value}
                </NavItem>
            </a>
        ));
    };
    
    return (
        <Fragment>
            {nav.nav1 === '' ||  nav.nav1 === 'explore' ? (
                <HorizontalNav nowrap="nowrap">
                    {navList}
                </HorizontalNav>
            ) : null}
            {nav.nav1 !== '' && nav.nav1 !== 'explore' && nav.nav2 === '' ? (
                <HorizontalNav nowrap="nowrap">
                    {secondNavList}
                </HorizontalNav>
            ) : null}
            {nav.nav2 !== '' && (
                <HorizontalNav nowrap="nowrap">
                    {thirdNavList}
                </HorizontalNav>
            )}
        </Fragment>
    );
}

Navbar.propTypes = {
    getCategoryProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    setSortedProducts: PropTypes.func.isRequired,
    removeTags: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setNav2: PropTypes.func.isRequired,
    setNav3: PropTypes.func.isRequired,
    removeNav1: PropTypes.func.isRequired,
    removeNav2: PropTypes.func.isRequired,
    removeNav3: PropTypes.func.isRequired,
    clearProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    nav: state.nav
});

export default connect(mapStateToProps, { getCategoryProducts, setSortedProducts, removeTags, clearProducts, setNav1, setNav2, setNav3, removeNav1, removeNav2, removeNav3 })(Navbar);