import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editProduct } from '../../../actions/productActions';

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

const EditProduct = ({
  detailProduct,
  store,
  editProduct,
  setTable
  }) => {

  // Product Info
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (detailProduct) {
      const productData = { ...initialState };
      for (const key in detailProduct) {
        if (key in productData) productData[key] = detailProduct[key];
      }
      if (Array.isArray(productData.tags))
        productData.tags = productData.tags.join(', ');
      setFormData(productData);
    }
  }, []);

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


  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
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

    editProduct(data, detailProduct._id, store._id);
  };

  return (
    <div className="product-actions container-fluid">
        <i onClick={e => setTable('detail')} class="fas fa-arrow-left backbutton"></i>
        <div style={{width:'100%', marginTop:'2rem', textAlign:'center'}}>
            <h1 className="large text-primary">Edit Your Product</h1>
            <small>* = required field</small>
        </div>
        <form className="form" onSubmit={onSubmit}>
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
            <a className="btn btn-light my-1">
                Go Back
            </a>
        </form>
    </div>
  );
};

export default EditProduct;