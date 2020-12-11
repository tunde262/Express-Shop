import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { setMainNav } from '../../../actions/navActions';
import { getStoreById, deleteStore } from '../../../actions/storeActions';
import { addProductByName } from '../../../actions/productActions';
import { addCollectionByName } from '../../../actions/collectionActions';
import { addLocation, editLocation } from '../../../actions/locationActions';

import InventoryMain from '../../page_components/inventory/InventoryMain';
import InventoryHeader from '../../page_components/inventory/Header_Inventory';

import StoreMain from '../../page_components/store/StoreMain';
import StoreHeader from '../../page_components/store/StoreHeader';

import HeaderProductForm from '../../page_components/forms_inventory/productForm/Header_Product';
import MainProductForm from '../../page_components/forms_inventory/productForm/Form_Product';

import HeaderLocationForm from '../../page_components/forms_inventory/locationForm/Header_Location';
import MainLocationForm from '../../page_components/forms_inventory/locationForm/Form_Location';


import SettingsMain from '../../page_components/setting/Main_Settings';
import SettingsHeader from '../../page_components/setting/Header_Settings';

import EditHeader from './page_components/edit/Header_Edit';
import EditMain from './page_components/edit/Main_Edit';

import OrdersMain from '../../page_components/orders/OrdersMain';
import OrdersHeader from '../../page_components/orders/Header_Orders';

import PeopleMain from '../../page_components/people/PeopleMain';
import PeopleHeader from '../../page_components/people/Header_People';

import AddressBlock from '../../page_components/forms_inventory/common/AddressBlock';
import Modal from 'react-responsive-modal';
import ButtonSpinner from '../../common/ButtonSpinner';
import Banner from '../../common/Banner';
import DefaultBanner from '../../../utils/imgs/placeholderimg.jpg';

