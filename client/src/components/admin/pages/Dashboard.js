import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStoreById, deleteStore } from '../../../actions/storeActions';
import InventoryMain from '../../page_components/inventory/InventoryMain';
import InventoryHeader from '../../page_components/inventory/Header_Inventory';
import StoreMain from '../../page_components/store/StoreMain';
import StoreHeader from '../../page_components/store/StoreHeader';
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

const Dashboard = ({ getStoreById, store: { store, loading }, match }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => { 
        getStoreById(match.params.id);
        window.addEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const [tableShow1, setTableShow1] = useState('store');
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

    return (
        <Fragment>
            {/* Website Overview */}
            <div style={{marginTop: '5rem'}}></div>
            <div style={{textAlign:'center', marginTop:'1rem'}} class="container-fluid">
                {/* <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3> */}
                <div className="admin-table">
                    <div className={"admin-table-nav"}>
                        <a href="#">
                            <div>
                                <h3 style={{fontWeight:'600'}}>Hey, Tunde</h3>
                            </div>
                        </a>

                        <a href="#">
                            <div onClick={e => setTableShow1('store')} className={tableShow1 === "store" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3 style={{fontWeight:'600'}}>Store</h3>
                                    <p>Track, manage, & return</p>
                                </div>
                            </div>
                        </a>
                        {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                            <h3>Payments</h3>
                            <p>Add payment methods</p>
                        </div> */}
                        <a href="#">
                            <div onClick={e => setTableShow1('inventory')} className={tableShow1 === "inventory" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>Inventory</h3>
                                    <p>Add new address</p>
                                </div>
                            </div>
                        </a>
                        
                        <a href="#">
                            <div onClick={e => setTableShow1('orders')} className={tableShow1 === "orders" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>Orders</h3>
                                    <p>Store subcriptions & repeat purchases</p>
                                </div>
                            </div>
                        </a>
                        
                        <a href="#">
                            <div onClick={e => setTableShow1('people')} className={tableShow1 === "people" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>People</h3>
                                    <p>Password, name, etc.</p>
                                </div>
                            </div>
                        </a>
                        <a href="#">
                            <div onClick={e => setTableShow1('settings')} className={tableShow1 === "settings" ? "profile-table-nav-items active" : "profile-table-nav-items"}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                                    <h3>Store Settings</h3>
                                    <p>Password, name, etc.</p>
                                </div>
                            </div>
                        </a>
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
                                    <EditHeader />
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
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { getStoreById, deleteStore })(withRouter(Dashboard));
