import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';           

import Spinner from '../../../common/Spinner';
import CategoryList from './List_Categories';

import mixpanel from 'mixpanel-browser';

import clothingFashionMain from '../../../../utils/categoryData/clothing_fashion/clothingFashion_main';


import shoesMain from '../../../../utils/categoryData/shoes/shoes_main';
import householdEssentialsMain from '../../../../utils/categoryData/household_essentials/householdEss_main';
import personalCareMain from '../../../../utils/categoryData/personal_care/personalCare_main';
import petsMain from '../../../../utils/categoryData/pets/pets_main';
import schoolOfficeMain from '../../../../utils/categoryData/school_office/schoolOffice_main';
import menMain from '../../../../utils/categoryData/men/men_main';
import bathroomMain from '../../../../utils/categoryData/bathroom/bathroom_main';
import essLaundryCare from '../../../../utils/categoryData/household_essentials/laundry/ess_laundryCare';
import mensClothingFashion from '../../../../utils/categoryData/men/clothing/men_clothing';
import womensClothingFashion from '../../../../utils/categoryData/women/clothing/women_clothing';
import clothingTops from '../../../../utils/categoryData/clothing_fashion/tops/clothing_tops';
import clothingBottoms from '../../../../utils/categoryData/clothing_fashion/bottoms/clothing_bottoms';
import clothingHats from '../../../../utils/categoryData/clothing_fashion/hats/clothing_hats';
import essPaperPlastic from '../../../../utils/categoryData/household_essentials/paper_plastic/ess_paperPlastic';
import essCleaningSupplies from '../../../../utils/categoryData/household_essentials/cleaning_supplies/ess_cleaningSupplies';
import essKitchen from '../../../../utils/categoryData/household_essentials/kitchen/ess_kitchen';
import bathroomEssentials from '../../../../utils/categoryData/household_essentials/bathroom/ess_bathroom';
import essPartySupplies from '../../../../utils/categoryData/household_essentials/party_supplies/ess_partySupplies';
import personalSkinCare from '../../../../utils/categoryData/personal_care/skin_care/personal_skinCare';
import personalBathBody from '../../../../utils/categoryData/personal_care/bath_body/personal_bathBody';
import personalOralCare from '../../../../utils/categoryData/personal_care/oral_care/personal_oralCare';
import personalHealthWellness from '../../../../utils/categoryData/personal_care/health_wellness/personal_healthWellness';
import personalCareToolsAcc from '../../../../utils/categoryData/personal_care/tools_accessories/personal_toolsAcc';
import petDogs from '../../../../utils/categoryData/pets/dogs/pet_dogs';
import petCats from '../../../../utils/categoryData/pets/cats/pet_cats';
import officeWritingDrawing from '../../../../utils/categoryData/school_office/writing_drawing/office_writingDrawing';
import womensClothing from '../../../../utils/categoryData/women/clothing/women_clothing';
import womensShoes from '../../../../utils/categoryData/women/shoes/women_shoes';
import womensSkinCare from '../../../../utils/categoryData/women/skin_care/women_skinCare';
import womensBathBody from '../../../../utils/categoryData/women/bath_body/women_bathBody';
import womensHealthWellness from '../../../../utils/categoryData/women/health_wellness/women_healthWellness';
import mensClothing from '../../../../utils/categoryData/men/clothing/men_clothing';
import mensShoes from '../../../../utils/categoryData/men/shoes/men_shoes';
import mensSkinCare from '../../../../utils/categoryData/men/skin_care/men_skinCare';
import mensBathBody from '../../../../utils/categoryData/men/bath_body/men_bathBody';
import mensHealthWellness from '../../../../utils/categoryData/men/health_wellness/men_healthWellness';
import householdEss_main from '../../../../utils/categoryData/household_essentials/householdEss_main';
import laundry_main from '../../../../utils/categoryData/laundry/laundry_main';
import personal_toolsAcc from '../../../../utils/categoryData/personal_care/tools_accessories/personal_toolsAcc';
import women_main from '../../../../utils/categoryData/women/women_main';
import ess_bathroom from '../../../../utils/categoryData/household_essentials/bathroom/ess_bathroom';
import office_paperOrgs from '../../../../utils/categoryData/school_office/paperProd_orgs/office_paperOrgs';


