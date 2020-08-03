import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSortedProducts, getProductsByStoreId, handleDetail, editProduct, deleteProduct } from '../../../actions/productActions';
import { getProductVariants, addVariant, deleteVariant } from '../../../actions/variantActions';
import { getStoreById } from '../../../actions/storeActions';
import { getCollectionById, addItem } from '../../../actions/collectionActions';
import { getLocationById } from '../../../actions/locationActions';

import Spinner from '../../common/Spinner';
import Modal from 'react-responsive-modal';
import InputTag from '../../common/InputTag/InputTag';
import Item from '../table/Item';
import ShortItem from '../table/ShortItem';
import ShortLocation from '../table/ShortLocation';

import EditProduct from '../forms/EditProduct';
import StorageRequest from '../forms/StorageRequest';
import DetailProduct from './page_components/product/DetailProduct';
import HeaderProduct from './page_components/product/HeaderProduct';
import DetailCollection from './page_components/collection/DetailCollection';
import HeaderCollection from './page_components/collection/HeaderCollection';
import DetailLocation from './page_components/location/DetailLocation';
import HeaderLocation from './page_components/location/HeaderLocation';


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
    editProduct,
    deleteProduct,
    deleteVariant, 
    getStoreById,
    match, 
    history,
    setSortedProducts,
    getProductsByStoreId,
    addItem,
    product,
    store,
    collection,
    getCollectionById,
    storageLocation,
    getLocationById,
}) => {

    const { 
        detailProduct,
        products, 
        loading 
    } = product;

    // Product Info
    const [formData, setFormData] = useState(initialState);

    // Toggle
    const [displayOption1, toggleOption1] = useState(true);
    const [displayOption2, toggleOption2] = useState(false);
    const [displayOption3, toggleOption3] = useState(false);
    const [displayOption4, toggleOption4] = useState(false);
    const [displayModal, toggleModal] = useState(false);
    const [tableShow1, setTableShow1] = useState('');
    const [headerShow, setHeaderShow] = useState('');
    const [displayStorageModal, toggleStorageModal] = useState(false);
    const [displayLocationModal, toggleLocationModal] = useState(false);
    const [displayStoreLocationModal, toggleStoreLocationModal] = useState(false);

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

    // Storage item list
    const [itemList, setItemListData] = useState([]);

    

    
        
    useEffect(() => {
        if(match.params.productId) {
            if (!detailProduct) handleDetail(match.params.productId);
            setTableShow1('product detail');
            setHeaderShow('product');
        }
        if(match.params.collectionId) {
            if (!collection.collection) getCollectionById(match.params.collectionId);
            setTableShow1('collection detail');
            setHeaderShow('collection');
        }
        if(match.params.locationId) {
            if (!storageLocation.detailLocation) getLocationById(match.params.locationId);
            setTableShow1('location detail');
            setHeaderShow('location');
        }
        if(store.store === null) {
            getStoreById(match.params.storeId);
        };

        if(match.params.productId) {
            if (!loading && detailProduct) {
            const productData = { ...initialState };
            for (const key in detailProduct) {
                if (key in productData) productData[key] = detailProduct[key];
            }
            if (Array.isArray(productData.tags))
                productData.tags = productData.tags.join(', ');
            setFormData(productData);
            }
        }

        if(match.params.collectionId) {
            if (!loading && collection.collection) {
            const collectionData = { ...initialState };
            for (const key in collection.collection) {
                if (key in collectionData) collectionData[key] = collection.collection[key];
            }
            if (Array.isArray(collectionData.tags))
                collectionData.tags = collectionData.tags.join(', ');
            setFormData(collectionData);
            }
        }

        if(match.params.locationId) {
            if (!loading && storageLocation.detailLocation) {
            const locationData = { ...initialState };
            for (const key in storageLocation.detailLocation) {
                if (key in locationData) locationData[key] = storageLocation.detailLocation[key];
            }
            if (Array.isArray(locationData.tags))
                locationData.tags = locationData.tags.join(', ');
            setFormData(locationData);
            }
        }
    }, [loading]);

    // Redirect if store is null
    // if(store.store === null ) {
    //     history.push('/admin');
    // }

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

    const removeVar = (index) => {
        let newVarInfo = [...varInfo];
        newVarInfo.splice(index, 1);
        setVarInfo(newVarInfo);

        console.log(varInfo);
    }

    const setModal = () => {
        toggleModal(!displayModal);
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

            addVariant(data, detailProduct._id, store.store._id);
        });
        
    };

    const onSubmitStorage = (e) => {
        e.preventDefault();

        itemList.map(item => {
            let data = new FormData();
            data.append('id', item);

            // addItem(data, collection._id);
            console.log(item);
        });
        
    };

    const filterItems = (tag) => {
        let tempProd = [...products];
        const tags = [...varTags, tag];
        for(var i = 0; i < tags.length; i++) {
            tempProd = tempProd.filter(prod => prod.tags.includes(tags[i]));
        }
        setSortedProducts(tempProd);
    }

    const unFilterItems = (tag) => {
        let tempProd = [...products];
        let remainingTags = varTags.filter ((t) => {
            return (t !== tag);
        });
        for(var i = 0; i < remainingTags.length; i++) {
            tempProd = tempProd.filter(prod => prod.tags.includes(remainingTags[i]));
        }
        setSortedProducts(tempProd);
    }

    const handleItemClick = (newItem) => {
        if(itemList.filter(item => item === newItem).length > 0) {
            // Get remove index
            const removeIndex = itemList.indexOf(newItem);

            const newList = itemList.splice(removeIndex, 1);

            setItemListData([...newList]);
        } else {
            setItemListData([...itemList, newItem]);
        }
        console.log('ITEM');
        console.log(newItem);
        console.log(itemList);
    }
  
    const onAddTag = (tag) => {
        setVarTags([...varTags, tag]);
        filterItems(tag);
        console.log(varName)
    }
    
    const onDeleteTag = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = varTags.filter ((t) => {
        return (t !== tag);
        });
        setVarTags([...remainingTags]);
        unFilterItems(tag);
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

    const setTable = (show) => {
        setTableShow1(show)
    }

    let pageHeader;

    if(headerShow === 'product') {
        pageHeader = <HeaderProduct />;
    } else if(headerShow === 'collection') {
        pageHeader = <HeaderCollection /> 
    } else if(headerShow === 'location') {
        pageHeader = <HeaderLocation /> 
    }

    let pageContent;

    if(tableShow1 === 'product detail') {
        if(detailProduct) {
            pageContent = (
                <DetailProduct 
                    detailProduct={detailProduct} 
                    setModal={setModal} 
                    setTable={setTable} 
                    setStoreLocationModal={toggleStoreLocationModal}
                />
            );
        } else {
            pageContent = <Spinner />
        }
    } else if(tableShow1 === 'collection detail') {
        pageContent = (
            <DetailCollection 
                setModal={toggleStorageModal} 
                setTable={setTable} 
            />
        );
    } else if(tableShow1 === 'location detail') {
        pageContent = (
            <DetailLocation 
                setModal={toggleStorageModal} 
                setTable={setTable} 
            />
        );
    } else if(tableShow1 === 'storage request') {
        pageContent = (
            <StorageRequest 
                products={products} 
                getProductsByStoreId={getProductsByStoreId} 
                setModal={toggleStorageModal} 
                setLocationModal={toggleLocationModal} 
                store={store.store} 
                detail="true" 
                setTable={setTable} 
            />
        ); 
    } else if (tableShow1 === 'edit') {
        pageContent = (
            <EditProduct 
                detailProduct={detailProduct} 
                editProduct={editProduct} 
                store={store.store} 
                setTable={setTable} 
            />
        ); 
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
                    <td><i onClick={() => removeVar(index)} className="fas fa-trash"></i></td>
                </tr>
            )}
        );
    } else {
        display = <h3>variants</h3>;
    }

    return (
        <Fragment>
            <div id="product-content-wrapper">
                {pageHeader}
    
                {pageContent}
            </div>

            <Modal open={displayStoreLocationModal} onClose={toggleStoreLocationModal} center>
                <div style={{display:'flex'}}>
                    <InputTag
                        onAddTag ={onAddTag}
                        onDeleteTag = {onDeleteTag}
                        defaultTags={varTags}  
                        placeholder="enter tags separated by comma"
                    />
                    <button onClick={onSubmitStorage}>Add</button>
                </div>
                
               <ShortLocation storageLocation={storageLocation} handleClick={handleItemClick} itemList={itemList} />
            </Modal>
            
            <Modal open={displayLocationModal} onClose={toggleLocationModal} center>
                <h5>Choose A Locations</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="name1" />
                            </th>
                            <th>Details</th>
                            <th><i class="fas fa-map-marker-alt"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <div style={{display:'flex', flexDirection:'column', width:'100%', padding:'1rem', border:'2px solid #f4f4f4'}}>
                                <h5>6100 Glenhollow dr.</h5>
                                <p style={{color:'#808080'}}><i class="fas fa-map-marker-alt"></i>Plano, Tx</p>
                                <p>On the corner of communications in pkwy and main next to the kroger store but on the back of the corner of the back fencing.</p>
                                <p style={{margin:'1rem'}}>
                                    <input 
                                        type="checkbox" 
                                        name="visible"
                                        style={{margin:0}}
                                    />
                                    <label style={{margin:0}} className="form-group">Default location</label>
                                </p>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </Modal>

            <Modal open={displayStorageModal} onClose={toggleStorageModal} center>
                <div style={{display:'flex'}}>
                    <InputTag
                        onAddTag ={onAddTag}
                        onDeleteTag = {onDeleteTag}
                        defaultTags={varTags}  
                        placeholder="enter tags separated by comma"
                    />
                    <button onClick={onSubmitStorage}>Add</button>
                </div>
                
               <ShortItem product={product} handleClick={handleItemClick} itemList={itemList} />
            </Modal>

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
                            </tr>
                        </thead>
                        <tbody>
                            {displayOption1 === true ? (
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
                                        <Fragment>
                                            <InputTag  
                                                onAddTag ={onAddTag}
                                                onDeleteTag = {onDeleteTag}
                                                defaultTags={varTags}
                                                placeholder="enter tags separated by comma"
                                            />
                                            <button onClick={() => toggleOption2(!displayOption2)} id="add-otp" style={{width:'100%'}} class="btn">+</button>
                                        </Fragment>
                                    </td>
                             </tr>
                            ): null}
                            {displayOption2 === true ? (
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
                                        <Fragment>
                                            <InputTag  
                                                onAddTag ={onAddTag2}
                                                onDeleteTag = {onDeleteTag2}
                                                defaultTags={varTags2}
                                                placeholder="enter tags separated by comma"
                                            />
                                            <button onClick={() => toggleOption3(!displayOption3)} id="add-otp" style={{width:'100%'}} class="btn">+</button>
                                        </Fragment>
                                        
                                    </td>
                                </tr>
                                ): null}
                                {displayOption3 === true ? (
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
                                        <Fragment>
                                            <InputTag  
                                                onAddTag ={onAddTag3}
                                                onDeleteTag = {onDeleteTag3}
                                                defaultTags={varTags3}
                                                placeholder="enter tags separated by comma"
                                            />
                                            <button onClick={() => toggleOption4(!displayOption4)} id="add-otp" style={{width:'100%'}} class="btn">+</button>
                                        </Fragment>
                                    </td>
                                </tr>
                                ) : null}
                                {displayOption4 === true ? (
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
                                </tr>
                            ) : null}
                        </tbody>
                    </table>

                    <div onClick={updateList} class="btn btn-primary my-3">Apply</div>

                    {varInfo.length > 0 && (
                        <Fragment>
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
                        </Fragment>
                    )}
                </form>
            </Modal>
        </Fragment>
    )
}

ProductPage.propTypes = {
    addVariant: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    deleteVariant: PropTypes.func.isRequired,
    getStoreById: PropTypes.func.isRequired,
    setSortedProducts: PropTypes.func.isRequired,
    getProductsByStoreId: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    getCollectionById: PropTypes.func.isRequired,
    storageLocation: PropTypes.object.isRequired,
    getLocationById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.product,
    store: state.store,
    collection: state.collection,
    storageLocation: state.location
})

export default connect(mapStateToProps, { addVariant, editProduct, handleDetail, getStoreById, deleteProduct, deleteVariant, addItem, setSortedProducts, getProductsByStoreId, getCollectionById, getLocationById })(withRouter(ProductPage));
