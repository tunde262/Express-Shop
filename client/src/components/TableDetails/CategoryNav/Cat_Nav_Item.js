import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Cat_Nav_Item = ({slideForm2, setSlideForm2, item, setCatValue, catValue, fullWidth, slide }) => {
    
    const todo = () => {
        if(slide) {
            setSlideForm2(!slideForm2); 
            setCatValue(item.tag_value);
        }
    }

    return (
        <Fragment>
            {slide ? (
                <div onClick={todo} className="store-table-nav-items secondary" style={fullWidth ? {width:'100%', margin:'10px 0', padding:'0'}: {width:'234px', margin:'10px 0', padding:'0'}}>
                    <div style={fullWidth ? {width:'100%', display: 'grid', gridTemplateColumns:'3fr 1fr', paddingLeft: '16px', paddingRight: '16px'} : {width:'234px', display: 'grid', gridTemplateColumns:'3fr 1fr', paddingLeft: '16px'}}>
                        {/* <img src={item.img} style={{borderRadius: '50%', height: '40px', overflow: 'hidden', width: '40px', margin: '2px 5px 2px 0'}} /> */}
                        <div style={{width:'100%', overflow:'hidden', display:'flex', alignItems:'center'}}>
                            {/* <a className="link-decoration" href={`https://www.cardboardexpress.com/category?filter=${item.tag_value}`}> */}
                                <h3 style={{fontWeight:'600', fontSize:'14px'}}>{item.text_value}</h3>
                            {/* </a> */}
                        </div>
                        {slide ? (
                            <div style={fullWidth ? {display:'flex', alignItems:'center', justifyContent:'flex-end'} : {display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <i style={{color:'#808080', fontSize:'12px'}} class="fas fa-chevron-right"></i>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <a className="link-decoration" href={`https://www.cardboardexpress.com/category?filter=${item.tag_value}`}> 
                    <div onClick={todo} className="store-table-nav-items secondary" style={fullWidth ? {width:'100%', margin:'10px 0', padding:'0'}: {width:'234px', margin:'10px 0', padding:'0'}}>
                        <div style={fullWidth ? {width:'100%', display: 'grid', gridTemplateColumns:'3fr 1fr', paddingLeft: '16px', paddingRight: '16px'} : {width:'234px', display: 'grid', gridTemplateColumns:'3fr 1fr', paddingLeft: '16px'}}>
                            {/* <img src={item.img} style={{borderRadius: '50%', height: '40px', overflow: 'hidden', width: '40px', margin: '2px 5px 2px 0'}} /> */}
                            <div style={{width:'100%', overflow:'hidden', display:'flex', alignItems:'center'}}>
                                <h3 style={{fontWeight:'600', fontSize:'14px'}}>{item.text_value}</h3>
                            </div>
                            {slide ? (
                                <div style={fullWidth ? {display:'flex', alignItems:'center', justifyContent:'flex-end'} : {display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <i style={{color:'#808080', fontSize:'12px'}} class="fas fa-chevron-right"></i>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </a>
            )}
        </Fragment>
    )
}

Cat_Nav_Item.propTypes = {

}

export default Cat_Nav_Item;
