import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import Modal from 'react-responsive-modal';
import { handleDetail, deleteProduct } from '../../actions/productActions';
import { getProductVariants, addVariant, deleteVariant } from '../../actions/variantActions';

import Title from '../Title';
import Table from './table/Table';
import InputTag from '../common/InputTag/InputTag';
import Variant from './table/Variant';


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

const ProductPage = ({ 
    addVariant,
    handleDetail, 
    deleteProduct,
    deleteVariant, 
    match, 
    product: { 
        detailProduct, 
        loading 
    }}) => {

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

    const [varInfo, setVarInfo] = useState([]);
    const [varSku, setVarSku] = useState([]);
    const [varSalePrice, setVarSalePrice] = useState([]);
    const [varPrice, setVarPrice] = useState([]);
    const [varQty, setVarQty] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [weight, setWeight] = useState([]);
    const [bundle, setBundle] = useState([]);
    const [scent, setScent] = useState([]);
    const [fit, setFit] = useState([]);
    const [flavor, setFlavor] = useState([]);
    const [material, setMaterial] = useState([]);

    const [displayModal, toggleModal] = useState(false);

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

    let variantList = [];

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
    

    const onSubmit = (e) => {
        e.preventDefault();

        varInfo.map((variant, index) => {
            let data = new FormData();
            if(varName.var1 !== '')data.append(`${varName.var1}`, variant.var1);
            if(varName.var2 !== '')data.append(`${varName.var2}`, variant.var2);
            if(varName.var3 !== '')data.append(`${varName.var3}`, variant.var3);
            if(varName.var4 !== '')data.append(`${varName.var4}`, variant.var4);
            if(name !== '')data.append('name', name);
            if(variant.sku !== '')data.append('sku', variant.sku);
            if(website_link !== '')data.append('website_link', website_link);
            if(variant.sale_price !== '')data.append('sale_price', variant.sale_price);
            if(variant.price !== '')data.append('price', variant.price);
            if(visible !== '')data.append('visible', visible);
            if(in_stock !== '')data.append('in_stock', in_stock);
            if(variant.inventory_qty !== '')data.append('inventory_qty', variant.inventory_qty);
            if(category !== '')data.append('category', category);
            if(condition !== '')data.append('condition', condition);
            if(tags !== '')data.append('tags', tags);

            addVariant(data, detailProduct._id);
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
            )}
        );
    } else {
        display = <h3>variants</h3>;
    }

    return (
        <Fragment>
            <div id="product-content-wrapper">
                <div id="breadcrumb">
                    <nav className="breadcrumb">
                        <ol>
                            <li><b>My Portfolio</b></li>
                        </ol>
                    </nav>
                </div>
                <div class="product-header container-fluid">
                    <div style={{display: 'flex'}}>
                        {detailProduct && <img style={{width: '50px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} alt="img" />}
                        <h3 style={{color: "black"}}>Flower Dress</h3>
                    </div>
                    <hr/>
                    <p>Qty 12 in stock for 4 varients</p>
                    <hr/>
                </div>
                <div class="product-map"></div>
                <div class="product-info">
                    <div class="product-status-box">
                        <div class="product-status-box-title"><p>status</p></div>
                        <div class="product-status-box-stats">
                            <h2><b>2</b></h2>
                            <h2><b>2</b></h2>
                            <h2><b>2</b></h2>
                            <h2><b>2</b></h2>
                        </div>
                    </div>
                    <div class="product-description-box">
                        <ul class="nav-underline">
                            <li><a href="#">Activity</a></li>
                            <li><a href="#" class="active">Info</a></li>
                            <li><a href="#">Location</a></li>
                        </ul>
                        <div class="container-fluid">
                            <ul class="nav-underline secondary">
                                <li><a href="#" class="active">City</a></li>
                                <li><a href="#">State</a></li>
                                <li><a href="#">Country</a></li>
                            </ul>
                        </div>
                        <div class="locations">
                            <ul>Dallas</ul>
                            <ul>Forth Worth</ul>
                            <ul>Allen</ul>
                        </div>

                    </div>
                </div>
                <div class="content-box container-fluid">
                    <div class="table-responsive table-filter">
                        <section>
                            <p style={{alignSelf: "flex-end"}}>50 Varients</p>
                            <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button>
                        </section>
                        <Variant varId={match.params.id} deleteVariant={deleteVariant} />
                    </div>
                </div>
            </div>

            <Modal open={displayModal} onClose={setModal} center>
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
                    <button type="submit" id="upload" class="btn btn-primary">Upload</button>
                </form>
            </Modal>
        </Fragment>
    )
}

ProductPage.propTypes = {
    addVariant: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    deleteVariant: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { addVariant, handleDetail, deleteProduct, deleteVariant })(withRouter(ProductPage));
