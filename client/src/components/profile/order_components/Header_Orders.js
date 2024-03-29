import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header_Orders = ({deleteAccount, store, auth: { user }, profile: {profile, loading }}) => {

    const [tableShow1, setTableShow1] = useState('completed');  

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div>
                <p>Account / Orders</p>
            </div>
            <div>
                <h3>Orders</h3>
            </div>
            <div>
                <ul class="profile-underline">
                    <div 
                        onClick={e => setTableShow1('completed')} className={tableShow1 === "completed" && "active"}
                    >
                        <li><p>Completed</p></li>
                    </div>
                    <div 
                        onClick={e => setTableShow1('in progress')} className={tableShow1 === "in progress" && "active"}
                    >
                        <li><p>In Progress</p></li>
                    </div>
                </ul>
            </div>
        </Fragment>
    )
}

Header_Orders.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Header_Orders);
