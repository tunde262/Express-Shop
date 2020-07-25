import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Owners from './Owners';
import Team from './Team';
import Customers from './Customers';

const PeopleMain = () => {


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
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(PeopleMain);