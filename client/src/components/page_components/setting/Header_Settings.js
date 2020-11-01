import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Settings = ({store, settingsNav, setTable, auth: { user }, profile: {profile, loading }}) => { 

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
                <h3>Store Settings</h3>
            </div>
            <div>
                <ul class="admin-underline">
                    <div 
                        onClick={e => setTable('basic settings')} className={settingsNav === "products" && "active"}
                    >
                        <li><p>Items</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('collections')} className={settingsNav === "collections" && "active"}
                    >
                        <li><p>Collections</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('locations')} className={settingsNav === "locations" && "active"}
                    >
                        <li><p>Locations</p></li>
                    </div>
                </ul>
            </div>
        </Fragment>
    )
}

Header_Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_Settings);
