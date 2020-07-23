import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentStore, deleteStore } from '../../../actions/storeActions';
import StorageMain from '../../page_components/StorageMain';
import StoreMain from '../../page_components/StoreMain';
import Spinner from '../../common/Spinner';

const Dashboard = ({ getCurrentStore, store: { store, loading } }) => {
    useEffect(() => { 
        getCurrentStore();
    }, []);

    const [tableShow1, setTableShow1] = useState('store');

    let dashboardContent;

    if(tableShow1 === 'store') {
        dashboardContent = <StoreMain />;
    } else if (tableShow1 === 'storage') {
        dashboardContent = <StorageMain /> 
    } else if(tableShow1 === 'orders') {
        // dashboardContent = <OrdersBox /> 
    } else if(tableShow1 === 'people') {
        // dashboardContent = <PeopleBox /> 
    } 
    return (
        <Fragment>
            {store ? <StorageMain /> : <Spinner/>}
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
