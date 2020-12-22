import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setPage } from '../../actions/navActions';

import Footer from './Footer';

const Pricing = ({ history, setPage, isAuthenticated }) => {

    useEffect(() => {
        setPage('business');
    }, []);

    return (
        <div className="explore-container landing">
            <div className="page-header text-center">
                <div className="bg-stretch" style={{backgroundImage:'url(https://deliverr.com/wp-content/uploads/2018/05/bgr-inner-@2x.png)'}}>
                </div>
                <div className="container">
                    <h1>Fast Fulfillment, Low Prices</h1>
                </div>
                <a href="#" className="btn btn-apply anchors showIfLoggedOut">
                Enter Your Products To See Costs
                </a>
            </div>
            <div className="info-frame  with-borders">
                <div className="page-holder wide">
                    <div className="del-lst">
                        <li>
                            <div className="box">
                                <div className="ico">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/01/image3-01.svg" alt="img" />
                                </div>
                                <h3>Simple</h3>
                                <p>
                                Cardboard Express has condensed all of your fulfillment costs (e.g., shipping, pick, pack, packaging, etc.) into just two fees: 
                                <strong> Fulfillment and Storage</strong>.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="box">
                                <div className="ico">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/01/image3-02.svg" srcSet="https://deliverr.com/wp-content/uploads/2019/01/image3-02.svg 2x" alt="img" />
                                </div>
                                <h3>Transparent</h3>
                                <p>
                                What you see is what you pay. Your per-item fees for fulfillment and storage are all-inclusive, helping you forecast your exact costs.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="box">
                                <div className="ico">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/01/image3-03.svg" srcSet="https://deliverr.com/wp-content/uploads/2019/01/image3-03.svg 2x" alt="img" />
                                </div>
                                <h3>Affordable</h3>
                                <p>
                                    Our low rates stand out, especially when it comes to 2-day shipping. {' '}
                                    <a href="#">Compare our rates</a> to FBA and other providers.
                                </p>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
            <div id="section-01" className="cost-section">
                <div className="gallery-area">
                    <div className="page-holder wd">
                        <ul className="cost-list pricing">
                            <li>
                                <div className="text-box">
                                    <img className="cost-icon" src="https://deliverr.com/wp-content/uploads/2018/04/cost-icon-01.svg" alt="img" width="36" height= "36" />
                                    <h2>Fulfillment</h2>
                                    <p>We currently support 3 service levels: Standard (5-7 days), 3 Day, and 2 Day delivery. Service levels are measured from order placement date to delivery date.</p>
                                    <div className="price-block">
                                        <span>Starting at</span>
                                        <p>
                                            <strong className="price-value value-blue">$3.99</strong> per unit
                                        </p>
                                    </div>
                                </div>
                                <div className="gallery-slider-area slick-initialized slick-slider slick-dotted animated">
                                    <button className="slick-prev slick-arrow" style={{display:'inline-block'}}>
                                        {' < '}
                                    </button>
                                    <div className="slick-list draggable">
                                        <div className="slick-track" style={{opacity: '1', width: '1892px'}}>
                                            <div className="gallery-box slick-slide slick-current slick-active" style={{width: '473px', position: 'relative', left: '0px', top: '0px', zIndex: '998', opacity: '0', transition: 'opacity 300ms linear 0s'}}>
                                                <div className="gallery-slider">
                                                    <div className="gallery-row">
                                                        <div className="img">
                                                            <img src="https://deliverr.com/wp-content/uploads/2019/05/phone-case@2x-1-120x137.png" srcSet="https://deliverr.com/wp-content/uploads/2019/05/phone-case@2x-1-240x274.png 2x" alt="img" />
                                                        </div>
                                                        <div className="box-text">
                                                            <h3>Phone Case</h3>
                                                            <ul className="lst-add">
                                                                <li>
                                                                    <span>Small size</span>
                                                                    3 x 2 x 4 in
                                                                </li>
                                                                <li>
                                                                    <span>Item weight:</span>
                                                                    1.5oz
                                                                </li>
                                                                <li></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="gallery-row-block">
                                                        <span className="text">
                                                        Fulfillment Cost (Includes Shipping):
                                                        </span>
                                                        <ul className="item-lst-add">
                                                            <li>
                                                                <span className="text">Standard</span>
                                                                <strong className="ttl">$3.99</strong>
                                                            </li>
                                                            <li>
                                                                <span className="text">Wish Express</span>
                                                                <strong className="ttl">$3.99</strong>
                                                            </li>
                                                            <li>
                                                                <span className="text">Shopify 2 Day</span>
                                                                <strong className="ttl">$6.72</strong>
                                                            </li>
                                                            <li>
                                                                <span className="text">Walmart 2 Day</span>
                                                                <a href="#" className="ttl-link showIfLoggedOut">
                                                                    Sign Up to Find Out
                                                                    <i className="fas fa-arrow-right"></i>
                                                                </a>
                                                                <strong className="ttl showIfLoggedIn">$3.39</strong>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="slick-next slick-arrow" style={{display:'inline-block'}}>
                                        {' > '}
                                    </button>
                                    <ul className="slick-dots" style={{display:'block'}}>
                                        <li className="slick-active">
                                            <button>1</button>
                                        </li>
                                        <li className="slick-active">
                                            <button>2</button>
                                        </li>
                                        <li className="slick-active">
                                            <button>3</button>
                                        </li>
                                        <li className="slick-active">
                                            <button>4</button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className="text-box">
                                    <img className="cost-icon" src="https://deliverr.com/wp-content/uploads/2018/04/cost-icon-02.svg" alt="img" width="36" height="36" />
                                    <h2>Storage</h2>
                                    <p>
                                        Applies to each unit sitting in a Cardboard Express location, charged per cubic foot per month. Long term and seasonal storage rates apply. 
                                        <a href="#">
                                            <strong>See full details</strong>
                                        </a>
                                    </p>
                                    <div className="price-block">
                                        <span>Starting at</span>
                                        <p>
                                            <strong className="price-value value-green">$0.72 </strong>
                                            per cu. ft. per month
                                        </p>
                                    </div>
                                </div>
                                <div className="gallery-slider-area slick-initialized slick-slider slick-dotted animated">
                                    <button className="slick-prev slick-arrow" style={{display: 'inline-block'}}>
                                        {'<'}
                                    </button>
                                    <div className="slick-list draggable">
                                        <div className="slick-track" style={{opacity: '1', width: '1892px'}}>
                                            <div className="gallery-box slick-slide slick-current slick-active" style={{width: '473px', position: 'relative', left: '0px', top: '0px', zIndex: '998', opacity: '0', transition: 'opacity 300ms linear 0s'}}>
                                                <div className="gallery-slider">
                                                    <div className="gallery-row">
                                                        <div className="img">

                                                        </div>
                                                        <div className="box-text">

                                                        </div>
                                                    </div>
                                                    <div className="gallery-row-block">
                                                        <span className="text">Storage cost per unit per month</span>
                                                        <ul className="item-lst-add">
                                                            <li>
                                                                <span className="text">
                                                                January to September
                                                                </span>
                                                                <strong className="ttl">
                                                                $0.015
                                                                </strong>
                                                            </li>
                                                            <li>
                                                                <span className="text">
                                                                October to December
                                                                </span>
                                                                <strong className="ttl">
                                                                $0.048
                                                                </strong>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="slick-next slick-arrow" style={{display:'inline-block'}}>
                                        {' > '}
                                    </button>
                                    <ul className="slick-dots" style={{display:'block'}}>
                                        <li className="slick-active">
                                            <button>1</button>
                                        </li>
                                        <li className="slick-active">
                                            <button>2</button>
                                        </li>
                                        <li className="slick-active">
                                            <button>3</button>
                                        </li>
                                        <li className="slick-active">
                                            <button>4</button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

Pricing.propTypes = {
    setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setPage })(withRouter(Pricing));
