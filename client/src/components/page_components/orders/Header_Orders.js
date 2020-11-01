import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Settings = ({store, inventoryNav, setTable, auth: { user }, profile: {profile, loading }}) => { 

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
                <h3>Orders</h3>
                <button style={{width:'300px'}}>
                    Add Order
                </button>
            </div>
            <div>
                <ul class="admin-underline">
                    <div 
                        onClick={e => setTable('products')} className={inventoryNav === "products" && "active"}
                    >
                        <li><p>Items</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('collections')} className={inventoryNav === "collections" && "active"}
                    >
                        <li><p>Collections</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('locations')} className={inventoryNav === "locations" && "active"}
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
