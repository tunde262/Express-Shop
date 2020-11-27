import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Collection = ({
    store, 
    onAddCollection, 
    auth: { user }, 
    profile: {profile, loading }
}) => { 
    
    const handleSave = (e) => {
        console.log('COLLECTION SAVE');
        onAddCollection(e);
    }

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <Link style={{textDecoration:'none'}} to={store.store && {pathname:`/admin/${store.store._id}`,search: "?show=inventory"}}>
                <div style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                    <i class="fas fa-long-arrow-alt-left"></i>
                    <p style={{margin:'0 10px'}}>  Back to store</p>
                </div>
            </Link>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <h3>New Collection</h3>
                <button onClick={(e) => handleSave(e)} style={{width:'300px'}}>
                    Save
                </button>
            </div>
        </Fragment>
    )
}

Header_Collection.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps, null)(Header_Collection);
