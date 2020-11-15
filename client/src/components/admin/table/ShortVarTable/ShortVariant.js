import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';


const ShortVariant = ({ 
    detailVariant, 
    handleClick, 
    variantList,
    onChange,
    slide
}) => {  
    const [selected, setSelected] = useState(false);

    const [varImg, setVarImg] = useState(null);

    const [rowSlide, setRowSlide] = useState(false);

    useEffect(() => {
        renderVarImg();
    }, []);

    const itemClick = () => {
        // handleClick(detailItem._id);
        setSelected(!selected)
    }


    const renderVarImg = async () => {
        setVarImg(null);
        try {
            const res = await axios.get(`/api/products/${detailVariant.product}`);
            setVarImg(res.data);
        } catch (err) {
            console.log(err);
        }          
    }

    let rowClassName1;

    if(!rowSlide) {
        rowClassName1 = "slide-transition-container inventory-table-row-mobile active";
            
    } else {
        rowClassName1 = "slide-transition-container inventory-table-row-mobile"
    }

    let rowClassName2;

    if(rowSlide) {
        rowClassName2 = "slide-transition-container variant-table-row active"
    } else {
        rowClassName2 = "slide-transition-container variant-table-row"
    }

    return (
        <div key={detailVariant._id}  className="modal-table-list-transition">
            {/** Transition 1 */}
            <div  
                className={rowClassName1} 
                id="transition-1"
                style={selected ? {background: 'rgb(247,247,247)'} : {background: 'rgb(0,0,0,0)'}} 
                // onClick={itemClick}
                onClick={() => setRowSlide(!rowSlide)}
            >
                {/* <td>
                    <input checked={selected} class="edit_info" type="checkbox" style={{width:'15px'}}/>
                </td> */}
                <div className="table-row-img">{varImg !== null && (varImg.img_gallery[0] && <img style={{width: '100%'}} src={`/api/products/image/${varImg.img_gallery[0].img_name}`} alt="img" />)}</div>
                <div>
                    <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{detailVariant.name}</div>
                    <div className="tag-list">
                        {detailVariant.color && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.color} </p></div>)}
                        {detailVariant.size && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.size} </p></div>)}
                        {detailVariant.weight && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.weight} </p></div>)}
                        {detailVariant.bundle && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.bundle} </p></div>)}
                        {detailVariant.type && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.type} </p></div>)}
                        {detailVariant.scent && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.scent} </p></div>)}
                        {detailVariant.fit && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.fit} </p></div>)}
                        {detailVariant.flavor && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.flavor} </p></div>)}
                        {detailVariant.material && (<div style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'20px', width:'fit-content',  borderRadius:'20px', padding:'1rem 1rem 0 1rem'}}><p style={{marign:'0', color:'green'}}>{detailVariant.material} </p></div>)}
                    </div>
                </div>
            </div>
            <div  
                className={rowClassName2} 
                id="transition-2"
            >
                <Fragment>
                    <div>
                        {detailVariant.color && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.color} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.size && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.size} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.weight && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.weight} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.bundle && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.bundle} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.type && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.type} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.scent && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.scent} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.fit && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.fit} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.flavor && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.flavor} 
                                </p>
                                <i style={{ margin:'0 5px', fontSize:'3px'}} class="fas fa-circle"></i>
                            </div>
                        )}
                        {detailVariant.material && (
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>
                                    {detailVariant.material} 
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="price"
                        name="price"
                        value={detailVariant.price}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="sale price"
                        name="sale_price"
                        value={detailVariant.sale_price}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="qty"
                        name="inventory_qty"
                        value={detailVariant.inventory_qty}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="sku"
                        name="sku"
                        value={detailVariant.sku}
                        onChange={e => onChange(e)}
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
                </Fragment>
            </div>
        </div>
    )
}

ShortVariant.propTypes = {

}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, null)(ShortVariant);
