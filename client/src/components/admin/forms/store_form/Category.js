import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setAlert } from '../../../../actions/alertActions';

const Category = ({ slideform3, setSlideForm3, slideform4, setSlideForm4, handleCategoryChange, categoryData, categoryToggle, setCategoryToggle, setAlert }) => {

    const todo = () => {
        if(categoryData !== '') {
            setSlideForm4(!slideform4)
        } else {
            setAlert('Must state a category', 'danger');
        }
    }

    return (
        <Fragment>
            <h3>Please state your category:</h3>
            <div style={{height:'230px', overflow:'scroll'}}>
                <div id="dropdown-el" style={{width:'100%', margin:'50px 0 20px 0'}} className={categoryToggle ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setCategoryToggle(!categoryToggle)}>
                        {categoryData === '' ? (
                            <p>Choose a category</p>
                        ) : (
                            <p>{categoryData}</p>
                        )}
                        <i className="fas fa-caret-down"></i>
                    </div>
                    {categoryToggle ? (
                        <Fragment>
                            <div onClick={() => handleCategoryChange('wholesaler')}><p>Wholesaler</p></div>
                            <div onClick={() => handleCategoryChange('brick & mortar')}><p>Brick & Mortar</p></div>
                            <div onClick={() => handleCategoryChange('grocery')}><p>Grocery</p></div>
                            <div onClick={() => handleCategoryChange('food & snacks')}><p>Food & Snacks</p></div>
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
            <button onClick={() => todo()} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm3(!slideform3)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Category.propTypes = {

}

export default Category
