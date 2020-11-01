import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getProductsByStoreId } from '../../../actions/productActions';
import { getStoreOrders } from '../../../actions/orderActions';
import { getVariantsByStoreId } from '../../../actions/variantActions';
import { getCollectionsByStoreId } from '../../../actions/collectionActions';
import { getCustomersByStoreId } from '../../../actions/customerActions';

import mixpanel from 'mixpanel-browser';

import Item from './Item';
import Order from './Order';
import Collection from './Collection';
import Location from './Location';
import Inventory from './Inventory.js';
import Customer from './Customer';
import Navbar from '../../Overview/categoryOverview/CategoryOverview';
import Spinner from '../../common/Spinner';

import './main.css';

const Table = ({ 
    product, 
    variant,
    order,
    collection,
    customer,
    store: { 
        store, 
        loading
    },
    inventoryNav, 
    setTable,
    page,
    getProductsByStoreId,
    getVariantsByStoreId,
    getStoreOrders,
    getCollectionsByStoreId
}) => {
    const [tableShow, setTableShow] = useState('');
    const [sentMixpanel, setSentMixpanel] = useState(false);

    useEffect(() => {
        getProductsByStoreId(store._id)
        getVariantsByStoreId(store._id);
        getStoreOrders(store._id);
        getCollectionsByStoreId(store._id);
        getCustomersByStoreId(store._id);
        
        // if (page === 'storage') {
        //     setTableShow(inventoryNav);
        // } else 
        if (page === 'orders') {
            setTableShow('orders');
        }
    }, []);

    const handleMixpanel = () => {
        let banner_value = false;

        if (store.banner_imgs.length > 0) {
            banner_value = true;
        }
        mixpanel.track("Store Admin Storage View", {
        // "Entry Point": "Home Landing",
        "# of Public Store Items": product.products.length,
        // "# of People Part of Store": "Home Landing",
        "Store Name": store.name,
        // "Store Category": "Home Landing",
        "Store ID": store._id,
        "Banner Value": banner_value,
        });
    }

    const handleMixpanelOrders = () => {
        let banner_value = false;

        if (store.banner_imgs.length > 0) {
            banner_value = true;
        }
        mixpanel.track("Store Admin Orders View", {
        // "Entry Point": "Home Landing",
        "# of Public Store Items": product.products.length,
        // "# of People Part of Store": "Home Landing",
        "Store Name": store.name,
        // "Store Category": "Home Landing",
        "Store ID": store._id,
        "Banner Value": banner_value,
        });
    }

    let tableContent;

    if(inventoryNav === 'orders') {
        if(!sentMixpanel && store !== null && !product.loading && product.products !== null) {
            handleMixpanelOrders();
            setSentMixpanel(true);
        }

        tableContent = <Order />;
    } else if (inventoryNav === 'products') {
        if(!sentMixpanel && store !== null && !product.loading && product.products !== null) {
            handleMixpanel();
            setSentMixpanel(true);
        }
        
        tableContent = (
            <Fragment>
                <Item page="dashboard" product={product} />
            </Fragment>
        ) 
    } else if (inventoryNav === 'collections') {
        console.log(collection);
        tableContent = <Collection collection={collection} /> 
    } else if (inventoryNav === 'locations') {
        tableContent = <Location /> 
    } else if (inventoryNav === 'inventory') {
        tableContent = (
            <Fragment>
                <Inventory page="dashboard" variant={variant} /> 
            </Fragment>
        );
    } else if (inventoryNav === 'customers') {
        tableContent = (
            <Fragment>
                {/* <section>
                    <p style={{alignSelf: 'flex-end'}}>33 Customers</p>
                    <Link to="/admin/add-customer"><button type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Customer</button></Link>
                </section> */}
                <Customer customer={customer} /> 
            </Fragment>
        );
    } else {
        tableContent = <Spinner />
    }

    const handleOrders = (show) => {
        setTableShow(show);
    }

    return (
        <Fragment>
            {/* main content */}
            <div id="page-content-wrapper">
                <div class="content-box container-fluid">
                    <div class="table-responsive table-filter">
                        {/* <Navbar products={product.products} handleOrders={handleOrders} page={page} background='#ff4b2b' /> */}
                        {tableContent}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Table.propTypes = {
    product: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    getProductsByStoreId: PropTypes.func.isRequired,
    getVariantsByStoreId: PropTypes.func.isRequired,
    getStoreOrders: PropTypes.func.isRequired,
    getCollectionsByStoreId: PropTypes.func.isRequired,
    getCustomersByStoreId: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant,
    order: state.order,
    collection: state.collection,
    collection: state.customer,
    store: state.store
})

export default connect(mapStateToProps, { getProducts, getProductsByStoreId, getVariantsByStoreId, getStoreOrders, getCollectionsByStoreId, getCustomersByStoreId })(Table);

