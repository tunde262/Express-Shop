import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleTags, clearProducts } from '../actions/productActions';
import axios from 'axios';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import ProductList from '../components/ProductList/ProductList';
import Container from '../components/ProductList/Container';
import AuthModal from '../components/modals/AuthModal';

const CollectionPage = ({ handleTags, clearProducts, product, auth: { isAuthenticated, user, loading } }) => {

    const [skip, setSkip] = useState(0);
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [maxSkip, setMaxSkip] = useState(null);

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const url_filter = (window.location.href);
    const url = new URL(url_filter);
    const filter = url.searchParams.get("filter");

    const getProducts = async () => {
        console.log("MAXSKIP Above: " + maxSkip)
        if(skip < maxSkip && maxSkip !== null) {
            handleTags(filter, product.products, skip);
            setProductsLoaded(true);
        }
    } 

    const getMax = async () => {
        try {
            const res = await axios.get(`/api/products/filter/full/${filter}`);
            console.log('requested: ' + res.data);
            const totalProducts = res.data;
            console.log('total Products: ' + totalProducts);
            setMaxSkip(totalProducts.length);
            console.log("MAXSKIP: " + totalProducts.length);
        } catch (err) {
            console.log(err)
        }
    } 
    
    useEffect(() => {
        handleTags(filter, product.products, skip);
    }, [skip, filter]);

    // const getInitialProducts = async () => {
    //     setProductsLoaded(true);
    
    //     handleTags(filter, product.products, skip);
    // } 

    // if(!productsLoaded) {
    //     getProducts();
    // }

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }

    const handleMixpanel = () => {
        var url_filter = (window.location.href);
        var url = new URL(url_filter);
        var filter = url.searchParams.get("filter");

        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.identify(user._id);
        mixpanel.track("View Shop Collection Page", {
        //   "Entry Point": "Home Landing",
        //   "# of Results Returned": "A",
          "Chosen Category": `${filter}`
        });
    }

        return (
            <Fragment>
                <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll'}}>
                    {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}
                    <Header />
                    <hr />
                    {/* <h1>Collection Page</h1> */}
                    <Container title="Tops" category="tops" background="DeepSkyBlue" />
                </div>
                {/* <Footer /> */}
                {!loading && !isAuthenticated ? <AuthModal /> : null }
            </Fragment>
        )
}

CollectionPage.propTypes = {
    handleTags: PropTypes.func.isRequired,
    clearProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { handleTags, clearProducts })(CollectionPage);
