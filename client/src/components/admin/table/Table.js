import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const Table = ({product}) => {

    const [tableShow, setTableShow] = useState('items');

    let tableContent;

    // if(tableShow === 'orders') {
    //     tableContent = <Order />;
    // } else if (tableShow === 'items') {
    //     tableContent = <Item /> 
    // }

    return (
        <Fragment>
            <div className="thead">
                <nav>
                    <ul className="nav-links">
                    <li><h2><a onClick={e => setTableShow('items')}>Items</a></h2></li>
                        <li><h2><a onClick={e => setTableShow('orders')}>Orders</a></h2></li>
                    </ul>
                </nav>
            </div>
            <table className="table">
                <Item />
            </table>
        </Fragment>
    )
}

Table.propTypes = {

}

export default Table;

