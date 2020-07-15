import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleTags, setSortedProducts, removeTags } from '../../../actions/productActions';
import { setNav1, setNav2, setNav3, removeNav1, removeNav2, removeNav3 } from '../../../actions/navActions';

import { HorizontalNav } from '../../common/HorizontalNav';
import { NavItem } from './NavItem';

const initialNav = [
    {
        text_value: 'Explore',
        tag_value: 'explore',
        background_color: 'OrangeRed',
        icon: 'fab fa-wpexplorer'
    },
    {
        text_value: 'Clothing & Fashion',
        tag_value: 'clothing',
        background_color: 'DeepSkyBlue',
        icon: 'fas fa-tshirt'
    },
    {
        text_value: 'Shoes',
        tag_value: 'shoes',
        background_color: 'MediumSlateBlue',
        icon: 'fas fa-shoe-prints'
    },
    {
        text_value: 'Household Essentials',
        tag_value: 'household essentials',
        background_color: 'Fuchsia',
        icon: 'fas fa-graduation-cap'
    },
    {
        text_value: 'Personal Care',
        tag_value: 'personal care',
        background_color: 'Tan',
        icon: 'fas fa-socks'
    },
    {
        text_value: 'Pets',
        tag_value: 'pets',
        background_color: 'Teal',
        icon: 'fas fa-toilet-paper'
    },
    {
        text_value: 'School & Office Supplies',
        tag_value: 'school & office supplies',
        background_color: 'MediumSlateBlue',
        icon: 'fas fa-shower'
    },
    {
        text_value: 'Women',
        tag_value: 'women',
        background_color: 'Fuchsia',
        icon: 'fas fa-paw'
    },
    {
        text_value: 'Men',
        tag_value: 'men',
        background_color: 'DeepSkyBlue',
        icon: 'fas fa-baby-carriage'
    },
    {
        text_value: 'Bathroom',
        tag_value: 'bathroom',
        background_color: 'Tan',
        icon: 'fas fa-glass-cheers'
    },
    {
        text_value: 'Laundry Items',
        tag_value: 'laundry',
        background_color: 'DeepSkyBlue',
        icon: 'fas fa-band-aid'
    }
];

