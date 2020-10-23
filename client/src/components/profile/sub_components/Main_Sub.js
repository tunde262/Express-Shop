import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';

const Main_Sub = ({store}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);


    const handleMixpanel = () => {
        mixpanel.track("View Profile Orders Page", {
        // "Entry Point": "Home Landing",
        });
    }

    let storeList;

    if(store.stores && store.stores.length > 0) {
        storeList = store.stores.map(store => (
            <div style={
                {marginTop:'1rem', 
                width:'100%', 
                borderBottom:'1px solid #e8e8e8', 
                background:'#fff', 
                height:'100px',
                display:'flex', 
                alignItems:'center'
                }
            }>
                <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div>
                            <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`} />
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{margin:'0'}}>{store.name}</p>
                            <p style={{margin:'0', color:'#808080'}}>Wholesaler</p>
                        </div>
                        
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <button>View Details</button>
                    </div>
                </div>
            </div>
        ))
    }


    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div style={{background:'#fff', margin:'20px 0', border:'1px solid #e8e8e8'}}>
                {storeList}
            </div>
        </Fragment>
    )
}

Main_Sub.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Main_Sub);
