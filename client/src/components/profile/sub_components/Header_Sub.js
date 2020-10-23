import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header_Sub = ({deleteAccount, store, auth: { user }, profile: {profile, loading }}) => {

    const [tableShow1, setTableShow1] = useState('stores');  

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div>
                <p>Account / Subscriptions</p>
            </div>
            <div>
                <h3>Subscriptions</h3>
            </div>
            <div>
                <ul class="profile-underline">
                    <div 
                        onClick={e => setTableShow1('stores')} className={tableShow1 === "stores" && "active"}
                    >
                        <li><p>Stores <span style={{color:'#ff4b2b'}}>(9)</span></p></li>
                    </div>
                    <div 
                        onClick={e => setTableShow1('repeat')} className={tableShow1 === "repeat" && "active"}
                    >
                        <li><p>Products</p></li>
                    </div>
                </ul>
            </div>
        </Fragment>
    )
}

Header_Sub.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_Sub);
