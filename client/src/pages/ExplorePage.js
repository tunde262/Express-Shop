import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import mixpanel from 'mixpanel-browser';

// Footer
import Footer from './Home/Footer';

import AuthModal from '../components/modals/AuthModal';


import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import BrandOverview from '../components/Overview/brandOverview/BrandOverview';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';
import sliderImg1 from '../utils/imgs/banner21.jpg';
import sliderImg2 from '../utils/imgs/foodbag.jpg';
import sliderImg3 from '../utils/imgs/porchdeliv.jpg';
import catImg1 from '../utils/imgs/paper_towels.jpeg';
import boxesImg from '../utils/imgs/banner13.jpg';
import Banner from '../components/common/Banner';
import carousell1 from '../utils/imgs/carousell1.jpg';
import carousell2 from '../utils/imgs/carousell2.jpg';
import Container from '../components/ProductList/Container';
import DefaultBanner from '../utils/imgs/placeholderimg.jpg'
import topImage from '../utils/imgs/christmasDraw.jpeg';
import secondaryImage from '../utils/imgs/carousellChristmas.jpeg';
import bottomImage from '../utils/imgs/stayHome.jpeg'

import { setMainNav, setNav1, setNav2, setNav3, setPage } from '../actions/navActions';
import { getFeaturedStores, getTrendingStores } from '../actions/storeActions';
import { getTrendingCollections, getCollectionsByTagList, getCollections } from '../actions/collectionActions';
import { getProducts } from '../actions/productActions';


import FeaturedStores from '../components/explore_components/stores_featured/StoresList';
import FeaturedCollections from '../components/explore_components/collections_featured/CollectionsList';
import TrendingCollections from '../components/explore_components/collections_featured/TrendingCollections';
import SlidingBanner from '../components/explore_components/sliding_banner/SlidingBanner';
import PreviewList from '../components/explore_components/PreviewList/Preview_List';

import paperPlasticData from '../utils/categoryData/household_essentials/paper_plastic/ess_paperPlastic';
import mainData from '../utils/categoryData/main';
import clothingData from '../utils/categoryData/clothing_fashion/clothingFashion_main';

import gainLogo from '../utils/imgs/gainlogo.jpg';
import categoryImg from '../utils/imgs/personal_care_promo_block.jpg';
import helpImg from '../utils/imgs/help_us_banner.jpg';
import shoeSampleImg from '../utils/imgs/20484728.jpeg';
import paperTowelImg from '../utils/imgs/paper_towels.jpeg';
import profileReducer from '../reducers/profileReducer';

