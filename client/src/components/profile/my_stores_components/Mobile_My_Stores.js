import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';
import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import MyStoresMain from './Main_Stores';
import MyStoresHeader from './Header_Stores';

import { getStoreSubscriptions } from '../../../actions/storeActions';
import { setMainNav, setPage } from '../../../actions/navActions';

const Mobile_My_Stores = ({ setMainNav, setPage }) => {

    useEffect(() => {
        setMainNav('store');
        setPage('profile');

    }, []);


    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div className="mobile-profile-table-container" style={{textAlign:'center'}}>
                {/* <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3> */}
                <div className="mobile-profile-table">
                    <div className="profile-table-main">
                        <div className="profile-table-header">
                            <MyStoresHeader />
                        </div>
                        <div className="profile-table-body">
                            <MyStoresMain />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Mobile_My_Stores.propTypes = {
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getStoreSubscriptions: PropTypes.func.isRequired,
    setMainNav: PropTypes.func.isRequired, 
    setPage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps, { 
    setMainNav, 
    setPage, 
    getStoreSubscriptions
})(withRouter(Mobile_My_Stores));
