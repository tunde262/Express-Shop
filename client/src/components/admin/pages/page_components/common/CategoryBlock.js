import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CategoryBlock = ({
    isMobile,
    categoryToggle,
    setCategoryToggle,
    categoryData,
    handleCategoryChange,
    product,
    match
}) => {

    useEffect(() => {
        setCategory();
    }, [product.detailProduct]);

    const setCategory = () => {
        if(match.params.productId) {
            if (!product.loading && product.detailProduct) {
                handleCategoryChange(product.detailProduct.category)
            }
        }
    }


    return (
        <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
            <div class="product-privacy-box-title">
                <p style={{color:'#808080', margin:'0', textAlign:'flex-start'}}>Choose a category</p>
                <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <div id="dropdown-el" style={{width:'100%'}} class={categoryToggle ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setCategoryToggle(!categoryToggle)}>
                            {categoryData === '' ? (
                                <p>Choose a category</p>
                            ) : (
                                <p>{categoryData}</p>
                            )}
                            <i class="fas fa-caret-down"></i>
                        </div>
                        {categoryToggle ? (
                            <Fragment>
                                <div onClick={() => handleCategoryChange('clothing & fashion')}><p>Clothing & fashion</p></div>
                                <div onClick={() => handleCategoryChange('bathroom')}><p>Bathroom</p></div>
                                <div onClick={() => handleCategoryChange('household essentials')}><p>Household Essentials</p></div>
                                <div onClick={() => handleCategoryChange('laundry')}><p>Laundry</p></div>
                                <div onClick={() => handleCategoryChange('men')}><p>Men</p></div>
                                <div onClick={() => handleCategoryChange('women')}><p>Women</p></div>
                                <div onClick={() => handleCategoryChange('personal care')}><p>Personal care</p></div>
                                <div onClick={() => handleCategoryChange('pets')}><p>Pets</p></div>
                                <div onClick={() => handleCategoryChange('school & office')}><p>School & Office</p></div>
                                <div onClick={() => handleCategoryChange('shoes')}><p>Shoes</p></div>
                            </Fragment>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

CategoryBlock.propTypes = {
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
})

export default connect(mapStateToProps, null)(withRouter(CategoryBlock));
