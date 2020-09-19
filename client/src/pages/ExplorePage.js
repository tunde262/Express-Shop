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

import gainLogo from '../utils/imgs/gainlogo.jpg';

const ExplorePage = ({getProducts, product: { loading, products, featuredProducts}}) => {
    const [skip, setSkip] = useState(0);
    const [sentMixpanel, setSentMixpanel] = useState(false);

    useEffect(() => {
        getProducts(skip);
    }, [skip]);

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

    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,

    };

    if(!sentMixpanel) {
        handleMixpanel();
        setSentMixpanel(true);
    }
    
    return (
        <Fragment>
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

            <div style={{marginTop:'5rem'}}></div>
            <Banner imgLarge={carousell1} imgSmall={carousell2} />

            {/* Featured Promotion */}
            <div className="promotion-block">
                <div style={{backgroundColor:'#333', height:'100%', width:'100%', borderRadius:'15px'}}>

                </div>
                <div style={{backgroundColor:'#333', height:'100%', width:'100%', borderRadius:'15px'}}>

                </div>
            </div>

            <div className="store-grid">
                <h3>Today's Top Stores</h3>
                <div className="grid-rows">
                    <div>
                        <Link to="/store/5f47314b08024b849d6e0d02">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/6f6f58546fce4a516668f6f73dc8b2f5.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Bounty</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47256c08024b849d6e0c41">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Iams</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f4702a208024b849d6e0b5d">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/41bdd039c9e9603c31d6509fc019cfc1.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Solo Cup</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f46e76f08024b849d6e0981">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/79866644f2ec46a13ed9744188fc621b.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Cetaphil</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47327408024b849d6e0d28">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/729077bfd8c2cd5f43f054442a2529bd.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Kleenex</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47d7fbf85b88a75b1f65a3">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/c71c061bc47fce0fe0610be60a8b0e46.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Kroger</a>
                                        <p>Grocery Store</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f47ab5008024b849d6e119c">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/a1ddf1dae0afd88eb8e39fca9ec650c2.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Febreze</a>
                                        <p>Househould Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47547e08024b849d6e108b">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/49b68073c5d734500e04181fa760aafc.jpeg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Tide</a>
                                        <p>Househould Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f46ea4e08024b849d6e0996">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/67c77c7e5e46afc5564cbd69e583a1cf.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Aveeno</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Promotion */}
            <div className="secondary-block">
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
            </div>

            <div className="store-grid">
                <h3>Keep Your Bathroom Stocked</h3>
                <div className="grid-rows">
                    <div>
                        <Link to="/store/5f472aa208024b849d6e0ca2">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/c7da65d47d41584203b1bf1ca757e003.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Method Men</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47bd46f85b88a75b1f6505">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/c9966c31e329edd6c8f67de25e67f9bf.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Dove</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f472be108024b849d6e0cc5">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/ef5d60ca741ec6b33e34d230ea68492d.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Colgate</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47aa8908024b849d6e1164">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/ca9dc04602a8ad38a9123eede331072d.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Crest</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f47be28f85b88a75b1f6546">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/9d4dd47018cb40844d9b29d803af6be5.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Suave</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47aed308024b849d6e125e">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/4e84b04515f1248410f8599f01696e9b.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Charmin</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Promotion */}
            <div className="secondary-block">
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
            </div>

            {/* Featured Promotion */}
            {/* <div className="promotion-block">
                <img src={boxesImg} alt="home delivery boxes" />
                <div className="promotion-block-content">
                    <h3>Title here</h3>
                    <p>$10</p>
                    <p>description of offer goes here for those who dont know what it is</p>
                </div>
            </div> */}

            {/* Featured Stores */}
            {/* <div style={{margin:'1rem 0 3rem 0'}}>
                <BrandOverview />
            </div> */}

            <div className="store-grid">
                <h3>Stores For Your Pets</h3>
                <div className="grid-rows">
                    <div>
                        <Link to="/store/5f47256c08024b849d6e0c41">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/cfb9f2dc1804e9d464adf26e61341dce.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Iams</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47380c08024b849d6e0e37">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/24a1947df25c77899cd9508e58bce499.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Pedigree</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f4734a508024b849d6e0d99">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/55192da05c76874e86a27152b065c661.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Meow Mix</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f47281008024b849d6e0c66">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/062824fdabc6636e456e5b5fd1576ff8.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Purina</a>
                                        <p>Health & Beauty</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47ae3d08024b849d6e1214">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/bb9755dba06f87ae11bebc967a3b40c7.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Rachel Ray Nutrish</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f473dc008024b849d6e0f96">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/0fc8664c89b8a42a1bb575529e250f96.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>9Lives</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f473b7f08024b849d6e0f0e">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/38d40cbc20574202f3a2df733e4fb00f.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Nature's Recipe</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47292708024b849d6e0c9f">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <div className="grid-element-title">
                                        <a>Pet Pride</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47af9f08024b849d6e1262">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/2710db9b83e66edc5f09aa1a0fc64001.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Luvsome</a>
                                        <p>Pets</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Promotion */}
            <div className="secondary-block">
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%', marginBottom:'1rem'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
                <div style={{height:'100%', width:'100%'}}>
                    <div style={{height:'236px', width:'100%', marginBottom:'10px', backgroundColor:'#333', borderRadius:'15px'}}>

                    </div>  
                    <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                    <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                    <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                </div>
            </div>

            <div className="store-grid">
                <h3>Never Run Out Of Toilet Paper</h3>
                <div className="grid-rows">
                    <div>
                        <Link to="/store/5f47d7fbf85b88a75b1f65a3">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/c71c061bc47fce0fe0610be60a8b0e46.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Kroger</a>
                                        <p>Grocery Store</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47aed308024b849d6e125e">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/4e84b04515f1248410f8599f01696e9b.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Charmin</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f47abee08024b849d6e11d6">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/077cf5c6d85eca2faa73f62746f5951e.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Cottonelle</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <Link to="/store/5f47535a08024b849d6e1057">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/a4c97c0a4389a49e76736fb5aab10163.png`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Quilted Northern</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/store/5f4726ad08024b849d6e0c62">
                            <div className="grid-columns">
                                <div className="grid-element">
                                    <img src={`/api/stores/image/745f8b2caf5b1e9956b54ad214e5c201.jpg`}/>{' '}
                                    <div className="grid-element-title">
                                        <a>Angel Soft</a>
                                        <p>Household Supplies</p>
                                    </div>
                                </div>
                                <div className="grid-element-footer">
                                    <button>
                                        <i class="fas fa-plus"></i>
                                        <p>Add</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>


            {/* <Banner imgLarge={carousell1} imgSmall={carousell2} /> */}

            {/* Second Slider */}
            {/* <div className="container-fluid">
                <div className="site-slider-two px-md-4">
                    <Slider {...settings2} className="row slider-two text-center">
                        <div className="col-md-2 product pt-md-5 pt-4">
                            <img src={catImg1} alt="Product 1" />
                            <span className="border site-btn btn-span">Sofa & Chairs</span>
                        </div>
                        <div className="col-md-2 product pt-md-5 pt-4">
                            <img src={catImg1} alt="Product 2" />
                            <span className="border site-btn btn-span">Furniture & Decor</span>
                        </div>
                        <div className="col-md-2 product pt-md-5 pt-4">
                            <img src={catImg1} alt="Product 3" />
                            <span className="border site-btn btn-span">Lamp & Lighting</span>
                        </div>
                        <div className="col-md-2 product pt-md-5 pt-4">
                            <img src={catImg1} alt="Product 4" />
                            <span className="border site-btn btn-span">Sound & Life</span>
                        </div>
                        <div className="col-md-2 product pt-md-5 pt-4">
                            <img src={catImg1} alt="Product 5" />
                            <span className="border site-btn btn-span">Appliances</span>
                        </div>
                        <div className="col-md-2 product pt-md-5 pt-4">
                            <img src={catImg1} alt="Product 6" />
                            <span className="border site-btn btn-span">Lamp & Lighting</span>
                        </div>
                    </Slider>
                    <div className="slider-btn">
                        <span className="prev position-top">
                            <i className="fas fa-chevron-left fa-2x text-secondary"></i>
                        </span>
                        <span className="next position-top right-0">
                            <i className="fas fa-chevron-right fa-2x text-secondary"></i>
                        </span>
                    </div>
                </div>
            </div> */}


            {/* Featured Products */}
            {/* <div style={{marginTop:'5rem'}}></div>
            <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" /> */}


            {/* <div className="promotion-grid">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </div> */}


            {/* <Banner imgLarge={carousell1} imgSmall={carousell2} /> */}
            
            {/* First Slider */}
            {/* <div className="container-fluid">
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

            {/* <div className="info" style={{margin: '4rem 0'}}>
                <div>
                    <i className="fas fa-shipping-fast"></i>
                    <h3>text</h3>
                    <p>Ship your pre-packaged items to the homes of our fulfillers</p>
                </div>
                <div>
                    <i className="fas fa-boxes"></i>
                    <hr />
                    <p>Our fulfillers will keep your items safe in there homes until they are ordered</p>
                </div>
                <div>
                    <i className="fas fa-running"></i>
                    <hr />
                    <p>When an item has been ordered by your customer out fulfiller will deliver it straight to their doorstep</p>
                </div>
                <div>
                    <i className="fas fa-search-location"></i>
                    <hr />
                    <p>Get instant updates about your items status and watch the items delivery on a map in realtime on your dashboard</p>
                </div>
            </div> */}

            <h3>More Products For You</h3>
            <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll'}}>
                <Container />
            </div>
            {/* <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" />

            <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" />

            <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" />

            <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" />

            <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" />

            <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" /> */}
            {/* <Footer /> */}
        </Fragment>
    )
}

ExplorePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts })(ExplorePage);
