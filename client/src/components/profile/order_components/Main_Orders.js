import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';

const Main_Orders = ({deleteAccount, setTableShow2, store, auth: { user, loading }}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);


    const handleMixpanel = () => {
        mixpanel.track("View Profile Orders Page", {
        // "Entry Point": "Home Landing",
        });
    }

    let orderList;

    if(user === null || loading) {
        orderList = <Spinner />;
    }
    else {
        if(!sentMixpanel) {
            handleMixpanel();
            setSentMixpanel(true);
        }

        orderList = <OrderList profile />
    }

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div onClick={() => setTableShow2('order detail')} className="filter-container profile">
                <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                <i class="fas fa-sliders-h"></i>
            </div>
            <div style={{background:'#fff', border:'1px solid #e8e8e8'}}>
                <BrandOverview title={`Recently purchased from`} stores={store.stores} />
            </div>

            <div className="profile-orders-header">
                <div style={{marginTop:'1rem', width:'100%', padding:'10px', display:'flex', justifyContent:'space-around'}}>
                    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}> 
                        <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>Date</h3>
                    </div>
                    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}> 
                        <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>Products</h3>
                    </div>
                    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'flex-end'}}> 
                        <h3 style={{color: '#333',fontWeight: '300',fontSize: '14px'}}>Order Total</h3>
                    </div>
                    <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}> 
                    </div>
                </div>

                {loading ? <Spinner /> : (
                    <Fragment>
                        {user !== null ? (
                            <div id="profile-content-wrapper">
                                <div class="store-main">
                                    {orderList}
                                </div>
                            </div>
                        ) : (
                            <h3>Sorry, we can't seem to find an account for you :(</h3>
                        )}
                    </Fragment>
                )}
            </div>
        </Fragment>
    )
}

Main_Orders.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Main_Orders);
