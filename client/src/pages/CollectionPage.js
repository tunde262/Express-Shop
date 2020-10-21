import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleTags, clearProducts } from '../actions/productActions';
import axios from 'axios';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import ProductList from '../components/ProductList/ProductList';
import Container from '../components/ProductList/Container';
import AuthModal from '../components/modals/AuthModal';
import { setNav1, setNav2, setNav3 } from '../actions/navActions';

const CollectionPage = ({ handleTags, clearProducts, product, auth: { isAuthenticated, user, loading }, setNav1, setNav2, setNav3 }) => {

    const [skip, setSkip] = useState(0);
    const [tableShow1, setTableShow1] = useState('for you');
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [maxSkip, setMaxSkip] = useState(null);

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const url_filter = (window.location.href);
    const url = new URL(url_filter);
    const filter = url.searchParams.get("filter");

    const getProducts = async () => {
        console.log("MAXSKIP Above: " + maxSkip)
        if(skip < maxSkip && maxSkip !== null) {
            handleTags(filter, skip);
            setProductsLoaded(true);
        }
    } 

    const getMax = async () => {
        try {
            const res = await axios.get(`/api/products/filter/full/${filter}`);
            console.log('requested: ' + res.data);
            const totalProducts = res.data;
            console.log('total Products: ' + totalProducts);
            setMaxSkip(totalProducts.length);
            console.log("MAXSKIP: " + totalProducts.length);
        } catch (err) {
            console.log(err)
        }
    } 

    const handleNavLists = (filter) => {
        if(filter === 'explore' || filter === 'clothing and fashion' || filter === 'shoes' || filter === 'household essentials' || filter === 'personal care' || filter === 'pets' || filter === 'school and office supplies' || filter === 'women' || filter === 'men' || filter === 'bathroom' || filter === 'laundry') {
            setNav1(filter);
        } else if (filter === 'mens clothing and fashion' || filter === 'womens clothing and fashion' || filter === 'tops' || filter === 'bottoms' || filter === 'hats') {
            setNav1('clothing and fashion');
            setNav2(filter);
        } else if (filter === 'flip flops and sandals' || filter === 'basketball shoes' || filter === 'boat shoes' || filter === 'formal shoes' || filter === 'lazy shoes' || filter === 'running shoes' || filter === 'walking shoes' || filter === 'football shoes' || filter === 'soccer shoes' || filter === 'volleyball shoes' || filter === 'training and gym shoes' || filter === 'skateboarding shoes' || filter === 'baseball shoes' || filter === 'golf shoes' || filter === 'tennis shoes' || filter === 'track and field shoes') {
            setNav1('shoes');
            setNav2(filter);
        } else if (filter === 'paper and plastic' || filter === 'cleaning supplies' || filter === 'laundry care' || filter === 'kitchen' || filter === 'bathroom essentials' || filter === 'party supplies' || filter === 'air fresheners') {
            setNav1('household essentials');
            setNav2(filter);
        } else if (filter === 'hair care' || filter === 'skin care' || filter === 'bath and body' || filter === 'oral care' || filter === 'health and wellness' || filter === 'personal care tools and accessories') {
            setNav1('personal care');
            setNav2(filter);
        } else if (filter === 'dogs' || filter === 'cats') {
            setNav1('pets');
            setNav2(filter);
        } else if (filter === 'writing and drawing' || filter === 'school and office tools and accessories') {
            setNav1('school and office supplies');
            setNav2(filter);
        } else if (filter === 'womens clothing' || filter === 'womens shoes' || filter === 'womens hair care' || filter === 'womens skin care' || filter === 'womens makeup' || filter === 'womens bath and body' || filter === 'womens health and wellness') {
            setNav1('women');
            setNav2(filter);
        } else if (filter === 'mens clothing' || filter === 'mens shoes' || filter === 'mens hair care' || filter === 'mens skin care' || filter === 'mens shaving' || filter === 'mens bath and body' || filter === 'mens health and wellness') {
            setNav1('men');
            setNav2(filter);
        } else if (filter === 'toilet paper' || filter === 'flushable wipes' || filter === 'bathroom cleaners' || filter === 'bathroom tools and accessories' || filter === 'mens shaving' || filter === 'mens bath and body' || filter === 'mens health and wellness') {
            setNav1('bathroom');
            setNav2(filter);
        } else if (filter === 'laundry detergents' || filter === 'fabric refreshers' || filter === 'laundry tools and accessories') {
            setNav1('laundry');
            setNav2(filter);
        } else if (filter === 'mens fashion sweatshirts and hoodies' || filter === 'mens fashion graphic tees' || filter === 'mens fashion long sleeves' || filter === 'mens fashion short sleeves' || filter === 'mens fashion joggers and sweatpants' || filter === 'mens fashion shorts' || filter === 'mens fashion dress shirts' || filter === 'mens fashion activewear' || filter === 'mens fashion sweaters and cardigans' || filter === 'mens fashion button down shirts' || filter === 'mens fashion jackets and coats' || filter === 'mens fashion socks' || filter === 'mens fashion swimsuits' || filter === 'mens clothing and fashion accessories') {
            setNav1('clothing and fashion');
            setNav2('mens clothing and fashion');
            setNav3(filter);
        } else if (filter === 'womens fashion tops' || filter === 'dresses' || filter === 'womens fashion bottoms' || filter === 'womens fashion swimwear' || filter === 'womens fashion rompers and jumpsuits' || filter === 'womens fashion activewear' || filter === 'womens fashion graphic tees' || filter === 'womens fashion jackets and coats' || filter === 'womens fashion sweaters and cardigans' || filter === 'womens fashion socks' || filter === 'womens clothing and fashion accessories') {
            setNav1('clothing and fashion');
            setNav2('womens clothing and fashion');
            setNav3(filter);
        } else if (filter === 'graphic tees' || filter === 'sweatshirts and hoodies' || filter === 'long sleeves' || filter === 'short sleeves' || filter === 'tank tops') {
            setNav1('clothing and fashion');
            setNav2('tops');
            setNav3(filter);
        } else if (filter === 'joggers and sweatpants' || filter === 'shorts' || filter === 'skirts' || filter === 'underwear') {
            setNav1('clothing and fashion');
            setNav2('bottoms');
            setNav3(filter);
        } else if (filter === 'dad caps' || filter === 'snapback hats') {
            setNav1('clothing and fashion');
            setNav2('hats');
            setNav3(filter);
        } else if (filter === 'paper towels' || filter === 'toilet paper' || filter === 'plastic trash bags' || filter === 'plastic and food storage bags' || filter === 'aluminum foil' || filter === 'plastic wraps' || filter === 'disposable tablewear') {
            setNav1('household essentials');
            setNav2('paper and plastic');
            setNav3(filter);
        } else if (filter === 'cleaning wipes' || filter === 'cleaning tools and accessories' || filter === 'bathroom cleaners' || filter === 'trash bags' || filter === 'disinfecting sprays') {
            setNav1('household essentials');
            setNav2('cleaning supplies');
            setNav3(filter);
        } else if (filter === 'laundry detergents' || filter === 'fabric refreshers') {
            setNav1('household essentials');
            setNav2('laundry care');
            setNav3(filter);
        } else if (filter === 'dish detergents' || filter === 'cleaning supplies') {
            setNav1('household essentials');
            setNav2('kitchen');
            setNav3(filter);
        } else if (filter === 'flushable wipes' || filter === 'bathroom toilet paper' || filter === 'bathroom cleaners') {
            setNav1('household essentials');
            setNav2('bathroom essentials');
            setNav3(filter);
        } else if (filter === 'disposable party tablewear') {
            setNav1('household essentials');
            setNav2('party supplies');
            setNav3(filter);
        } else if (filter === 'body lotions and creams' || filter === 'facial cleansers' || filter === 'facial moisturizers') {
            setNav1('personal care');
            setNav2('skin care');
            setNav3(filter);
        } else if (filter === 'deodorants and antiperspirants' || filter === 'body wash and shower gels') {
            setNav1('personal care');
            setNav2('bath and body');
            setNav3(filter);
        } else if (filter === 'toothpaste' || filter === 'mouthwash' || filter === 'floss') {
            setNav1('personal care');
            setNav2('oral care');
            setNav3(filter);
        } else if (filter === 'facial tissues') {
            setNav1('personal care');
            setNav2('health and wellness');
            setNav3(filter);
        } else if (filter === 'cotton swabs' || filter === 'cotton balls' || filter === 'makeup brushes') {
            setNav1('personal care');
            setNav2('personal care tools and accessories');
            setNav3(filter);
        } else if (filter === 'dog food' || filter === 'dog snacks' || filter === 'dog toys' || filter === 'dog supplies and accessories') {
            setNav1('personal care');
            setNav2('dogs');
            setNav3(filter);
        } else if (filter === 'cat food' || filter === 'cat snacks' || filter === 'cat litter and accessories' || filter === 'cat supplies') {
            setNav1('personal care');
            setNav2('cats');
            setNav3(filter);
        } else if (filter === 'pens' || filter === 'pencils' || filter === 'highlighters and markers' || filter === 'writing tools and accessories') {
            setNav1('school and office supplies');
            setNav2('writing and drawing');
            setNav3(filter);
        } else if (filter === 'binders' || filter === 'notebooks' || filter === 'paper' || filter === 'folders' || filter === 'paper products tools and accessories') {
            setNav1('school and office supplies');
            setNav2('paper products and organizers');
            setNav3(filter);
        } else if (filter === 'womens tops' || filter === 'womens bottoms' || filter === 'womens swimwear' || filter === 'rompers and jumpsuits' || filter === 'womens activewear' || filter === 'womens graphic tees' || filter === 'womens jackets and coats' || filter === 'womens sweaters and cardigans' || filter === 'womens socks' || filter === 'womens activewear') {
            setNav1('women');
            setNav2('womens clothing');
            setNav3(filter);
        } else if (filter === 'womens flip flops and slides' || filter === 'womens lifestyle shoes' || filter === 'womens walking shoes' || filter === 'womens boat shoes' || filter === 'womens formal shoes' || filter === 'womens basketball shoes' || filter === 'womens running shoes' || filter === 'womens soccer shoes' || filter === 'womens volleyball shoes' || filter === 'womens training and gym shoes' || filter === 'womens skateboarding shoes' || filter === 'womens softball shoes' || filter === 'womens golf shoes' || filter === 'womens tennis shoes' || filter === 'womens track and field shoes') {
            setNav1('women');
            setNav2('womens shoes');
            setNav3(filter);
        } else if (filter === 'womens body lotions and creams' || filter === 'womens facial cleansers' || filter === 'womens facial moisturizers') {
            setNav1('women');
            setNav2('womens skin care');
            setNav3(filter);
        } else if (filter === 'womens deodorants and antiperspirants' || filter === 'womens body wash and shower gels') {
            setNav1('women');
            setNav2('womens bath and body');
            setNav3(filter);
        } else if (filter === 'tampons' || filter === 'womens facial tissues') {
            setNav1('women');
            setNav2('womens health and wellness');
            setNav3(filter);
        } else if (filter === 'mens sweatshirts and hoodies' || filter === 'mens graphic tees' || filter === 'mens long sleeves' || filter === 'mens short sleeves' || filter === 'mens joggers and sweatpants' || filter === 'mens shorts' || filter === 'mens activewear' || filter === 'mens sweaters and cardigans' || filter === 'mens button down shirts' || filter === 'mens jackets and coats' || filter === 'mens socks' || filter === 'mens swimsuits' || filter === 'mens clothing accessories') {
            setNav1('men');
            setNav2('mens clothing');
            setNav3(filter);
        } else if (filter === 'mens flip flops and slides' || filter === 'mens boat shoes' || filter === 'mens basketball shoes' || filter === 'mens running shoes' || filter === 'mens soccer shoes' || filter === 'mens walking shoes' || filter === 'mens formal shoes' || filter === 'mens training and gym shoes' || filter === 'mens skateboarding shoes' || filter === 'mens football shoes' || filter === 'mens baseball shoes' || filter === 'mens golf shoes' || filter === 'mens tennis shoes' || filter === 'mens track and field shoes' || filter === 'mens lazy shoes') {
            setNav1('men');
            setNav2('mens shoes');
            setNav3(filter);
        } else if (filter === 'mens body lotions and creams' || filter === 'mens facial cleansers' || filter === 'mens facial moisturizers') {
            setNav1('men');
            setNav2('mens skin care');
            setNav3(filter);
        } else if (filter === 'mens deodorants and antiperspirants' || filter === 'mens body wash and shower gel') {
            setNav1('men');
            setNav2('mens bath and body');
            setNav3(filter);
        } else if (filter === 'condoms' || filter === 'mens facial tissues') {
            setNav1('men');
            setNav2('mens health and wellness');
            setNav3(filter);
        }

        setProductsLoaded(true);
    }
    
    useEffect(() => {
        handleTags(filter, skip);

        if(!productsLoaded) {
            handleNavLists(filter);
        }
        
        console.log("FILTER: " + filter);
    }, [skip, filter]);

    // const getInitialProducts = async () => {
    //     setProductsLoaded(true);
    
    //     handleTags(filter, skip);
    // } 

    // if(!productsLoaded) {
    //     getProducts();
    // }

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }

    const handleMixpanel = () => {
        var url_filter = (window.location.href);
        var url = new URL(url_filter);
        var filter = url.searchParams.get("filter");

        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.identify(user._id);
        mixpanel.track("View Shop Collection Page", {
        //   "Entry Point": "Home Landing",
        //   "# of Results Returned": "A",
          "Chosen Category": `${filter}`
        });
    }

        return (
            <Fragment>
                <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll', background:'rgb(247, 247, 247)'}}>
                    {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}
                    <ul class="home-underline store" style={{background:'#fff', margin:'0', border:'1px solid rgb(214, 214, 214)'}}>
                        <div onClick={e => setTableShow1('for you')} className={tableShow1 === "for you" && "active"}><li><p>For You</p></li></div>
                        <div onClick={e => setTableShow1('popular')} className={tableShow1 === "popular" && "active"}><li><p>Popular</p></li></div>
                        <div onClick={e => setTableShow1('nearby')} className={tableShow1 === "nearby" && "active"}><li><p>Nearby</p></li></div>
                    </ul>
                    <div className="header-nav-container">
                        <div style={{padding:'10px'}}>
                            <h3 style={{fontSize:'12px', letterSpacing:'1px',color:'#808080'}}>
                                Pick A Category
                            </h3>
                        </div>
                        <div style={{marginTop:'-2rem'}}>
                            <Header />
                        </div>
                    </div>
                    <div className="filter-container">
                        <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                        <i class="fas fa-sliders-h"></i>
                    </div>
                    {/* <h1>Collection Page</h1> */}
                    <div className="product-list-container">
                        <Container />
                    </div>
                </div>
                {/* <Footer /> */}
                {!loading && !isAuthenticated ? <AuthModal /> : null }
            </Fragment>
        )
}

CollectionPage.propTypes = {
    handleTags: PropTypes.func.isRequired,
    clearProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setNav1: PropTypes.func.isRequired,
    setNav2: PropTypes.func.isRequired,
    setNav3: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { handleTags, clearProducts, setNav1, setNav2, setNav3 })(CollectionPage);
