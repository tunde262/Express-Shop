import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Backdrop.css';

const Backdrop = ({click, nav}) => (
    <div className={nav.page !== 'business' ? "backdrop" : "backdrop transparent"} onClick={click} />
);

Backdrop.propTypes = {
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps, null)(Backdrop);

