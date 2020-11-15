import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-responsive-modal';
import { addProduct, editProduct, addProductImg, handleDetail } from '../../../../actions/productActions';

import TextEditor from '../../../common/TextEditor';
import DragAndDrop from '../../../admin/forms/utils/DragAndDrop';
import InputTag from '../../../common/InputTag/InputTag';
import Map from '../../../common/map/Map';


const initialState = {
  file: '',
  name: '',
  description: '',
  sku: '',
  website_link: '',
  sale_price: '',
  price: '',
  visible: true,
  in_stock: true,
  inventory_qty: '',
  category: '',
  condition: '',
  tags: ''
};

const Form_Location = ({
    product: { detailProduct, loading },
    store,
    addProduct,
    editProduct,
    handleDetail,
    history,
    match
    }) => {
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Product Info
    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState([]);
  
    // Toggle
    const [displayModal, toggleModal] = useState(false);
    const [displayVariantInputs, toggleVariantInputs] = useState(false);
  
    // Variant Info
    const [varInfo, setVarInfo] = useState([]);
    const [varName, setVarName] = useState({
        var1: '',
        var2: '',
        var3: '',
        var4: ''
    });
    const [varTags, setVarTags] = useState([]);
    const [varTags2, setVarTags2] = useState([]);
    const [varTags3, setVarTags3] = useState([]);
    const [varTags4, setVarTags4] = useState([]);
  
    useEffect(() => {
      window.addEventListener('resize', () => handleWindowSizeChange());

      if(match.params.id) {
          if (!detailProduct) handleDetail(match.params.id);
      }
      if (!loading && detailProduct) {
        const productData = { ...initialState };
        for (const key in detailProduct) {
          if (key in productData) productData[key] = detailProduct[key];
        }
        if (Array.isArray(productData.tags))
          productData.tags = productData.tags.join(', ');
        setFormData(productData);
      }

      return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [loading, handleDetail, detailProduct]);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;
  
  
  
    // for Update Vars func
    let variantList = [];
  
    const {
      name,
      description,
      sku,
      website_link,
      sale_price,
      price,
      visible,
      in_stock,
      inventory_qty,
      category,
      condition,
      tags
    } = formData;
  
  
    const fileChanged = e => {
      console.log(files)
      let fileList = [];
      files.map(file => fileList.push(file));
      for (var i = 0; i < e.target.files.length; i++) {
        if(!e.target.files[i]) return;
        fileList.push(e.target.files[i])
      }
      setFiles(fileList);
    }
  
    const switchChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
  
    // const fileChanged = e => {
    //   setFormData({ ...formData, [e.target.name]: e.target.files });
    // }
  
    const handleDrop = newFiles => {
      console.log(files)
      let fileList = [];
      files.map(file => fileList.push(file));
      for (var i = 0; i < newFiles.length; i++) {
        if(!newFiles[i]) return;
        fileList.push(newFiles[i])
      }
      setFiles(fileList);
    }
  
  
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
      console.log(files);
    }
  
    const onChangeVar = (e) => {
      setVarName({ ...varName, [e.target.name]: e.target.value });
    }
  
    const onChangePrice = (e, index) => {
        let newVarInfo = [...varInfo];
        newVarInfo[index].price = e.target.value;
        setVarInfo(newVarInfo);
  
        console.log(varInfo);
    }
    const onChangeSalePrice = (e, index) => {
        let newVarInfo = [...varInfo];
        newVarInfo[index].sale_price = e.target.value;
        setVarInfo(newVarInfo);
  
        console.log(varInfo);
    }
    const onChangeSku = (e, index) => {
        let newVarInfo = [...varInfo];
        newVarInfo[index].sku = e.target.value;
        setVarInfo(newVarInfo);
  
        console.log(varInfo);
    }
    const onChangeQty = (e, index) => {
        let newVarInfo = [...varInfo];
        newVarInfo[index].inventory_qty = e.target.value;
        setVarInfo(newVarInfo);
  
        console.log(varInfo);
    }
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      let data = new FormData();
      // if(formData.file !== '') data.append('file', formData.file);
      if(name !== '')data.append('name', name);
      if(description !== '')data.append('description', description);
      if(sku !== '')data.append('sku', sku);
      if(website_link !== '')data.append('website_link', website_link);
      if(sale_price !== '')data.append('sale_price', sale_price);
      if(price !== '')data.append('price', price);
      if(visible !== '')data.append('visible', visible);
      if(in_stock !== '')data.append('in_stock', in_stock);
      if(inventory_qty !== '')data.append('inventory_qty', inventory_qty);
      if(category !== '')data.append('category', category);
      if(condition !== '')data.append('condition', condition);
      if(tags !== '')data.append('tags', tags);
  
      console.log('IMG FILES');
      console.log(files);
  
      console.log(varInfo);
      if(!detailProduct) {
        addProduct(data, files, varInfo, varName, store.store._id, history);
      } else {
        editProduct(data, detailProduct._id, store.store._id, history);
      }
  
      mixpanel.track("Add Product Completed", {
        "Item Name": name,
        "Item Category": category,
        "Item Cost": price,
        "Store Name": store.store.name,
        "Creation Date": new Date().toISOString(), 
      });
  
    };
  
    const onAddTag = (tag) => {
      setVarTags([...varTags, tag]);
      console.log(varName)
    }
  
    const onDeleteTag = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = varTags.filter ((t) => {
        return (t !== tag);
        });
        setVarTags([...remainingTags]);
    }
    const onAddTag2 = (tag) => {
        setVarTags2([...varTags2, tag]);
    }
  
    const onDeleteTag2 = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = varTags2.filter ((t) => {
        return (t !== tag);
        });
        setVarTags2([...remainingTags]);
    }
    const onAddTag3 = (tag) => {
        setVarTags3([...varTags3, tag]);
    }
  
    const onDeleteTag3 = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = varTags3.filter ((t) => {
        return (t !== tag);
        });
        setVarTags3([...remainingTags]);
    }
    const onAddTag4 = (tag) => {
        setVarTags4([...varTags4, tag]);
    }
  
    const onDeleteTag4 = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = varTags4.filter ((t) => {
        return (t !== tag);
        });
        setVarTags4([...remainingTags]);
    }
  
    const setModal = () => {
      toggleModal(!displayModal);
    }
  
    const updateList = () => {
      if(varTags.length > 0) {
        if(varTags2.length > 0) {
          if(varTags3.length > 0) {
            if(varTags4.length > 0) {
              varTags.map(tag => {varTags2.map(tag2 => {varTags3.map(tag3 => {varTags4.map(tag4 => {
                variantList.push({
                  var1: tag,
                  var2: tag2,
                  var3: tag3,
                  var4: tag4,
                  price: price,
                  sale_price: sale_price,
                  inventory_qty: inventory_qty,
                  sku: sku,
  
                });
              })})})});
            } else {
              varTags.map(tag => {varTags2.map(tag2 => {varTags3.map(tag3 => {
                variantList.push({
                  var1: tag,
                  var2: tag2,
                  var3: tag3,
                  price: price,
                  sale_price: sale_price,
                  inventory_qty: inventory_qty,
                  sku: sku,
                });
              })})});
            }
          } else {
            varTags.map(tag => { varTags2.map(tag2 => {
              variantList.push({
                var1: tag,
                var2: tag2,
                price: price,
                sale_price: sale_price,
                inventory_qty: inventory_qty,
                sku: sku,
              });
                
            })});
          }
        } else {
          varTags.map(tag => {
            variantList.push({
              var1: tag,
              price: price,
              sale_price: sale_price,
              inventory_qty: inventory_qty,
              sku: sku,
            });
          });
        }
      }
  
      console.log(variantList);
      setVarInfo(variantList);
      console.log(varInfo);
  
      mixpanel.track("Add Variant Completed", {
        "Item Name": name,
        "Item Category": category,
        "Item Cost": price,
        "Store Name": store.store.name,
        // "Variant Options": store.name,
        // "Variant Values": store.name,
        "Creation Date": new Date().toISOString(), 
      });
    }
  
    let display;
  
    if(varInfo.length > 0) {
      display = varInfo.map((variant, index) => {
        let variantList;
        if(variant.var1) variantList = `${variant.var1}`;
        if(variant.var2) variantList = `${variant.var1} / ${variant.var2}`;
        if(variant.var3) variantList = `${variant.var1} / ${variant.var2} / ${variant.var3}`;
        if(variant.var4) variantList = `${variant.var1} / ${variant.var2} / ${variant.var3} / ${variant.var4}`;
  
        return (
          <tr key={index}>
            <td>{variantList}</td>
            <td>
              <input
                type="text"
                placeholder="price"
                name="price"
                value={variant.price}
                onChange={e => onChangePrice(e, index)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="sale price"
                name="sale_price"
                value={variant.sale_price}
                onChange={e => onChangeSalePrice(e, index)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="qty"
                name="inventory_qty"
                value={variant.inventory_qty}
                onChange={e => onChangeQty(e, index)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="sku"
                name="sku"
                value={variant.sku}
                onChange={e => onChangeSku(e, index)}
              />
            </td>
            <td><i className="fas fa-trash"></i></td>
          </tr>
        )
      });
    } else {
        display = <h3>variants</h3>;
    }


    {/** Content Block Variables */}

    let secondaryLocationInfo = (
      <Fragment>
        <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
            <div class="product-privacy-box-title">
                <p style={{color:'#808080', margin:'0'}}>Visibility</p>
                <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                <div style={{display:'flex', justifyContent:'space-between', height:'50px', width:'100%', alignItems:'center'}}>
                    <p style={{color:'#3CB371', margin:'0'}}>Public</p>
                    <input 
                        class="toggle-button" 
                        type="checkbox" 
                        name="privacy"
                        checked={true}
                    />
                </div>
            </div>
        </div>
        {/* <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
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
      </Fragment>
    );
    let mainLocationInfo = (
      <Fragment>
        <div class="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
            <input
                type="text"
                name="phone"
                className="input_line"
                placeholder="Enter address . . ."
                autocomplete="no"
                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
            />
        </div>
        <div class="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
            <input
                type="text"
                name="phone"
                className="input_line"
                className="input_line"
                placeholder="Give this location a nickname . . ."
                style={{margin:'0', outline:'none', width:'100%', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
            />
        </div> 
        <div id="order-map" style={{margin:'10px 0', width:'100%', padding:'10px 15px 10px 10px', background:'#fff', border:'2px dashed #cecece', overflow:'hidden'}}>
            <div style={{margin:'0', width:'100%',border:'2px dashed #cecece',borderRadius: '10px'}}>
                <div style={{height:'250px', maxHeight:'250px', width:'100%'}}>
                    <Map 
                        defaultZoom="8"
                        centerLat="33.0300238"
                        centerLng="-96.83283879999999"
                        markerLat="33.0300238"
                        markerLng="-96.83283879999999"
                    />
                </div>
            </div>
        </div>
        <div className="product-admin-main-container">
            {/* {imageContent} */}
            <div className="addImage" >
                <i class="fas fa-plus"></i>
            </div>
        </div>

        {isMobile ? (
            secondaryLocationInfo
        ) : null}
      </Fragment>
    );

    {/** END Content Block Variables */}


    {/** Rendering */}

    const mainContent = mainLocationInfo;

    const secondaryContent = secondaryLocationInfo;

    {/** END Rendering */}
    
    return (
        <Fragment>
            <div class="product-admin-main">
                {mainContent}
            </div>
            <div class="product-admin-secondary">
                {secondaryContent}
            </div>
            <Modal open={displayModal} onClose={setModal} center>
                <DragAndDrop handleDrop={handleDrop}>
                <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    className="form-control"
                    placeholder="Choose images or Drag/Drop"
                    onChange={fileChanged}
                />
                {files.length > 0 ? (
                    <div style={{minHeight: 300, width: 250}}>
                        {files.map((file, i) => (
                            <Fragment key={i}>
                            <div>{file.name}</div>
                            <br/>
                            </Fragment>
                        )
                        )}
                    </div>
                    ) : <h3><small>or</small> <br/>Drag / Drop</h3>
                }
                </DragAndDrop>
            </Modal>
        </Fragment>
    )
}

Form_Location.propTypes = {
    addProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  product: state.product,
  store: state.store
});

export default connect(mapStateToProps, { addProduct, editProduct, handleDetail })(
    withRouter(Form_Location)
);
