import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setPage } from '../../actions/navActions';

import Footer from './Footer';

const LandingPage = ({history, setPage, isAuthenticated}) => {

  useEffect(() => {
    setPage('business')
  }, [])

//   if(isAuthenticated) {
//       history.push('/home');
//   }
  
  return (
    <div className="explore-container landing">
        <div id="wrapper">
            <div className="hero">
                <div className="container">
                    <div className="box">
                        <div className="box-content">
                            <h3 className="box-heading">Fast Fullfulment to <i>accelerate</i> your <br/> <span>Online Sales</span></h3>
                            <div className="floating-form">
                                <div className="intro-form">
                                    <div className="field-text">
                                        <input
                                            type="text"
                                            id="login_email_header"
                                            placeholder="Email"
                                        ></input>
                                    </div>
                                    <div className="field-submit" id="login_email_heade_btn">
                                        <button>Sign Up</button>
                                    </div>
                                </div>
                                <div className="box-more">
                                    <p>Need more info? <a className="lets-chat-link" href="#">Let's chat!</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="box-image">
                            <div className="box-img">
                                <div 
                                    className="box-img-bg"
                                    style={{backgroundImage:"url(https://deliverr.com/wp-content/uploads/2020/11/BigCommerce-Background.png)"}}
                                >
                                </div>
                                <img className="box-img-image" src="https://deliverr.com/wp-content/uploads/2020/11/2-Day@2x.png" alt="img" />
                                <img className="box-image-icon" src="https://deliverr.com/wp-content/uploads/2020/11/bigcommerce-logo.png" />
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="hinfo">
                <div className="container">
                    <div className="box">
                        <h3 style={{color:'#333', textAlign:'center'}} className="box-heading">Make 2-day delivery a competitive advantage everywhere you sell</h3>
                    </div>
                </div>
            </div>
            <div className="info-area new-alt back-animation">
                <div className="page-holder wide">
                    <div className="img video">
                        <a data-fancybox href="#">
                            <img style={{width:'100%', position:'absolute', top:'0'}} src="https://deliverr.com/wp-content/uploads/2020/09/image01.png" alt="img" />
                            <button className="play-vid-btn">
                                <i className="fas fa-play"></i>
                                Play Video
                            </button>
                        </a>
                    </div>
                    <div className="txt-box">
                        <h1>Ultra-fast fulfillment for fast growing merchants</h1>
                        <p>Cardboard Express lets you easily fulfill your marketplace and shopping cart orders. Delight your buyers with fast, reliable, predictable, and affordable order fulfillment.</p>
                        <a className="link" href="#">
                            <strong>Get Started</strong>
                        </a>
                    </div>
                </div>
            </div>
            <div className="htabs">
                <div className="container">
                    <div className="box">
                        <h3 className="box-heading">Affordable, all-inclusive pricing</h3>
                        <div className="box-content">
                            <p>Enjoy transparent pricing competitive with Amazon’s multi-channel order fulfillment.</p>
                        </div>
                        <div className="box-container">
                            <div className="box-tabs-wrapper">
                                <button className="button-prev">
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <div className="box-tabs">
                                    <div className="box-tab active">
                                        <a href="#">Small Item</a>
                                    </div>
                                    <div className="box-tab">
                                        <a href="#">Medium Item</a>
                                    </div>
                                    <div className="box-tab">
                                        <a href="#">Large Item</a>
                                    </div>
                                    <div className="box-tab">
                                        <a href="#">Extra Large Item</a>
                                    </div>
                                </div>
                                <button className="button-next">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <div className="box-items">
                                <div id="box-item1" className="box-item active">
                                    <div className="box-item-info">
                                        <div className="box-item-image">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/phone-case@2x.png" alt="img" />
                                        </div>
                                        <ul className="box-item-features">
                                            <li>
                                                <label>Sample Item</label>
                                                <div className="text">Phone Case</div>
                                            </li>
                                            <li>
                                                <label>Size</label>
                                                <div className="text">3x2x4in</div>
                                            </li>
                                            <li>
                                                <label>Weight</label>
                                                <div className="text">1.5oz</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="box-costs">
                                        <h3>Fulfillment cost (includes shipping)</h3>
                                        <ul className="box-blocks">
                                            <li>
                                                <div className="box-block-box">
                                                    <div className="box-block-box-inner">
                                                        <span className="box-block-title">Standard</span>
                                                        <span className="box-block-text">$3.99</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="box-block-box">
                                                    <div className="box-block-box-inner">
                                                        <span className="box-block-title">Shopify 2-Day</span>
                                                        <span className="box-block-text">$6.72</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="box-block-box">
                                                    <div className="box-block-box-inner">
                                                        <span className="box-block-title">Wish 2-day</span>
                                                        <span className="box-block-text">$7.10</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="box-block-box">
                                                    <a className="box-block-box-inner" href="#">
                                                        <span className="box-block-title">Walmart</span>
                                                        <span className="box-block-text">See Details</span>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-more">
                            <p>This all inclusive fulfillment cost covers receive, pick and pack, order handling, packaging and shipping to any destination in the contiguous US.</p>
                        </div>
                        <div className="box-bottom">
                            <a href="#">
                                See pricing for your items with our 
                                <span>
                                    Cost Calculator
                                    <i className="far fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hinfo">
                <div className="container">
                    <div className="box">
                        <h3 style={{color:'#333', textAlign:'center'}} className="box-heading">Make 2-day delivery a competitive advantage everywhere you sell</h3>
                    </div>
                </div>
            </div>
            <div className="info-area new-alt back-animation">
                <div className="page-holder wide">
                    <div className="img video">
                        <a data-fancybox href="#">
                            <img style={{width:'100%', position:'absolute', top:'0'}} src="https://deliverr.com/wp-content/uploads/2020/09/image01.png" alt="img" />
                            <button className="play-vid-btn">
                                <i className="fas fa-play"></i>
                                Play Video
                            </button>
                        </a>
                    </div>
                    <div className="txt-box">
                        <h1>Ultra-fast fulfillment for fast growing merchants</h1>
                        <p>Cardboard Express lets you easily fulfill your marketplace and shopping cart orders. Delight your buyers with fast, reliable, predictable, and affordable order fulfillment.</p>
                        <a className="link" href="#">
                            <strong>Get Started</strong>
                        </a>
                    </div>
                </div>
            </div>
            <div className="hcontent-slider">
                <div className="container">
                    <div className="box">
                        <div className="box-slider">
                            <div className="box-items slick-initialized slick-slider slick-dotted">
                                <button className="slick-prev slick-arrow" style={{display:'block'}}>
                                    Previous
                                </button>
                                <div className="slick-list draggable">
                                    <div className="slick-track" style={{opacity:'1', width:'220px'}}>
                                        <div className="box-item box-pos1 slick-slide" style={{width:'550px', position:'relative', left:'0', top: '0', zIndex:'800', opacity:'1', transition: 'opacity 300ms ease 0s'}}>
                                            <div className="box-item-box">
                                                <img className="box-image" src="https://deliverr.com/wp-content/uploads/2020/09/fb-nextday.png" alt="img" />
                                                <img className="box-icon" src="https://deliverr.com/wp-content/uploads/2020/10/facebook@2x.png" alt="img" />
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <button style={{display:'block'}} className="slick-next slick-arrow">
                                    Next
                                </button> 
                                <ul className="slick-dots" style={{display:'flex'}}>
                                    <li className="slick-active">
                                        <button type="button">1</button>
                                    </li>
                                    <li className="slick-active">
                                        <button type="button">2</button>
                                    </li>
                                    <li className="slick-active">
                                        <button type="button">3</button>
                                    </li>
                                    <li className="slick-active">
                                        <button type="button">4</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="box-content">
                            <h4 className="box-label">
                                <span>Bonus</span>
                            </h4>
                            <h3 className="box-heading">
                                NextDay Delivery on Google, Shopify and Facebook Ads
                            </h3>
                            <div className="box-text">
                                <p>Elligible customers will automatically see a “Free NextDay Delivery” Badge when applicable. This will be at no extra cost to yourself as a merchant.</p>
                            </div>
                            <div className="box-button">
                                <a href="#">Get Started</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hdays active ready">
                <div className="container">
                    <div className="box">
                        <h3 className="box-heading">How long does it take to get started?</h3>
                        <div className="box-items box-hover-3">
                            <div className="box-item active">
                                <div className="box-item-day">
                                    <div className="dot">
                                        <span></span>
                                    </div>
                                    <span>Day 1</span>
                                </div>
                                <div className="box-item-box">
                                    <div className="box-item-box-border">
                                        <div className="box-item-box-icon">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-day01.svg" alt="img" />
                                        </div>
                                        <h4 className="box-item-box-title">Get Started</h4>
                                        <div className="box-item-box-content">
                                            <p>Connect your listing tool or shopping cart in just a few clicks, and explore cost previews for each item in your catalog.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-item active">
                                <div className="box-item-day">
                                    <div className="dot">
                                        <span></span>
                                    </div>
                                    <span>Day 4-8</span>
                                </div>
                                <div className="box-item-box">
                                    <div className="box-item-box-border">
                                        <div className="box-item-box-icon">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-day02.svg" alt="img" />
                                        </div>
                                        <h4 className="box-item-box-title">Send Inventory</h4>
                                        <div className="box-item-box-content">
                                            <p>Pick the items you want to send, and we will guide you step-by-step on how to ship to us.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-item active">
                                <div className="box-item-day">
                                    <div className="dot">
                                        <span></span>
                                    </div>
                                    <span>Day 5-10</span>
                                </div>
                                <div className="box-item-box">
                                    <div className="box-item-box-border">
                                        <div className="box-item-box-icon">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-day03.svg" alt="img" />
                                        </div>
                                        <h4 className="box-item-box-title">Activate Fast Tags</h4>
                                        <div className="box-item-box-content">
                                            <p>Turn on fast shipping tags in Cardboard Express, and we’ll take care of the rest. You’ll soon see your listings transform across your sales channels!</p>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="box-item active">
                                <div className="box-item-day">
                                    <div className="dot">
                                        <span></span>
                                    </div>
                                    <span>Day 5-10</span>
                                </div>
                                <div className="box-item-box">
                                    <div className="box-item-box-border">
                                        <div className="box-item-box-icon">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-day04.svg" alt="img" />
                                        </div>
                                        <h4 className="box-item-box-title">Start Selling</h4>
                                        <div className="box-item-box-content">
                                            <p>Once we receive your inventory, we will sync with your sales channels so that orders automatically start flowing in.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-text">
                            <p>Sign up for free and accelerate your sales. <br/> No credit card required.</p>
                        </div>
                        <div className="box-button">
                            <a href="#">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hadvantage">
                <div className="container">
                    <div className="box">
                        <h3 className="box-heading">Our Advantages</h3>
                    </div>
                </div>
                <div className="hadvantage-wrapper">
                    <div className="container">
                        <div className="box">
                            <div className="box-items">
                                <div className="box-item-wrapper">
                                    <div className="box-item box-shadow-1" style={{backgroundColor:'#29bef3'}}>
                                        <div className="box-item-icon">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-p01.svg" alt="img" />
                                        </div>
                                        <h4 className="box-item-title">Clear, Simple Pricing</h4>
                                        <div className="box-item-content">
                                            <p>
                                                All-inclusive, Amazon-like pricing with no long term contracts or hidden fees, so you know your costs day 1. 
                                                <a href="#">See pricing</a> for your products today.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-item-wrapper">
                                    <div className="box-item box-shadow-2" style={{backgroundColor:'#1e69eb'}}>
                                        <div className="box-item-icon">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-p02.svg" alt="img" />
                                        </div>
                                        <h4 className="box-item-title">Prime-like Badging</h4>
                                        <div className="box-item-content">
                                            <p>
                                            Enable your items on fast shipping programs like Walmart 2-day delivery, Google Shopping Free and Fast, eBay Fast ‘N Free, Facebook & Instagram 2-day ads, and Wish 2-day.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-item-wrapper">
                                    <div className="box-item box-shadow-3" style={{backgroundColor:'#703cee'}}>
                                        <div className="box-item-icon">
                                            <img src="https://deliverr.com/wp-content/uploads/2020/09/icon-p02.svg" alt="img" />
                                        </div>
                                        <h4 className="box-item-title">Hassle-Free Experience</h4>
                                        <div className="box-item-content">
                                            <p>
                                            Create an account in under 2 minutes, connect any sales channel, and enjoy complete automation as Cardboard Express syncs with your channels.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hdays active ready">
                <div className="container">
                    <div className="box">
                        <h1 className="box-heading">Start today ... it's easy.</h1>
                        <div className="box-text">
                            <p>If you need help there's 24/7 email, and SMS support from a real person.</p>
                        </div>
                        <div className="box-button">
                            <a href="#">Get Started</a>
                        </div>
                        <div className="social-container landing">
                            <a href="#" target="_blank" className="social"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" target="_blank" className="social"><i className="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <Footer />
    </div>
  )
}

LandingPage.propTypes = {
    setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setPage })(withRouter(LandingPage));
