import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../ProductList/Container';

const ProductListBlock = () => {

    return (
        <div className="product-list-container">
            <div className="filter-container">
                <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                <i class="fas fa-sliders-h"></i>
            </div>
            <Container />
        </div>
    )
}

ProductListBlock.propTypes = {

}

export default ProductListBlock;