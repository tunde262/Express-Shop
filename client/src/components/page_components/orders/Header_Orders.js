import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Settings = ({store, ordersNav, setTable, auth: { user }, profile: {profile, loading }}) => { 

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
                <button style={{width:'300px', background:'#0098d3', borderColor:'#0098d3'}}>
                    Add Order
                </button>
            </div>
            <div>
                <ul class="admin-underline">
                    <div 
                        onClick={e => setTable('all')} className={ordersNav === "all" && "active"}
                    >
                        <li><p>All</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('open')} className={ordersNav === "open" && "active"}
                    >
                        <li><p>Open</p></li>
                    </div>
                    <div 
                        onClick={e => setTable('closed')} className={ordersNav === "closed" && "active"}
                    >
                        <li><p>Closed</p></li>
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
