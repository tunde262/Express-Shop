import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { deleteStore } from '../../../../../actions/storeActions';

const Header_Settings = ({store, auth: { user }, profile: {profile, loading }}) => {

    const [tableShow1, setTableShow1] = useState('edit');  

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div>
                <p>Cera Ve / Edit Store</p>
            </div>
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
