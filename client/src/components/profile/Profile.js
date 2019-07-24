import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import OrderList from '../admin/OrderList';
import { BackButton } from '../common/BackButton';

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack();
    }

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
                <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
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
