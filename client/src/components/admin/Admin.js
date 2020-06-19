import React, { Component } from 'react';

import OrderList from './OrderList';
import Table from './table/Table';

class Admin extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div class="col-md-12">
                        {/* Website Overview */}
                        <div class="panel panel-default">
                            <div class="panel-heading main-color-bg">
                                <h3 class="panel-title">Website Overview</h3>
                            </div>
                            <div class="panel-body">
                                <div class="col-md-3">
                                    <div class="well dash-box">
                                        <h2> 2</h2>
                                        <h4>Sold Today</h4>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="well dash-box">
                                        <h2> 34</h2>
                                        <h4>Sold Last 7 Days</h4>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="well dash-box">
                                        <h2> $0.00</h2>
                                        <h4>Sales Today</h4>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="well dash-box">
                                        <h2> $0.00</h2>
                                        <h4>Sales Last 7 Days</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Table />
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;
