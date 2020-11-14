import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



const Variant = ({ 
    deleteVariant,
    handleToggle,
    variantItem,
    variant,
    onChangePrice,
    onChangeSalePrice,
    onChangeSku,
    onChangeQty
}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [rowSlide, setRowSlide] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;
     

    // if(!gotVariants) {
    //     getProductVariants(prodId);
    //     setGotVariants(true);
    // }


    let rowClassName1;

    if(!rowSlide) {
        if(isTablet) {
            rowClassName1 = "slide-transition-container variant-table-row-mobile active";
        } else {
            rowClassName1 = "slide-transition-container variant-table-row active"
        }
    } else {
        if(isTablet) {
            rowClassName1 = "slide-transition-container variant-table-row-mobile";
        } else {
            rowClassName1 = "slide-transition-container variant-table-row"
        }
    }

    let rowClassName2;

    if(rowSlide) {
        rowClassName2 = "slide-transition-container variant-table-row active"
    } else {
        rowClassName2 = "slide-transition-container variant-table-row"
    }

    return (
        <div key={variant._id} className="modal-table-list-transition">
            {/** Transition 1 */}
            <div  
                className={rowClassName1} 
                key={variant._id}
                id="transition-1"
            >
                {isTablet ? (
                    <Fragment>
                        <div>{variantItem.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${variantItem.img_gallery[0].img_name}`} alt="img" />}</div>
                        <div>
                            {variant.color && (<span>{variant.color} </span>)}
                            {variant.size && (<span>{variant.size} </span>)}
                            {variant.weight && (<span>{variant.weight} </span>)}
                            {variant.bundle && (<span>{variant.bundle} </span>)}
                            {variant.type && (<span>{variant.type} </span>)}
                            {variant.scent && (<span>{variant.scent} </span>)}
                            {variant.fit && (<span>{variant.fit} </span>)}
                            {variant.flavor && (<span>{variant.flavor} </span>)}
                            {variant.material && (<span>{variant.material} </span>)}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div 
                            onClick={() => handleToggle(variant._id)}
                            style={{cursor:'pointer'}}
                        >
                            {variantItem.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${variantItem.img_gallery[0].img_name}`} alt="img" />}
                        </div>
                        <div 
                            onClick={() => handleToggle(variant._id)}
                            style={{cursor:'pointer'}}
                        >
                            {variant.color && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.color} </p></div>)}
                            {variant.size && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.size} </p></div>)}
                            {variant.weight && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.weight} </p></div>)}
                            {variant.bundle && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.bundle} </p></div>)}
                            {variant.type && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.type} </p></div>)}
                            {variant.scent && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.scent} </p></div>)}
                            {variant.fit && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.fit} </p></div>)}
                            {variant.flavor && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.flavor} </p></div>)}
                            {variant.material && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{variant.material} </p></div>)}
                        </div>
                        <div 
                            onClick={() => handleToggle(variant._id)}
                            style={{cursor:'pointer'}}
                        >
                            $5
                        </div>
                        <div 
                            onClick={() => handleToggle(variant._id)}
                            style={{cursor:'pointer'}}
                        >
                            5
                        </div>
                        <div 
                            onClick={() => handleToggle(variant._id)}
                            style={{cursor:'pointer'}}
                        >
                            6
                        </div>
                        <div 
                            style={{width:'50px', color:'#ff4b2b', cursor:'pointer'}}
                        >
                            <i onClick={() => setRowSlide(!rowSlide)} className="fas fa-pen"></i>
                        </div>
                    </Fragment>
                ) }
            </div>

            {/** Transition 2 */}
            <div 
                className={rowClassName2} 
                id="transition-2"
            >
                <div>
                    {variant.color && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.color} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.size && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.size} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.weight && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.weight} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.bundle && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.bundle} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.type && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.type} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.scent && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.scent} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.fit && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.fit} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.flavor && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.flavor} 
                            </p>
                            <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                        </div>
                    )}
                    {variant.material && (
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                {variant.material} 
                            </p>
                        </div>
                    )}
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="price"
                    name="price"
                    value={variant.price}
                    onChange={e => onChangePrice(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="sale price"
                    name="sale_price"
                    value={variant.sale_price}
                    onChange={e => onChangeSalePrice(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="qty"
                    name="inventory_qty"
                    value={variant.inventory_qty}
                    onChange={e => onChangeQty(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="sku"
                    name="sku"
                    value={variant.sku}
                    onChange={e => onChangeSku(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div style={{width:'50px', display:'flex', flexDirection:'column'}}>
                    <div style={{width:'100%', height:'50%', color:'green', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <i className="fas fa-check"></i>
                    </div>
                    <div style={{width:'100%', height:'50%', color:'#ff4b2b', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <i onClick={() => setRowSlide(!rowSlide)} className="fas fa-times"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

Variant.propTypes = {

}

export default Variant;
