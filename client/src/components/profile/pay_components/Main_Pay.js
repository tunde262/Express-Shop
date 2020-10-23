import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';

const Main_Pay = ({deleteAccount, store, auth: { user }, profile: {profile, loading }}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);


    const handleMixpanel = () => {
        mixpanel.track("View Profile Orders Page", {
        // "Entry Point": "Home Landing",
        });
    }

    let orderList;

    if(user === null || loading) {
        orderList = <Spinner />;
    }
    else {
        if(!sentMixpanel) {
            handleMixpanel();
            setSentMixpanel(true);
        }

        orderList = <OrderList user={user._id} profile />
    }

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <h2>Payments here</h2>
        </Fragment>
    )
}

Main_Pay.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Main_Pay);
