import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Owners from './Owners';
import Team from './Team';
import Customers from './Customers';

import mixpanel from 'mixpanel-browser';

const PeopleMain = ({ store: { store }, product}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const handleMixpanel = () => {
        let banner_value = false;

        if (store.banner_imgs.length > 0) {
            banner_value = true;
        }
        mixpanel.track("Store Admin People View", {
        // "Entry Point": "Home Landing",
        // "# of Public Store Items": product.products.length,
        // "# of People Part of Store": "Home Landing",
        "Store Name": store.name,
        // "Store Category": "Home Landing",
        "Store ID": store._id,
        "Banner Value": banner_value,
        });
    }

    if(!sentMixpanel && store !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    return (
        <Fragment>
            <Owners />
            <Team />
            <Customers />
        </Fragment>
    )
}

PeopleMain.propTypes = {
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    product: state.product
})

export default connect(mapStateToProps)(PeopleMain);