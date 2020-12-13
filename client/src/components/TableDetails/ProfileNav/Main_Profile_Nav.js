import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import addBookmark from '../../common/add-bookmarks.svg';

const Main_Profile_Nav = ({setSlideForm1, slideForm1}) => {
    return (
        <Fragment>
            <div className="slide-btn" onClick={() => setSlideForm1(!slideForm1)}>
                <p style={{margin:'0', color:'#808080'}}><span style={{margin:'0 10px 0 0'}}><i className="fas fa-arrow-left"></i></span>Main menu</p>
            </div>
            <a style={{margin:'5px 0'}}  href='https://www.cardboardexpress.com/profile/stores'>
                <div className="store-table-nav-items main">
                    <h3 style={{fontWeight:'600'}}>
                    <span>
                        <img src={addBookmark} style={{width:'20px', marginRight:'1rem'}} alt="subscribe" />
                    </span>
                    My Stores
                    </h3>
                </div>
            </a>
            <a style={{margin:'5px 0'}} href='https://www.cardboardexpress.com/profile/orders'>
                <div className="store-table-nav-items main active">
                    <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'20px', marginRight:'10px'}} className="fas fa-box"></i></span>Orders</h3>
                </div>
            </a>
            {/* <div onClick={e => setTableShow1('payments')} className={tableShow1 === "payments" ? "profile-table-nav-items active" : "store-table-nav-items"}>
                <h3>Payments</h3>
                <p>Add payment methods</p>
            </div>  */}
            <a style={{margin:'5px 0'}} href='https://www.cardboardexpress.com/profile/addresses'>
                <div className="store-table-nav-items main">
                    <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-address-book"></i></span>Addresses</h3>
                </div>
            </a>
            
            <a style={{margin:'5px 0'}} href='https://www.cardboardexpress.com/profile/subscriptions'>
                <div className="store-table-nav-items main">
                    <h3 style={{fontWeight:'600'}}>
                    <span>
                        <img src={addBookmark} style={{width:'20px', marginRight:'1rem'}} alt="subscribe" />
                    </span>
                    Subscriptions
                    </h3>
                </div>
            </a>

            <a style={{margin:'5px 0'}} href='https://www.cardboardexpress.com/profile/settings'>
                <div className="store-table-nav-items main">
                    <h3 style={{fontWeight:'600'}}><span><i style={{fontSize:'22px', marginRight:'1rem'}} className="fas fa-layer-group"></i></span>Settings</h3>
                </div>
            </a>
        </Fragment>
    )
}

Main_Profile_Nav.propTypes = {

}

export default Main_Profile_Nav