const Navbar = ({
    product, 
    nav, 
    handleTags, 
    setSortedProducts, 
    removeTags,
    setNav1, 
    setNav2, 
    setNav3, 
    removeNav1, 
    removeNav2, 
    removeNav3
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
        //     await handleTags(filter);
        //     filterProducts();
        // }

        handleTags(filter);
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
        const tags = [...product.tags];

        for(var i = 0; i < tags.length; i++) {
            await removeTags(tags[i]);
        }
        unFilterProducts();

        onFilterClick(filter);    
    }

    const handleNavClick2 = async (filter) => {
        setNav2(filter);
        const tags = [...product.tags];

        if(tags.length > 1) {
            await removeTags(tags[1]);
            
            if(tags.length > 2) {
                await removeTags(tags[2]);
            }

            unFilterProducts();
        } 

        onFilterClick(filter);
    }

    const handleNavClick3 = async (filter) => {
        setNav3(filter);
        const tags = [...product.tags];

        if(tags.length > 2) {
            await removeTags(tags[2]);
            unFilterProducts();
        }

        onFilterClick(filter);
    }

    if(nav.nav1 !== '') {
        navList1 = initialNav;
    } else {
        navList1 = null;
    };

    if(nav.nav1 !== '') {
        if(nav.nav1 === 'explore') {
            navList2 =  null
        } else if(nav.nav1 === 'clothing') {
            navList2 =  [
                {
                    text_value: 'Men',
                    tag_value: 'men',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-male'
                },
                {
                    text_value: 'Women',
                    tag_value: 'women',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-female'
                },
                {
                    text_value: 'Tops',
                    tag_value: 'tops',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-tshirt'
                },
                {
                    text_value: 'Bottoms',
                    tag_value: 'bottoms',
                    background_color: 'DeepSkyBlue',
                    icon: 'fab fa-vuejs'
                },
                {
                    text_value: 'Hats',
                    tag_value: 'hats',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-hat-wizard'
                }
            ];
        } else if(nav.nav1 === 'shoes') {
            navList2 =  [
                {
                    text_value: 'Activity',
                    tag_value: 'activity',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-basketball-ball'
                },
                {
                    text_value: 'Brand',
                    tag_value: 'brand',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-code-branch'
                },
                {
                    text_value: 'Formal Shoes',
                    tag_value: 'formal shoes',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-glass-cheers'
                },
                {
                    text_value: 'Boat Shoes',
                    tag_value: 'boat shoes',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-anchor'
                },
                {
                    text_value: 'Flip Flop & Slides',
                    tag_value: 'flip flop & slides',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-umbrella-beach'
                }
            ];
        } else if(nav.nav1 === 'household essentials') {
            navList2 =  [
                {
                    text_value: 'Paper & Plastic',
                    tag_value: 'paper & plastic',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-toilet-paper'
                },
                {
                    text_value: 'Cleaning Supplies',
                    tag_value: 'cleaning supplies',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-pump-medical'
                },
                {
                    text_value: 'Laundry Items',
                    tag_value: 'laundry',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-socks'
                },
                {
                    text_value: 'Kitchen Items',
                    tag_value: 'kitchen',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-utensils'
                },
                {
                    text_value: 'Bathroom Items',
                    tag_value: 'bathroom',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-toilet'
                },
                {
                    text_value: 'Party Supplies',
                    tag_value: 'party supplies',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-birthday-cake'
                },
                {
                    text_value: 'Air Fresheners',
                    tag_value: 'air fresheners',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-spray-can'
                }
            ];
        } else if(nav.nav1 === 'personal care') {
            navList2 =  [
                {
                    text_value: 'Hair Care',
                    tag_value: 'hair care',
                    background_color: 'Tan',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Skin Care',
                    tag_value: 'skin care',
                    background_color: 'Tan',
                    icon: 'fas fa-prescription-bottle-alt'
                },
                {
                    text_value: 'Bath & Body',
                    tag_value: 'body care',
                    background_color: 'Tan',
                    icon: 'fas fa-shower'
                },
                {
                    text_value: 'Oral Care',
                    tag_value: 'oral care',
                    background_color: 'Tan',
                    icon: 'fas fa-tooth'
                },
                {
                    text_value: 'Health & Wellness',
                    tag_value: 'health & wellness',
                    background_color: 'Tan',
                    icon: 'fas fa-medkit'
                },
                {
                    text_value: 'Tools & Accessories',
                    tag_value: 'personal care tools & accessories',
                    background_color: 'Tan',
                    icon: 'fad fa-pencil-paintbrush'
                },
            ];
        } else if(nav.nav1 === 'pets') {
            navList2 =  [
                {
                    text_value: 'Dog',
                    tag_value: 'dog',
                    background_color: 'Teal',
                    icon: 'fas fa-dog'
                },
                {
                    text_value: 'Cat',
                    tag_value: 'cat',
                    background_color: 'Teal',
                    icon: 'fas fa-cat'
                },
            ];
        } else if(nav.nav1 === 'school & office supplies') {
            navList2 =  [
                {
                    text_value: 'Writing Supplies',
                    tag_value: 'writing supplies',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-pencil-alt'
                },
                {
                    text_value: 'Paper & Notebooks',
                    tag_value: 'paper & notebooks',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-sticky-note'
                },
                {
                    text_value: 'Organization Tools',
                    tag_value: 'organization tools',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-sitemap'
                },
                {
                    text_value: 'Tools & Accessories',
                    tag_value: 'school & office supplies tools & accessories',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-cut'
                },
            ];
        } else if(nav.nav1 === 'women') {
            navList2 =  [
                {
                    text_value: 'Clothing',
                    tag_value: 'womens clothing',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-female'
                },
                {
                    text_value: 'Shoes',
                    tag_value: 'womens shoes',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-shoe-prints'
                },
                {
                    text_value: 'Hair Care',
                    tag_value: 'womens hair care',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Skin Care',
                    tag_value: 'womens skin care',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-prescription-bottle-alt'
                },
                {
                    text_value: 'Makeup',
                    tag_value: 'makeup',
                    background_color: 'Fuchsia',
                    icon: 'fad fa-pencil-paintbrush'
                },
                {
                    text_value: 'Bath & Body',
                    tag_value: 'womens bath & body',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-shower'
                },
                {
                    text_value: 'Health & Wellness',
                    tag_value: 'womens health & wellness',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-medkit'
                }
            ];
        } else if(nav.nav1 === 'men') {
            navList2 =  [
                {
                    text_value: 'Clothing',
                    tag_value: 'mens clothing',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-male'
                },
                {
                    text_value: 'Shoes',
                    tag_value: 'mens shoes',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-shoe-prints'
                },
                {
                    text_value: 'Hair Care',
                    tag_value: 'mens hair care',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Skin Care',
                    tag_value: 'mens skin care',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-prescription-bottle-alt'
                },
                {
                    text_value: 'Shaving',
                    tag_value: 'shaving',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-cut'
                },
                {
                    text_value: 'Bath & Body',
                    tag_value: 'mens bath & body',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-shower'
                },
                {
                    text_value: 'Health & Wellness',
                    tag_value: 'mens health & wellness',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-medkit'
                }
            ];
        } else if(nav.nav1 === 'bathroom') {
            navList2 =  [
                {
                    text_value: 'Toilet Paper',
                    tag_value: 'toilet paper',
                    background_color: 'Tan',
                    icon: 'fas fa-toilet-paper'
                },
                {
                    text_value: 'Flushable Wipes',
                    tag_value: 'flushable wipes',
                    background_color: 'Tan',
                    icon: 'fas fa-box-tissue'
                },
                {
                    text_value: 'Bathroom Cleaners',
                    tag_value: 'bathroom cleaners',
                    background_color: 'Tan',
                    icon: 'fas fa-soap'
                },
                {
                    text_value: 'Tools & Accessories',
                    tag_value: 'bathroom tools & accessories',
                    background_color: 'Tan',
                    icon: 'fas fa-sink'
                },
            ]; 
        } else if(nav.nav1 === 'laundry') {
            navList2 =  [
                {
                    text_value: 'Laundry Detergents',
                    tag_value: 'laundry detergents',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-tablets'
                },
                {
                    text_value: 'Fabric Refreshers',
                    tag_value: 'fabric refreshers',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Tools & Accessories',
                    tag_value: 'laundry tools & accessories',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-disease'
                },
            ]; //, "collections", "inventory", "storage locations"
        } else {
            navList2 = null
        }
    }

    if(nav.nav2 !== '') {
        if(nav.nav2 === 'men') {
            navList3 =  [
                {
                    text_value: 'Sweatshirts & Hoodies',
                    tag_value: 'mens sweatshirts & hoodies',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Graphic Tees',
                    tag_value: 'mens graphic tees',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Long Sleeves',
                    tag_value: 'mens long sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Short Sleeves',
                    tag_value: 'mens short sleeves',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-tshirt'
                },
                {
                    text_value: 'Joggers & Sweatpants',
                    tag_value: 'mens joggers & sweatpants',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Shorts',
                    tag_value: 'mens shorts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Dress Shirts',
                    tag_value: 'dress shirts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Active Wear',
                    tag_value: 'mens activewear',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    tag_value: 'mens sweaters & cardigans',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Button Down Shirts',
                    tag_value: 'button down shirts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Jackets & Coats',
                    tag_value: 'mens jackets & coats',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Socks',
                    tag_value: 'mens socks',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Swimsuits',
                    tag_value: 'mens swimsuits',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Accessories',
                    tag_value: 'mens clothing accessories',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'women') {
            navList3 =  [
                {
                    text_value: 'Tops',
                    tag_value: 'womens tops',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Dresses',
                    tag_value: 'dresses',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Bottoms',
                    tag_value: 'womens bottoms',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Swimwear',
                    tag_value: 'womens swimwear',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Rompers & Jumpsuits',
                    tag_value: 'rompers & jumpsuits',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Active Wear',
                    tag_value: 'womens activewear',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Graphic Tees',
                    tag_value: 'womens graphic tees',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Jackets & Coats',
                    tag_value: 'womens jackets & coats',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    tag_value: 'womens sweaters & cardigans',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Socks',
                    tag_value: 'womens socks',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Accessories',
                    tag_value: 'womens clothing accessories',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'tops') {
            navList3 =  [
                {
                    text_value: 'Graphic Tees',
                    tag_value: 'graphic tees',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Sweatshirts & Hoodies',
                    tag_value: 'sweatshirts & hoodies',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Long Sleeves',
                    tag_value: 'long sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Short Sleeves',
                    tag_value: 'short sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Tank Tops',
                    tag_value: 'tank tops',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'bottoms') {
            navList3 =  [
                {
                    text_value: 'Joggers & Sweatpants',
                    tag_value: 'joggers & sweatpants',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Shorts',
                    tag_value: 'shorts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Skirts',
                    tag_value: 'skirts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Undies',
                    tag_value: 'underwear',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'hats') {
            navList3 =  [
                {
                    text_value: 'Dad Caps',
                    tag_value: 'dad caps',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'SnapBack Hats',
                    tag_value: 'snapback hats',
                    background_color: 'DeepSkyBlue'
                },
            ];
        } else if (nav.nav2 === 'activity') {
            navList3 =  [
                {
                    text_value: 'LifeStyle',
                    tag_value: 'lifestyle',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Basketball',
                    tag_value: 'basketball shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Running',
                    tag_value: 'running shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'walking',
                    tag_value: 'walking shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Football',
                    tag_value: 'football shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Soccer',
                    tag_value: 'soccer shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Volleyball',
                    tag_value: 'volleyball shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Training & Gym',
                    tag_value: 'training & gym shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Skateboarding',
                    tag_value: 'skateboarding shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Baseball',
                    tag_value: 'baseball shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Golf',
                    tag_value: 'golf shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Tennis',
                    tag_value: 'tennis shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'track & field',
                    tag_value: 'track & field shoes',
                    background_color: 'MediumSlateBlue'
                }
            ];
        } else if (nav.nav2 === 'brand') {
            navList3 =  [
                {
                    text_value: 'Nike',
                    tag_value: 'nike shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Jordan',
                    tag_value: 'jordan shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Yeezy',
                    tag_value: 'yeezy shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Adidas',
                    tag_value: 'adidas shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Vans',
                    tag_value: 'vans shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Converse',
                    tag_value: 'converse shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'New Balance',
                    tag_value: 'new balance shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Crocs',
                    tag_value: 'crocs shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Sperry',
                    tag_value: 'sperry shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Birkenstock',
                    tag_value: 'birkenstock shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Puma',
                    tag_value: 'puma shoes',
                    background_color: 'MediumSlateBlue'
                }
            ];
        } else if (nav.nav2 === 'formal shoes') {
            navList3 =  null;
        } else if (nav.nav2 === 'boat shoes') {
            navList3 =  null;
        } else if (nav.nav2 === 'flip flops & slides') {
            navList3 =  null;
        } else if (nav.nav2 === 'paper & plastic') {
            navList3 =  [
                {
                    text_value: 'Paper Towels',
                    tag_value: 'paper towels',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Toilet Paper',
                    tag_value: 'toilet paper',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Trash Bags',
                    tag_value: 'trash bags',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Plastic & Food Storage Bags',
                    tag_value: 'plastic & food storage bags',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Aluminum Foil',
                    tag_value: 'aluminum foil',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Plastic Wraps',
                    tag_value: 'plastic wraps',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Disposable Tablewear',
                    tag_value: 'disposable tablewear',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'cleaning supplies') {
            navList3 =  [
                {
                    text_value: 'Cleaning Wipes',
                    tag_value: 'cleaning wipes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Cleaning Tools & Accessories',
                    tag_value: 'cleaning tools & accessories',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Dish Detergents',
                    tag_value: 'dish detergents',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Bathroom Cleaners',
                    tag_value: 'bathroom cleaners',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Trash Bags',
                    tag_value: 'trash bags',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Disinfecting Sprays',
                    tag_value: 'disinfecting sprays',
                    background_color: 'Fuchsia'
                },
            ];
        } else if (nav.nav2 === 'laundry') {
            navList3 =  [
                {
                    text_value: 'Laundry Detergents',
                    tag_value: 'laundry detergents',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Fabric Refreshers',
                    tag_value: 'fabric refreshers',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'kitchen') {
            navList3 =  [
                {
                    text_value: 'Dish Detergents',
                    tag_value: 'dish detergents',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Cleaning Supplies',
                    tag_value: 'cleaning supplies',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'bathroom') {
            navList3 =  [
                {
                    text_value: 'Flushable Wipes',
                    tag_value: 'flushable wipes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Toilet Paper',
                    tag_value: 'toilet paper',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Bathroom Cleaners',
                    tag_value: 'bathroom cleaners',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'party supplies') {
            navList3 =  [
                {
                    text_value: 'Disposable Tablewear',
                    tag_value: 'disposable tablewear',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'air fresheners') {
            navList3 = null;
        } else if (nav.nav2 === 'hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'skin care') {
            navList3 =  [
                {
                    text_value: 'Body Lotions & Creams',
                    tag_value: 'body lotions & creams',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Facial Cleansers',
                    tag_value: 'facial cleansers',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Facial Moisturizers',
                    tag_value: 'facial moisturizers',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'bath & body') {
            navList3 =  [
                {
                    text_value: 'Deodorants & Antiperspirants',
                    tag_value: 'deodorants & antiperspirants',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Body Wash & Shower Gels',
                    tag_value: 'body wash & shower gels',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'oral care') {
            navList3 =  [
                {
                    text_value: 'Toothpaste',
                    tag_value: 'toothpaste',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Mouthwash',
                    tag_value: 'mouthwash',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Floss',
                    tag_value: 'floss',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'makeup') {
            navList3 = null;
        } else if (nav.nav2 === 'health & wellness') {
            navList3 =  [
                {
                    text_value: 'Facial Tissues',
                    tag_value: 'facial tissues',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'personal care tools & accessories') {
            navList3 =  [
                {
                    text_value: 'Cotton Swabs',
                    tag_value: 'cotton swabs',
                    background_color: 'Tan'
                },
                {
                    text_value: 'cotton balls',
                    tag_value: 'cotton balls',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Makeup Brushes',
                    tag_value: 'makeup brushes',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'dogs') {
            navList3 =  [
                {
                    text_value: 'Dog Food',
                    tag_value: 'dog food',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Dog Snacks',
                    tag_value: 'dog snacks',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Dog Toys',
                    tag_value: 'dog toys',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Dog Supplies & Accessories',
                    tag_value: 'dog supplies & accessories',
                    background_color: 'Teal'
                }
            ];
        } else if (nav.nav2 === 'cats') {
            navList3 =  [
                {
                    text_value: 'Cat Food',
                    tag_value: 'cat food',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Cat Snacks',
                    tag_value: 'cat snacks',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Cat Toys',
                    tag_value: 'cat toys',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Cat Supplies & Accessories',
                    tag_value: 'cat supplies & accessories',
                    background_color: 'Teal'
                }
            ];
        } else if (nav.nav2 === 'writing & drawing') {
            navList3 =  [
                {
                    text_value: 'Pens',
                    tag_value: 'pens',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Pencils',
                    tag_value: 'pencils',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Highlighers & Markers',
                    tag_value: 'highlighters & markers',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Writing Tools & Accessories',
                    tag_value: 'writing tools & accessories',
                    background_color: 'MediumSlateBlue'
                }
            ];
        } else if (nav.nav2 === 'paper products & organizers') {
            navList3 =  [
                {
                    text_value: 'Binders',
                    tag_value: 'binders',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Notebooks',
                    tag_value: 'notebooks',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Paper',
                    tag_value: 'paper',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Folders',
                    tag_value: 'folders',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Tools & Accessories',
                    tag_value: 'school & office supplies tools & accessories ',
                    background_color: 'MediumSlateBlue'
                }
            ];
        } else if (nav.nav2 === 'womens clothing') {
            navList3 =  [
                {
                    text_value: 'Tops',
                    tag_value: 'womens tops',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Bottoms',
                    tag_value: 'womens bottoms',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Swimwear',
                    tag_value: 'womens swimwear',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Rompers & Jumpsuits',
                    tag_value: 'rompers & jumpsuits',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Activewear',
                    tag_value: 'womens activewear',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Graphic Tees',
                    tag_value: 'womens graphic tees',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Jackets & Coats',
                    tag_value: 'womens jackets & coats',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    tag_value: 'womens sweaters & cardigans',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Socks',
                    tag_value: 'womens socks',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'womens shoes') {
            navList3 =  [
                {
                    text_value: 'Flip Flops & Slides',
                    tag_value: 'womens flip flops & slides',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Lifestyle Shoes',
                    tag_value: 'womens lifestyle shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Walking Shoes',
                    tag_value: 'womens walking shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Boat Shoes',
                    tag_value: 'womens boat shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Formal Shoes',
                    tag_value: 'womens formal shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Basketball Shoes',
                    tag_value: 'womens basketball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Running Shoes',
                    tag_value: 'womens running shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Soccer Shoes',
                    tag_value: 'womens soccer shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Volleyball Shoes',
                    tag_value: 'womens volleyball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Training & Gym Shoes',
                    tag_value: 'womens training & gym shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Skateboarding Shoes',
                    tag_value: 'womens skateboarding shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Softball Shoes',
                    tag_value: 'womens softball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Golf Shoes',
                    tag_value: 'womens golf shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Tennis Shoes',
                    tag_value: 'womens tennis shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Track & Field Shoes',
                    tag_value: 'womens track & field shoes',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'womens hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'womens skin care') {
            navList3 =  [
                {
                    text_value: 'Body Lotions & Creams',
                    tag_value: 'womens body lotions & creams',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Cleansers',
                    tag_value: 'womens facial cleansers',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Moisturizers',
                    tag_value: 'womens facial moisturizers',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'makeup') {
            navList3 = null;
        } else if (nav.nav2 === 'womens bath & body') {
            navList3 =  [
                {
                    text_value: 'Deodorants & Antiperspirants',
                    tag_value: 'womens deodorants & antiperspirants',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Body Wash & Shower Gels',
                    tag_value: 'womens body wash & shower gels',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'womens health & wellness') {
            navList3 =  [
                {
                    text_value: 'Tampons',
                    tag_value: 'tampons',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Tissues',
                    tag_value: 'facial tissues',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Body Wash & Shower Gels',
                    tag_value: 'womens body wash & shower gels',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'mens clothing') {
            navList3 =  [
                {
                    text_value: 'Sweatshirts & Hoodies',
                    tag_value: 'mens sweatshirts & hoodies',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Graphic Tees',
                    tag_value: 'mens graphic tees',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Long Sleeves',
                    tag_value: 'mens long sleeves',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Short Sleeves',
                    tag_value: 'mens short sleeves',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Joggers & Sweatpants',
                    tag_value: 'mens joggers & sweatpants',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Shorts',
                    tag_value: 'mens shorts',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Active Wear',
                    tag_value: 'mens activewear',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    tag_value: 'mens sweaters & cardigans',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Button Down Shirts',
                    tag_value: 'mens button down shirts',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Jackets & Coats',
                    tag_value: 'mens jackets & coats',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Socks',
                    tag_value: 'mens socks',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Swimsuits',
                    tag_value: 'mens swimsuits',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Accessories',
                    tag_value: 'mens swimsuits',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'mens shoes') {
            navList3 =  [
                {
                    text_value: 'Slides & Flip Flops',
                    tag_value: 'mens flip flops & slides',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Boat Shoes',
                    tag_value: 'mens boat shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Basketball Shoes',
                    tag_value: 'mens basketball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Running Shoes',
                    tag_value: 'mens running shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Soccer Shoes',
                    tag_value: 'mens soccer shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Walking Shoes',
                    tag_value: 'mens walking shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Formal Shoes',
                    tag_value: 'mens formal shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Training & Gym Shoes',
                    tag_value: 'mens training & gym shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Skateboarding Shoes',
                    tag_value: 'mens skateboarding shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Football Shoes',
                    tag_value: 'mens football shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Baseball Shoes',
                    tag_value: 'mens baseball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Golf Shoes',
                    tag_value: 'mens golf shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Tennis Shoes',
                    tag_value: 'mens tennis shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Track & Field Shoes',
                    tag_value: 'mens track & field shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Lifestyle Shoes',
                    tag_value: 'mens lifestyle shoes',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'mens hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'mens skin care') {
            navList3 =  [
                {
                    text_value: 'Body Lotions & Creams',
                    tag_value: 'mens body lotions & creams',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Cleansers',
                    tag_value: 'mens facial cleansers',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Moisturizers',
                    tag_value: 'mens facial moisturizers',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'shaving') {
            navList3 = null;
        } else if (nav.nav2 === 'mens bath & body') {
            navList3 =  [
                {
                    text_value: 'Deodorants & Antiperspirants',
                    tag_value: 'mens deodorants & antiperspirants',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Body Wash & Shower Gel',
                    tag_value: 'mens body wash & shower gel',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'mens health & wellness') {
            navList3 =  [
                {
                    text_value: 'Condoms',
                    tag_value: 'condoms',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Tissues',
                    tag_value: 'facial tissues',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'toilet paper') {
            navList3 = null;
        } else if (nav.nav2 === 'flushable wipes') {
            navList3 = null;
        } else if (nav.nav2 === 'bathroom cleaners') {
            navList3 = null;
        } else if (nav.nav2 === 'bathroom tools & accessories') {
            navList3 = null;
        } else if (nav.nav2 === 'laundry detergents') {
            navList3 = null;
        } else if (nav.nav2 === 'fabric refreshers') {
            navList3 = null;
        } else if (nav.nav2 === 'laundry tools & accessories') {
            navList3 = null;
        } else {
            navList3 = null;
        }
    }

    let navList = null;
    let secondNavList = null;
    let thirdNavList = null;

    if(navList1 !== null) {
        navList = navList1.map((nav_item, index) => 
            <NavItem 
                key={index} 
                background={nav_item.background_color}
                onClick={() => handleNavClick1(nav_item.tag_value)}
            >
                <i className={nav_item.icon}></i>
                {' '}{nav_item.text_value}
            </NavItem>
        );
    };

    if(navList2 !== null) {
        secondNavList = navList2.map((nav_item, index) => 
            <NavItem 
                key={index} 
                background={nav_item.background_color}
                onClick={() => handleNavClick2(nav_item.tag_value)}
            >
                <i className={nav_item.icon}></i>
                {' '}{nav_item.text_value}
            </NavItem>
        );
    };

    if(navList3 !== null) {
        thirdNavList = navList3.map((nav_item, index) => 
            <NavItem 
                key={index} 
                style={{color: '#929292'}}
                background='#f4f4f4'
                onClick={() => handleNavClick3(nav_item.tag_value)}
            >
                <i className={nav_item.icon}></i>
                {' '}{nav_item.text_value}
            </NavItem>
        );
    };
    
    return (
        <Fragment>
            {nav.nav1 !== '' && (
                <HorizontalNav>
                    {navList}
                </HorizontalNav>
            )}
            {nav.nav1 !== '' && nav.nav1 !== 'explore' ? (
                <HorizontalNav>
                    {secondNavList}
                </HorizontalNav>
            ) : null}
            {nav.nav2 !== '' && (
                <HorizontalNav>
                    {thirdNavList}
                </HorizontalNav>
            )}
        </Fragment>
    );
}

Navbar.propTypes = {
    handleTags: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    setSortedProducts: PropTypes.func.isRequired,
    removeTags: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setNav2: PropTypes.func.isRequired,
    setNav3: PropTypes.func.isRequired,
    removeNav1: PropTypes.func.isRequired,
    removeNav2: PropTypes.func.isRequired,
    removeNav3: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    nav: state.nav
});

export default connect(mapStateToProps, { handleTags, setSortedProducts, removeTags, setNav1, setNav2, setNav3, removeNav1, removeNav2, removeNav3 })(Navbar);
