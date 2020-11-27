import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const initialState = {
    sku: '',
    sale_price: '',
    price: '',
    inventory_qty: ''
};

const Variant = ({ 
    deleteVariant,
    editVariant,
    handleToggle,
    variantItem,
    detailVariant,
    prodId,
    store
}) => {
    const [formData, setFormData] = useState(initialState); 

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [rowSlide, setRowSlide] = useState(false);

    const [rowData, setRowData] = useState(initialState); 

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        
            if (detailVariant) {
                const variantData = { ...initialState };
                for (const key in detailVariant) {
                    if (key in variantData) variantData[key] = detailVariant[key];
                }

                // if (Array.isArray(variantData.tags))
                //     variantData.tags = variantData.tags.join(', ');
                setFormData(variantData);
                setRowData(variantData);
            }

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const {
        sku,
        sale_price,
        price,
        inventory_qty,
    } = formData;
     

    // if(!gotVariants) {
    //     getProductVariants(prodId);
    //     setGotVariants(true);
    // }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      //   console.log(files);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        editVariant(formData, detailVariant._id, store.store._id); 
        console.log('FORM DATA')
        console.log(formData);
        setRowData(formData)
        setRowSlide(false);
    };


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
        <div key={detailVariant._id} className="modal-table-list-transition">
            {/** Transition 1 */}
            <div  
                className={rowClassName1} 
                id="transition-1"
            >
                {isTablet ? (
                    <Fragment>
                        <div>{variantItem.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${variantItem.img_gallery[0].img_name}`} alt="img" />}</div>
                        <div>
                            {detailVariant.color && (<span>{detailVariant.color} </span>)}
                            {detailVariant.size && (<span>{detailVariant.size} </span>)}
                            {detailVariant.weight && (<span>{detailVariant.weight} </span>)}
                            {detailVariant.bundle && (<span>{detailVariant.bundle} </span>)}
                            {detailVariant.type && (<span>{detailVariant.type} </span>)}
                            {detailVariant.scent && (<span>{detailVariant.scent} </span>)}
                            {detailVariant.fit && (<span>{detailVariant.fit} </span>)}
                            {detailVariant.flavor && (<span>{detailVariant.flavor} </span>)}
                            {detailVariant.material && (<span>{detailVariant.material} </span>)}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div 
                            onClick={() => handleToggle(detailVariant._id)}
                            style={{cursor:'pointer'}}
                        >
                            {variantItem.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${variantItem.img_gallery[0].img_name}`} alt="img" />}
                        </div>
                        <div 
                            onClick={() => handleToggle(detailVariant._id)}
                            style={{cursor:'pointer'}}
                        >
                            {detailVariant.color && (<div className="tag-item green"><p>{detailVariant.color} </p></div>)}
                            {detailVariant.size && (<div className="tag-item green"><p>{detailVariant.size} </p></div>)}
                            {detailVariant.weight && (<div className="tag-item green"><p>{detailVariant.weight} </p></div>)}
                            {detailVariant.bundle && (<div className="tag-item green"><p>{detailVariant.bundle} </p></div>)}
                            {detailVariant.type && (<div className="tag-item green"><p>{detailVariant.type} </p></div>)}
                            {detailVariant.scent && (<div className="tag-item green"><p>{detailVariant.scent} </p></div>)}
                            {detailVariant.fit && (<div className="tag-item green"><p>{detailVariant.fit} </p></div>)}
                            {detailVariant.flavor && (<div className="tag-item green"><p>{detailVariant.flavor} </p></div>)}
                            {detailVariant.material && (<div className="tag-item green"><p>{detailVariant.material} </p></div>)}
                        </div>
                        <div 
                            onClick={() => handleToggle(detailVariant._id)}
                            style={{cursor:'pointer'}}
                        >
                            {rowData.inventory_qty}
                        </div>
                        <div 
                            onClick={() => handleToggle(detailVariant._id)}
                            style={{cursor:'pointer'}}
                        >
                            ${rowData.price}
                        </div>
                        <div 
                            onClick={() => handleToggle(detailVariant._id)}
                            style={{cursor:'pointer'}}
                        >
                            ${rowData.sale_price}
                        </div>
                        <div 
                            style={{width:'50px', display:'grid', gridTemplateColumns:'1fr 1fr', color:'#ff4b2b', cursor:'pointer'}}
                        >
                            <div style={{display:'flex', justifyContent:'center', color:'#808080', alignItems:'center'}}>
                                <i onClick={() => setRowSlide(!rowSlide)} className="fas fa-pen"></i>
                            </div>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <i onClick={() => deleteVariant(detailVariant._id, prodId)} className="fas fa-trash"></i>
                            </div>
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
                    value={price}
                    onChange={e => onChange(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="sale price"
                    name="sale_price"
                    value={sale_price}
                    onChange={e => onChange(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="qty"
                    name="inventory_qty"
                    value={inventory_qty}
                    onChange={e => onChange(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder="sku"
                    name="sku"
                    value={sku}
                    onChange={e => onChange(e)}
                    style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div style={{width:'50px', display:'flex', flexDirection:'column'}}>
                    <div style={{width:'100%', height:'50%', color:'green', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <i onClick={(e) => onSubmit(e)} className="fas fa-check"></i>
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
