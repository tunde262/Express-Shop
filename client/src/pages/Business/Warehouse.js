import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setPage } from '../../actions/navActions';

import Footer from './Footer';

import mapImg from '../../utils/imgs/map.png'

const Warehouse = ({ history, setPage, isAuthenticated }) => {

    useEffect(() => {
        setPage('business');
    }, []);

    return (
        <div className="explore-container landing">
            <div className="wh-intro">
                <div className="box">
                    <div className="box-content">
                        <h3 className="box-heading">
                        Become a Warehouse Operator
                        </h3>
                        <div className="box-text">
                            <p>
                            Cardboard Express is an asset-lite fulfillment service that provides nationwide 2-day delivery for merchants on popular marketplaces like Walmart, Shopify, Wish, eBay, and Amazon.
                            </p>
                        </div>
                        <div className="button-wrapper">
                            <a href="#">Apply</a>
                        </div>
                    </div>
                </div>
                <div className="bodymovin">
                    <div id="bm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 630" width="1000" height="630" preserveAspectRatio="xMidYMid meet" style={{width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)'}}>
                            <defs></defs>
                            <g clipPath="url(#__lottie_element_2)">
                                <g class="png" transform="matrix(0.5,0,0,0.5,0,0)" opacity="1" style={{display:'block', color:'#808080', background:'#808080'}}>
                                    <image width="2000px" height="1260px" preserveAspectRatio="xMidYMid slice" href={mapImg}></image>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <script data-minify="1" src="https://deliverr.com/wp-content/cache/min/1/wp-content/themes/deliverr/includes/bodymovin/scripts/bodymovin-d435f73058290642e91f6a588f631860.js" defer></script>
                    <script src="https://deliverr.com/wp-content/themes/deliverr/includes/bodymovin/scripts/lottie.min.js" defer></script>
                    <script data-minify="1" src="https://deliverr.com/wp-content/cache/min/1/wp-content/themes/deliverr/includes/bodymovin/scripts/index-6fe047ec2a703fded8a15e192f5e34db.js" defer></script>
                </div>
            </div>
            <div className="wh-why">
                <div className="container">
                    <h3 className="heading">
                    Why do eCommerce sellers fulfill with Carboard Express?
                    </h3>
                    <div className="items">
                        <div className="item">
                            <div className="item-icon">
                                <img src="https://deliverr.com/wp-content/uploads/2020/06/icon-why01.svg" alt="img" />
                            </div>
                            <h3 className="item-title">
                            Nationwide 2-day delivery
                            </h3>
                        </div>
                        <div className="item">
                            <div className="item-icon">
                                <img src="https://deliverr.com/wp-content/uploads/2020/06/icon-why02.svg" alt="img" />
                            </div>
                            <h3 className="item-title">
                            Transparent, all-inclusive pricing
                            </h3>
                        </div>
                        <div className="item">
                            <div className="item-icon">
                                <img src="https://deliverr.com/wp-content/uploads/2020/06/icon-why03.svg" alt="img" />
                            </div>
                            <h3 className="item-title">
                            Access to fast shipping programs
                            </h3>
                        </div>
                        <div className="item">
                            <div className="item-icon">
                                <img src="https://deliverr.com/wp-content/uploads/2020/06/icon-why04-new.svg" alt="img" />
                            </div>
                            <h3 className="item-title">
                            Unify multi-channel fulfillment
                            </h3>
                        </div>
                    </div>
                    <div className="bottom-text">
                        <p>
                        Cardboard Express is building up our warehouse network to better serve our merchants and get items as close as possible to buyers.
                        </p>
                    </div>
                </div>
            </div>
            <div className="wh-benefits">
                <div className="container">
                    <h3 className="heading">
                    Benefits of joining the Cardboard Express warehouse network
                    </h3>
                    <div className="items">
                        <div className="item">
                            <div className="item-image">
                                <img src="https://deliverr.com/wp-content/uploads/2020/06/image-bene01.jpg" alt="img" />
                            </div>
                            <div className="item-content">
                                <h4 className="item-label">
                                Make more money
                                </h4>
                                <h3 className="item-title">
                                Earn business without sales or marketing
                                </h3>
                                <div className="item-text">
                                    <p>
                                    Since Cardboard Express will be filling your warehouse space for you, you’ll generate business without needing your own sales or marketing teams. Deliverr will take care of that for you.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="item reverse">
                            <div className="item-image">
                                <img src="https://deliverr.com/wp-content/uploads/2020/06/image-bene02.jpg" alt="img" />
                            </div>
                            <div className="item-content">
                                <h4 className="item-label">
                                add clients with no overhead
                                </h4>
                                <h3 className="item-title">
                                Serve multiple merchants under one client
                                </h3>
                                <div className="item-text">
                                    <p>
                                    Cardboard Express serves a diverse base of multi-channel merchants across the country. Our warehouse partners enjoy the business of these merchants, without having to manage each one individually.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-image">
                                <img src="https://deliverr.com/wp-content/uploads/2020/06/image-bene03.jpg" alt="img" />
                            </div>
                            <div className="item-content">
                                <h4 className="item-label">
                                Headache free growth
                                </h4>
                                <h3 className="item-title">
                                Easy billing, invoicing, and tracking
                                </h3>
                                <div className="item-text">
                                    <p>
                                    Since you’ll be working directly with Cardboard Express, instead of directly with thousands of merchants, you can simplify business logistics such as billing, invoicing, and tracking.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wh-apply">
                <div className="container">
                    <div className="box">
                        <div className="box-content">
                            <h3 className="box-heading">
                                Apply Now
                            </h3>
                            <div className="box-text">
                                <p>Increase your business without the headaches.</p>
                            </div>
                        </div>
                        <div className="box-button">
                            <a className="btn" href="#">
                            Get Started
                            <i className="far fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wh-how-work">
                <div className="container">
                    <h4 className="label">
                    How to get started
                    </h4>
                    <h3 className="heading">
                    How does it work?
                    </h3>
                    <div className="box">
                        <div className="box-left">
                            <div className="items">
                                <div className="item">
                                    <h3 className="item-title">
                                    Eligibility Criteria
                                    </h3>
                                    <ul className="item-list">
                                        <li>
                                            <i class="far fa-check-circle"></i>
                                            Warehouse partners can handle a minimum of 2,000 orders per day.
                                        </li>
                                        <li>
                                            <i class="far fa-check-circle"></i>
                                            Warehouse partners have at least 15,000 square feet available.
                                        </li>
                                    </ul>
                                </div>
                                <div className="item">
                                    <h3 className="item-title">
                                    Nice to have
                                    </h3>
                                    <ul className="item-list alt">
                                        <li>
                                            <i class="far fa-check-circle"></i>
                                            Located in greater metro areas of large U.S. cities.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-right">
                            <div className="block">
                                <h3 className="block-title">Pricing</h3>
                                <div className="block-text">
                                    <p>
                                    After an initial conversation between Cardboard Express and a warehouse partner, we will provide a mutual NDA. After signing, we will share our standard contract and rate card.
                                    </p>
                                    <p>Payments are net 30 via bank transfer.</p>
                                </div>
                                <div className="block-button">
                                    <a className="btn" href="#">
                                    Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wh-how-integrate">
                <div className="container">
                    <h3 className="heading">How do I integrate?</h3>
                    <div className="items">
                        <div className="item">
                            <div className="item-box">
                                <div className="item-icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2020/06/illo-getstarted.svg" />
                                </div>
                                <h3 className="item-title">
                                Cardboard Express Inventory Management Dashboard
                                </h3>
                                <div className="item-content">
                                    <p>
                                    When integrated with your WMS, Cardboard Express can provide a steady stream of inbound and outbound orders.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-box">
                                <div className="item-icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2020/06/illo-getstarted-1.svg" />
                                </div>
                                <h3 className="item-title">
                                Custom Integration
                                </h3>
                                <div className="item-content">
                                    <p>
                                    If you are not using a Cardboard Express preferred warehouse management system (WMS), you can create a custom integration using Deliverr’s Rest API.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="how-long-section">
                <div className="container xl">
                    <div className="headline">
                        <span className="headline-subtitle">
                        how to get started
                        </span>
                        <h3 className="headline-title">
                        How long does it take?
                        </h3>
                    </div>
                    <div className="how-long-container">
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day soft-blue">
                                Day 1
                            </div>
                            <div className="how-long-item">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/06/illo-getstarted.svg" alt="img" />
                                </div>
                                <h5>Get Started</h5>
                                <p>
                                Connect your integration or shopping cart in just a few clicks, and explore cost previews for each item in your catalog.
                                </p>
                            </div>
                        </div>
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day moderate-blue">
                                Day 4-8
                            </div>
                            <div className="how-long-item">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/06/illo-sendinventory.svg" alt="img" />
                                </div>
                                <h5>Send Inventory</h5>
                                <p>
                                Pick the items you want to send, and Cardboard Express will guide you step-by-step on how to ship to us. You can even use our discounted shipping rates!
                                </p>
                            </div>
                        </div>
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day strong-cyan">
                                Day 5-10
                            </div>
                            <div className="how-long-item">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/06/illo-getstarted.svg" alt="img" />
                                </div>
                                <h5>Activate Fast Tags</h5>
                                <p>
                                Turn on fast shipping tags in Cardboard Express, and we’ll take care of the rest. You’ll soon see your listings transform across your sales channels!
                                </p>
                            </div>
                        </div>
                        <div className="how-long fadeInUp animated">
                            <div className="how-long-day cyan">
                                Day 5-10
                            </div>
                            <div className="how-long-item">
                                <div className="icon">
                                    <img src="https://deliverr.com/wp-content/uploads/2019/06/illo-selling.svg" alt="img" />
                                </div>
                                <h5>Start Selling</h5>
                                <p>
                                Once we receive your inventory, we will sync with your sales channels so that orders automatically start flowing in.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a href="#" className="btn">
                            Create a Free Account
                        </a>
                    </div>
                </div>
            </div>
            <div className="wh-apply">
                <div className="container">
                    <div className="box">
                        <div className="box-content">
                            <h3 className="box-heading">
                                Apply Now
                            </h3>
                            <div className="box-text">
                                <p>Increase your business without the headaches.</p>
                            </div>
                        </div>
                        <div className="box-button">
                            <a className="btn" href="#">
                            Get Started
                            <i className="far fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

Warehouse.propTypes = {
    setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setPage })(withRouter(Warehouse));
