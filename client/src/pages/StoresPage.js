import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, categoryProducts } from '../actions/productActions';

// Footer
import Footer from '../components/layout/Footer/Footer';

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
                    <h3>Top Stores</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Forever 21</h3>
                        </div>
                        <div className="category-box">
                            <h3>Lil Keed Shop</h3>
                        </div>
                        <div className="category-box">
                            <h3>Hot Topic</h3>
                        </div>
                        <div className="category-box">
                            <h3>The Jersey Store</h3>
                        </div>
                        <div className="category-box">
                            <h3>Pacsun</h3>
                        </div>
                        <div className="category-box">
                            <h3>Colgate</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <section className="info">
                        <div className="img"></div>
                        <div>
                            <h2>Want To Open A Store?</h2>
                            <p>Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.Lorem ipsum is tie amet consetucrt afipriiyfm elit.
                                mode! Hihi; quo minii alkj atufa.</p>
                            <a href="#" className="btn">Learn More</a>
                        </div>
                    </section>
                </div>
                <div className="wrapper"> 
                    <h3>Stores For Kids</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Gap Kids</h3>
                        </div>
                        <div className="category-box">
                            <h3>Sketchers</h3>
                        </div>
                        <div className="category-box">
                            <h3>Arts & CraftS</h3>
                        </div>
                        <div className="category-box">
                            <h3>Toys R Us</h3>
                        </div>
                        <div className="category-box">
                            <h3>Diaper Shop</h3>
                        </div>
                        <div className="category-box">
                            <h3>Play-Doh</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Stores For Back To School</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Crayola</h3>
                        </div>
                        <div className="category-box">
                            <h3>Clorox</h3>
                        </div>
                        <div className="category-box">
                            <h3>Sharpie</h3>
                        </div>
                        <div className="category-box">
                            <h3>Post-It</h3>
                        </div>
                        <div className="category-box">
                            <h3>Office Depot</h3>
                        </div>
                        <div className="category-box">
                            <h3>The Art Store</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Stores For Streetwear</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Supreme</h3>
                        </div>
                        <div className="category-box">
                            <h3>Polo Ralph Lauren</h3>
                        </div>
                        <div className="category-box">
                            <h3>Stussy</h3>
                        </div>
                        <div className="category-box">
                            <h3>Champion</h3>
                        </div>
                        <div className="category-box">
                            <h3>Off-White</h3>
                        </div>
                        <div className="category-box">
                            <h3>Lil Keed Shop</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Stores For Your Pets</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Iams</h3>
                        </div>
                        <div className="category-box">
                            <h3>Pet Smart</h3>
                        </div>
                        <div className="category-box">
                            <h3>Milk Bone</h3>
                        </div>
                        <div className="category-box">
                            <h3>Authority</h3>
                        </div>
                        <div className="category-box">
                            <h3>Chewy's</h3>
                        </div>
                        <div className="category-box">
                            <h3>ProPlan</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Stores For Basketball</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Nike</h3>
                        </div>
                        <div className="category-box">
                            <h3>Jordan</h3>
                        </div>
                        <div className="category-box">
                            <h3>And 1</h3>
                        </div>
                        <div className="category-box">
                            <h3>Cool Kicks</h3>
                        </div>
                        <div className="category-box">
                            <h3>PFJPerormance</h3>
                        </div>
                        <div className="category-box">
                            <h3>2K Store</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Stores For Hair Care</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Shea Butter</h3>
                        </div>
                        <div className="category-box">
                            <h3>Hair Vitamins</h3>
                        </div>
                        <div className="category-box">
                            <h3>Cantu</h3>
                        </div>
                        <div className="category-box">
                            <h3>Halo Hair</h3>
                        </div>
                        <div className="category-box">
                            <h3>The Wig Store</h3>
                        </div>
                        <div className="category-box">
                            <h3>Redkin</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <div className="wrapper"> 
                    <h3>Stores For Laundry</h3>
                    <section className="category-boxes">
                        <div className="category-box">
                            <h3>Store 1</h3>
                        </div>
                        <div className="category-box">
                            <h3>Store 2</h3>
                        </div>
                        <div className="category-box">
                            <h3>Store 3</h3>
                        </div>
                        <div className="category-box">
                            <h3>Store 4</h3>
                        </div>
                        <div className="category-box">
                            <h3>Store 5</h3>
                        </div>
                        <div className="category-box">
                            <h3>Store 6</h3>
                        </div>
                    </section>
                    <button>View All</button>
                </div>
                <Footer />
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
