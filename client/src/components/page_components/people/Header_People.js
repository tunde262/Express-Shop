import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_People = ({store, auth: { user }, profile: {profile, loading }}) => { 

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div>
                <p><span style={{color:'#ff4b2b'}}>Cera Ve</span> / Inventory</p>
            </div>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <h3>People</h3>
                <button style={{width:'300px'}}>
                    Manual Invite
                </button>
            </div>
        </Fragment>
    )
}

Header_People.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_People);
