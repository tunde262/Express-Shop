import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Location = ({
    store, 
    auth: { user }, 
    profile: {profile, loading },
    onSubmitLocation
}) => { 

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <Link style={{textDecoration:'none'}} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=inventory`}>
                <div style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                    <i className="fas fa-long-arrow-alt-left"></i>
                    <p style={{margin:'0 10px'}}>  Back to store</p>
                </div>
            </Link>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <h3>New Location</h3>
                <button onClick={(e) => onSubmitLocation(e)} style={{width:'300px'}}>
                    Save
                </button>
            </div>
        </Fragment>
    )
}

Header_Location.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_Location);
