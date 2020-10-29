import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import mixpanel from 'mixpanel-browser';

// Footer
import Footer from '../components/layout/Footer/Footer';


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
import Header from '../components/header/Header';
import { setNav1, setNav2, setNav3 } from '../actions/navActions';
import { HorizontalNav } from '../components/common/HorizontalNav';

import YoutubeBlock from '../components/common/YoutubeBlock';

import topStores from '../TopStoresData';
import trendingStores from '../TrendingStoresData';

import gainLogo from '../utils/imgs/gainlogo.jpg';
import categoryImg from '../utils/imgs/personal_care_promo_block.jpg';
import helpImg from '../utils/imgs/help_us_banner.jpg';
import shoeSampleImg from '../utils/imgs/20484728.jpeg';
import paperTowelImg from '../utils/imgs/paper_towels.jpeg';

const ExplorePage = ({getProducts, setNav1, setNav2, setNav3, product: { loading, products, featuredProducts}}) => {
    const [skip, setSkip] = useState(0);
    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [topStoreList, setTopStoreList] = useState(topStores);
    const [trendingStoreList, setTrendingStoreList] = useState(trendingStores);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('top stores');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        getProducts(skip);
        setNav1('clothing and fashion');
        setNav2('mens clothing and fashion');
        setNav3('mens fashion sweatshirts and hoodies');

        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [skip]);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(products.length)
        }
    }

    const handleMixpanel = () => {
        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.track("View Explore Page", {
        //   "Entry Point": "Home Landing",
        });
    }

    let topStoreContent1;
    let topStoreContent2;
    let topStoreContent3;
 
    if(topStoreList !== null && topStoreList.length > 0) {
        const storeList1 = topStoreList.slice(0, 3);
        const storeList2 = topStoreList.slice(3, 6);
        const storeList3 = topStoreList.slice(6, 9);
        topStoreContent1 = storeList1.map(store => (
            <Link to={`/store/${store._id}`}>
                <div style={
                    { 
                    width:'100%', 
                    borderBottom:'1px solid #e8e8e8', 
                    background:'#fff', 
                    height:'100px',
                    display:'flex', 
                    alignItems:'center'
                    }
                }>
                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>{store.name}</p>
                                <p style={{margin:'0', color:'#808080'}}>{store.category}</p>
                            </div>
                            
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </Link>
        ));

        topStoreContent2 = storeList2.map(store => (
            <Link to={`/store/${store._id}`}>
                <div style={
                    { 
                    width:'100%', 
                    borderBottom:'1px solid #e8e8e8', 
                    background:'#fff', 
                    height:'100px',
                    display:'flex', 
                    alignItems:'center'
                    }
                }>
                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>{store.name}</p>
                                <p style={{margin:'0', color:'#808080'}}>{store.category}</p>
                            </div>
                            
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </Link>
        ));

        topStoreContent3 = storeList3.map(store => (
            <Link to={`/store/${store._id}`}>
                <div style={
                    { 
                    width:'100%', 
                    borderBottom:'1px solid #e8e8e8', 
                    background:'#fff', 
                    height:'100px',
                    display:'flex', 
                    alignItems:'center'
                    }
                }>
                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>{store.name}</p>
                                <p style={{margin:'0', color:'#808080'}}>{store.category}</p>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </Link>
        ));
    };

    let trendingStoreContent1;
    let trendingStoreContent2;
    let trendingStoreContent3;
 
    if(trendingStoreList !== null && trendingStoreList.length > 0) {
        const storeList1 = trendingStoreList.slice(0, 3);
        const storeList2 = trendingStoreList.slice(3, 6);
        const storeList3 = trendingStoreList.slice(6, 9);
        trendingStoreContent1 = storeList1.map(store => (
            <Link to={`/store/${store._id}`}>
                <div style={
                    { 
                    width:'100%', 
                    borderBottom:'1px solid #e8e8e8', 
                    background:'#fff', 
                    height:'100px',
                    display:'flex', 
                    alignItems:'center'
                    }
                }>
                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>{store.name}</p>
                                <p style={{margin:'0', color:'#808080'}}>{store.category}</p>
                            </div>
                            
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </Link>
        ));

        trendingStoreContent2 = storeList2.map(store => (
            <Link to={`/store/${store._id}`}>
                <div style={
                    { 
                    width:'100%', 
                    borderBottom:'1px solid #e8e8e8', 
                    background:'#fff', 
                    height:'100px',
                    display:'flex', 
                    alignItems:'center'
                    }
                }>
                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>{store.name}</p>
                                <p style={{margin:'0', color:'#808080'}}>{store.category}</p>
                            </div>
                            
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </Link>
        ));

        trendingStoreContent3 = storeList3.map(store => (
            <Link to={`/store/${store._id}`}>
                <div style={
                    { 
                    width:'100%', 
                    borderBottom:'1px solid #e8e8e8', 
                    background:'#fff', 
                    height:'100px',
                    display:'flex', 
                    alignItems:'center'
                    }
                }>
                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div>
                                <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`}/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <p style={{margin:'0'}}>{store.name}</p>
                                <p style={{margin:'0', color:'#808080'}}>{store.category}</p>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <button>Subscribe</button>
                        </div>
                    </div>
                </div>
            </Link>
        ));
    };

    let featuredContent;
    let featuredContent2;

    featuredContent = (
        <div className="store-grid">
            {topStoreList.length > 0 ? (
                <div className="grid-rows">
                    <div>
                        {topStoreContent1}
                    </div>
                    <div>
                        {topStoreContent2}
                    </div>
                    <div>
                        {topStoreContent3}
                    </div>
                </div>
            ) : (
                <h2>Sorry Nothing Today...</h2>
            )}
        </div>
    );
    featuredContent2 = (
        <div className="store-grid">
            {topStoreList.length > 0 ? (
                <div className="grid-rows">
                    <div>
                        {trendingStoreContent1}
                    </div>
                    <div>
                        {trendingStoreContent2}
                    </div>
                    <div>
                        {trendingStoreContent3}
                    </div>
                </div>
            ) : (
                <h2>Sorry Nothing Today...</h2>
            )}
        </div>
    );

    if(!sentMixpanel) {
        handleMixpanel();
        setSentMixpanel(true);
    };

    const isMobile = windowWidth <= 769;

    const isTablet = windowWidth <= 1000;
    
    return (
        <div style={{background:'rgb(247, 247, 247)'}}>
            {/* First Slider */}
            {/* <div className="container-fluid" onScroll={handleScroll} style={{height:"100vh"}}>
                <div className="site-slider">
                    <Slider {...settings1}>
                        <div>
                            <img src={sliderImg1} className="img-fluid" alt="Banner 1" />
                        </div>
                        <div>
                            <img src={sliderImg2} className="img-fluid" alt="Banner 2" />
                        </div>
                        <div>
                            <img src={sliderImg3} className="img-fluid" alt="Banner 3" />
                        </div>
                    </Slider>
                    <div className="slider-btn">
                        <span className="prev position-top">
                            <i className="fas fa-chevron-left"></i>
                        </span>
                        <span className="next position-top right-0">
                            <i className="fas fa-chevron-right"></i>
                        </span>
                    </div>
                </div>
            </div> */}

            {/* <ul class="home-underline store" style={{background:'#fff', margin:'0', border:'1px solid rgb(214, 214, 214)'}}>
                <div onClick={e => setTableShow1('for you')} className={tableShow1 === "for you" && "active"}><li><p>For You</p></li></div>
                <div onClick={e => setTableShow1('popular')} className={tableShow1 === "popular" && "active"}><li><p>Popular</p></li></div>
                <div onClick={e => setTableShow1('nearby')} className={tableShow1 === "nearby" && "active"}><li><p>Nearby</p></li></div>
            </ul> */}
            <div id="slider">
                <input type="radio" name="slider" id="slide1" checked/>
                <input type="radio" name="slider" id="slide2"/>
                <input type="radio" name="slider" id="slide3"/>
                <input type="radio" name="slider" id="slide4"/>
                <div id="slides">
                    <div id="overflow">
                        <div class="inner">
                            <div class="slide slide_1" style={{borderRadius:'5px', overflow:'hidden'}}>
                            <div class="slide-content">
                                <img style={{width:'100%', height:'100%'}} src={helpImg} />
                            </div>
                            </div>
                            <div class="slide slide_2">
                            <div class="slide-content">
                                <h2>Slide 2</h2>
                                <p>Content for Slide 2</p>
                            </div>
                            </div>
                            <div class="slide slide_3">
                            <div class="slide-content">
                                <h2>Slide 3</h2>
                                <p>Content for Slide 3</p>
                            </div>
                            </div>
                            <div class="slide slide_4">
                            <div class="slide-content">
                                <h2>Slide 4</h2>
                                <p>Content for Slide 4</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="controls">
                    <label for="slide1"></label>
                    <label for="slide2"></label>
                    <label for="slide3"></label>
                    <label for="slide4"></label>
                </div>
                <div id="bullets">
                    <label for="slide1"></label>
                    <label for="slide2"></label>
                    <label for="slide3"></label>
                    <label for="slide4"></label>
                </div>
            </div>

            {/* Featured Promotion */}
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

            {/* Featured Stores */}
            <div className="mobile"style={{margin:'0 1rem'}}>
                <h6>Today's Top Stores</h6>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <BrandOverview />
                </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}} className="desktop">
                <ul class="profile-underline store">
                    <div onClick={e => setTableShow1('top stores')} className={tableShow1 === "top stores" && "active"}><li><p>Top Stores</p></li></div>
                    <div onClick={e => setTableShow1('trending')} className={tableShow1 === "trending" && "active"}><li><p>Trending</p></li></div>
                </ul>

                <div className="profile-settings-transition">
                    <div className={tableShow1 === 'top stores' ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                        {featuredContent}
                    </div>
                    <div className={tableShow1 === 'trending' ? "profile-settings-container active" : "profile-settings-container"} id="transition-4">
                        {featuredContent2}
                    </div>
                </div>
                
            </div>

            {!isMobile && (
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
            )}

            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <ProductOverview title="Flash Deals" products={products} link={`/home`} />
                </div>
            </div>

            {/* Featured Promotion */}
            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <HorizontalNav>
                    <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column', marginBottom:'1rem'}}>
                        {/* <div style={{height:'236px', width:'100%', overflow:'hidden', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>
                            <img style={{width:'100%', height:'100%'}} src={categoryImg} />
                        </div>   */}
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <YoutubeBlock videoId='_nBlN9yp9R8' />
                        </div>
                        <div>
                            <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                            <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                            <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                        </div>
                    </div>
                    <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column', marginBottom:'1rem'}}>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <YoutubeBlock videoId='_nBlN9yp9R8' />
                        </div>
                        <div>
                            <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                            <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                            <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                        </div>
                    </div>
                    <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column'}}>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <YoutubeBlock videoId='_nBlN9yp9R8' />
                        </div>
                        <div>
                            <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                            <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                            <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                        </div>
                    </div>
                    <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column'}}>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <YoutubeBlock videoId='_nBlN9yp9R8' />
                        </div>
                        <div>
                            <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                            <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                            <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                        </div>
                    </div>
                </HorizontalNav>
            </div>

            <div id="slider">
                <input type="radio" name="slider" id="slide1" checked/>
                <input type="radio" name="slider" id="slide2"/>
                <input type="radio" name="slider" id="slide3"/>
                <input type="radio" name="slider" id="slide4"/>
                <div id="slides">
                    <div id="overflow">
                        <div class="inner">
                            <div class="slide slide_1">
                            <div class="slide-content">
                                <h2>Slide 1</h2>
                                <p>Content for Slide 1</p>
                            </div>
                            </div>
                            <div class="slide slide_2">
                            <div class="slide-content">
                                <h2>Slide 2</h2>
                                <p>Content for Slide 2</p>
                            </div>
                            </div>
                            <div class="slide slide_3">
                            <div class="slide-content">
                                <h2>Slide 3</h2>
                                <p>Content for Slide 3</p>
                            </div>
                            </div>
                            <div class="slide slide_4">
                            <div class="slide-content">
                                <h2>Slide 4</h2>
                                <p>Content for Slide 4</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="controls">
                    <label for="slide1"></label>
                    <label for="slide2"></label>
                    <label for="slide3"></label>
                    <label for="slide4"></label>
                </div>
                <div id="bullets">
                    <label for="slide1"></label>
                    <label for="slide2"></label>
                    <label for="slide3"></label>
                    <label for="slide4"></label>
                </div>
            </div>

            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <p>Trending Collections</p>
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
            </div>

            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <ProductOverview title="Recently looked at..." products={products} link={`/home`} />
                </div>
            </div>

            {/* Featured Promotion */}
            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <HorizontalNav>
                    <div style={{minWidth:'240px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
                        <div style={{height:'240px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
                        </div>  
                        <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Halloween</p>
                            <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                            <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                        </div>
                    </div>
                    <div style={{minWidth:'240px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
                        <div style={{height:'240px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
                        </div>  
                        <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Halloween</p>
                            <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                            <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                        </div>
                    </div>
                    <div style={{minWidth:'240px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
                        <div style={{height:'240px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
                        </div>  
                        <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Halloween</p>
                            <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                            <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                        </div>
                    </div>
                    <div style={{minWidth:'240px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
                        <div style={{height:'240px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
                        </div>  
                        <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Halloween</p>
                            <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                            <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                        </div>
                    </div>
                    <div style={{minWidth:'240px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
                        <div style={{height:'240px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
                        </div>  
                        <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Halloween</p>
                            <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                            <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                        </div>
                    </div>
                    <div style={{minWidth:'240px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
                        <div style={{height:'240px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
                        </div>  
                        <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Halloween</p>
                            <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                            <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                        </div>
                    </div>
                    <div style={{minWidth:'240px', border:'1px solid rgb(214, 214, 214)', margin:'10px 1rem'}}>
                        <div style={{height:'240px', padding:'5px', gridGap:'5px', width:'100%', marginBottom:'5px', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr'}}>
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={paperTowelImg} />
                            <img style={{width:'100%', height:'100%', borderRadius:'5px'}} src={shoeSampleImg} />
                        </div>  
                        <div style={{padding:'10px', width:'100%', background:'rgb(247, 247, 247)'}}>
                            <p style={{margin:'0', color:'#ff4b2b', fontSize:'1.1rem'}}>#Halloween</p>
                            <p style={{margin:'0 0 1rem 0', color:'#808080', fontSize:'12px'}}>20.6k monthly shoppers</p>
                            <button style={{width:'100%', background:'#e8e8e8', color:'#808080', border:'#e8e8e8', margin:'0'}}>Follow</button>
                        </div>
                    </div>
                </HorizontalNav>
            </div>

            <div className="secondary-block" style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
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
            </div>

            {/* Featured Promotion */}
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

            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <ProductOverview title="Toilet Paper" products={products} link={`/home`} />
                </div>
            </div>

            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <ProductOverview title="Halloween" products={products} link={`/home`} />
                </div>
            </div>

            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{margin:'1rem 0 3rem 0'}}>
                    <ProductOverview title="Flash Deals" products={products} link={`/home`} />
                </div>
            </div>

        </div>
    )
}

ExplorePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    setNav1: PropTypes.func.isRequired,
    setNav2: PropTypes.func.isRequired,
    setNav3: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, setNav1, setNav2, setNav3 })(ExplorePage);
