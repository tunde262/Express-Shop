import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProduct, handleDetail } from '../../../actions/productActions';

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
  addProduct,
  handleDetail,
  history,
  match
  }) => {
  const [formData, setFormData] = useState(initialState);

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
    file,
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
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    if(file !== '') data.append('file', file);
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

    addProduct(data, history, detailProduct ? true : false);
  };

  return (
    <main id="home" style={{textAlign: "center"}}>
      <h1 className="large text-primary">Edit Your Product</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <label className='form-group'>Product Img.
          <input
              type="file"
              name="file"
              id="file"
              className="form-control"
              placeholder="Start with ../img/"
              onChange={fileChanged}
          />
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
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your life?
          </small>
        </label>
        <label className="form-group">condition
          <select name="condition" value={condition} onChange={onChange}>
            <option>* Choose a condition</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your life?
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
            Could be your own or a company website
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
            City & state suggested (eg. Boston, MA)
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
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
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
            If you want your latest repos and a Github link, include your
            username
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
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
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
            If you want your latest repos and a Github link, include your
            username
          </small>
        </label>
        
        <div className="line"></div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
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