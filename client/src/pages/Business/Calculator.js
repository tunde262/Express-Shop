import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setPage } from '../../actions/navActions';

import Footer from './Footer';

const Calculator = ({ history, setPage, isAuthenticated }) => {

    useEffect(() => {
        setPage('business');
    }, []);

    return (
        <div className="explore-container landing">
            <div className="header-container">
                <div style={{height:'400px', padding:'150px'}} className="page-header">
                    <div className="page-header-content">
                        <div className="content-heading">
                            <h1 style={{marginBottom:'25px'}} className="heading-text">
                            Cost Calculator
                            </h1>
                            <p className="heading-sub-text">
                            Find out exactly what you would pay for Fulfillment and Storage with Cardboard Express.
                            </p>
                            <p className="heading-sub-text">
                            Just input your Amazon product link, ASIN, or your product information
                            </p>

                            <a href="#" className="btn btn-apply anchors showIfLoggedOut">
                            Enter Your Products To See Costs
                            </a>
                        </div>
                    </div>
                </div>
                <div className="heads-up">
                    <p>Item must be prepared ready-to-ship with no additional boxing if the SKU weighs more than 20 lbs or does not fit in an 18"x14"x8" box</p>
                </div>
                <div className="calculator-container">
                    <div className="calculator-grid">
                        <div>
                            <div id="fulfillment-cost">
                                <div className="cost-header">
                                    <svg style={{marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <g fill="none">
                                            <rect width="28" height="28" fill="#ffffff" rx="2" opacity="0.7"></rect>
                                            <rect width="21.778" height="21.778" x="3.111" y="3.111" fill="#648bff" rx="1"></rect>
                                            <path fill="#ffffff" d="M13.222 8.556L17.889 8.556 21 14 17.889 19.444 13.222 19.444 16.333 14z"></path>
                                            <path fill="#ffffff" d="M7 8.556L11.667 8.556 14.778 14 11.667 19.444 7 19.444 10.111 14z" opacity="0.7"></path>
                                        </g>
                                    </svg>
                                    Fullent Cost
                                </div>
                                <div className="toggle-container">
                                    <label className="toggle-label">
                                        <div style={{position: 'relative', display: 'inline-block', textAlign: 'left', opacity: '1', direction: 'ltr', borderRadius: '8px', transition: 'opacity 0.25s ease 0s', touchAction: 'none', userSelect: 'none'}}>
                                            <input type="checkbox" role="switch" checked style={{border: '0px', boxSizing:'border-box', clip: 'rect(0px, 0px, 0px, 0px)', height: '1px', margin: '-1px', overflow: 'hidden', padding: '0px', position: 'absolute', width: '1px'}} />
                                        </div>
                                        <p className="toggle-text">
                                        2020 COVID Holiday Pricing Surcharge
                                        </p>
                                    </label>
                                </div>
                                <div className="cost-details">
                                    <div className="cost-units-container">
                                        <div className="cost-units-text">Units per order</div>
                                        <div className="cost-units-input-container">
                                            <div className="cost-units-input-inner">
                                                <div className="cost-units-input-text-container">
                                                    <div className="cost-units-input-text">
                                                        1
                                                    </div>
                                                    <input className="cost-units-input" />
                                                </div>
                                                <div className="cost-units-input-drop-container">
                                                    <div className="cost-units-input-drop">
                                                        <svg height="20" width="20"  viewBox="0 0 20 20" aria-aria-hidden="true" className="cost-units-input-drop-icon">
                                                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cost-price-container">
                                        <div className="cost-price-item">
                                            <div>Standard</div>
                                            <div>
                                                <span className="cost-price-item-result">
                                                    $5.23
                                                </span>
                                            </div>
                                        </div>
                                        <div className="cost-price-item">
                                            <div>Walmart 2-Day</div>
                                            <div>
                                                <a href="#" className="cost-price-item-cta">
                                                    Sign up to find out
                                                    <span className="cost-price-item-icon">
                                                        <i class="fas fa-arrow-right"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="cost-price-item">
                                            <div>Google 2-Day</div>
                                            <div>
                                                <span className="cost-price-item-result">
                                                    $7.23
                                                </span>
                                            </div>
                                        </div>
                                        <div className="cost-price-item">
                                            <div>Website (Shopify / BigCommerce) <br/> 2-Day</div>
                                            <span className="cost-price-item-result">
                                                $7.23
                                            </span>
                                        </div>
                                        <div className="cost-price-item">
                                            <div>Wish 2-Day</div>
                                            <div>
                                                <span className="cost-price-item-result">
                                                    $7.49
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cost-disclaimer">
                                    No more suprise fees or additonal costs.
                                    </div>
                                </div>
                            </div>
                            <div id="fulfillment-cost">
                                <div className="cost-header secondary">
                                    <svg style={{marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <g fill="none">
                                            <rect width="28" height="28" fill="#ffffff" rx="2" opacity="0.7"></rect>
                                            <rect width="22.909" height="22.909" x="2.545" y="2.545" fill="#00c89a" rx="1"></rect>
                                            <g fill="#ffffff">
                                                <path d="M0 4.242H12.727V11.878H0z" transform="translate(7.636 8.485)"></path>
                                                <path d="M2.386 0L10.341 0 12.727 4.242 0 4.242z" opacity="0.7" transform="translate(7.636 8.485)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    Storage Cost (monthly)
                                </div>
                                <div className="storage-details">
                                    <div className="cost-units-container">
                                        <div className="cost-units-text">
                                            Average monthly units 
                                            <br/> 
                                            stored at Cardboard Express
                                        </div>
                                        <div className="cost-units-input-container secondary">
                                            <div className="cost-units-input-inner">
                                                <div className="cost-units-input-text-container">
                                                    <div className="cost-units-input-text">
                                                        50
                                                    </div>
                                                    <input className="cost-units-input" />
                                                </div>
                                                <div className="cost-units-input-drop-container">
                                                    <div className="cost-units-input-drop">
                                                        <svg height="20" width="20"  viewBox="0 0 20 20" aria-aria-hidden="true" className="cost-units-input-drop-icon">
                                                            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cost-price-container">
                                        <div className="cost-price-item secondary">
                                            $5.23
                                        </div>
                                    </div>
                                    <ul className="cost-price-details-list">
                                        <li className="cost-price-list-item">Cost shown is the total charge for storing 50  units of this SKU in Cardboard Express.</li>
                                        <li className="cost-price-list-item">Long term storage rates apply for items sitting longer than 1 year.</li>
                                        <li className="cost-price-list-item">Rates shown are for the current month.</li>
                                        <li className="cost-price-list-item">Rates differ between January - September and October - December.</li>
                                    </ul>
                                    <div className="storage-disclaimer">
                                        <a href="#" className="storage-disclaimer-text">
                                            See more details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="query-details">
                            <div id="sample-details">
                                <div className="sample-img-container">
                                    <img src="https://m.media-amazon.com/images/I/41NrgibEmML._SL450_.jpg" alt="img" className="sample-img" />
                                </div>
                                <div className="sample-info">
                                    <div className="sample-info-heading">
                                    DeLonghi EC155M Manual Espresso Machine, Cappuccino Maker
                                    </div>
                                    <div>Dimensions: 14.5 in x 18 in  x 10 in</div>
                                    <div>Item Weight: 9.2 lb</div>
                                </div>
                            </div>
                            <div id="ad-space">
                                <div>
                                    <div className="ad-heading">
                                    Estimate your entire catalog
                                    </div>
                                    <p className="ad-text">
                                    Get access to our complete pricing by signing up.
                                    </p>
                                </div>
                                <div>
                                    <a href="#" className="ad-link">
                                        Sign Up
                                    </a>
                                </div>
                            </div>
                            <div id="related">
                                <div className="related-header">Related Products</div>
                                <div className="related-grid">
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/P/B019FZZ8Y8._PE30_PI_SCMZZZZZZZ_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Climbing Gear</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/P/B072X2HHQ3._PE30_PI_SCMZZZZZZZ_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Espresso Machine</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/I/41pj3Pji8FL._SL450_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Android Charger</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/P/B004G8QSXU._PE30_PI_SCMZZZZZZZ_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Baby Toys</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/P/B000QSNYGI._PE30_PI_SCMZZZZZZZ_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Protein Powder</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/P/B00006B8FK._PE30_PI_SCMZZZZZZZ_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Office Supplies</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/P/B0017OFR5Q._PE30_PI_SCMZZZZZZZ_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Supplements</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/I/51sWIst0p4L._SL450_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">Beauty Kit</span>
                                    </div>
                                    <div className="related-item-container">
                                        <span className="related-item-img-container">
                                            <img className="related-item-img" src="https://m.media-amazon.com/images/I/31jwW7aXCcL._SL450_.jpg" alt="img" />
                                        </span>
                                        <span className="related-item-text">iPhone Case</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{height:'100vh'}}>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}

Calculator.propTypes = {
    setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setPage })(withRouter(Calculator));
