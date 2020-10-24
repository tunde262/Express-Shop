import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import SubscriptionsMain from './Main_Sub';
import SubscriptionsHeader from './Header_Sub';
import AuthModal from '../../modals/AuthModal';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';
import Modal from 'react-responsive-modal';

import { getStoreSubscriptions } from '../../../actions/storeActions';

const Mobile_Sub = ({ product, store, getStoreSubscriptions, auth: { user, isAuthenticated, loading }, history}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [displayAddressModal, toggleAddressModal] = useState(false);

    useEffect(() => {
        if(user) {
            getStoreSubscriptions(user._id);
        }
    }, [user]);

    // const handleMixpanel = () => {
    //     mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
    //     mixpanel.identify(user._id);
    //     mixpanel.track("View Profile Page", {
    //     // "Entry Point": "Home Landing",
    //     });
    // }

    const handleAddressModal = () => {
        toggleAddressModal(!displayAddressModal);
    }


    const bg = {
        overlay: {
          background: "rgba(255,255,255,0.5)"
        }
    };

    return (
        <Fragment>
            <div style={{textAlign:'center', marginTop:'1rem'}}>
                {/* <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3> */}
                <div className="mobile-profile-table">
                    <div className="profile-table-main">
                        <div className="profile-table-header">
                            <SubscriptionsHeader />
                        </div>
                        <div className="profile-table-body">
                            <SubscriptionsMain />
                        </div>
                    </div>
                </div>
            </div>
            {!loading && !isAuthenticated ? <AuthModal /> : null }
            <Modal open={displayAddressModal} onClose={handleAddressModal} center styles={bg}>
                <div style={{width:'300px'}}>
                    <h3>subscriptions</h3>
                </div>
            </Modal>
        </Fragment>
    )
}

Mobile_Sub.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getStoreSubscriptions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    store: state.store
});

export default connect(mapStateToProps, {getStoreSubscriptions})(withRouter(Mobile_Sub));