const Dashboard = ({ 
    setMainNav, 
    getStoreById, 
    store: { store, loading }, 
    storageLocation,
    match, 
    location, 
    addProductByName, 
    addCollectionByName, 
    addLocation, 
    history 
}) => {
    // Calc isMobile by window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Main Dashboard Nav / Sidenav Display page
    const [tableShow1, setTableShow1] = useState('shop');

    // Show Add Item Modal
    const [displayItemModal, toggleItemModal] = useState(false);
    // Show Add Collection Modal
    const [displayCollectionModal, toggleCollectionModal] = useState(false);
    // Show Add Location Modal
    const [displayLocationModal, toggleLocationModal] = useState(false);

    // Button loader
    const [addItemLoading, setAddItemLoading] = useState(false);

    useEffect(() => { 
        setMainNav('admin');
        getStoreById(match.params.id);

        console.log(location);
        console.log(new URLSearchParams(location.search).get('show'));
        

        if (location.search) {
            let query = new URLSearchParams(location.search).get('show')
            if(query === 'store') {
                setTableShow1('shop');
            } else if (query === 'edit') {
                setTableShow1('edit');
            } else if (query === 'inventory') {
                setTableShow1('inventory');
            } else if (query === 'add_item') {
                setTableShow1('add_item');
            } else if (query === 'add_location') {
                setTableShow1('add_location');
            } else if (query === 'add_collection') {
                setTableShow1('add_collection');
            } else if (query === 'orders') {
                setTableShow1('orders');
            } else if (query === 'people') {
                setTableShow1('people');
            } else if (query === 'settings') {
                setTableShow1('settings');
            }
        }

        window.addEventListener('resize', () => handleWindowSizeChange());
    }, [location]);


    const [storeNav, setStoreNav] = useState('shop');
    const [inventoryNav, setInventoryNav] = useState('products');
    const [ordersNav, setOrdersNav] = useState('all');
    const [settingsNav, setSettingsNav] = useState('basic settings');

    const [formData, setFormData] = useState({
        name: '',
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
    });

    // Location Info  
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null, 
        lng: null
    });

    const todo = (e) => {
        onSubmit(e);
        setAddItemLoading(true);
    }

    const todo2 = (e) => {
        onSubmitCollection(e);
        setAddItemLoading(true);
    }

    const todo3 = (e) => {
        onSubmitLocation(e);
        setAddItemLoading(true);
    }

    const { 
        name,
        street_name,
        street_number,
        city,
        state,
        postalCode,
        country,
        area,
        placeId,
        stateProvince,
        formatted_address,
        tags,
        location_tags,
        phone,
        latLng 
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

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
            addLocation(newLocation, store._id, history);
        } else {
            editLocation(newLocation, storageLocation.detailLocation._id, store._id, history);
        }
    };

    const onSubmit = async e => {
        e.preventDefault();

        let data = new FormData();

        if(name !== '')data.append('name', name);
  
        addProductByName(data, store._id, history);
    }

    const onSubmitCollection = async e => {
        e.preventDefault();

        let data = new FormData();

        if(name !== '')data.append('name', name);
  
        addCollectionByName(data, store._id, history);
    }

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const setTable = (show) => {
        setTableShow1(show)
    }

    let storeContent;

    if(storeNav === 'shop') {
        storeContent = <StoreMain admin="true" tableShow1={tableShow1} setTable={setTable} />;
    } else if(storeNav === 'edit') {
        storeContent = <EditMain setTable={setTable} /> 
    } else if (storeNav === 'inventory') {
        storeContent = <InventoryMain /> 
    } else if(storeNav === 'orders') {
        storeContent = <OrdersMain /> 
    } else if(storeNav === 'people') {
        storeContent = <PeopleMain /> 
    } 
    // else if(storeNav === 'settings') {
    //     storeContent = <StoreSettings setTable={setTable} /> 
    // }

    // } else if(inventoryNav === 'edit') {
    //     inventoryContent = <EditMain setTable={setTable} /> 
    // }  else if(inventoryNav === 'settings') {
    //     inventoryContent = <inventorySettings setTable={setTable} /> 
    // } else if (inventoryNav === 'inventory') {
    //     inventoryContent = <InventoryMain /> 
    // } else if(inventoryNav === 'orders') {
    //     inventoryContent = <OrdersMain /> 
    // } else if(inventoryNav === 'people') {
    //     inventoryContent = <PeopleMain /> 
    // } 

    const bg = {
        modal: {
            paddingLeft: "0",
            paddingRight: "0",
            border:"1px solid rgb(214,214,214)",
            boxShadow: "none"
        },
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    return (
        <div className="detail-container">
           {tableShow1 === 'shop' && (
                <Fragment>
                    <div className="store-table-header">
                        <StoreHeader tableShow1={tableShow1} setTable={setTableShow1} />
                    </div>
                    <div className="store-table-body">
                        <div className="product-list-container">
                            {store && storeContent}
                        </div>
                    </div>
                </Fragment>
            )}
            {tableShow1 === 'edit' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <EditHeader setTable={setTableShow1} />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        {store && <EditMain />}
                    </div>
                </Fragment>
            )}
            {tableShow1 === 'inventory' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <InventoryHeader 
                            inventoryNav={inventoryNav}  
                            setTable={setInventoryNav} 
                            setItemModal={toggleItemModal} 
                            setCollectionModal={toggleCollectionModal} 
                            setLocationModal={toggleLocationModal} />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        {store && <InventoryMain inventoryNav={inventoryNav}  setTable={setInventoryNav} />}
                    </div>
                </Fragment>
            )}
            {tableShow1 === 'add_item' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <HeaderProductForm />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        <MainProductForm />
                    </div>
                </Fragment>
            )}
            {tableShow1 === 'add_location' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <HeaderLocationForm />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        <MainLocationForm />
                    </div>
                </Fragment>
            )}
            {/* {tableShow1 === 'add_collection' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <HeaderCollectionForm />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        <MainCollectionForm />
                    </div>
                </Fragment>
            )} */}
            {tableShow1 === 'orders' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <OrdersHeader ordersNav={ordersNav}  setTable={setOrdersNav} />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        {store && <OrdersMain ordersNav={ordersNav}  setTable={setOrdersNav} />}
                    </div>
                </Fragment>
            )}
            {tableShow1 === 'people' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <PeopleHeader />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        {store && <PeopleMain />}
                    </div>
                </Fragment>
            )}
            {tableShow1 === 'settings' && (
                <Fragment>
                    <div className="store-table-header" style={{background:'#fff'}}>
                        <SettingsHeader settingsNav={settingsNav}  setTable={setSettingsNav} />
                    </div>
                    <div className="store-table-body" style={{padding:'0 10px'}}>
                        {store && <SettingsMain settingsNav={settingsNav}  setTable={setSettingsNav} />}
                    </div>
                </Fragment>
            )}

            <Modal open={displayItemModal} onClose={toggleItemModal} center styles={bg}>
                <div className="checkout-modal">
                    <div className="checkout-modal-main">
                        <div className="checkout-confirmed" style={{padding:'10px', textAlign:'center'}}>
                            <h3>
                                <span>
                                    <i style={{margin:'0 10px', fontSize:'1.3rem', color:'#0098d3'}} class="fas fa-tag"></i>
                                </span> 
                                Add Item
                            </h3>
                        </div>
                        <div className="checkout-deliv" style={{padding:'0 1rem', display:'flex', justifyContent:'center'}}>
                            <input
                                type="text"
                                name="name"
                                className="input_line"
                                placeholder="Enter item name . . ."
                                value={name}
                                onChange={e => onChange(e)}
                                style={{margin:'0', width:'80%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                    </div>
                    
                    <div style={{margin:'1rem auto 0', display:'flex', justifyContent:'center'}}>
                        <button onClick={(e) => todo(e)}>
                            {addItemLoading ? <ButtonSpinner /> : "Continue"}
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal open={displayCollectionModal} onClose={toggleCollectionModal} center styles={bg}>
                <div className="checkout-modal">
                    <div className="checkout-modal-main">
                        <div className="checkout-confirmed" style={{padding:'10px', textAlign:'center'}}>
                            <h3>
                                <span>
                                    <i style={{margin:'0 10px', fontSize:'1.3rem', color:'#0098d3'}} class="fas fa-layer-group"></i>
                                </span> 
                                New Collection
                            </h3>
                        </div>
                        <div className="checkout-deliv" style={{padding:'0 1rem', display:'flex', justifyContent:'center'}}>
                            <input
                                type="text"
                                name="name"
                                className="input_line"
                                placeholder="Enter a title . . ."
                                value={name}
                                onChange={e => onChange(e)}
                                style={{margin:'0', width:'80%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
                            />
                        </div>
                    </div>
                    
                    <div style={{margin:'1rem auto 0', display:'flex', justifyContent:'center'}}>
                        <button onClick={(e) => todo2(e)}>
                            {addItemLoading ? <ButtonSpinner /> : "Continue"}
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal open={displayLocationModal} onClose={toggleLocationModal} center styles={bg}>
                <div className="checkout-modal">
                    <div className="checkout-modal-main">
                        <div className="checkout-confirmed" style={{padding:'10px', textAlign:'center'}}>
                            <h3>
                                <span>
                                    <i style={{margin:'0 10px', fontSize:'1.3rem', color:'#0098d3'}} class="fas fa-map-marker-alt"></i>
                                </span> 
                                New Location
                            </h3>
                        </div>
                        <div className="checkout-deliv" style={{padding:'0 1rem', display:'flex', justifyContent:'center'}}>
                            <AddressBlock
                                address={address}
                                setAddress={setAddress}
                                handleLocationSelect={handleLocationSelect}
                            />
                        </div>
                    </div>
                    
                    <div style={{margin:'1rem auto 0', display:'flex', justifyContent:'center'}}>
                        <button onClick={(e) => todo3(e)}>
                            {addItemLoading ? <ButtonSpinner /> : "Continue"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

Dashboard.propTypes = {
    getStoreById: PropTypes.func.isRequired,
    deleteStore: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    setMainNav: PropTypes.func.isRequired,
    addProductByName: PropTypes.func.isRequired,
    addCollectionByName: PropTypes.func.isRequired,
    addLocation: PropTypes.func.isRequired,
    storageLocation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    storageLocation: state.location
})

export default connect(mapStateToProps, { setMainNav, getStoreById, deleteStore, addProductByName, addCollectionByName, addLocation })(withRouter(Dashboard));
