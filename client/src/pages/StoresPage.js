import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, categoryProducts } from '../actions/productActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import ProductList from '../components/ProductList/ProductList';
import Navbar from '../components/header/navbar/Navbar';

class StoresPage extends Component {
    componentDidMount() {
        if(this.props.match.params.category) {
            this.props.categoryProducts(this.props.match.params.category);
        }
    }

    render() {
        return (
            <Fragment>
                <div className="wrapper">
                    {/* <nav className="main-nav">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav> */}

<section className="top-container">
                        <div className="showcase">
                            <h1>Your Web Presence</h1>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode. Modie ipsum ! Hihi; quo minii alkj atufa.</p>
                            <a href="#" className="btn">Read More</a>
                        </div>
                        <div className="top-box top-box-a">
                            <h4>Membership</h4>
                            <p className="price">$199/mo</p>
                            <a href="#" className="btn">Buy Now</a>
                        </div>
                        <div className="top-box top-box-b">
                            <h4>Pro Membership</h4>
                            <p className="price">$299/mo</p>
                            <a href="#" className="btn">Buy Now</a>
                        </div>
                    </section>

                    <section className="boxes">
                        <div className="box">
                            <i className="fas fa-chart-pie fa-4x"></i>
                            <h3>Analytics</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-globe fa-4x"></i>
                            <h3>Marketing</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-cog fa-4x"></i>
                            <h3>Development</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-users fa-4x"></i>
                            <h3>Support</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-chart-pie fa-4x"></i>
                            <h3>Analytics</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-globe fa-4x"></i>
                            <h3>Marketing</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-cog fa-4x"></i>
                            <h3>Development</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-users fa-4x"></i>
                            <h3>Support</h3>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                        </div>
                    </section>

                    <section className="info">
                        <div className="img"></div>
                        <div>
                            <h2>Your Business</h2>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                            <a href="#" className="btn">Learn More</a>
                        </div>
                    </section>

                    <section className="portfolio">
                        <img src="https://source.unsplash.com/random/200x200" alt="" />
                        <img src="https://source.unsplash.com/random/201x200" alt="" />
                        <img src="https://source.unsplash.com/random/202x200" alt="" />
                        <img src="https://source.unsplash.com/random/203x200" alt="" />
                        <img src="https://source.unsplash.com/random/204x200" alt="" />
                        <img src="https://source.unsplash.com/random/205x200" alt="" />
                        <img src="https://source.unsplash.com/random/206x200" alt="" />
                        <img src="https://source.unsplash.com/random/207x200" alt="" />
                        <img src="https://source.unsplash.com/random/208x200" alt="" />
                    </section>
                </div>
            </Fragment>
        )
    }
}

StoresPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    categoryProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, categoryProducts })(StoresPage);
