import React, { Component } from 'react';

import OrderList from './OrderList';

class Admin extends Component {
    render() {
        return (
            <div>
                <OrderList admin />
            </div>
        )
    }
}

export default Admin;
