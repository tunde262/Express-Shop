import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Settings = ({store, auth: { user }, profile: {profile, loading }}) => {

    const [tableShow1, setTableShow1] = useState('edit');  

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <a style={{textDecoration:'none'}} href={store.store && `https://www.cardboardexpress.com/admin/${store.store._id}?show=store`}>
                <div style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                    <i class="fas fa-long-arrow-alt-left"></i>
                    <p style={{margin:'0 10px'}}>  Back to store</p>
                </div>
            </a>
            <div>
                <h3>Edit Store Profile</h3>
            </div>
            <div>
                <ul class="profile-underline">
                    <div 
                        onClick={e => setTableShow1('edit')} className={tableShow1 === "edit" && "active"}
                    >
                        <li><p>Store Profile</p></li>
                    </div>
                    <div 
                        onClick={e => setTableShow1('settings')} className={tableShow1 === "settings" && "active"}
                    >
                        <li><p>Store Profile</p></li>
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