const ExplorePage = ({
    getProducts, 
    getFeaturedStores,
    getTrendingStores,
    getTrendingCollections,
    getCollectionsByTagList,
    getCollections,
    setMainNav, 
    setNav1, 
    setNav2, 
    setNav3, 
    setPage, 
    auth,
    nav: { 
        page 
    }, 
    product: { 
        loading, 
        products, 
        featuredProducts
    },
    collection,
    profile
}) => {
    const [skip, setSkip] = useState(0);
    const [gotTopCollections, setGotTopCollections] = useState(false);

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        getProducts(skip);
        getFeaturedStores(skip);
        getTrendingStores(skip);

        setMainNav('store');
        setPage('home');

        setNav1('clothing and fashion');
        setNav2('mens clothing and fashion');
        setNav3('mens fashion sweatshirts and hoodies');

        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [skip]);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    // const handleScroll = (e) => {
    //     const { offsetHeight, scrollTop, scrollHeight} = e.target
    
    //     if (offsetHeight + scrollTop === scrollHeight) {
    //       setSkip(products.length)
    //     }
    // }

    const handleMixpanel = () => {
        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.track("View Explore Page", {
        //   "Entry Point": "Home Landing",
        });
    }

    if(!sentMixpanel) {
        handleMixpanel();
        setSentMixpanel(true);
    };

    if(!gotTopCollections) {
        if(profile.profile) {
            getCollectionsByTagList(profile.profile.recommendation_tags, skip);
        } else {
            getCollections(skip);
        }

        setGotTopCollections(true)
    }

    const isMobile = windowWidth <= 769;

    const isTablet = windowWidth <= 1000;
    
    return (
        <div className="explore-container">
            {/* <Banner imgLarge={topImage} imgSmall={topImage} /> */}
            
            {/* <TrendingCollections /> */}

            <FeaturedStores />
            
            {/* <Banner imgLarge={secondaryImage} imgSmall={secondaryImage} /> */}
            {/* <SlidingBanner /> */}

            {/* Featured Stores */}
            {/* <div className="mobile"style={{margin:'0 1rem'}}>
                <h6>Today's Top Stores</h6>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <BrandOverview />
                </div>
            </div> */}


            {/* {!isMobile && (
                <div style={{background:'#fff', margin:'10px', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', border:'1px solid rgb(214, 214, 214)'}}>
                    <div style={{margin:'10px', height:'100px',display:'flex', borderRight:'1px solid #e8e8e8', justifyContent:'center', alignItems:'center'}}>
                        <div style={{height:'56px', width:'56px', borderRadius:'50%',  background:'#ffbf00', margin:'0 1.5rem'}}></div>
                        <p style={{margin:'0', fontSize:'1rem'}}>Same-Day Delivery</p>
                    </div>
                    <div style={{margin:'10px', height:'100px', display:'flex', borderRight:'1px solid #e8e8e8', justifyContent:'center', alignItems:'center'}}>
                        <div style={{height:'60px', width:'60px', borderRadius:'50%', background:'#ffbf00', margin:'0 1.5rem'}}></div>
                        <p style={{margin:'0', fontSize:'1rem'}}>Thousands of Stores</p>
                    </div>
                    <div style={{margin:'10px', height:'100px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div style={{height:'60px', width:'60px', borderRadius:'50%', background:'#ffbf00', margin:'0 1.5rem'}}></div>
                        <p style={{margin:'0', fontSize:'1rem'}}>24/7 Customer Support</p>
                    </div>
                </div>
            )} */}

            {/* <FeaturedCollections collections={collection.collections} /> */}


            <PreviewList tag_value={mainData[2].tag_value} img={mainData[2].img} />
            
            {/* <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <ProductOverview title="Flash Deals" products={products} link={`/home`} />
                </div>
            </div> */}

            {/* <Banner imgLarge={bottomImage} imgSmall={bottomImage} /> */}
            {/* <SlidingBanner /> */}

            {/* <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <p>Popular Locations</p>
                <div className="trending-block">
                    <div style={{height:'100px',display:'grid', gridGap:'1rem', gridTemplateColumns:'2fr 1fr', border:'1px solid #e8e8e8'}}>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', margin:'0 1.5rem', padding:'10px'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Oversized Tee</p>
                            <p style={{color:'#808080', margin:'0', fontSize:'12px'}}>20k+ monthly shoppers</p>
                        </div>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center'}}>
                            <img style={{height:'80px'}} src={paperTowelImg} />
                        </div>
                    </div>
                    <div style={{height:'100px', display:'grid', overflow:'hidden', gridGap:'1rem', gridTemplateColumns:'2fr 1fr', border:'1px solid #e8e8e8'}}>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', margin:'0 1.5rem', padding:'10px'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Oversized Tee</p>
                            <p style={{color:'#808080', margin:'0', fontSize:'12px'}}>20k+ monthly shoppers</p>
                        </div>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center'}}>
                            <img style={{height:'80px'}} src={shoeSampleImg} />
                        </div>
                    </div>
                    <div style={{height:'100px', display:'grid', overflow:'hidden', gridGap:'1rem', gridTemplateColumns:'2fr 1fr', border:'1px solid #e8e8e8'}}>
                        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', margin:'0 1.5rem', padding:'10px'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Oversized Tee</p>
                            <p style={{color:'#808080', margin:'0', fontSize:'12px'}}>20k+ monthly shoppers</p>
                        </div>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center'}}>
                            <img style={{height:'80px'}} src={paperTowelImg} />
                        </div>
                    </div>
                    {!isTablet && (
                        <div style={{height:'100px', display:'grid', overflow:'hidden', gridTemplateColumns:'2fr 1fr', border:'1px solid #e8e8e8'}}>
                            <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', margin:'0 1.5rem', padding:'10px'}}>
                                <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Oversized Tee</p>
                                <p style={{color:'#808080', margin:'0', fontSize:'12px'}}>20k+ monthly shoppers</p>
                            </div>
                            <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center'}}>
                                <img style={{height:'80px'}} src={paperTowelImg} />
                            </div>
                        </div>
                    )}
                </div>
            </div> */}

            <div style={{background:'#fff', margin:'10px', border:'1px solid #e3e8ee'}}>
                <div style={{margin:'1rem 0'}}>
                    <ProductOverview title="Recently looked at..." products={products} link={`/home`} />
                </div>
            </div>

            {/* <div className="secondary-block" style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', overflow:'hidden', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>
                        <img style={{width:'100%', height:'100%'}} src={categoryImg} />
                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', overflow:'hidden', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>
                        <img style={{width:'100%', height:'100%'}} src={categoryImg} />
                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%'}}>
                    <div style={{height:'236px', width:'100%', overflow:'hidden', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>
                        <img style={{width:'100%', height:'100%'}} src={categoryImg} />
                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
            </div> */}

            <PreviewList tag_value={paperPlasticData[1].tag_value} img={paperPlasticData[1].img} />

            <PreviewList tag_value={clothingData[2].tag_value} img={clothingData[2].img} />

            <PreviewList tag_value={mainData[4].tag_value} img={mainData[4].img} />

            <Footer />
            {!auth.loading && !auth.isAuthenticated ? <AuthModal /> : null }
        </div>
    )
}

ExplorePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getFeaturedStores: PropTypes.func.isRequired,
    getTrendingStores: PropTypes.func.isRequired,
    getTrendingCollections: PropTypes.func.isRequired,
    getCollections: PropTypes.func.isRequired,
    getCollectionsByTagList: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    setMainNav: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setNav2: PropTypes.func.isRequired,
    setNav3: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    collection: state.collection,
    nav: state.nav,
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { 
    getProducts, 
    getFeaturedStores,
    getTrendingStores,
    getTrendingCollections,
    getCollections,
    getCollectionsByTagList,
    setMainNav,
    setNav1, 
    setNav2, 
    setNav3, 
    setPage 
})(ExplorePage);
