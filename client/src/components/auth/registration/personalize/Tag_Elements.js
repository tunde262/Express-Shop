import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { HorizontalNav } from '../../../common/HorizontalNav';
import { NavItem } from '../../../header/navbar/NavItem';

import shoeSampleImg from '../../../../utils/imgs/20484728.jpeg';
import paperTowelImg from '../../../../utils/imgs/paper_towels.jpeg';
import categoryList from '../../../admin/pages/page_components/edit/categoryList';

const Tag_Elements = ({ 
    recommendationTags, 
    setRecommendationTags, 
    slideform1, 
    setSlideForm1, 
    slideform2, 
    setSlideForm2,
    onSubmit
}) => {

    const handleClick = (tag) => {
        if(recommendationTags.filter(t => t === tag).length > 0) {
            onDeleteTag(tag);
        } else {
            onAddTag(tag);
        }
    }

    const onAddTag = (tag) => {
        setRecommendationTags([...recommendationTags, tag]);
        // filterItems(tag);
    }

    const onDeleteTag = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = recommendationTags.filter ((t) => {
        return (t !== tag);
        });
        setRecommendationTags([...remainingTags]);
        // unFilterItems(tag);
    }

    const todo = (e) => {
        onSubmit(e);
        setSlideForm2(!slideform2);
    }

    let categoryListContent = categoryList.map((nav_item, index) => (
        <NavItem 
            key={index} 
            background={recommendationTags.includes(nav_item.tag_value) ? nav_item.background_color : "#fff"}
            hover={nav_item.background_color}
            color={recommendationTags.includes(nav_item.tag_value) ? "#fff" : "#333"}
            border="#dfe1e5"
            onClick={() => handleClick(nav_item.tag_value)}
        >
            {nav_item.img && (
                <img 
                    alt="" 
                    width="50" 
                    height="50" 
                    src={nav_item.img}
                />
            )}
            {' '}{nav_item.tag_value}
        </NavItem>
        )
    );
    
    return (
        <Fragment>
            <div onClick={() => setSlideForm1(!slideform1)} style={{display:'100%', display:'flex', alignItems:'center', color:'#ff4b2b', padding:'20px 20px 0'}}>
                <i style={{fontSize:'12px', margin:'0 10px'}} class="fas fa-arrow-left"></i>
                <p style={{margin:'0'}}>go back</p>
            </div>
            
            <h3>What interests you?</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>We'll use this info to recommend items to use</p>
            <div style={{height:'349px', borderTop:'1px solid rgb(214,214,214)', overflowY:'scroll'}}>
                {categoryListContent}
            </div>

            <button disabled={recommendationTags.length > 2 ? false : true} onClick={(e) => todo(e)} className={recommendationTags.length > 2 ? "step-form-btn" : "step-form-btn disabled"}>
                {recommendationTags.length > 2 ? "Continue" : "Select 3"}
            </button> 
        </Fragment>
    )
}

Tag_Elements.propTypes = {

}

export default Tag_Elements;