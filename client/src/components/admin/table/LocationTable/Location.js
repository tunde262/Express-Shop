import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../common/Spinner';


const Location = ({ 
    deleteLocation,
    handleToggle,
    locationVariant,
    slide,
    varLocation,
    detailLocation,
    detailVariant,
    store,
    onChange,
    page,
    setVarModal,
    product
}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [rowSlide, setRowSlide] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
      }, [])

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    let rowClassName1;

    if(!rowSlide) {
        rowClassName1 = "slide-transition-container secondary-table-row-mobile active";
            
    } else {
        rowClassName1 = "slide-transition-container secondary-table-row-mobile"
    }

    let rowClassName2;

    if(rowSlide) {
        rowClassName2 = "slide-transition-container variant-table-row active"
    } else {
        rowClassName2 = "slide-transition-container variant-table-row"
    }

    const rowClick = () => {
        if(page) {
            if(page === 'collection' && product.detailProduct) {
                setVarModal(product.detailProduct._id, detailLocation._id);
            } else if (page === "variant") {
                setRowSlide(!rowSlide);
            }
        }
    }

    return (
        <div key={page !== "variant" ? detailLocation._id : varLocation.location} className="modal-table-list-transition">
            {/** Transition 1 */}
            <div  
                className={rowClassName1} 
                id="transition-1"
            >
                <Link onClick={rowClick} to={page === "dashboard" ? {pathname:`/admin/location/${store.store._id}/${detailLocation._id}`,search: "?show=detail"} : null}>
                    <div>
                        <div><i style={{color:'#3CB371', margin:'0 10px', fontSize:'1.1rem'}} class="fas fa-map-marker-alt"></i></div>
                        <div>
                            {detailLocation.name && (
                                <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>
                                    {detailLocation.name}
                                </div>
                            )}
                            <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#808080'}}>{detailLocation.formatted_address}</div>
                        </div>
                    </div>
                </Link>
                <Link onClick={rowClick} to={page === "dashboard" ? {pathname:`/admin/location/${store.store._id}/${detailLocation._id}`,search: "?show=detail"} : null}>
                    <div><p style={{margin:'0'}}>5</p></div>
                </Link>
                <Link onClick={rowClick} to={page === "dashboard" ? {pathname:`/admin/location/${store.store._id}/${detailLocation._id}`,search: "?show=detail"} : null}>
                    <div><p style={{margin:'0'}}>5</p></div>
                </Link>
            </div>

            {/** Transition 2 */}
            <div 
                className={rowClassName2} 
                id="transition-2"
            >
                {page === "variant" && (
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
                            value={varLocation.price}
                            onChange={e => onChange(e)}
                            style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                        <div>
                            <input
                            type="text"
                            placeholder="sale price"
                            name="sale_price"
                            value={varLocation.sale_price}
                            onChange={e => onChange(e)}
                            style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                        <div>
                            <input
                            type="text"
                            placeholder="qty"
                            name="inventory_qty"
                            value={varLocation.inventory_qty}
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
                )}
            </div>
        </div>
    )
}

Location.propTypes = {
    
}


export default Location;
