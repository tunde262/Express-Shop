import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleTags, setSortedProducts, removeTags, clearProducts } from '../../../actions/productActions';
import { setNav1, setNav2, setNav3, removeNav1, removeNav2, removeNav3 } from '../../../actions/navActions';

import { HorizontalNav } from '../../common/HorizontalNav';
import { NavItem } from './NavItem';

const initialNav = [
    {
        text_value: 'Explore',
        img:'https://images-na.ssl-images-amazon.com/images/I/81fwbCCudTL.png',
        tag_value: 'explore',
        background_color: 'OrangeRed',
        icon: 'fab fa-wpexplorer'
    },
    {
        text_value: 'Clothing & Fashion',
        img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        tag_value: 'clothing and fashion',
        background_color: 'DeepSkyBlue',
        icon: 'fas fa-tshirt'
    },
    {
        text_value: 'Shoes',
        img:'https://cdn.shopify.com/s/files/1/0238/2821/products/Mens-193-Royale-TripleBlack-3RBW-Product-101_0dfdc0b7-602d-413d-a381-4baa1060da91_854x.jpg?v=1563992320',
        tag_value: 'shoes',
        background_color: 'MediumSlateBlue',
        icon: 'fas fa-shoe-prints'
    },
    {
        text_value: 'Household Essentials',
        img:'https://i2.wp.com/passionatepennypincher.com/wp-content/uploads/2017/11/Household-Essentials-1.png',
        tag_value: 'household essentials',
        background_color: '#00cc84',
        icon: 'fas fa-graduation-cap'
    },
    {
        text_value: 'Personal Care',
        img:'https://media3.s-nbcnews.com/i/newscms/2020_34/1601460/tune-up-tuesday-skincare-problems-kr-2x1-tease-200817_7f8c5263375eb2ba626ba798d752b7c3.jpg',
        tag_value: 'personal care',
        background_color: 'Tan',
        icon: 'fas fa-socks'
    },
    {
        text_value: 'Pets',
        img:'https://www.nyalahotel.com/wp-content/uploads/2016/08/Pets.jpg',
        tag_value: 'pets',
        background_color: 'Teal',
        icon: 'fas fa-toilet-paper'
    },
    {
        text_value: 'School & Office Supplies',
        img:'https://cdn3.iconfinder.com/data/icons/education-210/49/65-512.png',
        tag_value: 'school and office supplies',
        background_color: 'MediumSlateBlue',
        icon: 'fas fa-shower'
    },
    {
        text_value: 'Women',
        img:'https://cdn3.vectorstock.com/i/1000x1000/42/67/women-symbol-on-pink-background-vector-18884267.jpg',
        tag_value: 'women',
        background_color: 'Fuchsia',
        icon: 'fas fa-paw'
    },
    {
        text_value: 'Men',
        img:'https://cdn2.vectorstock.com/i/1000x1000/50/71/round-male-symbol-in-blue-color-flat-design-style-vector-25195071.jpg',
        tag_value: 'men',
        background_color: 'DeepSkyBlue',
        icon: 'fas fa-baby-carriage'
    },
    {
        text_value: 'Bathroom',
        img:'https://media.manufactum.de/is/image/Manufactum/750s_shop/stainless-steel-toilet-paper-holder--83490_01.jpg',
        tag_value: 'bathroom',
        background_color: 'Tan',
        icon: 'fas fa-glass-cheers'
    },
    {
        text_value: 'Laundry Items',
        img:'https://forthemommas.com/wp-content/uploads/2014/07/target-.jpg',
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
        navList1 = initialNav;
    } else {
        navList1 = null;
    };

    if(nav.nav1 !== '') {
        if(nav.nav1 === 'explore') {
            navList2 =  null
        } else if(nav.nav1 === 'clothing and fashion') {
            navList2 =  [
                {
                    text_value: 'Men',
                    img:'https://2j6jnda3hor2rfqci2oskova-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/Yoox-Mens-Clothing-Store-Online.jpg',
                    tag_value: 'mens clothing and fashion',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-male'
                },
                {
                    text_value: 'Women',
                    img:'https://magiclinen.com/image/cache/catalog/KATEGORIJOS/A-SUB%20KATEGORIJOS/magiclinen-category-dress-adria-600x600.jpg',
                    tag_value: 'womens clothing and fashion',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-female'
                },
                {
                    text_value: 'Tops',
                    img:'https://www.ramblersway.com/sites/default/files/product_photos/708-Western-Chambray-Shirt.jpg',
                    tag_value: 'tops',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-tshirt'
                },
                {
                    text_value: 'Bottoms',
                    img:'https://www.helikon-tex.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/s/p/sp-pgm-dc-11.jpg',
                    tag_value: 'bottoms',
                    background_color: 'DeepSkyBlue',
                    icon: 'fab fa-vuejs'
                },
                {
                    text_value: 'Hats',
                    img:'https://www.revzilla.com/product_images/0079/8598/icon_fused_hat_black_300x300.jpg',
                    tag_value: 'hats',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-hat-wizard'
                }
            ];
        } else if(nav.nav1 === 'shoes') {
            navList2 =  [
                {
                    text_value: 'Flip Flops & Slides',
                    img:'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/fab7aezacg7vaptfkfyc/benassi-jdi-slide-TDxhwg.jpg',
                    tag_value: 'flip flops and slides',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Basketball',
                    img:'https://nodawaybroadcasting.com/wp-content/uploads/2019/12/Basketball.jpg',
                    tag_value: 'basketball shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Boat Shoes',
                    img:'https://www.rancourtandcompany.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/0/6024-38_side.jpg',
                    tag_value: 'boat shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Formal',
                    img:'https://i.frg.im/WaFDbrsr/shoes-3976-1.jpg',
                    tag_value: 'formal shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Lazy',
                    img:'https://i.pinimg.com/236x/a3/53/ba/a353ba68c4ad0869b1e480c26228721d--dawn-night-time.jpg',
                    tag_value: 'lazy shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Running',
                    img:'https://media3.s-nbcnews.com/i/newscms/2020_06/3210716/200131-nike-vaporfly-se-1126a_de432ac08eb22348178a1fd09ac99b65.jpg',
                    tag_value: 'running shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'walking',
                    img:'https://cdn.winsightmedia.com/platform/files/public/cspdn/shoes-walking.png',
                    tag_value: 'walking shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Football',
                    img:'https://besto24.com/51062-large_default/football-shoes-puma-one-1-il-lth-fg-ag.jpg',
                    tag_value: 'football shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Soccer',
                    img:'https://www.bgcdorchester.org/wp-content/uploads/2016/05/product-soccer-ball.jpg',
                    tag_value: 'soccer shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Volleyball',
                    img:'https://images-na.ssl-images-amazon.com/images/I/61lj9PFLqaL._AC_SY355_.jpg',
                    tag_value: 'volleyball shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Training & Gym',
                    img:'data:image/jpeg;base64,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',
                    tag_value: 'training and gym shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Skateboarding',
                    img:'https://image.made-in-china.com/2f0j00DnltaymcnNgR/Hot-Sale-Cool-Skateboard-Stuff-Canada-Maple-Old-School-Skateboards.jpg',
                    tag_value: 'skateboarding shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Baseball',
                    img:'https://upload.wikimedia.org/wikipedia/en/1/1e/Baseball_%28crop%29.jpg',
                    tag_value: 'baseball shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Golf',
                    img:'https://www.toledoblade.com/image/2019/07/05/1140x_a10-7_cTC/SPT-Solheim21-1.jpg',
                    tag_value: 'golf shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Tennis',
                    img:'https://www.lotto.it/media/catalog/product/cache/image/350x350/beff4985b56e3afdbeabfc89641a4582/2/1/210738_5Z2-01.jpg',
                    tag_value: 'tennis shoes',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'track & field',
                    img:'https://di2ponv0v5otw.cloudfront.net/posts/2019/01/14/5c3d4428409c15ebb235077c/m_5c3d4ce2c2e9fe388d00e171.jpg',
                    tag_value: 'track and field shoes',
                    background_color: 'MediumSlateBlue'
                }
            ];
        } else if(nav.nav1 === 'household essentials') {
            navList2 =  [
                {
                    text_value: 'Paper & Plastic',
                    img:'https://b3h2.scene7.com/is/image/BedBathandBeyond/216022666259978p?$690$&wid=690&hei=690',
                    tag_value: 'paper and plastic',
                    background_color: '#00cc84',
                    icon: 'fas fa-toilet-paper'
                },
                {
                    text_value: 'Cleaning Supplies',
                    img:'https://prestonhollow.advocatemag.com/wp-content/uploads/sites/8/2020/03/cleaning-supplies-kit.1.jpg',
                    tag_value: 'cleaning supplies',
                    background_color: '#00cc84',
                    icon: 'fas fa-pump-medical'
                },
                {
                    text_value: 'Laundry Items',
                    img:'https://forthemommas.com/wp-content/uploads/2014/07/target-.jpg',
                    tag_value: 'laundry care',
                    background_color: '#00cc84',
                    icon: 'fas fa-socks'
                },
                {
                    text_value: 'Kitchen Items',
                    img:'https://hips.hearstapps.com/del.h-cdn.co/assets/17/51/1513790754-screen-shot-2017-12-20-at-122536-pm.png',
                    tag_value: 'kitchen',
                    background_color: '#00cc84',
                    icon: 'fas fa-utensils'
                },
                {
                    text_value: 'Bathroom Items',
                    img:'https://media.manufactum.de/is/image/Manufactum/750s_shop/stainless-steel-toilet-paper-holder--83490_01.jpg',
                    tag_value: 'bathroom essentials',
                    background_color: '#00cc84',
                    icon: 'fas fa-toilet'
                },
                {
                    text_value: 'Party Supplies',
                    img:'https://s7d5.scene7.com/is/image/PartyCity/round-birthday-balloons-bouquet-237864',
                    tag_value: 'party supplies',
                    background_color: '#00cc84',
                    icon: 'fas fa-birthday-cake'
                },
                {
                    text_value: 'Air Fresheners',
                    img:'https://images.homedepot-static.com/productImages/510e43f9-b7a3-4dea-b965-9fa1a38c984a/svn/febreze-spray-air-fresheners-003700096258-64_1000.jpg',
                    tag_value: 'air fresheners',
                    background_color: '#00cc84',
                    icon: 'fas fa-spray-can'
                }
            ];
        } else if(nav.nav1 === 'personal care') {
            navList2 =  [
                {
                    text_value: 'Hair Care',
                    img:'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/cosmetics/cosmeticsdesign-europe.com/headlines/market-trends/hair-trends-research-from-mintel-brits-prefer-blondes/8149689-1-eng-GB/Hair-trends-research-from-Mintel-Brits-prefer-blondes_wrbm_large.jpg',
                    tag_value: 'hair care',
                    background_color: 'Tan',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Skin Care',
                    img:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tomato-skincare-1596733638.jpg?crop=0.394xw:0.639xh;0.290xw,0.166xh&resize=640:*',
                    tag_value: 'skin care',
                    background_color: 'Tan',
                    icon: 'fas fa-prescription-bottle-alt'
                },
                {
                    text_value: 'Bath & Body',
                    img:'https://image.shutterstock.com/image-photo/top-view-baby-bathing-items-260nw-1210568332.jpg',
                    tag_value: 'bath and body',
                    background_color: 'Tan',
                    icon: 'fas fa-shower'
                },
                {
                    text_value: 'Oral Care',
                    img:'https://www.riteaid.com/shop/media/catalog/product/0/1/011822338448_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=406&width=406&canvas=406:406',
                    tag_value: 'oral care',
                    background_color: 'Tan',
                    icon: 'fas fa-tooth'
                },
                {
                    text_value: 'Health & Wellness',
                    img:'https://www.kleenex.com/-/media/images/kleenex/products-new/cool-touch/boxes-upright/29388-04kft_coltuch_50ct_2_w_tissues1-(1).png',
                    tag_value: 'health and wellness',
                    background_color: 'Tan',
                    icon: 'fas fa-medkit'
                },
                {
                    text_value: 'Tools & Accessories',
                    img:'https://www.makeup.com/-/media/project/loreal/brand-sites/mdc/americas/us/articles/2019/10_october/04-face-brush-guide/face-makeup-brush-guide-hero-mudc-072619.jpg?w=400&h=300&blr=False&hash=184165BFDA8E9D1C27166555A7A6A926',
                    tag_value: 'personal care tools and accessories',
                    background_color: 'Tan',
                    icon: 'fad fa-pencil-paintbrush'
                },
            ];
        } else if(nav.nav1 === 'pets') {
            navList2 =  [
                {
                    text_value: 'Dog',
                    img:'https://i.pinimg.com/236x/66/a3/9c/66a39c00004c1a4df4ebfee24c95aae9--portrait-german-shepherds.jpg',
                    tag_value: 'dogs',
                    background_color: 'Teal',
                    icon: 'fas fa-dog'
                },
                {
                    text_value: 'Cat',
                    img:'https://cdn.sanity.io/images/0vv8moc6/dvm360/f9201960154f2705c2bd0f200057261038a38527-450x278.jpg',
                    tag_value: 'cats',
                    background_color: 'Teal',
                    icon: 'fas fa-cat'
                },
            ];
        } else if(nav.nav1 === 'school and office supplies') {
            navList2 =  [
                {
                    text_value: 'Writing & Drawing',
                    img:'https://target.scene7.com/is/image/Target/Crayons195367-190925_1569431391584?wid=315&hei=315&qlt=60&fmt=pjpeg',
                    tag_value: 'writing and drawing',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-pencil-alt'
                },
                {
                    text_value: 'Paper Products & Organizers',
                    img:'https://ae01.alicdn.com/kf/HLB1geRYaznuK1RkSmFPq6AuzFXar/Portable-A5-Refillable-Hardcover-Writing-Journal-Notebook-Loose-Leaf-Paper-Mushroom-Holes-Ring-Binder-with-8.jpg',
                    tag_value: 'paper products and organizers',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-sticky-note'
                },
                // {
                //     text_value: 'Organization Tools',
                //     img:'https://ak1.ostkcdn.com/images/products/is/images/direct/aa29ac798c51aa3a510647f8412d03c810061e97/Costway-15-Drawer-Rolling-Storage-Cart-Tools-Scrapbook-Paper-Office-School-Organizer.jpg?impolicy=medium',
                //     tag_value: 'organization tools',
                //     background_color: 'MediumSlateBlue',
                //     icon: 'fas fa-sitemap'
                // },
                {
                    text_value: 'Tools & Accessories',
                    img:'https://www.dollargeneral.com/media/catalog/product/cache/0729a8e318a86bbdd225c6c8aa5967a3/0/0/00640202_b.jpg',
                    tag_value: 'school and office tools and accessories',
                    background_color: 'MediumSlateBlue',
                    icon: 'fas fa-cut'
                },
            ];
        } else if(nav.nav1 === 'women') {
            navList2 =  [
                {
                    text_value: 'Clothing',
                    img:'https://ae01.alicdn.com/kf/HTB1JMXQJYSYBuNjSspfq6AZCpXav/3XL-4XL-Plus-Size-Women-Clothing-Pin-UP-Vestidos-Summer-Retro-Casual-Party-Robe-Rockabilly-50s.jpg',
                    tag_value: 'womens clothing',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-female'
                },
                {
                    text_value: 'Shoes',
                    img:'https://ego-co.uk.imgeng.in/media/catalog/product/cache/31e16ddd47bf27e78d7cf6f4adfe97b8/k/a/kaiablack-90.jpg?imgeng=/w_1300/',
                    tag_value: 'womens shoes',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-shoe-prints'
                },
                {
                    text_value: 'Hair Care',
                    img:'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/cosmetics/cosmeticsdesign-europe.com/headlines/market-trends/hair-trends-research-from-mintel-brits-prefer-blondes/8149689-1-eng-GB/Hair-trends-research-from-Mintel-Brits-prefer-blondes_wrbm_large.jpg',
                    tag_value: 'womens hair care',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Skin Care',
                    img:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tomato-skincare-1596733638.jpg?crop=0.394xw:0.639xh;0.290xw,0.166xh&resize=640:*',
                    tag_value: 'womens skin care',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-prescription-bottle-alt'
                },
                {
                    text_value: 'Makeup',
                    img:'https://img.jakpost.net/c/2019/12/09/2019_12_09_83333_1575827116._medium.jpg',
                    tag_value: 'womens makeup',
                    background_color: 'Fuchsia',
                    icon: 'fad fa-pencil-paintbrush'
                },
                {
                    text_value: 'Bath & Body',
                    img:'https://image.shutterstock.com/image-photo/top-view-baby-bathing-items-260nw-1210568332.jpg',
                    tag_value: 'womens bath and body',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-shower'
                },
                {
                    text_value: 'Health & Wellness',
                    img:'https://nypost.com/wp-content/uploads/sites/2/2019/10/tampon-1.jpg?quality=80&strip=all',
                    tag_value: 'womens health and wellness',
                    background_color: 'Fuchsia',
                    icon: 'fas fa-medkit'
                }
            ];
        } else if(nav.nav1 === 'men') {
            navList2 =  [
                {
                    text_value: 'Clothing',
                    img:'https://ae01.alicdn.com/kf/HTB1g82sLXXXXXcBXpXXq6xXFXXXQ/jeansian-casual-shirts-dress-male-mens-clothing-long-sleeve-social-slim-fit-brand-boutique-cotton-western.jpg',
                    tag_value: 'mens clothing',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-male'
                },
                {
                    text_value: 'Shoes',
                    img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-7ee33632-c820-48c7-8149-081defa6c5e1/air-max-270-mens-shoe-qVk0Vw.jpg',
                    tag_value: 'mens shoes',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-shoe-prints'
                },
                {
                    text_value: 'Hair Care',
                    img:'https://images-na.ssl-images-amazon.com/images/I/51clVYbs9wL.jpg',
                    tag_value: 'mens hair care',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Skin Care',
                    img:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tomato-skincare-1596733638.jpg?crop=0.394xw:0.639xh;0.290xw,0.166xh&resize=640:*',
                    tag_value: 'mens skin care',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-prescription-bottle-alt'
                },
                {
                    text_value: 'Shaving',
                    img:'https://cdn11.bigcommerce.com/s-iq1w68t3mw/images/stencil/1280x1280/products/576/850/00670535728504__86910.1591989547.png?c=1',
                    tag_value: 'shaving',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-cut'
                },
                {
                    text_value: 'Bath & Body',
                    img:'https://image.shutterstock.com/image-photo/top-view-baby-bathing-items-260nw-1210568332.jpg',
                    tag_value: 'mens bath and body',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-shower'
                },
                {
                    text_value: 'Health & Wellness',
                    img:'https://muvs.org/media/filer_public/ad/90/ad90f1d9-2bef-4f4d-ac89-7343ef2ac017/1109_00_dl.jpg',
                    tag_value: 'mens health and wellness',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-medkit'
                }
            ];
        } else if(nav.nav1 === 'bathroom') {
            navList2 =  [
                {
                    text_value: 'Toilet Paper',
                    img:'https://images.homedepot-static.com/productImages/94dc5bfe-ffc8-440c-9987-56e02bacc46b/svn/angel-soft-toilet-paper-gep16880-64_1000.jpg',
                    tag_value: 'toilet paper',
                    background_color: 'Tan',
                    icon: 'fas fa-toilet-paper'
                },
                {
                    text_value: 'Flushable Wipes',
                    img:'https://b3h2.scene7.com/is/image/BedBathandBeyond/384812220561635p?$690$&wid=690&hei=690',
                    tag_value: 'flushable wipes',
                    background_color: 'Tan',
                    icon: 'fas fa-box-tissue'
                },
                {
                    text_value: 'Bathroom Cleaners',
                    img:'https://www.meijer.com/content/dam/meijer/product/0044/60/0306/19/0044600306193_a1c1_0600.png',
                    tag_value: 'bathroom cleaners',
                    background_color: 'Tan',
                    icon: 'fas fa-soap'
                },
                {
                    text_value: 'Tools & Accessories',
                    img:'https://previews.123rf.com/images/pong0528/pong05281511/pong0528151100034/48700630-closeup-pink-toilet-brush-on-white-background.jpg',
                    tag_value: 'bathroom tools and accessories',
                    background_color: 'Tan',
                    icon: 'fas fa-sink'
                },
            ]; 
        } else if(nav.nav1 === 'laundry') {
            navList2 =  [
                {
                    text_value: 'Laundry Detergents',
                    img:'https://azcdn.galileo.pgsitecore.com/en-ca/-/media/Tide_CA/Images/Secondary%20Details/Tide%20Coldwater%20Clean%20Fresh%20Scent%20HE%20Turbo%20Clean%20Liquid%20Laundry%20Detergent/01Coldwater-Packshot_HE_1600.png?v=1-201808230757',
                    tag_value: 'laundry detergents',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-tablets'
                },
                {
                    text_value: 'Fabric Refreshers',
                    img:'https://www.supplychimp.com/media/extendware/ewimageopt/media/inline/9a/1/febreze-97591-fabric-refresher-odor-eliminator-tide-original-27-oz-spray-bottle-4-carton-25d.jpg',
                    tag_value: 'fabric refreshers',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-spray-can'
                },
                {
                    text_value: 'Tools & Accessories',
                    img:'https://ak1.ostkcdn.com/images/products/is/images/direct/5c10dd18ce3f9eee29c2aa3a3308e9ebf90a2cf9/Mocha-Hand-Woven-Oval-Double-Laundry-Hamper-with-Removable-Liner.jpg',
                    tag_value: 'laundry tools and accessories',
                    background_color: 'DeepSkyBlue',
                    icon: 'fas fa-disease'
                },
            ]; //, "collections", "inventory", "storage locations"
        } else {
            navList2 = null
        }
    } else {
        navList2 =  null
    }

    if(nav.nav2 !== '') {
        if(nav.nav2 === 'mens clothing and fashion') {
            navList3 =  [
                {
                    text_value: 'Sweatshirts & Hoodies',
                    img:'https://m.media-amazon.com/images/I/A1ZoIF93L0L._SR500,500_.jpg',
                    tag_value: 'mens fashion sweatshirts and hoodies',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Graphic Tees',
                    img:'https://target.scene7.com/is/image/Target/GUEST_3f7dea65-c2df-4b59-b434-b7ac26302cad?wid=488&hei=488&fmt=pjpeg',
                    tag_value: 'mens fashion graphic tees',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Long Sleeves',
                    img:'https://image.spreadshirtmedia.com/image-server/v1/mp/productTypes/486/views/2/appearances/2,width=300,height=300,backgroundColor=e8e8e8.jpg',
                    tag_value: 'mens fashion long sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Short Sleeves',
                    img:'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/02_138686.jpg',
                    tag_value: 'mens fashion short sleeves',
                    background_color: 'DeepSkyBlue',
                },
                {
                    text_value: 'Joggers & Sweatpants',
                    img:'https://sfgroup.centracdn.net/client/dynamic/images/953_abad6258bb-120880973_3-full.jpg',
                    tag_value: 'mens fashion joggers and sweatpants',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Shorts',
                    img:'https://cdni.llbean.net/is/image/wim/503783_30_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2',
                    tag_value: 'mens fashion shorts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Dress Shirts',
                    img:'https://www.polorlpony.com/image/cache/Mens-003/Polo-Ralph-Lauren-Polo-blue-black-white-online-outlet-sale-600x600.jpg',
                    tag_value: 'mens fashion dress shirts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Active Wear',
                    img:'https://i.pinimg.com/originals/fd/db/51/fddb51c382d5f017a4f57d45adf68fcf.jpg',
                    tag_value: 'mens fashion activewear',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    img:'https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Clothing/2017/08/16/goods_img_big-v1/20170816175815_61987.jpg',
                    tag_value: 'mens fashion sweaters and cardigans',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Button Down Shirts',
                    img:'https://m.media-amazon.com/images/I/81+fpZtP9nL._SR500,500_.jpg',
                    tag_value: 'mens fashion button down shirts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Jackets & Coats',
                    img:'https://images.thenorthface.com/is/image/TheNorthFace/NF0A33RG_KX7_hero?$638x745$',
                    tag_value: 'mens fashion jackets and coats',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Socks',
                    img:'https://cdn.shopify.com/s/files/1/0052/7237/1293/products/1024x1024-Socks-White-LB1_1024x1024.jpg?v=1561393817',
                    tag_value: 'mens fashion socks',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Swimsuits',
                    img:'https://scene7.lillypulitzer.com/is/image/sugartown/002111_blueibizaaqualavista-sf?$sfraPDP1x$',
                    tag_value: 'mens fashion swimsuits',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Accessories',
                    img:'https://ak1.ostkcdn.com/wp-content/uploads/2017/09/Luxury-Watch-e1504821921702.jpg',
                    tag_value: 'mens clothing and fashion accessories',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'womens clothing and fashion') {
            navList3 =  [
                {
                    text_value: 'Tops',
                    img:'https://ae01.alicdn.com/kf/HTB1BQPcEkCWBuNjy0Faq6xUlXXab.jpg_q50.jpg',
                    tag_value: 'womens fashion tops',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Dresses',
                    img:'https://ae01.alicdn.com/kf/HTB1dZ3XByOYBuNjSsD4q6zSkFXaf/V-Neck-Lace-Knee-Length-Women-s-Dresses-With-Short-Sleeves-Dress-For-Women-Dress-Female.jpg',
                    tag_value: 'dresses',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Bottoms',
                    img:'https://cdn.shopify.com/s/files/1/0496/8693/products/womens-charcoal-small-lena-women-s-leggings-12440307433544_1024x.jpg?v=1574245765',
                    tag_value: 'womens fashion bottoms',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Swimwear',
                    img:'https://cdn.shopify.com/s/files/1/0529/8037/products/image_27d98702-509f-4b3b-809c-bce8f839d840_1024x.jpg?v=1580832920',
                    tag_value: 'womens fashion swimwear',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Rompers & Jumpsuits',
                    img:'https://images.express.com/is/image/expressfashion/0094_07924852_0058?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
                    tag_value: 'womens fashion rompers and jumpsuits',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Active Wear',
                    img:'https://c.static-nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/qnbukspgbjwqcldnpjzd/pro-womens-7-8-tights-HVLN6V.jpg',
                    tag_value: 'womens fashion activewear',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Graphic Tees',
                    img:'https://m.media-amazon.com/images/I/51LyA6ytEKL._SR500,500_.jpg',
                    tag_value: 'womens fashion graphic tees',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Jackets & Coats',
                    img:'https://ae01.alicdn.com/kf/H31113835d0e44e53b8a429bbbb9610eeg/Black-Cotton-Coats-Women-Casual-Hooded-Jacket-Coat-Fashion-Simple-High-Street-Slim-2018-Winter-Warm.jpg',
                    tag_value: 'womens fashion jackets and coats',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    img:'https://images.express.com/is/image/expressfashion/0096_08411470_2052?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
                    tag_value: 'womens fashion sweaters and cardigans',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Socks',
                    img:'https://cdn.shopify.com/s/files/1/1811/0467/products/funny-socks-women-goat-yoga-pink.png?v=1580487274',
                    tag_value: 'womens fashion socks',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Accessories',
                    img:'https://cdn.mynamenecklace.com/images/products/Womens-ID-Bracelet-in-Rose-Gold_jumbo.jpg',
                    tag_value: 'womens clothing and fashion accessories',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'tops') {
            navList3 =  [
                {
                    text_value: 'Graphic Tees',
                    img:'https://target.scene7.com/is/image/Target/GUEST_3f7dea65-c2df-4b59-b434-b7ac26302cad?wid=488&hei=488&fmt=pjpeg',
                    tag_value: 'graphic tees',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Sweatshirts & Hoodies',
                    img:'https://images.express.com/is/image/expressfashion/0096_08411470_2052?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
                    tag_value: 'sweatshirts and hoodies',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Long Sleeves',
                    img:'https://image.spreadshirtmedia.com/image-server/v1/mp/productTypes/486/views/2/appearances/2,width=300,height=300,backgroundColor=e8e8e8.jpg',
                    tag_value: 'long sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Short Sleeves',
                    img:'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/02_138686.jpg',
                    tag_value: 'short sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Tank Tops',
                    img:'https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/413997/item/goods_56_413997.jpg?width=2000',
                    tag_value: 'tank tops',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'bottoms') {
            navList3 =  [
                {
                    text_value: 'Joggers & Sweatpants',
                    img:'https://content.backcountry.com/images/items/900/PAT/PAT02BZ/BK.jpg',
                    tag_value: 'joggers and sweatpants',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Shorts',
                    img:'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1584576428-e56b3eb8_9795.jpg',
                    tag_value: 'shorts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Skirts',
                    img:'https://cdn.childsplayclothing.co.uk/media/catalog/product/cache/1/image/1200x/9df78eab33525d08d6e5fb8d27136e95/r/e/relish_73884_1.jpg',
                    tag_value: 'skirts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Undies',
                    img:'https://d3axji8lcxjlzy.cloudfront.net/spree/products/2478/large/MU-bikini-black_1431966614.jpg?1431966614',
                    tag_value: 'underwear',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'hats') {
            navList3 =  [
                {
                    text_value: 'Dad Caps',
                    img:'https://www.dadhatlife.com/wp-content/uploads/2018/09/3179-1240xl.jpg',
                    tag_value: 'dad caps',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Flat Hats',
                    img:'https://www.neweracap.com.au/medias/sys_master/root/h31/h35/9083138244638/9083138244638.png',
                    tag_value: 'snapback hats',
                    background_color: 'DeepSkyBlue'
                },
            ];}
        // } else if (nav.nav2 === 'activity') {
        //     navList3 =  [
        //         {
        //             text_value: 'LifeStyle',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'lifestyle',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Basketball',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'basketball shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Running',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'running shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'walking',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'walking shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Football',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'football shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Soccer',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'soccer shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Volleyball',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'volleyball shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Training & Gym',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'training & gym shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Skateboarding',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'skateboarding shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Baseball',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'baseball shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Golf',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'golf shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Tennis',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'tennis shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'track & field',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'track & field shoes',
        //             background_color: 'MediumSlateBlue'
        //         }
        //     ];
        // } else if (nav.nav2 === 'brand') {
        //     navList3 =  [
        //         {
        //             text_value: 'Nike',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'nike shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Jordan',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'jordan shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Yeezy',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'yeezy shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Adidas',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'adidas shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Vans',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'vans shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Converse',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'converse shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'New Balance',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'new balance shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Crocs',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'crocs shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Sperry',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'sperry shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Birkenstock',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'birkenstock shoes',
        //             background_color: 'MediumSlateBlue'
        //         },
        //         {
        //             text_value: 'Puma',
        //             img:'https://shop.wwe.com/dw/image/v2/AAIW_PRD/on/demandware.static/-/Sites-main/default/dwfd76d20b/images/large/2423CC1F1A.jpg?sw=800',
        //             tag_value: 'puma shoes',
        //             background_color: 'MediumSlateBlue'
        //         }
        //     ];
        // } 
        else if (nav.nav2 === 'formal shoes') {
            navList3 =  null;
        } else if (nav.nav2 === 'boat shoes') {
            navList3 =  null;
        } else if (nav.nav2 === 'flip flops and slides') {
            navList3 =  null;
        } else if (nav.nav2 === 'paper and plastic') {
            navList3 =  [
                {
                    text_value: 'Paper Towels',
                    img:'https://cdn-endpoint-website.azureedge.net/uploads/PhotoModel/25952/image/spdisp2.gallery.jpg?t=1585143193',
                    tag_value: 'paper towels',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Toilet Paper',
                    img:'https://images.homedepot-static.com/productImages/94dc5bfe-ffc8-440c-9987-56e02bacc46b/svn/angel-soft-toilet-paper-gep16880-64_1000.jpg',
                    tag_value: 'toilet paper',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Trash Bags',
                    img:'https://5.imimg.com/data5/XJ/TK/TO/SELLER-35274303/garbage-bag-roll-500x500.jpg',
                    tag_value: 'plastic trash bags',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Plastic & Food Storage Bags',
                    img:'https://images.homedepot-static.com/productImages/773fd9fe-70b7-46d6-add2-c828b44643ab/svn/ziploc-lunch-boxes-lunch-bags-624755-64_1000.jpg',
                    tag_value: 'plastic and food storage bags',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Aluminum Foil',
                    img:'https://sc02.alicdn.com/kf/HTB1VI13X13tHKVjSZSgq6x4QFXax.jpg',
                    tag_value: 'aluminum foil',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Plastic Wraps',
                    img:'https://files.recipetips.com/images/glossary/p/plastic_wrap.jpg',
                    tag_value: 'plastic wraps',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Disposable Tablewear',
                    img:'https://cdn.shopify.com/s/files/1/0020/7598/3935/products/8-silver-forks-spoons-and-knives-sets-disposable-tableware-plst-yy03-silv-5356067029055.jpg?v=1575934668',
                    tag_value: 'disposable tablewear',
                    background_color: '#00cc84'
                }
            ];
        } else if (nav.nav2 === 'cleaning supplies') {
            navList3 =  [
                {
                    text_value: 'Cleaning Wipes',
                    img:'https://pics.drugstore.com/prodimg/194963/900.jpg',
                    tag_value: 'cleaning wipes',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Cleaning Tools & Accessories',
                    img:'https://cdn.connox.co.uk/m/100030/240127/media/hay/Staubwedel/hay-staubwedel-blau.jpg',
                    tag_value: 'cleaning tools and accessories',
                    background_color: '#00cc84'
                },
                // {
                //     text_value: 'Dish Detergents',
                //     img:'https://images-na.ssl-images-amazon.com/images/I/81GYxyoz15L._SL1500_.jpg',
                //     tag_value: 'dish detergents',
                //     background_color: '#00cc84'
                // },
                {
                    text_value: 'Bathroom Cleaners',
                    img:'https://www.meijer.com/content/dam/meijer/product/0044/60/0306/19/0044600306193_a1c1_0600.png',
                    tag_value: 'bathroom cleaners',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Trash Bags',
                    img:'https://5.imimg.com/data5/XJ/TK/TO/SELLER-35274303/garbage-bag-roll-500x500.jpg',
                    tag_value: 'trash bags',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Disinfecting Sprays',
                    img:'https://content.etilize.com/3000/1030264389.jpg',
                    tag_value: 'disinfecting sprays',
                    background_color: '#00cc84'
                },
            ];
        } else if (nav.nav2 === 'laundry care') {
            navList3 =  [
                {
                    text_value: 'Laundry Detergents',
                    img:'https://azcdn.galileo.pgsitecore.com/en-ca/-/media/Tide_CA/Images/Secondary%20Details/Tide%20Coldwater%20Clean%20Fresh%20Scent%20HE%20Turbo%20Clean%20Liquid%20Laundry%20Detergent/01Coldwater-Packshot_HE_1600.png?v=1-201808230757',
                    tag_value: 'laundry detergents',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Fabric Refreshers',
                    img:'https://www.supplychimp.com/media/extendware/ewimageopt/media/inline/9a/1/febreze-97591-fabric-refresher-odor-eliminator-tide-original-27-oz-spray-bottle-4-carton-25d.jpg',
                    tag_value: 'fabric refreshers',
                    background_color: '#00cc84'
                }
            ];
        } else if (nav.nav2 === 'kitchen') {
            navList3 =  [
                {
                    text_value: 'Dish Detergents',
                    img:'https://images-na.ssl-images-amazon.com/images/I/81GYxyoz15L._SL1500_.jpg',
                    tag_value: 'dish detergents',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Cleaning Supplies',
                    img:'https://sc01.alicdn.com/kf/HTB1p_QCJVXXXXXvaXXXq6xXFXXX6.jpg_350x350.jpg',
                    tag_value: 'cleaning supplies',
                    background_color: '#00cc84'
                }
            ];
        } else if (nav.nav2 === 'bathroom essentials') {
            navList3 =  [
                {
                    text_value: 'Flushable Wipes',
                    img:'https://b3h2.scene7.com/is/image/BedBathandBeyond/384812220561635p?$690$&wid=690&hei=690',
                    tag_value: 'flushable wipes',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Toilet Paper',
                    img:'https://images.homedepot-static.com/productImages/94dc5bfe-ffc8-440c-9987-56e02bacc46b/svn/angel-soft-toilet-paper-gep16880-64_1000.jpg',
                    tag_value: 'bathroom toilet paper',
                    background_color: '#00cc84'
                },
                {
                    text_value: 'Bathroom Cleaners',
                    img:'https://www.meijer.com/content/dam/meijer/product/0044/60/0306/19/0044600306193_a1c1_0600.png',
                    tag_value: 'bathroom cleaners',
                    background_color: '#00cc84'
                }
            ];
        } else if (nav.nav2 === 'party supplies') {
            navList3 =  [
                {
                    text_value: 'Disposable Tablewear',
                    img:'https://cdn.shopify.com/s/files/1/0020/7598/3935/products/8-silver-forks-spoons-and-knives-sets-disposable-tableware-plst-yy03-silv-5356067029055.jpg?v=1575934668',
                    tag_value: 'disposable party tablewear',
                    background_color: '#00cc84'
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
                    img:'https://media.beaut.ie/uploads/2018/12/12115356/rawpixel-797133-unsplash-1024x683.jpg',
                    tag_value: 'body lotions and creams',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Facial Cleansers',
                    img:'https://cdn.shopify.com/s/files/1/0030/0639/8553/products/natural-facial-cleanser-so-clean_1024x1024.jpg?v=1593726708',
                    tag_value: 'facial cleansers',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Facial Moisturizers',
                    img:'https://cdn.shopify.com/s/files/1/0838/7991/products/facial-moisturizer.jpg?v=1591289739',
                    tag_value: 'facial moisturizers',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'bath and body') {
            navList3 =  [
                {
                    text_value: 'Deodorants & Antiperspirants',
                    img:'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/01/267344-best_deodorants_for_men-1500x450-body1.png?w=315&h=840',
                    tag_value: 'deodorants and antiperspirants',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Body Wash & Shower Gels',
                    img:'https://target.scene7.com/is/image/Target/5xu1i-BodyWashShowerGel-QUIVER-190614-1560545740021',
                    tag_value: 'body wash and shower gels',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'oral care') {
            navList3 =  [
                {
                    text_value: 'Toothpaste',
                    img:'https://daydreameroverload.files.wordpress.com/2012/10/article-new_ds-photo_getty_article_111_206_skd191068sdc_xs.jpg?w=300&h=300',
                    tag_value: 'toothpaste',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Mouthwash',
                    img:'https://www.riteaid.com/shop/media/catalog/product/0/1/011822338448_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=406&width=406&canvas=406:406',
                    tag_value: 'mouthwash',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Floss',
                    img:'https://previews.123rf.com/images/tiraspr/tiraspr1703/tiraspr170300212/73837193-new-york-january-25-2017-a-pack-of-glide-dental-floss-isolated-on-white-background-.jpg',
                    tag_value: 'floss',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'womens makeup') {
            navList3 = null;
        } else if (nav.nav2 === 'health and wellness') {
            navList3 =  [
                {
                    text_value: 'Facial Tissues',
                    img:'https://www.kleenex.com/-/media/images/kleenex/products-new/cool-touch/boxes-upright/29388-04kft_coltuch_50ct_2_w_tissues1-(1).png',
                    tag_value: 'facial tissues',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'personal care tools and accessories') {
            navList3 =  [
                {
                    text_value: 'Cotton Swabs',
                    img:'https://assets.fishersci.com/TFS-Assets/CCG/product-images/19-1235824-22363172-STD-02.png-650.jpg',
                    tag_value: 'cotton swabs',
                    background_color: 'Tan'
                },
                {
                    text_value: 'cotton balls',
                    img:'https://www.biosealnet.com/wp-content/uploads/2019/06/8210-100-4.jpg',
                    tag_value: 'cotton balls',
                    background_color: 'Tan'
                },
                {
                    text_value: 'Makeup Brushes',
                    img:'https://i5.walmartimages.com/asr/1f5bc74c-a315-47d4-855b-9c8fbf270c6d_1.9665491640a7c4e30eb94b567d95bf91.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
                    tag_value: 'makeup brushes',
                    background_color: 'Tan'
                }
            ];
        } else if (nav.nav2 === 'dogs') {
            navList3 =  [
                {
                    text_value: 'Dog Food',
                    img:'https://previews.123rf.com/images/nenovbrothers/nenovbrothers1210/nenovbrothers121000478/15801488-dry-dog-food-on-white-background-.jpg',
                    tag_value: 'dog food',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Dog Treats',
                    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQdYiynGGwzt_JZE5dxZIPk63U7RGgFH7X6-w&usqp=CAU',
                    tag_value: 'dog snacks',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Dog Toys',
                    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpAejM9xoeCn-Wfl-moyGXnpiqnYxY5xlQoQ&usqp=CAU',
                    tag_value: 'dog toys',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Dog Supplies & Accessories',
                    img:'https://s7d2.scene7.com/is/image/PetSmart/5164567',
                    tag_value: 'dog supplies and accessories',
                    background_color: 'Teal'
                }
            ];
        } else if (nav.nav2 === 'cats') {
            navList3 =  [
                {
                    text_value: 'Cat Food',
                    img:'https://cdn.shopify.com/s/files/1/0145/8015/4422/products/country-game-for-cats-all-life-stages-1_1_1024x1024_1_46477c54-f706-4055-b877-5a11a9c23258_2000x.jpg?v=1583165204',
                    tag_value: 'cat food',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Cat Snacks',
                    img:'https://img.chewy.com/is/image/catalog/113343_MAIN._AC_SL1500_V1531754515_.jpg',
                    tag_value: 'cat snacks',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Cat Litter & Accessories',
                    img:'https://previews.123rf.com/images/bullltus/bullltus1803/bullltus180300099/97322987-woman-hand-is-cleaning-of-cat-litter-box-with-pink-scoop-pet-accessories-concept-.jpg',
                    tag_value: 'cat litter and accessories',
                    background_color: 'Teal'
                },
                {
                    text_value: 'Cat Supplies',
                    img:'https://s7d2.scene7.com/is/image/PetSmart/5287676',
                    tag_value: 'cat supplies',
                    background_color: 'Teal'
                }
            ];
        } else if (nav.nav2 === 'writing and drawing') {
            navList3 =  [
                {
                    text_value: 'Pens',
                    img:'https://media.officedepot.com/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,h_666,q_auto,w_500/c_pad,h_666,w_500/v1/products/790761/790761_p_pilot_g_2_retractable_gel_pens?pgw=1',
                    tag_value: 'pens',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Pencils',
                    img:'https://www.staples-3p.com/s7/is/image/Staples/sp42114931_sc7?wid=512&hei=512',
                    tag_value: 'pencils',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Highlighers & Markers',
                    img:'https://schoolboxkits.com/478-large_default/sharpie-accent-highlighter-fluorescent-yellow.jpg',
                    tag_value: 'highlighters and markers',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Writing Tools & Accessories',
                    img:'https://thumbs.dreamstime.com/b/pink-eraser-pink-eraser-shot-up-close-against-white-background-109966421.jpg',
                    tag_value: 'writing tools and accessories',
                    background_color: 'MediumSlateBlue'
                }
            ];
        } else if (nav.nav2 === 'paper products and organizers') {
            navList3 =  [
                {
                    text_value: 'Binders',
                    img:'https://static.grainger.com/rp/s/is/image/Grainger/35X896_AS01?$mdmain$',
                    tag_value: 'binders',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Notebooks',
                    img:'https://cdn.shopify.com/s/files/1/0160/2466/products/Notebook-Blossom-Pink_1800x.jpg?v=1589906750',
                    tag_value: 'notebooks',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Paper',
                    img:'https://images.schoolspecialty.com/images/038779_ecommfullsize.jpg',
                    tag_value: 'paper',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Folders',
                    img:'https://www.tenforums.com/geek/gars/images/2/types/thumb_14486407500Folder.png',
                    tag_value: 'folders',
                    background_color: 'MediumSlateBlue'
                },
                {
                    text_value: 'Tools & Accessories',
                    img:'https://cdn.shopify.com/s/files/1/1078/5970/products/40103_1024x1024.jpg?v=1493190691',
                    tag_value: 'paper products tools and accessories',
                    background_color: 'MediumSlateBlue'
                }
            ];
        } else if (nav.nav2 === 'womens clothing') {
            navList3 =  [
                {
                    text_value: 'Tops',
                    img:'https://ae01.alicdn.com/kf/HTB1BQPcEkCWBuNjy0Faq6xUlXXab.jpg_q50.jpg',
                    tag_value: 'womens tops',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Bottoms',
                    img:'https://cdn.shopify.com/s/files/1/0496/8693/products/womens-charcoal-small-lena-women-s-leggings-12440307433544_1024x.jpg?v=1574245765',
                    tag_value: 'womens bottoms',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Swimwear',
                    img:'https://cdn.shopify.com/s/files/1/0529/8037/products/image_27d98702-509f-4b3b-809c-bce8f839d840_1024x.jpg?v=1580832920',
                    tag_value: 'womens swimwear',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Rompers & Jumpsuits',
                    img:'https://images.express.com/is/image/expressfashion/0094_07924852_0058?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
                    tag_value: 'rompers and jumpsuits',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Activewear',
                    img:'https://c.static-nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/qnbukspgbjwqcldnpjzd/pro-womens-7-8-tights-HVLN6V.jpg',
                    tag_value: 'womens activewear',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Graphic Tees',
                    img:'https://m.media-amazon.com/images/I/51LyA6ytEKL._SR500,500_.jpg',
                    tag_value: 'womens graphic tees',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Jackets & Coats',
                    img:'https://ae01.alicdn.com/kf/H31113835d0e44e53b8a429bbbb9610eeg/Black-Cotton-Coats-Women-Casual-Hooded-Jacket-Coat-Fashion-Simple-High-Street-Slim-2018-Winter-Warm.jpg',
                    tag_value: 'womens jackets and coats',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    img:'https://images.express.com/is/image/expressfashion/0096_08411470_2052?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
                    tag_value: 'womens sweaters and cardigans',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Socks',
                    img:'https://cdn.shopify.com/s/files/1/1811/0467/products/funny-socks-women-goat-yoga-pink.png?v=1580487274',
                    tag_value: 'womens socks',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'womens shoes') {
            navList3 =  [
                {
                    text_value: 'Flip Flops & Slides',
                    img:'https://target.scene7.com/is/image/Target/GUEST_efddf1e6-2f21-4ff1-94c0-14fe8cb708c6?wid=488&hei=488&fmt=pjpeg',
                    tag_value: 'womens flip flops and slides',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Lazy',
                    img:'https://i.pinimg.com/236x/a3/53/ba/a353ba68c4ad0869b1e480c26228721d--dawn-night-time.jpg',
                    tag_value: 'womens lifestyle shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Walking Shoes',
                    img:'https://cdn.winsightmedia.com/platform/files/public/cspdn/shoes-walking.png',
                    tag_value: 'womens walking shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Boat Shoes',
                    img:'https://www.rancourtandcompany.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/0/6024-38_side.jpg',
                    tag_value: 'womens boat shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Formal Shoes',
                    img:'https://ego-co.uk.imgeng.in/media/catalog/product/cache/31e16ddd47bf27e78d7cf6f4adfe97b8/k/a/kaiablack-90.jpg?imgeng=/w_1300/',
                    tag_value: 'womens formal shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Basketball Shoes',
                    img:'https://nodawaybroadcasting.com/wp-content/uploads/2019/12/Basketball.jpg',
                    tag_value: 'womens basketball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Running Shoes',
                    img:'https://media3.s-nbcnews.com/i/newscms/2020_06/3210716/200131-nike-vaporfly-se-1126a_de432ac08eb22348178a1fd09ac99b65.jpg',
                    tag_value: 'womens running shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Soccer Shoes',
                    img:'https://www.bgcdorchester.org/wp-content/uploads/2016/05/product-soccer-ball.jpg',
                    tag_value: 'womens soccer shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Volleyball Shoes',
                    img:'https://images-na.ssl-images-amazon.com/images/I/61lj9PFLqaL._AC_SY355_.jpg',
                    tag_value: 'womens volleyball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Training & Gym Shoes',
                    img:'data:image/jpeg;base64,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',
                    tag_value: 'womens training and gym shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Skateboarding Shoes',
                    img:'https://image.made-in-china.com/2f0j00DnltaymcnNgR/Hot-Sale-Cool-Skateboard-Stuff-Canada-Maple-Old-School-Skateboards.jpg',
                    tag_value: 'womens skateboarding shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Softball Shoes',
                    img:'https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/lolorwt6fua69zqmbzln/zoom-hyperdiamond-3-elite-cs-womens-softball-cleat-VHHZ3G.jpg',
                    tag_value: 'womens softball shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Golf Shoes',
                    img:'https://progolfnow.com/wp-content/uploads/getty-images/2016/04/1195470351.jpeg',
                    tag_value: 'womens golf shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Tennis Shoes',
                    img:'https://www.lotto.it/media/catalog/product/cache/image/350x350/beff4985b56e3afdbeabfc89641a4582/2/1/210738_5Z2-01.jpg',
                    tag_value: 'womens tennis shoes',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Track & Field Shoes',
                    img:'https://di2ponv0v5otw.cloudfront.net/posts/2019/01/14/5c3d4428409c15ebb235077c/m_5c3d4ce2c2e9fe388d00e171.jpg',
                    tag_value: 'womens track and field shoes',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'womens hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'womens skin care') {
            navList3 =  [
                {
                    text_value: 'Body Lotions & Creams',
                    img:'https://media.beaut.ie/uploads/2018/12/12115356/rawpixel-797133-unsplash-1024x683.jpg',
                    tag_value: 'womens body lotions and creams',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Cleansers',
                    img:'https://cdn.shopify.com/s/files/1/0030/0639/8553/products/natural-facial-cleanser-so-clean_1024x1024.jpg?v=1593726708',
                    tag_value: 'womens facial cleansers',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Moisturizers',
                    img:'https://cdn.shopify.com/s/files/1/0838/7991/products/facial-moisturizer.jpg?v=1591289739',
                    tag_value: 'womens facial moisturizers',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'womens makeup') {
            navList3 = null;
        } else if (nav.nav2 === 'womens bath and body') {
            navList3 =  [
                {
                    text_value: 'Deodorants & Antiperspirants',
                    img:'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/01/267344-best_deodorants_for_men-1500x450-body1.png?w=315&h=840',
                    tag_value: 'womens deodorants and antiperspirants',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Body Wash & Shower Gels',
                    img:'https://target.scene7.com/is/image/Target/5xu1i-BodyWashShowerGel-QUIVER-190614-1560545740021',
                    tag_value: 'womens body wash and shower gels',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'womens health and wellness') {
            navList3 =  [
                {
                    text_value: 'Tampons',
                    img:'https://nypost.com/wp-content/uploads/sites/2/2019/10/tampon-1.jpg?quality=80&strip=all',
                    tag_value: 'tampons',
                    background_color: 'Fuchsia'
                },
                {
                    text_value: 'Facial Tissues',
                    img:'https://www.kleenex.com/-/media/images/kleenex/products-new/cool-touch/boxes-upright/29388-04kft_coltuch_50ct_2_w_tissues1-(1).png',
                    tag_value: 'womens facial tissues',
                    background_color: 'Fuchsia'
                }
            ];
        } else if (nav.nav2 === 'mens clothing') {
            navList3 =  [
                {
                    text_value: 'Sweatshirts & Hoodies',
                    img:'https://m.media-amazon.com/images/I/A1ZoIF93L0L._SR500,500_.jpg',
                    tag_value: 'mens sweatshirts and hoodies',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Graphic Tees',
                    img:'https://target.scene7.com/is/image/Target/GUEST_3f7dea65-c2df-4b59-b434-b7ac26302cad?wid=488&hei=488&fmt=pjpeg',
                    tag_value: 'mens graphic tees',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Long Sleeves',
                    img:'https://image.spreadshirtmedia.com/image-server/v1/mp/productTypes/486/views/2/appearances/2,width=300,height=300,backgroundColor=e8e8e8.jpg',
                    tag_value: 'mens long sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Short Sleeves',
                    img:'https://d15udtvdbbfasl.cloudfront.net/catalog/product/large_image/02_138686.jpg',
                    tag_value: 'mens short sleeves',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Joggers & Sweatpants',
                    img:'https://sfgroup.centracdn.net/client/dynamic/images/953_abad6258bb-120880973_3-full.jpg',
                    tag_value: 'mens joggers and sweatpants',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Shorts',
                    img:'https://cdni.llbean.net/is/image/wim/503783_30_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbstage/A0211793_2',
                    tag_value: 'mens shorts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Active Wear',
                    img:'https://i.pinimg.com/originals/fd/db/51/fddb51c382d5f017a4f57d45adf68fcf.jpg',
                    tag_value: 'mens activewear',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Sweaters & Cardigans',
                    img:'https://gloimg.gbtcdn.com/soa/gb/pdm-product-pic/Clothing/2017/08/16/goods_img_big-v1/20170816175815_61987.jpg',
                    tag_value: 'mens sweaters and cardigans',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Button Down Shirts',
                    img:'https://m.media-amazon.com/images/I/81+fpZtP9nL._SR500,500_.jpg',
                    tag_value: 'mens button down shirts',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Jackets & Coats',
                    img:'https://images.thenorthface.com/is/image/TheNorthFace/NF0A33RG_KX7_hero?$638x745$',
                    tag_value: 'mens jackets and coats',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Socks',
                    img:'https://cdn.shopify.com/s/files/1/0052/7237/1293/products/1024x1024-Socks-White-LB1_1024x1024.jpg?v=1561393817',
                    tag_value: 'mens socks',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Swimsuits',
                    img:'https://scene7.lillypulitzer.com/is/image/sugartown/002111_blueibizaaqualavista-sf?$sfraPDP1x$',
                    tag_value: 'mens swimsuits',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Accessories',
                    img:'https://ak1.ostkcdn.com/wp-content/uploads/2017/09/Luxury-Watch-e1504821921702.jpg',
                    tag_value: 'mens clothing accessories',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'mens shoes') {
            navList3 =  [
                {
                    text_value: 'Slides & Flip Flops',
                    img:'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/fab7aezacg7vaptfkfyc/benassi-jdi-slide-TDxhwg.jpg',
                    tag_value: 'mens flip flops and slides',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Boat Shoes',
                    img:'https://www.rancourtandcompany.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/0/6024-38_side.jpg',
                    tag_value: 'mens boat shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Basketball Shoes',
                    img:'https://nodawaybroadcasting.com/wp-content/uploads/2019/12/Basketball.jpg',
                    tag_value: 'mens basketball shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Running Shoes',
                    img:'https://media3.s-nbcnews.com/i/newscms/2020_06/3210716/200131-nike-vaporfly-se-1126a_de432ac08eb22348178a1fd09ac99b65.jpg',
                    tag_value: 'mens running shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Soccer Shoes',
                    img:'https://www.bgcdorchester.org/wp-content/uploads/2016/05/product-soccer-ball.jpg',
                    tag_value: 'mens soccer shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Walking Shoes',
                    img:'https://cdn.winsightmedia.com/platform/files/public/cspdn/shoes-walking.png',
                    tag_value: 'mens walking shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Formal Shoes',
                    img:'https://i.frg.im/WaFDbrsr/shoes-3976-1.jpg',
                    tag_value: 'mens formal shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Training & Gym Shoes',
                    img:'data:image/jpeg;base64,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',
                    tag_value: 'mens training and gym shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Skateboarding Shoes',
                    img:'https://image.made-in-china.com/2f0j00DnltaymcnNgR/Hot-Sale-Cool-Skateboard-Stuff-Canada-Maple-Old-School-Skateboards.jpg',
                    tag_value: 'mens skateboarding shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Football Shoes',
                    img:'https://besto24.com/51062-large_default/football-shoes-puma-one-1-il-lth-fg-ag.jpg',
                    tag_value: 'mens football shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Baseball Shoes',
                    img:'https://upload.wikimedia.org/wikipedia/en/1/1e/Baseball_%28crop%29.jpg',
                    tag_value: 'mens baseball shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Golf Shoes',
                    img:'https://progolfnow.com/wp-content/uploads/getty-images/2016/04/1195470351.jpeg',
                    tag_value: 'mens golf shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Tennis Shoes',
                    img:'https://www.lotto.it/media/catalog/product/cache/image/350x350/beff4985b56e3afdbeabfc89641a4582/2/1/210738_5Z2-01.jpg',
                    tag_value: 'mens tennis shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Track & Field Shoes',
                    img:'https://di2ponv0v5otw.cloudfront.net/posts/2019/01/14/5c3d4428409c15ebb235077c/m_5c3d4ce2c2e9fe388d00e171.jpg',
                    tag_value: 'mens track and field shoes',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Lazy',
                    img:'https://i.pinimg.com/236x/a3/53/ba/a353ba68c4ad0869b1e480c26228721d--dawn-night-time.jpg',
                    tag_value: 'mens lazy shoes',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'mens hair care') {
            navList3 = null;
        } else if (nav.nav2 === 'mens skin care') {
            navList3 =  [
                {
                    text_value: 'Body Lotions & Creams',
                    img:'https://media.beaut.ie/uploads/2018/12/12115356/rawpixel-797133-unsplash-1024x683.jpg',
                    tag_value: 'mens body lotions and creams',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Facial Cleansers',
                    img:'https://cdn.shopify.com/s/files/1/0030/0639/8553/products/natural-facial-cleanser-so-clean_1024x1024.jpg?v=1593726708',
                    tag_value: 'mens facial cleansers',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Facial Moisturizers',
                    img:'https://cdn.shopify.com/s/files/1/0838/7991/products/facial-moisturizer.jpg?v=1591289739',
                    tag_value: 'mens facial moisturizers',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'shaving') {
            navList3 = null;
        } else if (nav.nav2 === 'mens bath and body') {
            navList3 =  [
                {
                    text_value: 'Deodorants & Antiperspirants',
                    img:'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/01/267344-best_deodorants_for_men-1500x450-body1.png?w=315&h=840',
                    tag_value: 'mens deodorants and antiperspirants',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Body Wash & Shower Gel',
                    img:'https://target.scene7.com/is/image/Target/5xu1i-BodyWashShowerGel-QUIVER-190614-1560545740021',
                    tag_value: 'mens body wash and shower gel',
                    background_color: 'DeepSkyBlue'
                }
            ];
        } else if (nav.nav2 === 'mens health and wellness') {
            navList3 =  [
                {
                    text_value: 'Condoms',
                    img:'https://muvs.org/media/filer_public/ad/90/ad90f1d9-2bef-4f4d-ac89-7343ef2ac017/1109_00_dl.jpg',
                    tag_value: 'condoms',
                    background_color: 'DeepSkyBlue'
                },
                {
                    text_value: 'Facial Tissues',
                    img:'https://www.kleenex.com/-/media/images/kleenex/products-new/cool-touch/boxes-upright/29388-04kft_coltuch_50ct_2_w_tissues1-(1).png',
                    tag_value: 'mens facial tissues',
                    background_color: 'DeepSkyBlue'
                }
            ];
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
            <a href={`https://www.cardboardexpress.com/collection?filter=${nav_item.tag_value}`}>
                <NavItem 
                    key={index} 
                    background={nav.nav1 === nav_item.tag_value ? nav_item.background_color : "#fff"}
                    hover={nav_item.background_color}
                    color={nav.nav1 === nav_item.tag_value ? "#fff" : "#3c4043"}
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
            <a href={`https://www.cardboardexpress.com/collection?filter=${nav_item.tag_value}`}>
                <NavItem 
                    key={index} 
                    background={nav.nav2 === nav_item.tag_value ? nav_item.background_color : "#fff"}
                    hover={nav_item.background_color}
                    color={nav.nav2 === nav_item.tag_value ? "#fff" : "#3c4043"}
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
            <a href={`https://www.cardboardexpress.com/collection?filter=${nav_item.tag_value}`}>
                <NavItem 
                    key={index} 
                    background={nav.nav3 === nav_item.tag_value ? nav_item.background_color : "#fff"}
                    hover={nav_item.background_color}
                    color={nav.nav3 === nav_item.tag_value ? "#fff" : "#3c4043"}
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
    clearProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    nav: state.nav
});

export default connect(mapStateToProps, { handleTags, setSortedProducts, removeTags, clearProducts, setNav1, setNav2, setNav3, removeNav1, removeNav2, removeNav3 })(Navbar);