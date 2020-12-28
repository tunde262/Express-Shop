import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { setMainNav, setPage } from '../../../actions/navActions';
import { setSortedProducts, getProductsByStoreId, getProductsInCollection, handleDetail, addProduct, editProduct, deleteProduct, setModalProducts, addProductImg, setDetailProduct } from '../../../actions/productActions';
import { getProductVariants, addVariant, deleteVariant, setModalVariants } from '../../../actions/variantActions';
import { getStoreById } from '../../../actions/storeActions';
import { getCollectionById, addCollectionItem, addCollection, editCollection } from '../../../actions/collectionActions';
import { addLocation, editLocation, getLocationById, getProductLocations, getCollectionLocations, setLocations, addProductToLocation } from '../../../actions/locationActions';
import { getOrderById } from '../../../actions/orderActions';

import Spinner from '../../common/Spinner';
import Modal from 'react-responsive-modal';
import InputTag from '../../common/InputTag/InputTag';
import ItemTable from '../table/ItemTable/ItemTable';
import ShortTable from '../table/ShortTable/ShortTable';
import VarLocationTable from '../table/VarLocationTable/VarLocationTable';
import ShortVarTable from '../table/ShortVarTable/ShortVarTable';
import ShortLocation from '../table/ShortLocation';

import EditProduct from '../forms/EditProduct';

import StorageRequest from '../forms/StorageRequest';

import DetailProduct from './page_components/product/DetailProduct';
import HeaderProduct from './page_components/product/HeaderProduct';
import ProductSideDrawer from './page_components/product/SideDrawerProduct';

import HeaderProductForm from '../../page_components/forms_inventory/productForm/Header_Product';
import MainProductForm from '../../page_components/forms_inventory/productForm/Form_Product';

import DetailCollection from './page_components/collection/DetailCollection';
import HeaderCollection from './page_components/collection/HeaderCollection';
import CollectionSideDrawer from './page_components/collection/SideDrawerCollection';

import MainCollectionForm from '../../page_components/forms_inventory/collectionForm/Form_Collection';
import HeaderCollectionForm from '../../page_components/forms_inventory/collectionForm/Header_Collection';

import DetailLocation from './page_components/location/DetailLocation';
import HeaderLocation from './page_components/location/HeaderLocation';
import LocationSideDrawer from './page_components/location/SideDrawerLocation';

import HeaderLocationForm from '../../page_components/forms_inventory/locationForm/Header_Location';
import MainLocationForm from '../../page_components/forms_inventory/locationForm/Form_Location';

import DetailOrder from './page_components/order/DetailOrder';
import HeaderOrder from './page_components/order/HeaderOrder';

import DragAndDrop from '../../admin/forms/utils/DragAndDrop';

import sampleImg from '../../../utils/imgs/20484728.jpeg';


const initialState = {
    name: '',
    sku: '',
    website_link: '',
    sale_price: '',
    price: '',
    visible: true,
    in_stock: true,
    inventory_qty: '',
    // Location Info
    city: '',
    state: '',
    country: '',
    area: '',
    stateProvince: '',
    street_number: '',
    formatted_address: '',
    street_name: '',
    postalCode: '',
    placeId: '',
    location_tags: '',
    tags: '',
    latLng: '',
    phone: ''
};

