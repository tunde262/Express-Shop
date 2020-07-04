import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../../actions/productActions';

import Item from './Item';
import Order from './Order';
import Collection from './Collection';
import Navbar from '../../Overview/categoryOverview/CategoryOverview';

import './main.css';

const Table = ({ product: {loading, products}, getProducts }) => {

    const [tableShow, setTableShow] = useState('products');

    let tableContent;

    if(tableShow === 'orders') {
        tableContent = <Order />;
    } else if (tableShow === 'products') {
        tableContent = <Item /> 
    } else if (tableShow === 'collections') {
        tableContent = <Collection /> 
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
                        <Navbar products={products} handleOrders={handleOrders} category='admin' background='#ff4b2b' />
                        {tableContent}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Table.propTypes = {
    product: PropTypes.object.isRequired,
    getProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { getProducts })(Table);

