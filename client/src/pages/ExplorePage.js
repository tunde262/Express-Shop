import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

const ExplorePage = ({getProducts, product: { loading, products, featuredProducts}}) => {
    const [skip, setSkip] = useState(0)
    useEffect(() => {
        getProducts(skip);
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(products.length)
        }
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
    
    return (
        <Fragment>
            {/* First Slider */}
            <div className="container-fluid" onScroll={handleScroll} style={{height:"100vh"}}>
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
            </div>

            {/* Second Slider */}
            <div className="container-fluid">
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
            </div>

            {/* Featured Products */}
            <div className="container-fluid" style={{textAlign: 'center', padding: '5rem 2rem'}}>
                <h1>Featured Products</h1>
                <p>Sed ut perspiciatis unde omnis iste natus error sit 
                    voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem 
                    quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                    ratione voluptatem sequi nesciunt.</p>
            </div>

            <ProductOverview title="Toilet Paper" products={featuredProducts} link="/top" />

            {/* Featured Promotion */}
            <div className="promotion-block">
                <img src={boxesImg} alt="home delivery boxes" />
                <div className="promotion-block-content">
                    <h3>Title here</h3>
                    <p>$10</p>
                    <p>description of offer goes here for those who dont know what it is</p>
                </div>
            </div>

            {/* Featured Stores */}
            <div style={{marginTop: '15rem'}}>
                <BrandOverview />
            </div>

            <div className="promotion-grid">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </div>

            {/* Featured Collection */}
            <div className="container-fluid" style={{textAlign: 'center'}}>
                <h1>Featured Collections</h1>
                <p>Sed ut perspiciatis unde omnis iste natus error sit 
                    voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem 
                    quia voluptas sit aspernatur aut odit aut fugit.</p>
            </div>
            <div className="grid-rows">
                <div>
                    <h3>For Kids</h3>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
                <div>
                    <h3>For Pets</h3>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
                <div>
                    <h3>For Health</h3>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
            </div>
            
            {/* First Slider */}
            <div className="container-fluid">
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
            </div>

            <div className="info" style={{margin: '4rem 0'}}>
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
            </div>
            <Footer />
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
