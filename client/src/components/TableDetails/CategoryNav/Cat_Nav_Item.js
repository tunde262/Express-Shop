import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Cat_Nav_Item = ({slideForm2, setSlideForm2, item, setCatValue, catValue }) => {
    const todo = () => {
        setSlideForm2(!slideForm2);
        setCatValue(item.tag_value);
    }

    return (
        <div onClick={todo} className="store-table-nav-items secondary" style={{width:'234px', margin:'5px 0', padding:'0'}}>
            <div style={{width:'234px', display: 'grid', gridTemplateColumns:'1fr 3fr 1fr', paddingLeft: '16px'}}>
                <img src={item.img} style={{borderRadius: '50%', height: '40px', overflow: 'hidden', width: '40px', margin: '2px 5px 2px 0'}} />
                <div style={{width:'100%', overflow:'hidden', display:'flex', alignItems:'center'}}>
                    <a href="#">
                        <h3 style={{fontWeight:'600', fontSize:'14px'}}>{item.text_value}</h3>
                    </a>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        </div>
    )
}

Cat_Nav_Item.propTypes = {

}

export default Cat_Nav_Item;
