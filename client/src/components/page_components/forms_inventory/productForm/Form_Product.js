import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-responsive-modal';
import { addProduct, editProduct, addProductImg, handleDetail , incImg, decImg } from '../../../../actions/productActions';
import { addVariant } from '../../../../actions/variantActions';

import TextEditor from '../../../common/TextEditor';
import DragAndDrop from '../../../admin/forms/utils/DragAndDrop';
import InputTag from '../../../common/InputTag/InputTag';


const Form_Product = ({
    product: { detailProduct, loading },
    store,
    handleDetail,
    addVariant,
    history,
    match,
    incImg,
    decImg,
    setImageModal,
    onChangeVar,
    onChangeVarName,
    varName,
    setVarName,
    displayOption1,
    displayOption2,
    displayOption3,
    displayOption4,
    toggleOption1, 
    toggleOption2,
    toggleOption3,
    toggleOption4,
    handleToggleOption,
    removeDisplayOption1,
    removeDisplayOption2,
    removeDisplayOption3,
    removeDisplayOption4,
    onAddItemTag,
    onDeleteItemTag,
    itemTags,
    onAddTag,
    onDeleteTag,
    onAddTag2,
    onDeleteTag2,
    onAddTag3,
    onDeleteTag3,
    onAddTag4,
    onDeleteTag4,
    setVarTags,
    setVarTags2,
    setVarTags3,
    setVarTags4,
    varTags,
    varTags2,
    varTags3,
    varTags4,
    removeVar,
    updateList,
    varInfo,
    setVarInfo,
    onChangePrice,
    onChangeSalePrice,
    onChangeQty,
    onChangeSku,
    display,
    formData,
    setFormData,
    categoryData,
    setCategoryData,
    conditionData,
    setConditionData,
    editorState,
    setEditorState,
    optionToggle,
    setOptionToggle,
    optionToggle2,
    setOptionToggle2,
    optionToggle3,
    setOptionToggle3,
    optionToggle4,
    setOptionToggle4,
    categoryToggle,
    setCategoryToggle,
    conditionToggle,
    setConditionToggle,
    handleVarNameChange,
    handleCategoryChange,
    handleConditionChange,
    switchChange,
    onChange,
    }) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
  
    // Toggle
    const [displayModal, toggleModal] = useState(false);
    const [displayVariantInputs, toggleVariantInputs] = useState(false);
  
    useEffect(() => {

    }, []);
  
    const {
      name,
      sku,
      website_link,
      sale_price,
      price,
      visible,
      in_stock,
      inventory_qty,
    } = formData;

    let imageContent;
    let img_gallery = detailProduct.img_gallery.sort((a, b) => a.img_order - b.img_order);

    const imgBack = (imgId) => {
        console.log('DEC IMG');
        decImg(imgId, detailProduct._id);

        mixpanelImgOrderUpdate();
    }

    const imgForward = (imgId) => {
        console.log('INC IMG');
        incImg(imgId, detailProduct._id);

        mixpanelImgOrderUpdate();
    }

    const mixpanelImgOrderUpdate = () => {
        mixpanel.track("Img Order Update", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
          
        });
    } 

    const handleImgClick = () => {
        mixpanel.track("Item Img Click", {
            //   "Entry Point": "Home Landing",
              "Item Name": detailProduct.name,
              "Item Category": detailProduct.category,
              "Item Cost": detailProduct.price,
              "Store Name": detailProduct.store.name,
              "Total Imgs": detailProduct.img_gallery.length,
              "Total Likes": detailProduct.likes.length,
              "Total Comments": detailProduct.comments.length,
              
        });
    }


    const handleMixpanel = () => {
        mixpanel.track("Add Product Page View", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
          
        });
    }

    if(!sentMixpanel && detailProduct) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    if(detailProduct && detailProduct.img_gallery && detailProduct.img_gallery.length > 0 ) {
        imageContent = img_gallery.map(image => (
            <div className="product-admin-image-container">
                <img className="product-admin-image-container-img" onClick={handleImgClick} src={`/api/products/image/${image.img_name}`} alt="img" />
                <div className="product-admin-image-container-actions">
                    <div onClick={() => imgBack(image._id)} className="admin-image-icon-container">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div onClick={() => imgForward(image._id)} className="admin-image-icon-container">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div onClick={handleImgClick} className="admin-image-overlay">
                    <div onClick={() => imgBack(image._id)} className="admin-overlay-icon-container">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div onClick={() => imgForward(image._id)} className="admin-overlay-icon-container">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        ))
    } else {
        imageContent = <h4>No Photos</h4>;
    }
    
    return (
        <Fragment>
            <div class="product-admin-main">
                <div class="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                    <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Item Name:</p>
                    <input
                        type="text"
                        name="name"
                        className="input_line"
                        className="input_line"
                        placeholder="Enter name . . ."
                        value={name}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div className="product-admin-main-container">
                    <div className="addImage" onClick={setImageModal}>
                        <i class="fas fa-plus"></i>
                    </div>
                    {imageContent}
                </div>
                <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
                    <TextEditor descriptionObj={editorState} setDescriptionObj={setEditorState} />
                </div>
                <div class="content-box" style={{padding:'10px'}}>
                    <div style={{width:'100%', margin:'10px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Price:</p>
                            <input
                                type="number"
                                min="0" 
                                step=".01"
                                name="price"
                                className="input_line"
                                placeholder="$ 0"
                                value={price}
                                onChange={e => onChange(e)}
                                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Compare at price:</p>
                            <input
                                type="number"
                                min="0" 
                                step=".01"
                                name="sale_price"
                                className="input_line"
                                placeholder="$ 0"
                                value={sale_price}
                                onChange={e => onChange(e)}
                                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                    </div>
                    <div style={{width:'100%', margin:'10px 0', display:'grid', gridTemplateColumns:'2fr 1fr', gridGap:'1rem'}}>
                        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Sku (unique id):</p>
                            <input
                                type="text"
                                name="sku"
                                className="input_line"
                                placeholder="(Recommended)"
                                value={sku}
                                onChange={e => onChange(e)}
                                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Qty:</p>
                            <input
                                type="number"
                                min="0" 
                                step="1"
                                name="inventory_qty"
                                className="input_line"
                                placeholder="$ 0"
                                value={inventory_qty}
                                onChange={e => onChange(e)}
                                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                    </div>
                </div>

                <div class="content-box" style={{padding:'10px'}}>
                    <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                        <div>
                            <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Variants</p>
                            <p style={{color:'#808080', margin:'0 0 5px 5px'}}>
                                Add options to create variants
                            </p>
                        </div>
                        
                        <button style={{background:'#e7e7e7', borderColor:'#e7e7e7', letterSpacing:'1px', color:'#808080'}} onClick={handleToggleOption}><i class="fas fa-plus"></i> Option</button>
                    </div>
                    
                    <div>
                        <table class="table table-head">
                            <div style={{display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                <div><p>Option</p></div>
                                <div><p>Values</p></div>
                            </div>
                            {displayOption1 ? (
                                <div style={displayOption2 || displayOption3 || displayOption4 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                    <div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <div class={optionToggle ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle(!optionToggle)}>
                                                    {varName.var1 === '' ? (
                                                        <p>Pick an option</p>
                                                    ) : (
                                                        <p>{varName.var1}</p>
                                                    )}
                                                    <i class="fas fa-caret-down"></i>
                                                </div>
                                                {optionToggle ? (
                                                    <Fragment>
                                                        <div onClick={() => handleVarNameChange("var1", 'color')}><p>Color</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'size')}><p>Size</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'weight')}><p>Weight</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'type')}><p>Type</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'bundle')}><p>Bundle</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'scent')}><p>Scent</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'fit')}><p>Fit</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'flavor')}><p>Flavor</p></div>
                                                        <div onClick={() => handleVarNameChange("var1", 'material')}><p>Material</p></div>
                                                    </Fragment>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Fragment>
                                            <InputTag  
                                                onAddTag ={onAddTag}
                                                onDeleteTag = {onDeleteTag}
                                                defaultTags={varTags}
                                                placeholder="enter tags separated by comma"
                                            />
                                        </Fragment>
                                    </div>
                                    {displayOption2 || displayOption3 || displayOption4 ? (
                                        <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                            <i 
                                                onClick={removeDisplayOption1} 
                                                style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                                class="fas fa-minus"
                                            ></i>
                                        </div>
                                    ) : null}
                                </div>
                            ): null}
                            {displayOption2 ? (
                                <Fragment>
                                    <hr style={{background:'rgb(214,214,214)', margin:'10px 0 1rem 0', height:'1px'}} />
                                    <div style={displayOption1 || displayOption3 || displayOption4 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                        <div style={{paddingTop:'10px'}}>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                                <div class={optionToggle2 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle2(!optionToggle2)}>
                                                        {varName.var2 === '' ? (
                                                            <p>Pick an option</p>
                                                        ) : (
                                                            <p>{varName.var2}</p>
                                                        )}
                                                        <i class="fas fa-caret-down"></i>
                                                    </div>
                                                    {optionToggle2 ? (
                                                        <Fragment>
                                                            <div onClick={() => handleVarNameChange("var2", 'color')}><p>Color</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'size')}><p>Size</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'weight')}><p>Weight</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'type')}><p>Type</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'bundle')}><p>Bundle</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'scent')}><p>Scent</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'fit')}><p>Fit</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'flavor')}><p>Flavor</p></div>
                                                            <div onClick={() => handleVarNameChange("var2", 'material')}><p>Material</p></div>
                                                        </Fragment>
                                                ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Fragment>
                                                <InputTag  
                                                    onAddTag ={onAddTag2}
                                                    onDeleteTag = {onDeleteTag2}
                                                    defaultTags={varTags2}
                                                    placeholder="enter tags separated by comma"
                                                />
                                            </Fragment>
                                        </div>
                                        {displayOption1 || displayOption3 || displayOption4 ? (
                                            <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                                <i 
                                                    onClick={removeDisplayOption2} 
                                                    style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                                    class="fas fa-minus"
                                                ></i>
                                            </div>
                                        ) : null}
                                    </div>
                                </Fragment>
                            ): null}
                            {displayOption3 ? (
                                <Fragment>
                                    <hr style={{background:'rgb(214,214,214)', margin:'10px 0 1rem 0', height:'1px'}} />
                                    <div style={displayOption1 || displayOption2 || displayOption4 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                        <div style={{paddingTop:'10px'}}>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                                <div class={optionToggle3 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle3(!optionToggle3)}>
                                                        {varName.var3 === '' ? (
                                                            <p>Pick an option</p>
                                                        ) : (
                                                            <p>{varName.var3}</p>
                                                        )}
                                                        <i class="fas fa-caret-down"></i>
                                                    </div>
                                                    {optionToggle3 ? (
                                                        <Fragment>
                                                            <div onClick={() => handleVarNameChange("var3", 'color')}><p>Color</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'size')}><p>Size</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'weight')}><p>Weight</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'type')}><p>Type</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'bundle')}><p>Bundle</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'scent')}><p>Scent</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'fit')}><p>Fit</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'flavor')}><p>Flavor</p></div>
                                                            <div onClick={() => handleVarNameChange("var3", 'material')}><p>Material</p></div>
                                                        </Fragment>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Fragment>
                                                <InputTag  
                                                    onAddTag ={onAddTag3}
                                                    onDeleteTag = {onDeleteTag3}
                                                    defaultTags={varTags3}
                                                    placeholder="enter tags separated by comma"
                                                />
                                            </Fragment>
                                        </div>
                                        {displayOption1 || displayOption2 || displayOption4 ? (
                                            <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                                <i 
                                                    onClick={removeDisplayOption3} 
                                                    style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                                    class="fas fa-minus"
                                                ></i>
                                            </div>
                                        ) : null}
                                    </div>
                                </Fragment>
                            ) : null}
                            {displayOption4 ? (
                                <Fragment>
                                    <hr style={{background:'rgb(214,214,214)', margin:'10px 0 1rem 0', height:'1px'}} />
                                    <div style={displayOption1 || displayOption2 || displayOption3 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                        <div style={{paddingTop:'10px'}}>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                                <div class={optionToggle4 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle4(!optionToggle4)}>
                                                        {varName.var4 === '' ? (
                                                            <p>Pick an option</p>
                                                        ) : (
                                                            <p>{varName.var4}</p>
                                                        )}
                                                        <i class="fas fa-caret-down"></i>
                                                    </div>
                                                    {optionToggle4 ? (
                                                        <Fragment>
                                                            <div onClick={() => handleVarNameChange("var4", 'color')}><p>Color</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'size')}><p>Size</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'weight')}><p>Weight</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'type')}><p>Type</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'bundle')}><p>Bundle</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'scent')}><p>Scent</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'fit')}><p>Fit</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'flavor')}><p>Flavor</p></div>
                                                            <div onClick={() => handleVarNameChange("var4", 'material')}><p>Material</p></div>
                                                        </Fragment>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Fragment>
                                                <InputTag  
                                                    onAddTag ={onAddTag4}
                                                    onDeleteTag = {onDeleteTag4}
                                                    defaultTags={varTags4}
                                                    placeholder="enter tags separated by comma"
                                                />
                                            </Fragment>
                                        </div>
                                        {displayOption1 || displayOption2 || displayOption3 ? (
                                            <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                                <i 
                                                    onClick={removeDisplayOption4} 
                                                    style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                                    class="fas fa-minus"
                                                ></i>
                                            </div>
                                        ) : null}
                                    </div>
                                </Fragment>
                            ) : null}
                        </table>

                        
                        <div onClick={updateList} style={{width:'100%', background:'#0098d3'}} class="btn btn-primary my-3">Add Variants</div>

                        {varInfo.length > 0 && (
                            <div class="table-responsive table-filter">
                                <table className="table">
                                    <div className="variant-thead">
                                            <div></div>
                                            <div>Price</div>
                                            <div>Sale Price</div>
                                            <div>Qty</div>
                                            <div>Sku</div>
                                            <div></div>
                                    </div>
                                    <div className="tbody">
                                        {display}
                                    </div>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div class="product-admin-secondary">
                <div class="product-privacy-box">
                    <div class="product-privacy-box-title">
                        <p style={{color:'#808080', margin:'0'}}>Visibility</p>
                        <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                        <div style={{display:'flex', justifyContent:'space-between', height:'50px', width:'100%', alignItems:'center'}}>
                            <p style={{color:'#3CB371', margin:'0'}}>Public</p>
                            <input 
                                class="toggle-button" 
                                type="checkbox" 
                                name="visible"
                                checked={visible}
                                onChange={switchChange}
                            />
                        </div>
                    </div>
                </div>
                <div class="product-privacy-box">
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
                            {/* <select name="category">
                                <option>* Choose a category</option>
                                <option value="clothing and fashion">Clothing & Fashion</option>
                                <option value="bathroom">Bathroom</option>
                                <option value="household essentials">Household Essential</option>
                                <option value="laundry">Laundry</option>
                                <option value="men">Men</option>
                                <option value="personal care">Personal Care</option>
                                <option value="pets">Pets</option>
                                <option value="school & office">School & Office</option>
                                <option value="shoes">Shoes</option>
                                <option value="women">Women</option>
                            </select> */}
                        </div>
                    </div>
                </div>
                <div class="product-privacy-box">
                    <div class="product-privacy-box-title">
                        <p style={{color:'#808080', margin:'0', textAlign:'flex-start'}}>Choose a condition</p>
                        <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                            <div id="dropdown-el" style={{width:'100%'}} class={conditionToggle ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setConditionToggle(!conditionToggle)}>
                                    {conditionData === '' ? (
                                        <p>Select Condition</p>
                                    ) : (
                                        <p>{conditionData}</p>
                                    )}
                                    <i class="fas fa-caret-down"></i>
                                </div>
                                {conditionToggle ? (
                                    <Fragment>
                                        <div onClick={() => handleConditionChange('new')}><p>New (with tags)</p></div>
                                        <div onClick={() => handleConditionChange('refurbished')}><p>Refurbished</p></div>
                                        <div onClick={() => handleConditionChange('used (liked new)')}><p>Used (like new)</p></div>
                                        <div onClick={() => handleConditionChange('type (good)')}><p>Used (good)</p></div>
                                        <div onClick={() => handleConditionChange('bundle (fair)')}><p>Used (fair)</p></div>
                                    </Fragment>
                                ) : null}
                            </div>
                            {/* <select name="category">
                                <option>* Item Condition</option>
                                <option value="clothing & fashion">New (with tags)</option>
                                <option value="bathroom">Refurbished</option>
                                <option value="household essentials">Used (like new)</option>
                                <option value="laundry">Used (good)</option>
                                <option value="men">Used (fair)</option>
                            </select> */}
                        </div>
                    </div>
                </div>
                <div class="product-privacy-box">
                    <div class="product-privacy-box-title">
                        <p style={{color:'#808080', margin:'0'}}>Tags</p>
                        <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                        <InputTag  
                            onAddTag ={onAddItemTag}
                            onDeleteTag = {onDeleteItemTag}
                            defaultTags={itemTags}
                            placeholder="enter tags separated by comma"
                        />
                    </div>
                    
                </div>
                {/* <div class="product-privacy-box">
                    <div class="product-privacy-box-title">
                        <p style={{color:'#808080', margin:'0'}}>Notes</p>
                        <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                        <input
                            type="email"
                            name="email"
                            className="input_line"
                            placeholder="Enter Email"
                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                        />
                        <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                            </div>
                            <div>
                                <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                            </div>
                        </div>
                        <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                <p style={{margin:'0', color:'#333'}}>Wholesale order coming oct. 24</p>
                            </div>
                            <div>
                                <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                            </div>
                        </div>
                        <div style={{borderBottom:'1px solid #f2f2f2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                <small style={{color:'#ccc', margin:'0'}}>5:49pm Oct. 29, 2020</small>
                                <p style={{margin:'0', color:'#333'}}>Must go behind the counter to find this item</p>
                            </div>
                            <div>
                                <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-pen"></i>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </Fragment>
    )
}

Form_Product.propTypes = {
    handleDetail: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    addVariant: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    incImg: PropTypes.func.isRequired,
    decImg: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  store: state.store,
});

export default connect(mapStateToProps, { handleDetail, incImg, decImg, addVariant })(
    withRouter(Form_Product)
);
