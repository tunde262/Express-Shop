import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCategoryProducts  } from '../../../actions/productActions';  

import Header from '../../header/Header';
import Container from '../../ProductList/Container';

import mixpanel from 'mixpanel-browser';

import RelatedCategories from './related/RelatedCategories';
import Spinner from '../../common/Spinner';

const CategoryMain = ({ 
    setTableShow1, 
    tableShow1, 
    getCategoryProducts,
    product,
    filter
}) => {

    const [gotCategories, setGotCategories] = useState(false);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        getCategoryProducts(filter, skip);
    }, [skip]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }


    let pageContent = null;

    if(!product.loading) {
        if(tableShow1 === 'shop') {
            pageContent = (
                <div onScroll={handleScroll} style={{height:"80vh", overflowY:'scroll', background:'rgb(247, 247, 247)'}}>
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

                    {/* <h1>Collection Page</h1> */}
                    <div className="product-list-container">
                        <div className="filter-container">
                            <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                            <i class="fas fa-sliders-h"></i>
                        </div>
                        <Container />
                    </div>
                </div>
            )
        } else if (tableShow1 === 'related') {
            pageContent = (
                <RelatedCategories filter={filter} />
            );
        }
    } else {
        pageContent = <Spinner />;
    }

    // if(!gotCategories && tableShow1 === 'related' && collection.collection !== null) {
    //     getRelatedCategories(collection.collection.tags, skip);
    //     setGotCategories(true);
    // }


    return (
        <Fragment>
            {pageContent}
        </Fragment>
    )
}

CategoryMain.propTypes = {
    getCategoryProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getCategoryProducts })(CategoryMain);