const RelatedCategories = ({ filter, product }) => {


    let relatedList;

    if(filter === 'clothing and fashion') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />;
    } else if (filter === 'shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'household essentials') {
        relatedList = <CategoryList product={product} listData={householdEss_main} />
    } else if (filter === 'personal care') {
        relatedList = <CategoryList product={product} listData={personalCareMain} />
    } else if (filter === 'pets') {
        relatedList = <CategoryList product={product} listData={petsMain} />
    } else if (filter === 'school and office supplies') {
        relatedList = <CategoryList product={product} listData={schoolOfficeMain} />
    } else if (filter === 'men') {
        relatedList = <CategoryList product={product} listData={menMain} />
    } else if (filter === 'bathroom') {
        relatedList = <CategoryList product={product} listData={bathroomMain} />
    } else if (filter === 'laundry') {
        relatedList = <CategoryList product={product} listData={laundry_main} />
    } else if (filter === 'mens clothing and fashion') {
        relatedList = <CategoryList product={product} listData={mensClothingFashion} />
    } else if (filter === 'womens clothing and fashion') {
        relatedList = <CategoryList product={product} listData={womensClothingFashion} />
    } else if (filter === 'tops') {
        relatedList = <CategoryList product={product} listData={clothingTops} />
    } else if (filter === 'bottoms') {
        relatedList = <CategoryList product={product} listData={clothingBottoms} />
    } else if (filter === 'hats') {
        relatedList = <CategoryList product={product} listData={clothingHats} />
    } else if (filter === 'flip flops and sandals') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'basketball shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'boat shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'formal shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'lazy shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'running shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'walking shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'football shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'soccer shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'volleyball shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'training and gym shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'skateboarding shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'baseball shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'golf shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'tennis shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'track and field shoes') {
        relatedList = <CategoryList product={product} listData={shoesMain} />
    } else if (filter === 'paper and plastic') {
        relatedList = <CategoryList product={product} listData={essPaperPlastic} />
    } else if (filter === 'cleaning supplies') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'laundry care') {
        relatedList = <CategoryList product={product} listData={essLaundryCare} />
    } else if (filter === 'kitchen') {
        relatedList = <CategoryList product={product} listData={essKitchen} />
    } else if (filter === 'bathroom essentials') {
        relatedList = <CategoryList product={product} listData={bathroomEssentials} />
    } else if (filter === 'party supplies') {
        relatedList = <CategoryList product={product} listData={essPartySupplies} />
    } else if (filter === 'air fresheners') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'hair care') {
        relatedList = <CategoryList product={product} listData={personalCareMain} />
    } else if (filter === 'skin care') {
        relatedList = <CategoryList product={product} listData={personalSkinCare} />
    } else if (filter === 'bath and body') {
        relatedList = <CategoryList product={product} listData={personalBathBody} />
    } else if (filter === 'oral care') {
        relatedList = <CategoryList product={product} listData={personalOralCare} />
    } else if (filter === 'health and wellness') {
        relatedList = <CategoryList product={product} listData={personalHealthWellness} />
    } else if (filter === 'personal care tools and accessories') {
        relatedList = <CategoryList product={product} listData={personal_toolsAcc} />
    } else if (filter === 'dogs') {
        relatedList = <CategoryList product={product} listData={petDogs} />
    } else if (filter === 'cats') {
        relatedList = <CategoryList product={product} listData={petCats} />
    } else if (filter === 'writing and drawing') {
        relatedList = <CategoryList product={product} listData={officeWritingDrawing} />
    } else if (filter === 'school and office tools and accessories') {
        relatedList = <CategoryList product={product} listData={schoolOfficeMain} />
    } else if (filter === 'womens clothing') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens hair care') {
        relatedList = <CategoryList product={product} listData={personalCareMain} />
    } else if (filter === 'womens skin care') {
        relatedList = <CategoryList product={product} listData={womensSkinCare} />
    } else if (filter === 'womens makeup') {
        relatedList = <CategoryList product={product} listData={personalCareMain} />
    } else if (filter === 'womens bath and body') {
        relatedList = <CategoryList product={product} listData={womensBathBody} />
    } else if (filter === 'womens health and wellness') {
        relatedList = <CategoryList product={product} listData={womensHealthWellness} />
    } else if (filter === 'mens clothing') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens hair care') {
        relatedList = <CategoryList product={product} listData={personalCareMain} />
    } else if (filter === 'mens skin care') {
        relatedList = <CategoryList product={product} listData={mensSkinCare} />
    } else if (filter === 'mens shaving') {
        relatedList = <CategoryList product={product} listData={mensBathBody} />
    } else if (filter === 'mens bath and body') {
        relatedList = <CategoryList product={product} listData={mensBathBody} />
    } else if (filter === 'mens health and wellness') {
        relatedList = <CategoryList product={product} listData={mensHealthWellness} />
    } else if (filter === 'toilet paper') {
        relatedList = <CategoryList product={product} listData={essPaperPlastic} />
    } else if (filter === 'flushable wipes') {
        relatedList = <CategoryList product={product} listData={essPaperPlastic} />
    } else if (filter === 'bathroom cleaners') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'bathroom tools and accessories') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'mens shaving') {
        relatedList = <CategoryList product={product} listData={ess_bathroom} />
    } else if (filter === 'laundry detergents') {
        relatedList = <CategoryList product={product} listData={laundry_main} />
    } else if (filter === 'fabric refreshers') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'laundry tools and accessories') {
        relatedList = <CategoryList product={product} listData={laundry_main} />
    } else if (filter === 'mens fashion sweatshirts and hoodies') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion graphic tees') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion long sleeves') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion short sleeves') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion joggers and sweatpants') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion shorts') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion dress shirts') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion activewear') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion sweaters and cardigans') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion button down shirts') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion jackets and coats') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion socks') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens fashion swimsuits') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens clothing and fashion accessories') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'womens fashion tops') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'dresses') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion bottoms') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion swimwear') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion rompers and jumpsuits') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion activewear') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion graphic tees') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion jackets and coats') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion sweaters and cardigans') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens fashion socks') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens clothing and fashion accessories') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'graphic tees') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'sweatshirts and hoodies') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'long sleeves') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'short sleeves') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'tank tops') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'joggers and sweatpants') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'shorts') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'skirts') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'underwear') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'dad caps') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'snapback hats') {
        relatedList = <CategoryList product={product} listData={clothingFashionMain} />
    } else if (filter === 'paper towels') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'toilet paper') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'plastic trash bags') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'plastic and food storage bags') {
        relatedList = <CategoryList product={product} listData={essKitchen} />
    } else if (filter === 'aluminum foil') {
        relatedList = <CategoryList product={product} listData={essKitchen} />
    } else if (filter === 'plastic wraps') {
        relatedList = <CategoryList product={product} listData={essKitchen} />
    } else if (filter === 'disposable tablewear') {
        relatedList = <CategoryList product={product} listData={essKitchen} />
    } else if (filter === 'cleaning wipes') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'cleaning tools and accessories') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'bathroom cleaners') {
        relatedList = <CategoryList product={product} listData={bathroomMain} />
    } else if (filter === 'trash bags') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'disinfecting sprays') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'laundry detergents') {
        relatedList = <CategoryList product={product} listData={laundry_main} />
    } else if (filter === 'fabric refreshers') {
        relatedList = <CategoryList product={product} listData={laundry_main} />
    } else if (filter === 'dish detergents') {
        relatedList = <CategoryList product={product} listData={essKitchen} />
    } else if (filter === 'cleaning supplies') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'flushable wipes') {
        relatedList = <CategoryList product={product} listData={essCleaningSupplies} />
    } else if (filter === 'bathroom toilet paper') {
        relatedList = <CategoryList product={product} listData={bathroomMain} />
    } else if (filter === 'bathroom cleaners') {
        relatedList = <CategoryList product={product} listData={bathroomMain} />
    } else if (filter === 'disposable party tablewear') {
        relatedList = <CategoryList product={product} listData={essKitchen} />
    } else if (filter === 'facial cleansers') {
        relatedList = <CategoryList product={product} listData={personalSkinCare} />
    } else if (filter === 'facial moisturizers') {
        relatedList = <CategoryList product={product} listData={personalSkinCare} />
    } else if (filter === 'deodorants and antiperspirants') {
        relatedList = <CategoryList product={product} listData={personalBathBody} />
    } else if (filter === 'body wash and shower gels') {
        relatedList = <CategoryList product={product} listData={personalBathBody} />
    } else if (filter === 'toothpaste') {
        relatedList = <CategoryList product={product} listData={personalOralCare} />
    } else if (filter === 'mouthwash') {
        relatedList = <CategoryList product={product} listData={personalOralCare} />
    } else if (filter === 'floss') {
        relatedList = <CategoryList product={product} listData={personalOralCare} />
    } else if (filter === 'facial tissues') {
        relatedList = <CategoryList product={product} listData={personalOralCare} />
    } else if (filter === 'cotton swabs') {
        relatedList = <CategoryList product={product} listData={personal_toolsAcc} />
    } else if (filter === 'cotton balls') {
        relatedList = <CategoryList product={product} listData={personal_toolsAcc} />
    } else if (filter === 'makeup brushes') {
        relatedList = <CategoryList product={product} listData={personal_toolsAcc} />
    } else if (filter === 'dog food') {
        relatedList = <CategoryList product={product} listData={petDogs} />
    } else if (filter === 'dog snacks') {
        relatedList = <CategoryList product={product} listData={petDogs} />
    } else if (filter === 'dog toys') {
        relatedList = <CategoryList product={product} listData={petDogs} />
    } else if (filter === 'dog supplies and accessories') {
        relatedList = <CategoryList product={product} listData={petDogs} />
    } else if (filter === 'cat food') {
        relatedList = <CategoryList product={product} listData={petCats} />
    } else if (filter === 'cat snacks') {
        relatedList = <CategoryList product={product} listData={petCats} />
    } else if (filter === 'cat litter and accessories') {
        relatedList = <CategoryList product={product} listData={petCats} />
    } else if (filter === 'cat supplies') {
        relatedList = <CategoryList product={product} listData={petCats} />
    } else if (filter === 'pens') {
        relatedList = <CategoryList product={product} listData={officeWritingDrawing} />
    } else if (filter === 'pencils') {
        relatedList = <CategoryList product={product} listData={officeWritingDrawing} />
    } else if (filter === 'highlighters and markers') {
        relatedList = <CategoryList product={product} listData={officeWritingDrawing} />
    } else if (filter === 'writing tools and accessories') {
        relatedList = <CategoryList product={product} listData={officeWritingDrawing} />
    } else if (filter === 'binders') {
        relatedList = <CategoryList product={product} listData={office_paperOrgs} />
    } else if (filter === 'notebooks') {
        relatedList = <CategoryList product={product} listData={office_paperOrgs} />
    } else if (filter === 'paper') {
        relatedList = <CategoryList product={product} listData={office_paperOrgs} />
    } else if (filter === 'folders') {
        relatedList = <CategoryList product={product} listData={office_paperOrgs} />
    } else if (filter === 'paper products tools and accessories') {
        relatedList = <CategoryList product={product} listData={office_paperOrgs} />
    } else if (filter === 'womens tops') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens bottoms') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens swimwear') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'rompers and jumpsuits') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens activewear') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens graphic tees') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens jackets and coats') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens sweaters and cardigans') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens socks') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens activewear') {
        relatedList = <CategoryList product={product} listData={womensClothing} />
    } else if (filter === 'womens flip flops and slides') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens lifestyle shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens walking shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens boat shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens formal shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens basketball shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens running shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens soccer shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens volleyball shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens training and gym shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens skateboarding shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens softball shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens golf shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens tennis shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens track and field shoes') {
        relatedList = <CategoryList product={product} listData={womensShoes} />
    } else if (filter === 'womens body lotions and creams') {
        relatedList = <CategoryList product={product} listData={womensBathBody} />
    } else if (filter === 'womens facial cleansers') {
        relatedList = <CategoryList product={product} listData={womensSkinCare} />
    } else if (filter === 'womens facial moisturizers') {
        relatedList = <CategoryList product={product} listData={womensSkinCare} />
    } else if (filter === 'womens deodorants and antiperspirants') {
        relatedList = <CategoryList product={product} listData={womensBathBody} />
    } else if (filter === 'womens body wash and shower gels') {
        relatedList = <CategoryList product={product} listData={womensBathBody} />
    } else if (filter === 'tampons') {
        relatedList = <CategoryList product={product} listData={womensHealthWellness} />
    } else if (filter === 'womens facial tissues') {
        relatedList = <CategoryList product={product} listData={womensSkinCare} />
    } else if (filter === 'mens sweatshirts and hoodies') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens graphic tees') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens long sleeves') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens short sleeves') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens joggers and sweatpants') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens shorts') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens activewear') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens sweaters and cardigans') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens button down shirts') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens jackets and coats') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens socks') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens swimsuits') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens clothing accessories') {
        relatedList = <CategoryList product={product} listData={mensClothing} />
    } else if (filter === 'mens flip flops and slides') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens boat shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens basketball shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens running shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens soccer shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens walking shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens formal shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens training and gym shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens skateboarding shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens football shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens baseball shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens golf shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens tennis shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens track and field shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens lazy shoes') {
        relatedList = <CategoryList product={product} listData={mensShoes} />
    } else if (filter === 'mens body lotions and creams') {
        relatedList = <CategoryList product={product} listData={mensBathBody} />
    } else if (filter === 'mens facial cleansers') {
        relatedList = <CategoryList product={product} listData={mensSkinCare} />
    } else if (filter === 'mens facial moisturizers') {
        relatedList = <CategoryList product={product} listData={mensSkinCare} />
    } else if (filter === 'mens deodorants and antiperspirants') {
        relatedList = <CategoryList product={product} listData={mensBathBody} />
    } else if (filter === 'mens body wash and shower gel') {
        relatedList = <CategoryList product={product} listData={mensBathBody} />
    } else if (filter === 'condoms') {
        relatedList = <CategoryList product={product} listData={mensHealthWellness} />
    } else if (filter === 'mens facial tissues') {
        relatedList = <CategoryList product={product} listData={mensSkinCare} />
    } else {
        relatedList = (
            <div className="no-rides">
                <h1>Nothing Found</h1>
                <h2>
                    Sorry something went wrong.{' '} 
                    <a href="/explore">Explore Products</a>
                </h2> 
            </div>
        )
    }


    return (
        <div className="product-list-container" style={{marginTop:'-0px', borderTop:'none'}}>
            {relatedList}
        </div>
    )
}

RelatedCategories.propTypes = {
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product
})

export default connect(mapStateToProps, null)(RelatedCategories);