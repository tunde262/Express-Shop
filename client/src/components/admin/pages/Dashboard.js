import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentStore, deleteStore } from '../../../actions/storeActions';
import StorageMain from '../../page_components/StorageMain';
import StoreMain from '../../page_components/store/StoreMain';
import StoreSettings from '../../page_components/store/StoreSettings';
import OrdersMain from '../../page_components/orders/OrdersMain';
import PeopleMain from '../../page_components/people/PeopleMain';

const Dashboard = ({ getCurrentStore, store: { store, loading } }) => {
    useEffect(() => { 
        getCurrentStore();
    }, []);

    const [tableShow1, setTableShow1] = useState('store');

    const setTable = (show) => {
        setTableShow1(show)
    }

    let dashboardContent;

    if(tableShow1 === 'store') {
        dashboardContent = <StoreMain admin="true" setTable={setTable} />;
    } else if(tableShow1 === 'settings') {
        dashboardContent = <StoreSettings setTable={setTable} /> 
    } else if (tableShow1 === 'storage') {
        dashboardContent = <StorageMain /> 
    } else if(tableShow1 === 'orders') {
        dashboardContent = <OrdersMain /> 
    } else if(tableShow1 === 'people') {
        dashboardContent = <PeopleMain /> 
    } 

    return (
        <Fragment>
            {/* Website Overview */}
            <div style={{marginTop: '5rem'}}></div>
            <div class="store-header container-fluid">
                <div id="breadcrumb">
                    <nav className="breadcrumb">
                        <ol>
                            <li><b>My Portfolio</b></li>
                        </ol>
                    </nav>
                </div>
                <div style={{display: 'flex'}}>
                    {store.img_name && <img style={{height: '35px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img_name}`} alt="img" />}
                    <h3 style={{color: "black"}}>{store.name}</h3>
                </div>
                <ul class="admin-underline">
                    <li onClick={e => setTableShow1('store')} className={tableShow1 === "store" ? "active" : "nav-underline-item"}><i className="fas fa-store"></i><p>Store</p></li>
                    <li onClick={e => setTableShow1('storage')} className={tableShow1 === "storage" ? "active" : "nav-underline-item"}><i className="fas fa-boxes"></i><p>Storage</p></li>
                    <li onClick={e => setTableShow1('orders')} className={tableShow1 === "orders" ? "active" : "nav-underline-item"}><i className="fas fa-truck"></i><p>Orders</p></li>
                    <li onClick={e => setTableShow1('people')} className={tableShow1 === "people" ? "active" : "nav-underline-item"}><i className="fas fa-users"></i><p>People</p></li>
                </ul>
            </div>
            {dashboardContent}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentStore: PropTypes.func.isRequired,
    deleteStore: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { getCurrentStore, deleteStore })(Dashboard);
