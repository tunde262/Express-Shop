import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import OrderList from '../admin/OrderList';
import { BackButton } from '../common/BackButton';

const Orders = ({deleteAccount, auth: { user }, profile: {profile, loading }}) => {
    let orderList;

    if(user === null || loading) {
        orderList = <Spinner />;
    }
    else {
        orderList = <OrderList user={user._id} profile />
    }

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            {loading && profile === null ? <Spinner /> : (
                <Fragment>
                    {profile !== null ? (
                        <div id="profile-content-wrapper">

                            <div id="breadcrumb">
                                <div style={{marginTop: '7rem'}}></div>
                                <nav className="breadcrumb">
                                    <ol>
                                        <li><b>My Account</b></li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="profile-header container-fluid">
                                <h3 style={{color: "black"}}>Hey, {user.name}</h3>
                                <hr/>
                            </div>
                            <div class="store-main">
                                {orderList}
                            </div>
                        </div>
                    ) : (
                        <h3>Sorry, we can't seem to find an account for you :(</h3>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

Orders.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps)(Orders);
