import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getForYouProducts, getNearbyProducts } from '../../../actions/productActions';           

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
    skip,
    setSkip,
    getForYouProducts,
    getNearbyProducts
}) => {

    const [gotProducts, setGotProducts] = useState(false);

    useEffect(() => {
        if(tableShow1 === 'for you') {
            getForYouProducts(skip);
        } else if (tableShow1 === 'nearby') {
            getNearbyProducts(skip);
        }
    }, [skip, tableShow1]);

    const handleTableShow1 = (value) => {
        setTableShow1(value);
        setSkip(0);
    }

    let pageContent = null;

    if(!product.loading) {
        if(tableShow1 === 'for you') {
            pageContent = (
                <Fragment>
                    {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}
                    <HeaderBlock />
                    
                    <ProductListBlock />
                </Fragment>
            )
        } else if (tableShow1 === 'nearby') {
            pageContent = (
                <div style={{width:'100%', display:'grid', gridTemplateColumns:'3fr 2fr'}}>
                    <div>
                        {/* <Banner imgLarge={ImgLarge} imgSmall={ImgSmall} /> */}
                        <HeaderBlock />
    
                        <ProductListBlock />
                    </div>
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
            <ul class="home-underline store" style={{background:'#fff', margin:'0', border:'1px solid rgb(214, 214, 214)'}}>
                <div onClick={e => handleTableShow1('for you')} className={tableShow1 === "for you" && "active"}><li><p>For You</p></li></div>
                <div onClick={e => handleTableShow1('popular')} className={tableShow1 === "popular" && "active"}><li><p>Popular</p></li></div>
                <div onClick={e => handleTableShow1('nearby')} className={tableShow1 === "nearby" && "active"}><li><p>Nearby</p></li></div>
            </ul>
            
            {pageContent}
        </Fragment>
    )
}

HomeMain.propTypes = {
    product: PropTypes.object.isRequired,
    storageLocation: PropTypes.object.isRequired,
    getForYouProducts: PropTypes.func.isRequired,
    getNearbyProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    storageLocation: state.location,
    product: state.product
})

export default connect(mapStateToProps, { getForYouProducts, getNearbyProducts })(HomeMain);