import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { addProduct, editProduct, addProductImg, handleDetail } from '../../../actions/productActions';

import mixpanel from 'mixpanel-browser';

import DragAndDrop from './utils/DragAndDrop';
import InputTag from '../../common/InputTag/InputTag';

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

const AddProduct = ({
  product: { detailProduct, loading },
  store,
  addProduct,
  editProduct,
  handleDetail,
  history,
  match
  }) => {
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
  }, [loading, handleDetail, detailProduct]);

  // Redirect if store is null
  if(store.store === null ) {
    history.push('/admin');
  }


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

  return (
    <main id="home" style={{textAlign: "center"}}>
      <h1 className="large text-primary">Edit Your Product</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <label className='form-group'>Product Img.<br/>
          <div onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add</div>

        </label>
        <div className="line"></div>
        <label className="form-group">Name
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Description
          <textarea
            placeholder="Describe the product"
            name="description"
            value={description}
            onChange={onChange}
          />
          <small className="form-text">Tell the customers about the product</small>
        </label>
        <label className="form-group">Category
          <select name="category" value={category} onChange={onChange}>
            <option>* Choose a category</option>
            <option value="clothing & fashion">Clothing & Fashion</option>
            <option value="bathroom">Bathroom</option>
            <option value="household essentials">Household Essential</option>
            <option value="laundry">Laundry</option>
            <option value="men">Men</option>
            <option value="personal care">Personal Care</option>
            <option value="pets">Pets</option>
            <option value="school & office">School & Office</option>
            <option value="shoes">Shoes</option>
            <option value="women">Women</option>
          </select>
          <small className="form-text">
            Give us an idea of how we should label this item?
          </small>
        </label>
        <label className="form-group">Condition
          <select name="condition" value={condition} onChange={onChange}>
            <option>* Choose a condition</option>
            <option value="new">New</option>
            <option value="refurbished">Refurbished</option>
            <option value="used fair">Used (fair)</option>
            <option value="used good">Used (good)</option>
            <option value="used like new">Used (like new)</option>
          </select>
          <small className="form-text">
            Give us an idea of the condition this item is in?
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">SKU
          <input
            type="text"
            placeholder="ex: AB-CD-EF"
            name="sku"
            value={sku}
            onChange={onChange}
          />
          <small className="form-text">
            Helps keep track of inventory
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Sale Price
          <input
            type="text"
            placeholder="Sale Price"
            name="sale_price"
            value={sale_price}
            onChange={onChange}
          />
          <small className="form-text">
            How much you want use to list this item for.
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Price
          <input
            type="text"
            placeholder="$0.00"
            name="price"
            value={price}
            onChange={onChange}
          />
          <small className="form-text">
            How much this item cost you.
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Visibility
            <input 
                type="checkbox" 
                name="visible"
                checked={visible}
                onChange={switchChange}
            />
            <span class="slider round"></span>
        </label>
        <div className="line"></div>
        <label className="form-group">In Stock
            <input 
                type="checkbox" 
                name="in_stock"
                checked={in_stock}
                onChange={switchChange}
            />
            <span class="slider round"></span>
        </label>
        <div className="line"></div>
        <label className="form-group">Inventory
          <input
            type="text"
            placeholder="Inventory Qty"
            name="inventory_qty"
            value={inventory_qty}
            onChange={onChange}
          />
          <small className="form-text">
            How many units do you want to list?
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Tags
          <input
            type="text"
            placeholder="* Tags"
            name="tags"
            value={tags}
            onChange={onChange}
          />
          <small className="form-text">
            Please use comma separated values (eg. Blue, Baseball, Bentley)
          </small>
        </label>
        <div className="line"></div>
        <label className="form-group">Website Link
          <input
            type="text"
            placeholder="Link"
            name="website_link"
            value={website_link}
            onChange={onChange}
          />
          <small className="form-text">
            Link to this item on your own website.
          </small>
        </label>
        
        <div className="my-2">
          <button
            onClick={() => toggleVariantInputs(!displayVariantInputs)}
            type="button"
            className="btn btn-light"
          >
            Click To Add Variants
          </button>
          <span>Optional</span>
        </div>

        {displayVariantInputs && (
          <Fragment>
            <h2>Add Variant</h2>
            <p>
                Add options to create variants
            </p>
            <form onSubmit={onSubmit} id="authenticator">
                <table class="table table-head">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Values</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select name="var1" value={varName.var1} onChange={onChangeVar} class="form-select" >
                                    <option>Pick an option</option>
                                    <option value="color">color</option>
                                    <option value="size">size</option>
                                    <option value="weight">weight</option>
                                    <option value="type">type</option>
                                    <option value="bundle">bundle</option>
                                    <option value="scent">scent</option>
                                    <option value="fit">fit</option>
                                    <option value="flavor">flavor</option>
                                    <option value="material">material</option>
                                </select>
                            </td>
                            <td>
                                <InputTag  
                                    onAddTag ={onAddTag}
                                    onDeleteTag = {onDeleteTag}
                                    defaultTags={varTags}
                                    placeholder="enter tags separated by comma"
                                />
                            </td>
                            <td>
                                <button id="add-otp" class="btn">+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="var2" value={varName.var2} onChange={onChangeVar} class="form-select" >
                                    <option>Pick an option</option>
                                    <option value="color">color</option>
                                    <option value="size">size</option>
                                    <option value="weight">weight</option>
                                    <option value="type">type</option>
                                    <option value="bundle">bundle</option>
                                    <option value="scent">scent</option>
                                    <option value="fit">fit</option>
                                    <option value="flavor">flavor</option>
                                    <option value="material">material</option>
                                </select>
                            </td>
                            <td>
                                <InputTag  
                                    onAddTag ={onAddTag2}
                                    onDeleteTag = {onDeleteTag2}
                                    defaultTags={varTags2}
                                    placeholder="enter tags separated by comma"
                                />
                            </td>
                            <td>
                                <button id="add-otp" class="btn">+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="var3" value={varName.var3} onChange={onChangeVar} class="form-select" >
                                    <option>Pick an option</option>
                                    <option value="color">color</option>
                                    <option value="size">size</option>
                                    <option value="weight">weight</option>
                                    <option value="type">type</option>
                                    <option value="bundle">bundle</option>
                                    <option value="scent">scent</option>
                                    <option value="fit">fit</option>
                                    <option value="flavor">flavor</option>
                                    <option value="material">material</option>
                                </select>
                            </td>
                            <td>
                                <InputTag  
                                    onAddTag ={onAddTag3}
                                    onDeleteTag = {onDeleteTag3}
                                    defaultTags={varTags3}
                                    placeholder="enter tags separated by comma"
                                />
                            </td>
                            <td>
                                <button id="add-otp" class="btn">+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="var4" value={varName.var4} onChange={onChangeVar} class="form-select" >
                                    <option>Pick an option</option>
                                    <option value="color">color</option>
                                    <option value="size">size</option>
                                    <option value="weight">weight</option>
                                    <option value="type">type</option>
                                    <option value="bundle">bundle</option>
                                    <option value="scent">scent</option>
                                    <option value="fit">fit</option>
                                    <option value="flavor">flavor</option>
                                    <option value="material">material</option>
                                </select>
                            </td>
                            <td>
                                <InputTag  
                                    onAddTag ={onAddTag4}
                                    onDeleteTag = {onDeleteTag4}
                                    defaultTags={varTags4}
                                    placeholder="enter tags separated by comma"
                                />
                            </td>
                            <td>
                                <button id="add-otp" class="btn">+</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div onClick={updateList} class="btn btn-primary">Apply</div>

                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Price</th>
                            <th>Sale Price</th>
                            <th>Qty</th>
                            <th>Sku</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {display}
                    </tbody>
                </table>
            </form>
          </Fragment>
        )}
        
        <div className="line"></div>
        <input type="submit" className="btn btn-primary my-1" />
        <a onClick={() => history.goBack()} className="btn btn-light my-1">
          Go Back
        </a>
      </form>

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
    </main>
  );
};

AddProduct.propTypes = {
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
  withRouter(AddProduct)
);