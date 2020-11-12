import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-responsive-modal';
import { getProductsInCollection } from '../../../../actions/productActions';

import TextEditor from '../../../common/TextEditor';
import DragAndDrop from '../../../admin/forms/utils/DragAndDrop';
import InputTag from '../../../common/InputTag/InputTag';
import Item from '../../../admin/table/Item';


const Form_Collection = ({
    collection: {
      collection, 
      loading
    },
    product,
    getProductsInCollection,
    setModal,
    onAddItemTag,
    onDeleteItemTag,
    itemTags,
    onAddTag,
    onDeleteTag,
    formData,
    setFormData,
    switchChange,
    onChange,
    history,
    match
    }) => {
  
    useEffect(() => {

    }, []);

    const {
      name,
      visible,
    } = formData;
    
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
                <div id="order-map" style={{margin:'10px 0', width:'100%', padding:'10px 15px 10px 10px', background:'#fff', border:'1px solid rgb(214,214,214)', overflow:'hidden'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                        <p style={{fontSize:'1.3rem', margin:'0'}}>Add Tags</p>
                        <p style={{color:'#808080', margin:'0'}}>Create an auto updating collection by adding matching tags with items.</p>
                    </div>
                    <div style={{width:'100%', margin:'2rem 0 15px 0', minHeight:'50px'}}>
                        <InputTag  
                            onAddTag ={onAddItemTag}
                            onDeleteTag = {onDeleteItemTag}
                            defaultTags={itemTags}
                            placeholder="enter tags separated by comma"
                        />
                    </div>
                </div>  
                <div class="content-box">
                    <div class="table-responsive table-filter">
                        <Item page="collection-form"  product={product} />
                    </div>
                </div>
                {/* <div className="product-admin-main-container">
                    {imageContent}
                    <div className="addImage" >
                        <i class="fas fa-plus"></i>
                    </div>
                </div>  */}
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

Form_Collection.propTypes = {
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getProductsInCollection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.collection,
  product: state.product,
  store: state.store
});

export default connect(mapStateToProps, { getProductsInCollection })(
    withRouter(Form_Collection)
);
