import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header_Detail_Order = ({deleteAccount, store, auth: { user }, profile: {profile, loading }}) => {

    const [tableShow1, setTableShow1] = useState('completed');  

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div>
                <p>Account / Orders / #123456</p>
            </div>
            <div>
                <h3 style={{color:'green'}}>Arriving today by 9 PM</h3>
            </div>
            <div>
            </div>
        </Fragment>
    )
}

Header_Detail_Order.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_Detail_Order);
