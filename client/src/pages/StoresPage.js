import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, categoryProducts } from '../actions/productActions';
import { getFeaturedStores, getTrendingStores } from '../actions/storeActions';

// Footer
import Footer from './Home/Footer';
import FeaturedStores from '../components/explore_components/stores_featured/StoresList';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import ProductList from '../components/ProductList/ProductList';
import Navbar from '../components/header/navbar/Navbar';

const StoresPage = ({ getProducts, categoryProducts, getFeaturedStores, getTrendingStores}) => {
    // componentDidMount() {
    //     if(this.props.match.params.category) {
    //         this.props.categoryProducts(this.props.match.params.category);
    //     }
    // }

    const [skip, setSkip] = useState(0);

    useEffect(() => {
        getFeaturedStores(skip);
        getTrendingStores(skip);
    }, [skip]);

    
    return (
        <div className="explore-container">  
                <h3>Top Stores</h3>
                <FeaturedStores />
                <div className="wh-apply">
                    <div className="container">
                        <div className="box">
                            <div className="box-content">
                                <h3 className="box-heading">
                                    Apply To Open A Store
                                </h3>
                                <div className="box-text">
                                    <p>Increase your business, for FREE, without the headaches.</p>
                                </div>
                            </div>
                            <div className="box-button">
                                <a className="btn" href="">
                                    Apply Now
                                    <i className="far fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Stores For Kids</h3>
                <FeaturedStores />
                <h3>Stores For Back To School</h3>
                <FeaturedStores />
                <h3>Stores For Streetwear</h3>
                <FeaturedStores />
                <h3>Stores For Your Pets</h3>
                <FeaturedStores />
                <h3>Stores For Basketball</h3>
                <FeaturedStores />
                <h3>Stores For Hair Care</h3>
                <FeaturedStores />
                <h3>Stores For Laundry</h3>
                <FeaturedStores />
            <Footer />
        </div>
    )
}

StoresPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    categoryProducts: PropTypes.func.isRequired,
    getFeaturedStores: PropTypes.func.isRequired, 
    getTrendingStores: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { getProducts, categoryProducts, getFeaturedStores, getTrendingStores })(StoresPage);
