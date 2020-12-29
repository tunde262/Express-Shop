import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts, getForYouProducts, getPopularProducts, getNearbyProducts, clearProducts } from '../../../actions/productActions';           

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';

import HeaderBlock from '../common/HeaderBlock';
import ProductListBlock from '../common/ProductListBlock';
import ProdMapBlock from '../common/ProdMapBlock';

const HomeMain = ({ 
    storageLocation,
    setTableShow1, 
    tableShow1, 
    product,
    auth: {
        user
    },
    skip,
    setSkip,
    handleScroll,
    getProducts,
    getForYouProducts,
    getPopularProducts,
    getNearbyProducts,
    clearProducts,
    history
}) => {

    const [gotProducts, setGotProducts] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [newSet, setNewSet] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        if(tableShow1 === 'for you') {
            if(user) {
                getForYouProducts(skip);
                console.log('STARTING FOR YOU')
            } else {
                getProducts(skip);
                console.log('STARTING FOR YOU UN-AUTH')
            }
        } else if (tableShow1 === 'popular') {
            getPopularProducts(skip);
            console.log('STARTING POPULAR')
            
        } else if (tableShow1 === 'nearby') {
            getProducts(skip);
            // getNearbyProducts(skip);
            console.log('STARTING NEARBY')
        }

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [skip, tableShow1]);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const handleTableShow1 = (value) => {
        if(value !== tableShow1) {
            if(value === 'for you') {
                history.push('/explore?show=for-you');
            } else if (value === 'popular') {
                history.push('/explore?show=popular');
            } else if (value === 'nearby') {
                history.push('/explore?show=nearby');
            }
            clearProducts();
            setSkip(0);
            setTableShow1(value);
        }
    }

    let pageContent = null;

    if(!product.loading) {
        if(tableShow1 === 'for you') {
            pageContent = (
                <Fragment>
                    {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}
                    <HeaderBlock />
                    
                    <ProductListBlock handleScroll={handleScroll} />
                </Fragment>
            )
        } else if (tableShow1 === 'popular') {
            pageContent = (
                <Fragment>
                    {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}
                    <HeaderBlock />
                    
                    <ProductListBlock handleScroll={handleScroll} />
                </Fragment>
            );
        } else if (tableShow1 === 'nearby') {
            pageContent = (
                <div className="nearby-container">
                    {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}

                    <ProductListBlock handleScroll={handleScroll} />

                    <ProdMapBlock storageLocation={storageLocation} />
                </div>
            );
        }
    } else {
        pageContent = <Spinner />
    }


    // if(!gotCollections && tableShow1 === 'related' && collection.collection) {
    //     console.log('FETCH RELATED COLLECTIONS')

    //     getCollectionsByTagList(collection.collection.tags, skip);
        
    //     setGotCollections(true);
    // }


    return (
        <Fragment>
            <ul class="home-underline store" style={{background:'#fff', border:'1px solid #e3e8ee'}}>
                <div onClick={e => handleTableShow1('for you')} className={tableShow1 === "for you" && "active"}><li><p>For You</p></li></div>
                <div onClick={e => handleTableShow1('popular')} className={tableShow1 === "popular" && "active"}><li><p>Popular</p></li></div>
                <div onClick={e => handleTableShow1('nearby')} className={tableShow1 === "nearby" && "active"}><li><p>Nearby</p></li></div>
            </ul>
            
            <div className={tableShow1 === "nearby" ? "home-content nearby" : "home-content main"}>
                {pageContent}
            </div>
        </Fragment>
    )
}

HomeMain.propTypes = {
    product: PropTypes.object.isRequired,
    storageLocation: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    getForYouProducts: PropTypes.func.isRequired,
    getPopularProducts: PropTypes.func.isRequired,
    getNearbyProducts: PropTypes.func.isRequired,
    clearProducts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    storageLocation: state.location,
    product: state.product,
    auth: state.auth
})

export default connect(mapStateToProps, { 
    getProducts, 
    getForYouProducts, 
    getPopularProducts,
    getNearbyProducts, 
    clearProducts 
})(withRouter(HomeMain));