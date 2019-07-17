import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import OrderList from '../admin/OrderList';

class Profile extends Component {
    render() {
        const { loading } = this.props.auth;
        const { user } = this.props.auth;
        
        let orderList;

        if(user === null || loading) {
            orderList = <Spinner />;
        }
        else {
            orderList = <OrderList user={user._id} profile />
        }

        return (
            <div>
                {orderList}
            </div>
        )
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Profile);
