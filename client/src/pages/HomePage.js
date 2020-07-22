import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';

import Footer from '../components/layout/Footer/Footer';
import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Spinner from '../components/common/Spinner';
import Title from '../components/Title';
import Container from '../components/ProductList/Container';
import AuthModal from '../components/modals/AuthModal';
import Banner from '../components/common/Banner';
import ImgLarge from '../utils/imgs/banner21.jpg';
import ImgSmall from '../utils/imgs/banner13.jpg';

const ExplorePage = ({getProducts, product, auth: { isAuthenticated, loading}}) => {
    const [skip, setSkip] = useState(0)
    useEffect(() => {
        getProducts(skip);
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }

    // const [displayModal, toggleModal] = useState(false);

    // const setModal = () => {
    //     toggleModal(!displayModal);
    // }

    // if(!loading && !isAuthenticated) {
    //     setTimeout(setModal, 3000);
    // }

    // const { name, email, password, password2 } = formData;

    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    // const onSubmit = async e => {
    //     console.log('Modal Form')
    // }
    
    const { exploreTops, exploreBottoms, exploreHats, exploreSocks } = product;

    let productList;

    // const { loading } = product;

    // if(exploreTops === null || loading) {
    //     productList = <Spinner />;
    // }
    // else {
    //     productList = (
    //         <Fragment>

    //             <div style={{marginBottom: '-1rem'}}><Title title="Explore" /></div>
    //             <ProductOverview title="Tops" products={exploreTops} link="/top" />
    //             <ProductOverview title="Bottoms" products={exploreBottoms} link="/bottom" />
    //             <ProductOverview title="Hats" products={exploreHats} link="/hat" />
    //         </Fragment>
    //     );
    // }
        
    return (
        <Fragment>
            <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll'}}>
                <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} />
                <Header />
                <Container title="Bottoms" category="bottoms" background="MediumSlateBlue"  />
            </div>
            {/* <Footer /> */}
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </Fragment>
    )
    
}

ExplorePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { getProducts, getCart })(ExplorePage);
