import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import PayMain from './Main_Pay';
import PayHeader from './Header_Pay';
import AuthModal from '../../modals/AuthModal';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';
import Modal from 'react-responsive-modal';

import { getStoreSubscriptions } from '../../../actions/storeActions';

import { addAddress } from '../../../actions/profileActions';

const Mobile_Pay = ({ product, auth: { user, isAuthenticated, loading }, history}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [displayAddressModal, toggleAddressModal] = useState(false);



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
                            <PayHeader />
                        </div>
                        <div className="profile-table-body">
                            <PayMain />
                        </div>
                    </div>
                </div>
            </div>
            {!loading && !isAuthenticated ? <AuthModal /> : null }
            <Modal open={displayAddressModal} onClose={handleAddressModal} center styles={bg}>
                <div style={{width:'300px'}}>
                    <h3>payments</h3>
                </div>
            </Modal>
        </Fragment>
    )
}

Mobile_Pay.propTypes = {
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getStoreSubscriptions: PropTypes.func.isRequired,
    addAddress: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    product: state.product,
    store: state.store
});

export default connect(mapStateToProps, {addAddress, getStoreSubscriptions})(withRouter(Mobile_Pay));
