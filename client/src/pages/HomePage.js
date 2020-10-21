import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts, getCart } from '../actions/productActions';
import { setNav1 } from '../actions/navActions';

import mixpanel from 'mixpanel-browser';

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

const HomePage = ({getProducts, product, auth: { user, isAuthenticated, loading}, setNav1}) => {
    const [skip, setSkip] = useState(0);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('for you');

    const [sentMixpanel, setSentMixpanel] = useState(false);
    
    useEffect(() => {
        getProducts(skip);
        setNav1('explore');
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }

    const handleMixpanel = () => {
        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.identify(user._id);
        mixpanel.track("View Main Shopping Page", {
        //   "Entry Point": "Home Landing",
        //   "# of Results Returned": "A",
          "Chosen Category": "All"
        });
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

    if(!sentMixpanel && user !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }
    
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
            <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll', background:'rgb(247, 247, 247)'}}>
                <ul class="home-underline store" style={{background:'#fff', margin:'0', border:'1px solid rgb(214, 214, 214)'}}>
                    <div onClick={e => setTableShow1('for you')} className={tableShow1 === "for you" && "active"}><li><p>For You</p></li></div>
                    <div onClick={e => setTableShow1('popular')} className={tableShow1 === "popular" && "active"}><li><p>Popular</p></li></div>
                    <div onClick={e => setTableShow1('nearby')} className={tableShow1 === "nearby" && "active"}><li><p>Nearby</p></li></div>
                </ul>
                {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}
                <div className="header-nav-container">
                    <div style={{padding:'10px'}}>
                        <h3 style={{fontSize:'12px', letterSpacing:'1px',color:'#808080'}}>
                            Pick A Category
                        </h3>
                    </div>
                    <div style={{marginTop:'-2rem'}}>
                        <Header />
                    </div>
                </div>
                <div className="filter-container">
                    <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                    <i class="fas fa-sliders-h"></i>
                </div>
                <div className="product-list-container">
                    <Container />
                </div>
            </div>
            {/* <Footer /> */}
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </Fragment>
    )
    
}

HomePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setNav1: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { getProducts, getCart, setNav1 })(HomePage);
