import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAdminNav } from '../../../actions/navActions';
import { getStoreById, deleteStore } from '../../../actions/storeActions';
import InventoryMain from '../../page_components/inventory/InventoryMain';
import InventoryHeader from '../../page_components/inventory/Header_Inventory';
import StoreMain from '../../page_components/store/StoreMain';
import StoreHeader from '../../page_components/store/StoreHeader';
import HeaderProductForm from '../../page_components/forms_inventory/productForm/Header_Product';
import MainCollectionForm from '../../page_components/forms_inventory/collectionForm/Form_Collection';
import HeaderCollectionForm from '../../page_components/forms_inventory/collectionForm/Header_Collection';
import HeaderLocationForm from '../../page_components/forms_inventory/locationForm/Header_Location';
import MainLocationForm from '../../page_components/forms_inventory/locationForm/Form_Location';
import MainProductForm from '../../page_components/forms_inventory/productForm/Form_Product';
import SettingsMain from '../../page_components/setting/Main_Settings';
import SettingsHeader from '../../page_components/setting/Header_Settings';
import EditHeader from './page_components/edit/Header_Edit';
import EditMain from './page_components/edit/Main_Edit';
import OrdersMain from '../../page_components/orders/OrdersMain';
import OrdersHeader from '../../page_components/orders/Header_Orders';
import PeopleMain from '../../page_components/people/PeopleMain';
import PeopleHeader from '../../page_components/people/Header_People';
import Banner from '../../common/Banner';
import DefaultBanner from '../../../utils/imgs/placeholderimg.jpg';

const Dashboard = ({ setAdminNav, getStoreById, store: { store, loading }, match, location }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [tableShow1, setTableShow1] = useState('store');

    useEffect(() => { 
        setAdminNav(true);
        getStoreById(match.params.id);

        console.log(location);
        console.log(new URLSearchParams(location.search).get('show'));
        

        if (location.search) {
            let query = new URLSearchParams(location.search).get('show')
            if(query === 'store') {
                setTableShow1('store');
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

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const setTable = (show) => {
        setTableShow1(show)
    }

    let storeContent;

    if(storeNav === 'shop') {
        storeContent = <StoreMain admin="true" setTable={setTable} />;
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

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    return (
        <Fragment>
            {/* Website Overview */}
            <div style={{marginTop: '55px'}}></div>
            <div style={{textAlign:'center', marginTop:'1rem'}}>
                {/* <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3> */}
                <div className="admin-table">
                    <div className={"admin-table-nav"}>
                        <Link to={`/admin/${match.params.id}`}>
                            <div>
                                <div style={{display:'flex', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                                    <p style={{margin:'0 10px', color:'#ff4b2b'}}><span><i class="fas fa-long-arrow-alt-left"></i></span>  Go Back</p>
                                </div>
                            </div>
                        </Link>

                        <Link to={{pathname:`/admin/${match.params.id}`,search: "?show=store"}}>
                            <div onClick={e => setTableShow1('store')} className={tableShow1 === "store" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3 style={{fontWeight:'600'}}>Store</h3>
                                    <p>Track, manage, & return</p>
                                </div>
                            </div>
                        </Link>
                        {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                            <h3>Payments</h3>
                            <p>Add payment methods</p>
                        </div> */}
                        <Link to={{pathname:`/admin/${match.params.id}`,search: "?show=inventory"}}>
                            <div onClick={e => setTableShow1('inventory')} className={tableShow1 === "inventory" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>Inventory</h3>
                                    <p>Add new address</p>
                                </div>
                            </div>
                        </Link>
                        
                        <Link to={{pathname:`/admin/${match.params.id}`,search: "?show=orders"}}>
                            <div onClick={e => setTableShow1('orders')} className={tableShow1 === "orders" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>Orders</h3>
                                    <p>Store subcriptions & repeat purchases</p>
                                </div>
                            </div>
                        </Link>
                        
                        <Link to={{pathname:`/admin/${match.params.id}`,search: "?show=people"}}>
                            <div onClick={e => setTableShow1('people')} className={tableShow1 === "people" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>People</h3>
                                    <p>Password, name, etc.</p>
                                </div>
                            </div>
                        </Link>
                        <Link to={{pathname:`/admin/${match.params.id}`,search: "?show=settings"}}>
                            <div onClick={e => setTableShow1('settings')} className={tableShow1 === "settings" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>Store Settings</h3>
                                    <p>Password, name, etc.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="admin-table-main desktop-column">
                        {tableShow1 === 'store' && (
                            <Fragment>
                                <div className="admin-table-header">
                                    <StoreHeader setTable={setTableShow1} />
                                </div>
                                <div className="admin-table-body">
                                    <div className="product-list-container">
                                        {store && storeContent}
                                    </div>
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'edit' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <EditHeader setTable={setTableShow1} />
                                </div>
                                <div className="admin-table-body">
                                    {store && <EditMain />}
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'inventory' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <InventoryHeader inventoryNav={inventoryNav}  setTable={setInventoryNav} />
                                </div>
                                <div className="admin-table-body">
                                    {store && <InventoryMain inventoryNav={inventoryNav}  setTable={setInventoryNav} />}
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'add_item' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <HeaderProductForm />
                                </div>
                                <div className="admin-table-body">
                                    <MainProductForm />
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'add_location' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <HeaderLocationForm />
                                </div>
                                <div className="admin-table-body">
                                    <MainLocationForm />
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'add_collection' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <HeaderCollectionForm />
                                </div>
                                <div className="admin-table-body">
                                    <MainCollectionForm />
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'orders' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <OrdersHeader ordersNav={ordersNav}  setTable={setOrdersNav} />
                                </div>
                                <div className="admin-table-body">
                                    {store && <OrdersMain ordersNav={ordersNav}  setTable={setOrdersNav} />}
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'people' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <PeopleHeader />
                                </div>
                                <div className="admin-table-body">
                                    {store && <PeopleMain />}
                                </div>
                            </Fragment>
                        )}
                        {tableShow1 === 'settings' && (
                            <Fragment>
                                <div className="admin-table-header" style={{background:'#fff'}}>
                                    <SettingsHeader settingsNav={settingsNav}  setTable={setSettingsNav} />
                                </div>
                                <div className="admin-table-body">
                                    {store && <SettingsMain settingsNav={settingsNav}  setTable={setSettingsNav} />}
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Dashboard.propTypes = {
    getStoreById: PropTypes.func.isRequired,
    deleteStore: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    setAdminNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { setAdminNav, getStoreById, deleteStore })(withRouter(Dashboard));
