import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, getStoreProducts, getStoreOrders } from '../../../actions/productActions';
import { getStoreVariants } from '../../../actions/variantActions';
import { getStoreCollections } from '../../../actions/collectionActions';

import Item from './Item';
import Order from './Order';
import Collection from './Collection';
import Location from './Location';
import Inventory from './Inventory.js';
import Customer from './Customer';
import Navbar from '../../Overview/categoryOverview/CategoryOverview';

import './main.css';

const Table = ({ 
    product, 
    variant,
    order,
    collection,
    getProducts,
    getStoreProducts,
    getStoreVariants,
    getStoreOrders,
    getStoreCollections
}) => {
    useEffect(() => {
        getStoreProducts();
        getStoreVariants();
        getStoreOrders();
        getStoreCollections();
    }, [getStoreProducts, getStoreVariants, getStoreOrders, getStoreCollections])

    const [tableShow, setTableShow] = useState('products');

    let tableContent;

    if(tableShow === 'orders') {
        tableContent = <Order order={order} />;
    } else if (tableShow === 'products') {
        tableContent = (
            <Fragment>
                <section>
                    <p style={{alignSelf: 'flex-end'}}>50 Items</p>
                    <Link to="/admin/add-product"><button type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Product</button></Link>
                </section>
                <Item product={product} />
            </Fragment>
        ) 
    } else if (tableShow === 'collections') {
        tableContent = <Collection collection={collection} /> 
    } else if (tableShow === 'storage locations') {
        tableContent = <Location /> 
    } else if (tableShow === 'inventory') {
        tableContent = (
            <Fragment>
                <section>
                    <p style={{alignSelf: 'flex-end'}}>50 Variants</p>
                    <Link to="/admin/add-variant"><button type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button></Link>
                </section>
                <Inventory variant={variant} /> 
            </Fragment>
        );
    } else if (tableShow === 'customers') {
        tableContent = <Customer /> 
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
                        <Navbar products={product.products} handleOrders={handleOrders} category='admin' background='#ff4b2b' />
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
    order: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
    getStoreProducts: PropTypes.func.isRequired,
    getStoreVariants: PropTypes.func.isRequired,
    getStoreOrders: PropTypes.func.isRequired,
    getStoreCollections: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant,
    order: state.product.orders,
    collection: state.collection
})

export default connect(mapStateToProps, { getProducts, getStoreProducts, getStoreVariants, getStoreOrders, getStoreCollections })(Table);

