import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Container from '../../ProductList/Container';

const ProductListBlock = ({ handleScroll }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    return (
        <div className="product-list-container" id="nearby-container-list">
            {isMobile ? (
                <Fragment>
                    <div className="filter-container">
                        <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                        <i class="fas fa-sliders-h"></i>
                    </div>
                    <Container />
                </Fragment>
            ) : (
                <div onScroll={handleScroll} className="scroll-container">
                    <div className="filter-container">
                        <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                        <i class="fas fa-sliders-h"></i>
                    </div>
                    <Container />
                </div>
            )}
        </div>
    )
}

ProductListBlock.propTypes = {

}

export default ProductListBlock;