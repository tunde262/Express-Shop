import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';

import gainLogo from '../../../utils/imgs/gainlogo.jpg';

const Subs_Element = ({
    profile,
    auth
}) => {
    const [active, setActive] = useState(false);

    const [subscriptionList, setSubscriptionList] = useState([]);

    useEffect(() => {
        renderSubscriptionList();
      }, [profile.subscriptions, auth.user])


    const renderSubscriptionList = () => {
        setSubscriptionList([]);
        try {
            if(profile.subscriptions.length > 0) {
                profile.subscriptions.map(storeObj => {
                    setSubscriptionList(subscriptionList => [...subscriptionList, (
                        <a href={`https://www.cardboardexpress.com/store/${storeObj._id}`}>
                            <div style={{display:'flex', alignItems:'center'}} className="store-table-nav-items secondary">
                                <img 
                                    alt="" 
                                    width="50" 
                                    height="50" 
                                    className="store-nav-img"
                                    src={`/api/stores/image/${storeObj.img_name}`} 
                                />
                                <h3 style={{fontWeight:'600'}}>
                                    {storeObj.name}
                                </h3>
                            </div>
                        </a>
                    )])       
                });
            } else {
                setSubscriptionList([(
                    <p style={{margin:'0'}}>No Subscriptions</p>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{zIndex:'20'}}>
            <div className="store-table-nav-items header-btn">
                <h3 style={{fontWeight:'600'}}>Subscriptions</h3>
            </div>
            <div className={active ? "table-nav-dropdown active" : "table-nav-dropdown short"}>
                {!subscriptionList.length > 0 ? <Spinner /> : subscriptionList}
            </div>
            <div onClick={() => setActive(!active)} style={{display:'flex', alignItems:'center', color:'#808080'}} className="store-table-nav-items action">
                {active ? (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-up"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show less</p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'0 10px'}} class="fas fa-chevron-down"></i>
                        <p style={{margin: '2px 0 0 0'}}>Show 4 more</p>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

Subs_Element.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, null)(Subs_Element);