const ProductPage = ({ 
    setPage,
    addVariant,
    handleDetail, 
    setDetailProduct,
    addProduct,
    editProduct,
    deleteProduct,
    deleteVariant, 
    getStoreById,
    getOrderById,
    match, 
    history,
    location,
    setMainNav,
    setSortedProducts,
    setModalProducts,
    setModalVariants,
    getProductsInCollection,
    getProductsByStoreId,
    getProductVariants,
    addCollectionItem,
    addCollection, 
    editCollection,
    addProductToLocation,
    product,
    variant,
    store,
    nav,
    collection,
    order,
    getCollectionById,
    storageLocation,
    getLocationById,
    getProductLocations, 
    getCollectionLocations,
    setLocations,
    addLocation,
    editLocation,
    addProductImg
}) => {

    const { 
        detailProduct,
        products, 
        loading 
    } = product;

    // Product Info
    const [formData, setFormData] = useState(initialState);
    const [files, setFiles] = useState([]);
    const [itemTags, setItemTags] = useState([]);
    const [categoryData, setCategoryData] = useState('');
    const [conditionData, setConditionData] = useState('');

    // Toggle
    const [displayOption1, toggleOption1] = useState(true);
    const [displayOption2, toggleOption2] = useState(false);
    const [displayOption3, toggleOption3] = useState(false);
    const [displayOption4, toggleOption4] = useState(false);
    const [displayModal, toggleModal] = useState(false);
    const [tableShow1, setTableShow1] = useState('');
    const [headerShow, setHeaderShow] = useState('');
    const [displayStorageModal, toggleStorageModal] = useState(false);
    const [displayAddToLocationModal, toggleAddToLocationModal] = useState(false);
    const [displayVariantModal, toggleVariantModal] = useState(false);
    const [displayLocationModal, toggleLocationModal] = useState(false);
    const [displayStoreLocationModal, toggleStoreLocationModal] = useState(false);
    const [displayImageModal, toggleImageModal] = useState(false);

    // Text Editor State - Description
    const [editorState, setEditorState] = useState(null);
    // const [editorState, setEditorState] = useState({"entityMap":{},"blocks":[{"key":"btdob","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]});

    // Var Option Toggle
    const [optionToggle, setOptionToggle] = useState(false);
    const [optionToggle2, setOptionToggle2] = useState(false);
    const [optionToggle3, setOptionToggle3] = useState(false);
    const [optionToggle4, setOptionToggle4] = useState(false);

    // Choose a category - Toggle
    const [categoryToggle, setCategoryToggle] = useState(false);
    // Item condition - Toggle
    const [conditionToggle, setConditionToggle] = useState(false);

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

    const [slideForm1, setSlideForm1] = useState(true);
    const [modalForm1, setModalForm1] = useState(false);


    // Location Info  
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null, 
        lng: null
    });
        
    useEffect(() => {
        setMainNav('admin');

        console.log(location);
        console.log(new URLSearchParams(location.search).get('show'));

        if(match.params.productId) {
            if (!detailProduct) handleDetail(match.params.productId);
            getProductLocations(match.params.productId);

            if (location.search) {
                let query = new URLSearchParams(location.search).get('show')
                if (query === 'detail') {
                    setTableShow1('product detail');
                    setHeaderShow('product');
                    setPage('admin detail product');
                } else if (query === 'add_item') {
                    setTableShow1('add item');
                    setHeaderShow('add item');
                    setSlideForm1(false);
                    setPage('admin add item');
                } 
            }
        }
        if(match.params.collectionId) {
            if (!collection.collection) getCollectionById(match.params.collectionId);
            getProductsInCollection(match.params.collectionId);
            // getCollectionLocations(match.params.collectionId);

            if (location.search) {
                let query = new URLSearchParams(location.search).get('show')
                if (query === 'detail') {
                    setTableShow1('collection detail');
                    setHeaderShow('collection');
                    setPage('admin detail collection');
                } else if (query === 'add_collection') {
                    setTableShow1('add collection');
                    setHeaderShow('add collection');
                    setSlideForm1(false);
                    setPage('admin add collection');
                } 
            }
        }
        if(match.params.locationId) {
            if (!storageLocation.detailLocation) getLocationById(match.params.locationId);
            setLocations(match.params.locationId);

            if (location.search) {
                let query = new URLSearchParams(location.search).get('show')
                if (query === 'detail') {
                    setTableShow1('location detail');
                    setHeaderShow('location');
                    setPage('admin detail location');
                } else if (query === 'add_location') {
                    setTableShow1('add location');
                    setHeaderShow('add location');
                    setSlideForm1(false);
                    setPage('admin add location');
                } 
            }
        }
        if(match.params.orderId) {
            if (!order.order) getOrderById(match.params.orderId);
            // getOrderLocations(match.params.orderId);
            setTableShow1('order detail');
            setHeaderShow('order');
            setPage('admin detail order');
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

                if(detailProduct.description) {
                    setEditorState(detailProduct.description);
                }

                // if (Array.isArray(productData.tags))
                //     productData.tags = productData.tags.join(', ');
                setFormData(productData);
            }
        }

        if(match.params.collectionId) {
            if (!loading && collection.collection) {
            const collectionData = { ...initialState };
            for (const key in collection.collection) {
                if (key in collectionData) collectionData[key] = collection.collection[key];
            }
            // if (Array.isArray(collectionData.tags))
            //     collectionData.tags = collectionData.tags.join(', ');
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
            setAddress(storageLocation.detailLocation.formatted_address)
            }
        }
    }, [loading, collection.loading, storageLocation.loading]);

    // Redirect if store is null
    // if(store.store === null ) {
    //     history.push('/admin');
    // }

    let variantList = [];

    const {
        name,
        sku,
        website_link,
        sale_price,
        price,
        visible,
        in_stock,
        inventory_qty,
        // Location Info
        city,
        state,
        country,
        area,
        stateProvince,
        street_number,
        formatted_address,
        street_name,
        postalCode,
        placeId,
        location_tags,
        tags,
        latLng,
        phone
    } = formData;

    const fileUploadButton = () => {
        console.log(files);
        let fileList = [];
        files.map(file => fileList.push(file));

        document.getElementById('file').click();
        document.getElementById('file').onchange = (e) =>{     
            for (var i = 0; i < document.getElementById('file').files.length; i++) {
                if(!document.getElementById('file').files[i]) return;
                fileList.push(document.getElementById('file').files[i])
            }
            setFiles(fileList); 
            onSubmitImage(fileList);
        }
    }

    // const fileChanged = e => {
    //     console.log(files)
    //     let fileList = [];
    //     files.map(file => fileList.push(file));
    //     for (var i = 0; i < e.target.files.length; i++) {
    //         if(!e.target.files[i]) return;
    //         fileList.push(e.target.files[i])
    //     }
    //     setFiles(fileList);
    // }

    const onChangeVar = (e) => {
        setVarName({ ...varName, [e.target.name]: e.target.value });
    }

    const onChangeVarName = (varNum, varValue) => {
        setVarName({ ...varName, [varNum]: varValue });
        console.log('VARNUM');
        console.log(varNum);
        console.log('VAR VALUE');
        console.log(varValue);
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

    const onAddItemTag = (tag) => {
        setItemTags([...itemTags, tag]);
        // filterItems(tag);
    }

    const loadItemTags = (tags) => {
        setItemTags(tags);
    }

    const onDeleteItemTag = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = itemTags.filter ((t) => {
        return (t !== tag);
        });
        setItemTags([...remainingTags]);
        // unFilterItems(tag);
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

    const updateVarTodo = () => {
        updateList();
        setModalForm1(!modalForm1);
    }

    const onAddProduct = async (e) => {
        e.preventDefault();
  
        let tags = '';
        if (itemTags.length > 0) {
          tags = itemTags.join(', ');
        }
    
        let data = new FormData();
        // if(formData.file !== '') data.append('file', formData.file);
        if(name !== '')data.append('name', name);
        if(editorState !== null)data.append('description', editorState);
        if(sku !== '')data.append('sku', sku);
        if(website_link !== '')data.append('website_link', website_link);
        if(sale_price !== '')data.append('sale_price', sale_price);
        if(price !== '')data.append('price', price);
        if(visible !== '')data.append('visible', visible);
        if(in_stock !== '')data.append('in_stock', in_stock);
        if(inventory_qty !== '')data.append('inventory_qty', inventory_qty);
        if(categoryData !== '')data.append('category', categoryData);
        if(conditionData !== '')data.append('condition', conditionData);
        if(tags !== '')data.append('tags', tags);
    
        console.log(varInfo);
        if(!detailProduct) {
          addProduct(data, varInfo, varName, store.store._id, history);
        } else {
          editProduct(data, detailProduct._id, varInfo, varName, store.store._id, history);
        }
    
        mixpanel.track("Add Product Completed", {
          "Item Name": name,
          "Item Category": categoryData,
          "Item Cost": price,
          "Store Name": store.store.name,
          "Creation Date": new Date().toISOString(), 
        });
    
    };

    const onAddCollection = async (e) => {
        e.preventDefault();
  
        let tags = '';
        if (itemTags.length > 0) {
          tags = itemTags.join(', ');
        }
    
        let data = new FormData();
        // if(formData.file !== '') data.append('file', formData.file);
        if(name !== '')data.append('name', name);
        if(visible !== '')data.append('visible', visible);
        if(tags !== '')data.append('tags', tags);

        console.log('ON ADD COLLECTION')
    
        if(!collection.collection) {
          addCollection(data, store.store._id, history);
        } else {
          editCollection(data, collection.collection._id, store.store._id, history);
        }
    
        // mixpanel.track("Add Collection Completed", {
        //   "Collection Name": name,
        //   "Collection Category": categoryData,
        //   "Collection Cost": price,
        //   "Store Name": store.store.name,
        //   "Creation Date": new Date().toISOString(), 
        // });
    
    };

    const handleVarCreate = (e) => {
        onSubmit(e);
        setModal(false);
    }

    const handleLocationSelect = async (value) => {
        const result = await geocodeByAddress(value);
        const latLng = await getLatLng(result[0])
        console.log('VALUE:');
        console.log(value);
        console.log('RESULTS:')
        console.log(result);
        console.log('LATLNG');
        console.log(latLng);
  
        let locationTags = [];
  
        if(result[0].types && result[0].types.length > 0) {
            result[0].types.map(type => locationTags.push(type));
        };
        const address = result[0].formatted_address;
        const placeId = result[0].place_id;
        const addressArray =  result[0].address_components;
        const city = getCity(addressArray);
        const country = getCountry(addressArray );
        const area = getArea(addressArray);
        const state = getState(addressArray);
        const postalCode = getPostalCode(addressArray);
        const street = getStreet(addressArray);
        const number = getNumber(addressArray);
  
  
        console.log('city: ' + city);
        console.log('state: ' + state);
        console.log('country: ' + country);
        console.log('area: ' + area);
        console.log('state: ' + state);
        console.log('number: ' + number);
        console.log('street: ' + street);
        console.log('postalCode: ' + postalCode);
        console.log("formatted address: " + address);
        console.log("placeId: " + placeId);
        console.log("phone: " + phone);
        console.log("location tags: ")
        console.log(tags);
  
        let newTags;
        if (Array.isArray(tags)) {
            newTags = tags.join(', ');
        }
  
        setAddress(value);
        setFormData({
            name: (name) ? name : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            country: (country) ? country : '',
            area: (area) ? area : '',
            stateProvince: (state) ? state : '',
            street_number: (number) ? number : '',
            formatted_address: (address) ? address : '',
            street_name: (street) ? street : '',
            postalCode: (postalCode) ? postalCode : '',
            placeId: (placeId) ? placeId : '',
            phone: (phone) ? phone : '',
            location_tags: (newTags) ? newTags : '',
            tags: (tags) ? tags : '',
            latLng: `${latLng.lat}, ${latLng.lng}`
        })
        setCoordinates(latLng);
    };
  
    const getCity = ( addressArray ) => {
        let city = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && 'locality' === addressArray[ i ].types[0] ) {
                city = addressArray[ i ].long_name;
                return city;
            }
        }
    };

    const getArea = ( addressArray ) => {
        let area = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0]  ) {
                for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                    if ( 'administrative_area_level_2' === addressArray[ i ].types[j] ) {
                        area = addressArray[ i ].long_name;
                        return area;
                    }
                }
            }
        }
    };
    
    const getCountry = ( addressArray ) => {
        let area = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0]  ) {
                for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                    if ( 'country' === addressArray[ i ].types[j] ) {
                        area = addressArray[ i ].long_name;
                        return area;
                    }
                }
            }
        }
    };

    const getPostalCode = ( addressArray ) => {
        let area = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0]  ) {
                for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                    if ( 'postal_code' === addressArray[ i ].types[j] ) {
                        area = addressArray[ i ].long_name;
                        return area;
                    }
                }
            }
        }
    };

    const getState = ( addressArray ) => {
        let state = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            for( let i = 0; i < addressArray.length; i++ ) {
                if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
                    state = addressArray[ i ].long_name;
                    return state;
                }
            }
        }
    };
    
    const getNumber = ( addressArray ) => {
        let state = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            for( let i = 0; i < addressArray.length; i++ ) {
                if ( addressArray[ i ].types[0] && 'street_number' === addressArray[ i ].types[0] ) {
                    state = addressArray[ i ].long_name;
                    return state;
                }
            }
        }
    };
    
    const getStreet = ( addressArray ) => {
        let state = '';
        for( let i = 0; i < addressArray.length; i++ ) {
            for( let i = 0; i < addressArray.length; i++ ) {
                if ( addressArray[ i ].types[0] && 'route' === addressArray[ i ].types[0] ) {
                    state = addressArray[ i ].long_name;
                    return state;
                }
            }
        }
    };

    const onSubmitLocation = (e) => {
        e.preventDefault();
    
        let data = new FormData();

        if(name !== '')data.append('name', name);
        if(street_name !== '')data.append('street_name', street_name);
        if(street_number !== '')data.append('street_number', street_number);
        if(city !== '')data.append('city', city);
        if(state !== '')data.append('state', state);
        if(postalCode !== '')data.append('postalCode', postalCode);
        if(country !== '')data.append('country', country);
        if(area !== '')data.append('area', area);
        if(placeId !== '')data.append('placeId', placeId);
        if(stateProvince !== '')data.append('stateProvince', stateProvince);
        if(formatted_address !== '')data.append('formatted_address', formatted_address);
        if(tags !== '')data.append('tags', tags);
        if(location_tags !== '')data.append('location_tags', location_tags);
        if(phone !== '')data.append('phone', phone);
        if(latLng !== '')data.append('coordinates', latLng);

        const newLocation = {
            name: name,
            street_name: street_name,
            street_number: street_number,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country,
            area: area,
            placeId: placeId,
            stateProvince: stateProvince,
            formatted_address: formatted_address,
            tags: tags,
            location_tags: location_tags,
            phone: phone,
            coordinates: latLng
        }

        console.log('FORMATTED DATA')
        console.log(newLocation)
    
        if(!storageLocation.detailLocation) {
            addLocation(newLocation, store.store._id, history);
        } else {
            editLocation(newLocation, storageLocation.detailLocation._id, store.store._id, history);
        }

        mixpanel.track("Add Location Page Completed", {
            "Location Name": name,
            "Location City": city,
            "location Zipcode": postalCode,
            "Store Name": store.store.name,
            "Creation Date": new Date().toISOString(), 
        });
    };

    const onSubmitImage = async (fileList) => {
    
        console.log('IMG FILES');
        console.log(fileList);

        addProductImg(fileList, detailProduct._id);
        toggleImageModal();
    };
    

    const onSubmit = (e) => {
        e.preventDefault();

        let tags = '';
        if (itemTags.length > 0) {
          tags = itemTags.join(', ');
        }

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
            if(categoryData !== '')data.append('category', categoryData);
            if(conditionData !== '')data.append('condition', conditionData);
            if(tags !== '')data.append('tags', tags);

            addVariant(data, detailProduct._id, store.store._id);
        });
        
    };

    const onSubmitStorage = (e) => {
        e.preventDefault();

        addCollectionItem(itemList, collection.collection._id);
        console.log(itemList);
        
    };

    const onAddVariant = (e) => {
        e.preventDefault();

        // addProductToLocation(itemList, storageLocation.detailLocation._id);
        console.log(itemList);
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
    
    const setVarModal = async (prodId) => {
        setModalForm1(true);
        const res = await axios.get(`/api/variants/product/${prodId}`);
        const prodObj = await axios.get(`/api/products/${prodId}`);
        console.log('MODAL PRODUCTS');
        console.log(res.data);
        setDetailProduct(prodObj.data);
        setModalVariants(res.data);
    }

    const handleToggleOption = () => {
        if(displayOption4 && !displayOption1) {
            toggleOption1(true);
        } else if (displayOption3 && !displayOption4) {
            toggleOption4(true);
        } else if (displayOption2 && !displayOption3) {
            toggleOption3(true);
        } else if (displayOption1 && !displayOption2) {
            toggleOption2(true);
        }
    }
  
    const onAddTag = (tag) => {
        setVarTags([...varTags, tag]);
        // filterItems(tag);
        console.log(varName);
        console.log(itemList);
    }
    
    const onDeleteTag = (tag) => {
        // alert(`deleting ${tag}`);
        let remainingTags = varTags.filter ((t) => {
        return (t !== tag);
        });
        setVarTags([...remainingTags]);
        // unFilterItems(tag);
    }

    const removeDisplayOption1 = () => {
        toggleOption1(false);
        setVarTags([]);
        setVarName({ ...varName, ["var1"]: '' });
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

    const removeDisplayOption2 = () => {
        toggleOption2(false);
        setVarTags2([]);
        setVarName({ ...varName, ["var2"]: '' });
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

    const removeDisplayOption3 = () => {
        toggleOption3(false);
        setVarTags3([]);
        setVarName({ ...varName, ["var3"]: '' });
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

    const removeDisplayOption4 = () => {
        toggleOption4(false);
        setVarTags4([]);
        setVarName({ ...varName, ["var4"]: '' });
    }

    const handleVarNameChange = (varNum, varValue) => {
        onChangeVarName(varNum, varValue);

        if(varNum === "var1") setOptionToggle(!optionToggle);
        if(varNum === "var2") setOptionToggle2(!optionToggle2);
        if(varNum === "var3") setOptionToggle3(!optionToggle3);
        if(varNum === "var4") setOptionToggle4(!optionToggle4);
    }

    const handleCategoryChange = (value) => {
        setCategoryData(value);

        setCategoryToggle(false);
    }

    const handleConditionChange = (value) => {
        setConditionData(value);

        setConditionToggle(!conditionToggle);
    }
  
    const switchChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
  
    // const fileChanged = e => {
    //   setFormData({ ...formData, [e.target.name]: e.target.files });
    // }
  
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(editorState);
    //   console.log(files);
    }

    const setTable = (show) => {
        setTableShow1(show)
    }

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

    const handleStorageModal = async (bool) => {
        const res = await axios.get(`/api/products/store/${store.store._id}`);
        console.log('MODAL PRODUCTS');
        // console.log(res.data)
        setModalProducts(res.data);
        toggleStorageModal(bool);
    }

    const handleAddToLocationModal = async (bool) => {
        const res = await axios.get(`/api/products/store/${store.store._id}`);
        console.log('MODAL PRODUCTS');
        // console.log(res.data)
        setModalProducts(res.data);
        toggleAddToLocationModal(bool);
    }

    const handleVariantModal = async (bool) => {
        const res = await axios.get(`/api/variants/store/${store.store._id}`);
        console.log('MODAL VARIANTS');
        // console.log(res.data)
        setModalVariants(res.data);
        toggleVariantModal(bool);
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
                } else if (varTags4.length > 0) {
                    varTags.map(tag => {varTags2.map(tag2 => {varTags4.map(tag4 => {
                        variantList.push({
                            var1: tag,
                            var2: tag2,
                            var4: tag4,
                            price: price,
                            sale_price: sale_price,
                            inventory_qty: inventory_qty,
                            sku: sku,
        
                        });
                    })})});
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
            } else if (varTags3.length > 0) {
                if(varTags4.length > 0) {
                    varTags.map(tag => {varTags3.map(tag3 => {varTags4.map(tag4 => {
                        variantList.push({
                            var1: tag,
                            var3: tag3,
                            var4: tag4,
                            price: price,
                            sale_price: sale_price,
                            inventory_qty: inventory_qty,
                            sku: sku,
    
                        });
                    })})});
                } else {
                    varTags.map(tag => {varTags3.map(tag3 => {
                        variantList.push({
                            var1: tag,
                            var3: tag3,
                            price: price,
                            sale_price: sale_price,
                            inventory_qty: inventory_qty,
                            sku: sku,
                        });
                    })});
                }
            } else if (varTags4.length > 0) {
                varTags.map(tag => {varTags4.map(tag4 => {
                    variantList.push({
                        var1: tag,
                        var4: tag4,
                        price: price,
                        sale_price: sale_price,
                        inventory_qty: inventory_qty,
                        sku: sku,
    
                    });
                })});
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
        } else if (varTags2.length > 0) {
            if(varTags3.length > 0) {
                if(varTags4.length > 0) {
                    varTags2.map(tag2 => {varTags3.map(tag3 => {varTags4.map(tag4 => {
                        variantList.push({
                            var2: tag2,
                            var3: tag3,
                            var4: tag4,
                            price: price,
                            sale_price: sale_price,
                            inventory_qty: inventory_qty,
                            sku: sku,

                        });
                    })})});
                } else {
                    varTags2.map(tag2 => {varTags3.map(tag3 => {
                        variantList.push({
                            var2: tag2,
                            var3: tag3,
                            price: price,
                            sale_price: sale_price,
                            inventory_qty: inventory_qty,
                            sku: sku,
                        });
                    })});
                }
            } else if (varTags4.length > 0) {
                varTags2.map(tag2 => {varTags4.map(tag4 => {
                    variantList.push({
                        var2: tag2,
                        var4: tag4,
                        price: price,
                        sale_price: sale_price,
                        inventory_qty: inventory_qty,
                        sku: sku,
    
                    });
                })});
            } else {
                varTags.map(tag => {
                    variantList.push({
                        var2: tag,
                        price: price,
                        sale_price: sale_price,
                        inventory_qty: inventory_qty,
                        sku: sku,
                    });
                });
            }
        } else if (varTags3.length > 0) {
            if(varTags4.length > 0) {
                varTags3.map(tag3 => {varTags4.map(tag4 => {
                    variantList.push({
                        var3: tag3,
                        var4: tag4,
                        price: price,
                        sale_price: sale_price,
                        inventory_qty: inventory_qty,
                        sku: sku,

                    });
                })});
            } else {
                varTags3.map(tag3 => {
                    variantList.push({
                        var3: tag3,
                        price: price,
                        sale_price: sale_price,
                        inventory_qty: inventory_qty,
                        sku: sku,
                    });
                });
            }
        } else if (varTags4.length > 0) {
            varTags4.map(tag4 => {
                variantList.push({
                    var4: tag4,
                    price: price,
                    sale_price: sale_price,
                    inventory_qty: inventory_qty,
                    sku: sku,

                });
            });
        }

        console.log(variantList);
        setVarInfo(variantList);
        console.log(varInfo);
    }

    let display;

    if(varInfo.length > 0) {
        display = varInfo.map((variant, index) => {
            let variantList;

            if(variant.var1) {
                if(variant.var2) {
                    if(variant.var3) {
                        if(variant.var4) {
                            variantList = (
                                <Fragment>
                                    <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                        <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                        <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var2}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                        <p style={{margin:'0', fontSize:'14px', color:'green'}}>{variant.var3}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                        <p style={{margin:'0', fontSize:'14px', color:'#FF69B4'}}>{variant.var4}</p>
                                    </div>
                                </Fragment>
                            )
                        } else {
                            variantList = (
                                <Fragment>
                                    <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                        <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                        <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var2}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                        <p style={{margin:'0', fontSize:'14px', color:'green'}}>{variant.var3}</p>
                                    </div>
                                </Fragment>
                            );
                        }
                    } else if (variant.var4) {
                        variantList = (
                            <Fragment>
                                <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                    <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1} </p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var2}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'green'}}>{variant.var4}</p>
                                </div>
                            </Fragment>
                        );
                    } else {
                        variantList = (
                            <Fragment>
                                <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                    <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var2}</p>
                                </div>
                            </Fragment>
                        );
                    }
                } else if (variant.var3) {
                    if(variant.var4) {
                        variantList = (
                            <Fragment>
                                <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                    <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var3}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'#green'}}>{variant.var4}</p>
                                </div>
                            </Fragment>
                        );
                    } else {
                        variantList = (
                            <Fragment>
                                <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                    <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var3}</p>
                                </div>
                            </Fragment>
                        );
                    }
                } else if (variant.var4) {
                    variantList = (
                        <Fragment>
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var4}</p>
                            </div>
                        </Fragment>
                    );
                } else {
                    variantList = (
                        <Fragment>
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var1}</p>
                            </div>
                        </Fragment>
                    );
                }
            } else if (variant.var2) {
                if(variant.var3) {
                    if(variant.var4) {
                        variantList = (
                            <Fragment>
                                <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                    <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var2}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var3}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'green'}}>{variant.var4}</p>
                                </div>
                            </Fragment>
                        );
                    } else {
                        variantList = (
                            <Fragment>
                                <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                    <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var2}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                    <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var3}</p>
                                </div>
                            </Fragment>
                        );
                    }
                } else if (variant.var4) {
                    variantList = (
                        <Fragment>
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var2}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var4}</p>
                            </div>
                        </Fragment>
                    );
                } else {
                    variantList = (
                        <Fragment>
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var2}</p>
                            </div>
                        </Fragment>
                    );
                }
            } else if (variant.var3) {
                if(variant.var4) {
                    variantList = (
                        <Fragment>
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var3}</p> <i style={{ margin:'0 5px', fontSize:'3px'}} className="fas fa-circle"></i> 
                                <p style={{margin:'0', fontSize:'14px', color:'#ff8000'}}>{variant.var4}</p>
                            </div>      
                        </Fragment>
                    );
                } else {
                    variantList = (
                        <Fragment>
                            <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                                <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var3}</p>
                            </div>
                        </Fragment>
                    );
                }
            } else if (variant.var4) {
                variantList = (
                    <Fragment>
                        <div style={{display:'flex', alignItems:'center', color:'#808080', flexWrap:'wrap', maxWidth:'100%'}}>
                            <p style={{margin:'0', fontSize:'14px', color:'#0098d3'}}>{variant.var4}</p>;
                        </div>
                    </Fragment>
                );
            }
        
            return (
                <div className="variant-table-row" key={index}>
                    <div>{variantList}</div>
                    <div>
                        <input
                        type="text"
                        placeholder="price"
                        name="price"
                        value={variant.price}
                        onChange={e => onChangePrice(e, index)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="sale price"
                        name="sale_price"
                        value={variant.sale_price}
                        onChange={e => onChangeSalePrice(e, index)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="qty"
                        name="inventory_qty"
                        value={variant.inventory_qty}
                        onChange={e => onChangeQty(e, index)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                        />
                    </div>
                    <div>
                        <input
                        type="text"
                        placeholder="sku"
                        name="sku"
                        value={variant.sku}
                        onChange={e => onChangeSku(e, index)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                        />
                    </div>
                    <div><i className="fas fa-trash"></i></div>
                </div>
            )
        });
    } else {
        display = <h3>variants</h3>;
    }

    let pageHeader;

    if(headerShow === 'product') {
        pageHeader = <HeaderProduct onAddProduct={onAddProduct} />;
    } else if(headerShow === 'add item') {
        pageHeader = <HeaderProductForm onAddProduct={onAddProduct} /> 
    } else if(headerShow === 'collection') {
        pageHeader = <HeaderCollection onAddCollection={onAddCollection} /> 
    } else if(headerShow === 'add collection') {
        pageHeader = <HeaderCollectionForm onAddCollection={onAddCollection} /> 
    } else if(headerShow === 'location') {
        pageHeader = <HeaderLocation /> 
    } else if(headerShow === 'add location') {
        pageHeader = <HeaderLocationForm onSubmitLocation={onSubmitLocation} /> 
    } else if(headerShow === 'order') {
        pageHeader = <HeaderOrder /> 
    }

    let pageContent;

    if(tableShow1 === 'product detail') {
        if(detailProduct) {
            pageContent = (
                <DetailProduct 
                    setModal={setModal} 
                    setTable={setTable} 
                    setStoreLocationModal={toggleStoreLocationModal}
                    setImageModal={toggleImageModal} 
                    onChangeVarName={onChangeVarName}
                    varName={varName}
                    setVarName={setVarName}
                    onAddItemTag={onAddItemTag}
                    onDeleteItemTag={onDeleteItemTag}
                    itemTags={itemTags}
                    loadItemTags={loadItemTags}
                    onAddTag={onAddTag}
                    onDeleteTag={onDeleteTag}
                    onAddTag2={onAddTag2}
                    onDeleteTag2={onDeleteTag2}
                    onAddTag3={onAddTag3}
                    onDeleteTag3={onDeleteTag3}
                    onAddTag4={onAddTag4}
                    onDeleteTag4={onDeleteTag4}
                    setVarTags={setVarTags}
                    setVarTags2={setVarTags2}
                    setVarTags3={setVarTags3}
                    setVarTags4={setVarTags4}
                    varTags={varTags}
                    varTags2={varTags2}
                    varTags3={varTags3}
                    varTags4={varTags4}
                    removeVar={removeVar}
                    updateList={updateList}
                    varInfo={varInfo}
                    setVarInfo={setVarInfo}
                    display={display}
                    displayOption1={displayOption1}
                    displayOption2={displayOption2}
                    displayOption3={displayOption3}
                    displayOption4={displayOption4}
                    toggleOption1={toggleOption1}
                    toggleOption2={toggleOption2}
                    toggleOption3={toggleOption3}
                    toggleOption4={toggleOption4}
                    removeDisplayOption1={removeDisplayOption1}
                    removeDisplayOption2={removeDisplayOption2}
                    removeDisplayOption3={removeDisplayOption3}
                    removeDisplayOption4={removeDisplayOption4}
                    handleToggleOption={handleToggleOption}
                    formData={formData}
                    setFormData={setFormData}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                    conditionData={conditionData}
                    setConditionData={setConditionData}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    optionToggle={optionToggle}
                    setOptionToggle={setOptionToggle}
                    optionToggle2={optionToggle2}
                    setOptionToggle2={setOptionToggle2}
                    optionToggle3={optionToggle3}
                    setOptionToggle3={setOptionToggle3}
                    optionToggle4={optionToggle4}
                    setOptionToggle4={setOptionToggle4}
                    categoryToggle={categoryToggle}
                    setCategoryToggle={setCategoryToggle}
                    conditionToggle={conditionToggle}
                    setConditionToggle={setConditionToggle}
                    handleVarNameChange={handleVarNameChange}
                    handleCategoryChange={handleCategoryChange}
                    handleConditionChange={handleConditionChange}
                    switchChange={switchChange}
                    onChange={onChange}
                />
            );
        } else {
            pageContent = <Spinner />
        }
    } else if(tableShow1 === 'add item') {
        if(detailProduct) {
            pageContent = (
                <MainProductForm
                    setModal={setModal} 
                    setStoreLocationModal={toggleStoreLocationModal}
                    setImageModal={toggleImageModal} 
                    onChangeVarName={onChangeVarName}
                    varName={varName}
                    setVarName={setVarName}
                    onAddItemTag={onAddItemTag}
                    onDeleteItemTag={onDeleteItemTag}
                    itemTags={itemTags}
                    loadItemTags={loadItemTags}
                    onAddTag={onAddTag}
                    onDeleteTag={onDeleteTag}
                    onAddTag2={onAddTag2}
                    onDeleteTag2={onDeleteTag2}
                    onAddTag3={onAddTag3}
                    onDeleteTag3={onDeleteTag3}
                    onAddTag4={onAddTag4}
                    onDeleteTag4={onDeleteTag4}
                    setVarTags={setVarTags}
                    setVarTags2={setVarTags2}
                    setVarTags3={setVarTags3}
                    setVarTags4={setVarTags4}
                    varTags={varTags}
                    varTags2={varTags2}
                    varTags3={varTags3}
                    varTags4={varTags4}
                    removeVar={removeVar}
                    updateList={updateList}
                    varInfo={varInfo}
                    setVarInfo={setVarInfo}
                    onChangePrice={onChangePrice}
                    onChangeSalePrice={onChangeSalePrice}
                    onChangeSku={onChangeSku}
                    onChangeQty={onChangeQty}
                    display={display}
                    displayOption1={displayOption1}
                    displayOption2={displayOption2}
                    displayOption3={displayOption3}
                    displayOption4={displayOption4}
                    toggleOption1={toggleOption1}
                    toggleOption2={toggleOption2}
                    toggleOption3={toggleOption3}
                    toggleOption4={toggleOption4}
                    removeDisplayOption1={removeDisplayOption1}
                    removeDisplayOption2={removeDisplayOption2}
                    removeDisplayOption3={removeDisplayOption3}
                    removeDisplayOption4={removeDisplayOption4}
                    handleToggleOption={handleToggleOption}
                    formData={formData}
                    setFormData={setFormData}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                    conditionData={conditionData}
                    setConditionData={setConditionData}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    optionToggle={optionToggle}
                    setOptionToggle={setOptionToggle}
                    optionToggle2={optionToggle2}
                    setOptionToggle2={setOptionToggle2}
                    optionToggle3={optionToggle3}
                    setOptionToggle3={setOptionToggle3}
                    optionToggle4={optionToggle4}
                    setOptionToggle4={setOptionToggle4}
                    categoryToggle={categoryToggle}
                    setCategoryToggle={setCategoryToggle}
                    conditionToggle={conditionToggle}
                    setConditionToggle={setConditionToggle}
                    handleVarNameChange={handleVarNameChange}
                    handleCategoryChange={handleCategoryChange}
                    handleConditionChange={handleConditionChange}
                    switchChange={switchChange}
                    onChange={onChange}

                />
            );
        } else {
            pageContent = <Spinner />
        }
    } else if(tableShow1 === 'collection detail') {
        if(collection.collection && !loading) { //!storageLocation.loading 
            pageContent = (
                <DetailCollection 
                    setModal={handleStorageModal} 
                    onAddItemTag={onAddItemTag}
                    onDeleteItemTag={onDeleteItemTag}
                    itemTags={itemTags}
                    loadItemTags={loadItemTags}
                    varTags={varTags}
                    onAddTag={onAddTag}
                    onDeleteTag={onDeleteTag}
                    formData={formData}
                    setFormData={setFormData}
                    switchChange={switchChange}
                    onChange={onChange}
                />
            ); 
        } else {
            pageContent = <Spinner />
        }
    } else if(tableShow1 === 'add collection') {
        if(collection.collection) {
            pageContent = (
                <MainCollectionForm
                    setModal={handleStorageModal} 
                    onAddItemTag={onAddItemTag}
                    onDeleteItemTag={onDeleteItemTag}
                    itemTags={itemTags}
                    loadItemTags={loadItemTags}
                    onAddTag={onAddTag}
                    onDeleteTag={onDeleteTag}
                    formData={formData}
                    setFormData={setFormData}
                    switchChange={switchChange}
                    onChange={onChange}
                />
            );
        } else {
            pageContent = <Spinner />
        }
    } else if(tableShow1 === 'location detail') {
        if(storageLocation.detailLocation && !storageLocation.loading) {
            pageContent = (
                <DetailLocation 
                    setModal={handleVariantModal} 
                    setVarModal={handleAddToLocationModal} 
                    formData={formData}
                    setFormData={setFormData}
                    switchChange={switchChange}
                    onChange={onChange}
                    onAddItemTag={onAddItemTag}
                    onDeleteItemTag={onDeleteItemTag}
                    itemTags={itemTags}
                    loadItemTags={loadItemTags}
                />
            );
        } else {
            pageContent = <Spinner />
        }
    } else if(tableShow1 === 'add location') {
        if(storageLocation.detailLocation) {
            pageContent = (
                <MainLocationForm
                    setModal={handleVariantModal} 
                    setVarModal={handleAddToLocationModal} 
                    formData={formData}
                    setFormData={setFormData}
                    switchChange={switchChange}
                    onChange={onChange}
                    onAddItemTag={onAddItemTag}
                    onDeleteItemTag={onDeleteItemTag}
                    itemTags={itemTags}
                    loadItemTags={loadItemTags}
                    setModal={setVarModal} 
                    address={address}
                    setAddress={setAddress}
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    handleLocationSelect={handleLocationSelect}
                    getCity={getCity}
                    getArea={getArea}
                    getCountry={getCountry}
                    getPostalCode={getPostalCode}
                    getState={getState}
                    getNumber={getNumber}
                    getStreet={getStreet}
                />
            );
        } else {
            pageContent = <Spinner />
        }
    } else if(tableShow1 === 'order detail') {
        if(order.order && !order.loading) {
            pageContent = (
                <DetailOrder
                    setModal={handleStorageModal} 
                    setTable={setTable} 
                />
            ); 
        } else {
            pageContent = <Spinner />
        }
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

    const bg = {
        modal: {
            padding: "0",
            boxShadow: "none",
            background:"#f4f4f4",
            borderRadius: "15px"
        },
        closeButton: {
            display: "none"
        },
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    const bg2 = {
        modal: {
            boxShadow: "none",
            borderRadius: "15px",
            border: "1px solid rgb(214, 214, 214)",
            padding: "0"
        },
        closeButton: {
            display: "none"
        },
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    return (
        <div className="detail-container">
            <div className="store-table-header" style={{padding:'20px 20px 0 20px'}}>
                {pageHeader}
            </div>
            <div className="store-table-body" style={{padding:'10px'}}>
                <div id="product-content-wrapper">
                    {pageContent}
                </div>
            </div>

            <Modal open={displayImageModal} onClose={toggleImageModal} center styles={bg}>
                <input
                    type="file"
                    name="file"
                    id="file"
                    hidden 
                    multiple
                />
                <div onClick={fileUploadButton} className="imgUploadContainer">
                    <DragAndDrop handleDrop={handleDrop}>
                    <div style={{display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                        <div style={{height:'50px', margin:'1rem 0'}}>
                            <i style={{fontSize:'2em', color:'#808080'}} className="fas fa-arrow-circle-up"></i>
                        </div>
                        <div style={{width:'80%'}}>
                            {/* {files.length > 0 ? (
                                <div style={{minHeight: 300, width: 250}}>
                                    {files.map((file, i) => (
                                        <Fragment key={i}>
                                        <div>{file.name}</div>
                                        <br/>
                                        </Fragment>
                                    )
                                    )}
                                </div>
                                ) : <p style={{color:'#808080', margin:'0'}}>Drag and drop or click to upload.</p>
                            } */}
                            <p style={{color:'#808080', margin:'0'}}>Drag and drop or click to upload.</p>
                        </div>
                    </div>
                    </DragAndDrop>
                    {/* <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                        <button onClick={onSubmitImage}>Add</button>
                    </div> */}
                </div>
            </Modal>
            
            <Modal open={displayStoreLocationModal} onClose={toggleStoreLocationModal} center styles={bg}>
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
            
            <Modal open={displayLocationModal} onClose={toggleLocationModal} center styles={bg}>
                <h5>Choose A Locations</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="name1" />
                            </th>
                            <th>Details</th>
                            <th><i className="fas fa-map-marker-alt"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <div style={{display:'flex', flexDirection:'column', width:'100%', padding:'1rem', border:'2px solid #f4f4f4'}}>
                                <h5>6100 Glenhollow dr.</h5>
                                <p style={{color:'#808080'}}><i className="fas fa-map-marker-alt"></i>Plano, Tx</p>
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

            <Modal open={displayStorageModal} onClose={toggleStorageModal} center styles={bg2}>
                <div className="itemUploadContainer">
                    <div style={{width:'100%', minHeight:'40px', display:'flex', justifyContent:'center', alignItems:'center', height:'40px'}}>
                        <p style={{margin:'0', color:'#0098d3'}}>Add To Collection</p>
                    </div>
                    <div style={{minHeight:'50px', height:'auto', display:'flex', flexDirection:'column', width:'100%', alignItems:'center'}}>
                        <InputTag
                            onAddTag ={onAddTag}
                            onDeleteTag = {onDeleteTag}
                            defaultTags={varTags}  
                            placeholder="Search products (seperate by comma)"
                        />
                        {/* <button onClick={onSubmitStorage}>Add</button> */}
                    </div>
                    
                    <div style={{width:'100%', maxHeight:'400px', overflow:'scroll'}}>
                        <ShortTable handleClick={handleItemClick} itemList={itemList} />
                    </div>
                </div>
                <div style={{width:'100%', height:'75px', display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1px solid rgb(214, 214, 214)'}}>
                    <button onClick={onSubmitStorage} style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Add Items (0)</button>
                </div>
            </Modal>

            <Modal open={displayAddToLocationModal} onClose={toggleAddToLocationModal} center styles={bg2}>
                <div className="itemUploadContainer">
                    <div style={{width:'100%', minHeight:'40px', display:'flex', justifyContent:'center', alignItems:'center', height:'40px'}}>
                        <p style={{margin:'0', color:'#0098d3'}}>Add To Location</p>
                    </div>
                    <div className="modal-table-list-transition">
                        {/** Transition 1 */}
                        <div  
                            className={!modalForm1 ? "modal-table-top-container active" : "modal-table-top-container"} id="transition-1"
                        >
                            <InputTag
                                onAddTag ={onAddTag}
                                onDeleteTag = {onDeleteTag}
                                defaultTags={varTags}  
                                placeholder="Search products (seperate by comma)"
                            />
                        </div>
                        <div  
                            className={modalForm1 ? "modal-table-top-container active" : "modal-table-top-container"} id="transition-2"
                        >
                            <div onClick={() => setModalForm1(false)} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'0 10px', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                                <i className="fas fa-long-arrow-alt-left"></i>
                                <p style={{margin:'0 10px'}}>  Back</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="modal-table-list-transition" style={{maxHeight:'400px', overflowY:'scroll'}}>
                        {/** Transition 1 */}
                        <div className={!modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-1">
                            <ShortTable 
                                handleClick={handleItemClick} 
                                setVarModal={setVarModal} 
                                itemList={itemList} 
                                setModalForm1={setModalForm1} 
                                modalForm1={modalForm1} 
                                slide 
                            />
                        </div>
                        <div className={modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-2">
                            <ShortVarTable 
                                handleClick={handleItemClick} 
                                itemList={itemList} 
                                onChange={onChange}
                                page="add location"
                            />
                            {/* <VarLocationTable setModalForm1={setModalForm1} modalForm1={modalForm1} slide /> */}
                        </div>
                    </div>
                </div>
                <div style={{width:'100%', height:'75px', display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1px solid rgb(214, 214, 214)'}}>
                    <button onClick={onSubmitStorage} style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Add Items (0)</button>
                </div>
            </Modal>

            <Modal open={displayVariantModal} onClose={toggleVariantModal} center styles={bg}>
                <div style={{display:'flex'}}>
                    <InputTag
                        onAddTag ={onAddTag}
                        onDeleteTag = {onDeleteTag}
                        defaultTags={varTags}  
                        placeholder="enter tags separated by comma"
                    />
                    <button onClick={onAddVariant}>Add</button>
                </div>
                
               <ShortVarTable handleClick={handleItemClick} itemList={itemList} />
            </Modal>

            <Modal open={displayModal} onClose={setModal} center styles={bg2}>
                <div className="itemUploadContainer">
                    <div style={{width:'100%', minHeight:'40px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'40px'}}>
                        <p style={{margin:'0', color:'#0098d3'}}>Add Variant</p>
                    </div>
                    <div className="modal-table-list-transition">
                        {/** Transition 1 */}
                        <div
                            style={{maxHeight:'470px'}}  
                            className={!modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-1"
                        >
                            <div style={{display:'grid', width:'100%', gridTemplateColumns:'1fr 2fr'}}>
                                <div><p>Option</p></div>
                                <div><p>Values</p></div>
                            </div>
                            {displayOption1 ? (
                                <div style={displayOption2 || displayOption3 || displayOption4 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                    <div>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                            <div className={optionToggle ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle(!optionToggle)}>
                                                    {varName.var1 === '' ? (
                                                        <p>Pick an option</p>
                                                    ) : (
                                                        <p>{varName.var1}</p>
                                                    )}
                                                    <i className="fas fa-caret-down"></i>
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
                                                className="fas fa-minus"
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
                                                <div className={optionToggle2 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle2(!optionToggle2)}>
                                                        {varName.var2 === '' ? (
                                                            <p>Pick an option</p>
                                                        ) : (
                                                            <p>{varName.var2}</p>
                                                        )}
                                                        <i className="fas fa-caret-down"></i>
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
                                                    className="fas fa-minus"
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
                                                <div className={optionToggle3 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle3(!optionToggle3)}>
                                                        {varName.var3 === '' ? (
                                                            <p>Pick an option</p>
                                                        ) : (
                                                            <p>{varName.var3}</p>
                                                        )}
                                                        <i className="fas fa-caret-down"></i>
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
                                                    className="fas fa-minus"
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
                                                <div className={optionToggle4 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle4(!optionToggle4)}>
                                                        {varName.var4 === '' ? (
                                                            <p>Pick an option</p>
                                                        ) : (
                                                            <p>{varName.var4}</p>
                                                        )}
                                                        <i className="fas fa-caret-down"></i>
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
                                                    className="fas fa-minus"
                                                ></i>
                                            </div>
                                        ) : null}
                                    </div>
                                </Fragment>
                            ) : null}
                            {/* <button style={{background:'#e7e7e7', borderColor:'#e7e7e7', letterSpacing:'1px', color:'#808080'}} onClick={handleToggleOption}><i className="fas fa-plus"></i> Option</button> */}

                            <div onClick={handleToggleOption} style={{width:'100%', background:'#e7e7e7', letterSpacing:'1px', color:'#808080'}} className="btn btn-primary my-3"><i className="fas fa-plus"></i> Option</div>
                        </div>

                        <div style={{maxHeight:'470px'}} className={modalForm1 ? "modal-table-list-container active" : "modal-table-list-container"} id="transition-2">
                            <div onClick={() => setModalForm1(false)} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'0 10px', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                                <i className="fas fa-long-arrow-alt-left"></i>
                                <p style={{margin:'0 10px'}}>  Back</p>
                            </div>
                            {varInfo.length > 0 && (
                                <div className="table-responsive table-filter">
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
                <div style={{width:'100%', height:'75px', display:'flex', justifyContent:'center', alignItems:'center', borderTop:'1px solid rgb(214, 214, 214)'}}>
                    <div className="modal-table-list-transition">
                        {/** Transition 1 */}
                        <div  
                            style={{width:'100%', display:'flex', justifyContent:'center'}}
                            className={!modalForm1 ? " active" : ""} id="transition-1"
                        >
                            <button onClick={updateVarTodo} style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Apply Options</button>
                            {/* <button onClick={onSubmit} style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Add Items (0)</button> */}
                        </div>
                        {/** Transition 2 */}
                        <div  
                            style={{width:'100%', display:'flex', justifyContent:'center'}}
                            className={modalForm1 ? " active" : ""} id="transition-2"
                        >
                            <button onClick={(e) => handleVarCreate(e)} style={{width:'100%', background:'#0098d3', borderColor:'#0098d3'}}>Add Variants</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

ProductPage.propTypes = {
    setPage: PropTypes.func.isRequired,
    addVariant: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    setDetailProduct: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    nav: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    deleteVariant: PropTypes.func.isRequired,
    setMainNav: PropTypes.func.isRequired,
    getStoreById: PropTypes.func.isRequired,
    getOrderById: PropTypes.func.isRequired,
    setSortedProducts: PropTypes.func.isRequired,
    getProductsByStoreId: PropTypes.func.isRequired,
    addCollectionItem: PropTypes.func.isRequired,
    addProductToLocation: PropTypes.func.isRequired,
    getCollectionById: PropTypes.func.isRequired,
    storageLocation: PropTypes.object.isRequired,
    getLocationById: PropTypes.func.isRequired,
    getProductLocations: PropTypes.func.isRequired,
    getCollectionLocations: PropTypes.func.isRequired,
    getProductVariants: PropTypes.func.isRequired,
    setLocations: PropTypes.func.isRequired,
    editLocation: PropTypes.func.isRequired,
    addLocation: PropTypes.func.isRequired,
    setModalProducts: PropTypes.func.isRequired,
    setModalVariants: PropTypes.func.isRequired,
    getProductsInCollection: PropTypes.func.isRequired,
    addProductImg: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant,
    store: state.store,
    collection: state.collection,
    storageLocation: state.location,
    order: state.order,
    nav: state.nav
})

export default connect(mapStateToProps, { 
    addVariant, 
    addProduct,
    editProduct, 
    handleDetail, 
    setDetailProduct,
    setMainNav,
    getStoreById, 
    getOrderById,
    deleteProduct, 
    deleteVariant, 
    addCollectionItem, 
    addCollection, 
    editCollection,
    addProductToLocation,
    setSortedProducts, 
    setModalProducts,
    setModalVariants,
    getProductsInCollection,
    getProductsByStoreId, 
    getCollectionById, 
    getLocationById,
    getProductLocations, 
    getCollectionLocations,
    getProductVariants,
    setLocations,
    editLocation,
    addLocation,
    addProductImg,
    setPage
})(withRouter(ProductPage));
