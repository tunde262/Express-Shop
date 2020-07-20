import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';

import Footer from '../components/layout/Footer/Footer';
import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';

class CategoryPage extends Component{
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { exploreTops, exploreBottoms, exploreHats, exploreSocks } = this.props.product;

        let productList;

        const { loading } = this.props.product;

        if(exploreTops === null || loading) {
            productList = <Spinner />;
        }
        else {
            productList = (
                <Fragment>

                    <div style={{marginBottom: '-1rem'}}><Title title="Explore" /></div>
                    <ProductOverview title="Tops" products={exploreTops} link="/top" />
                    <ProductOverview title="Bottoms" products={exploreBottoms} link="/bottom" />
                    <ProductOverview title="Hats" products={exploreHats} link="/hat" />
                </Fragment>
            );
        }
        
        return (
            <Fragment>
                <div className="wrapper">  
                    <h3>Top Categories</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Clothing & Fashion</h3>
                        </div>
                        <div className="category-box">
                            <h3>Personal Care</h3>
                        </div>
                        <div className="category-box">
                            <h3>Hair Care</h3>
                        </div>
                        <div className="category-box">
                            <h3>Pets</h3>
                        </div>
                        <div className="category-box">
                            <h3>Household Essentials</h3>
                        </div>
                        <div className="category-box">
                            <h3>School & Office Supplies</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <section className="info">
                        <div className="img"></div>
                        <div>
                            <h2>Featured Category</h2>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                            <a href="#" className="btn">Learn More</a>
                        </div>
                    </section>
                </div>
                <div className="wrapper"> 
                    <h3>Top Brands</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Yeezy</h3>
                        </div>
                        <div className="category-box">
                            <h3>Cactus Jack</h3>
                        </div>
                        <div className="category-box">
                            <h3>Nike</h3>
                        </div>
                        <div className="category-box">
                            <h3>Supreme</h3>
                        </div>
                        <div className="category-box">
                            <h3>Iams</h3>
                        </div>
                        <div className="category-box">
                            <h3>Boxed</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Clothing & Fashion</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Baketball Jerseys</h3>
                        </div>
                        <div className="category-box">
                            <h3>Graphic Tees</h3>
                        </div>
                        <div className="category-box">
                            <h3>Joggers & Sweatpants</h3>
                        </div>
                        <div className="category-box">
                            <h3>Hats</h3>
                        </div>
                        <div className="category-box">
                            <h3>Socks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Shoes</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Household Essentials</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Paper & Plastic</h3>
                        </div>
                        <div className="category-box">
                            <h3>Cleaning Supplies</h3>
                        </div>
                        <div className="category-box">
                            <h3>Laundry Care</h3>
                        </div>
                        <div className="category-box">
                            <h3>Kitchen Items</h3>
                        </div>
                        <div className="category-box">
                            <h3>Bathroom</h3>
                        </div>
                        <div className="category-box">
                            <h3>Party Supplies</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Personal Care</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Development</h3>
                        </div>
                        <div className="category-box">
                            <h3>Support</h3>
                        </div>
                        <div className="category-box">
                            <h3>Analytics</h3>
                        </div>
                        <div className="category-box">
                            <h3>Marketing</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Pets</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Development</h3>
                        </div>
                        <div className="category-box">
                            <h3>Support</h3>
                        </div>
                        <div className="category-box">
                            <h3>Analytics</h3>
                        </div>
                        <div className="category-box">
                            <h3>Marketing</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>School & Office Supplies</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Development</h3>
                        </div>
                        <div className="category-box">
                            <h3>Support</h3>
                        </div>
                        <div className="category-box">
                            <h3>Analytics</h3>
                        </div>
                        <div className="category-box">
                            <h3>Marketing</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Bathroom</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Development</h3>
                        </div>
                        <div className="category-box">
                            <h3>Support</h3>
                        </div>
                        <div className="category-box">
                            <h3>Analytics</h3>
                        </div>
                        <div className="category-box">
                            <h3>Marketing</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Laundry</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Dog Food & Snacks</h3>
                        </div>
                        <div className="category-box">
                            <h3>Development</h3>
                        </div>
                        <div className="category-box">
                            <h3>Support</h3>
                        </div>
                        <div className="category-box">
                            <h3>Analytics</h3>
                        </div>
                        <div className="category-box">
                            <h3>Marketing</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>

                <Footer />
            </Fragment>
        )
    }
}

CategoryPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, getCart })(CategoryPage);
