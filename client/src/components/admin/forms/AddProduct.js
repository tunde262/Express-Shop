import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { addProduct, addProductImg, handleDetail } from '../../../actions/productActions';

import DragAndDrop from './utils/DragAndDrop';

const initialState = {
  file: '',
  name: '',
  description: '',
  sku: '',
  website_link: '',
  sale_price: '',
  price: '',
  visible: '',
  in_stock: '',
  inventory_qty: '',
  category: '',
  condition: '',
  tags: ''
};

const AddProduct = ({
  product: { detailProduct, loading },
  addProduct,
  handleDetail,
  history,
  match
  }) => {
  const [formData, setFormData] = useState(initialState);
  const [files, setFiles] = useState([]);

  const [displayModal, toggleModal] = useState(false);

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

    addProduct(data, files);

    history.push('/admin');

  };

  const setModal = () => {
    toggleModal(!displayModal);
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
                value={visible}
                onChange={onChange}
            />
            <span class="slider round"></span>
        </label>
        <div className="line"></div>
        <label className="form-group">In Stock
            <input 
                type="checkbox" 
                name="in_stock"
                value={in_stock}
                onChange={onChange}
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
        
        <div className="line"></div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
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
  handleDetail: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  product: state.product
});

export default connect(mapStateToProps, { addProduct, handleDetail })(
  withRouter(AddProduct)
);