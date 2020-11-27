import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header_Stores = ({deleteAccount, store, auth: { user }, profile: {profile, loading }}) => {

    const [tableShow1, setTableShow1] = useState('stores');  

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div>
                <p>Account / My Stores</p>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                <h3>My Stores</h3>
                <button>
                    Subscribe
                    <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                </button>
            </div>
            <div>
                <ul class="profile-underline">
                    <div 
                        onClick={e => setTableShow1('stores')} className={tableShow1 === "stores" && "active"}
                    >
                        <li><p>My Stores <span style={{color:'#ff4b2b'}}>(9)</span></p></li>
                    </div>
                    <div 
                        onClick={e => setTableShow1('repeat')} className={tableShow1 === "repeat" && "active"}
                    >
                        <li><p>Orders</p></li>
                    </div>
                </ul>
            </div>
        </Fragment>
    )
}

Header_Stores.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_Stores);
