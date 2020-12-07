import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';
import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';

const Main_Stores = ({store, profile: { profile }}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    const [storesList, setStoresList] = useState([]);

    useEffect(() => {

        renderStoresList();

    }, [profile])

    const handleMixpanel = () => {
        mixpanel.track("View Profile Orders Page", {
        // "Entry Point": "Home Landing",
        });
    }

    const renderStoresList = async () => {
        setStoresList([]);
        try {
            if(profile.stores && profile.stores.length > 0) {
                profile.stores.map(async store => {
                    const res = await axios.get(`/api/stores/${store.store}`);

                    setStoresList(storesList => [...storesList, (
                        <Link to={`/admin/${res.data._id}`} className="admin-store-card">
                            <div>
                                <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <div>
                                            <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${res.data.img_name}`} />
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                            <p style={{margin:'0'}}>{res.data.name}</p>
                                            <p style={{margin:'0', color:'#808080'}}>Wholesaler</p>
                                        </div>
                                        
                                    </div>
                                    <div className="stores-box-option-numbers">
                                        <div style={{borderRight:'1px solid #e8e8e8'}}>
                                            <p style={{color:'#ff4b2b'}}>$0</p> 
                                            <p>Sales</p>
                                        </div>
                                        <div>
                                            <p style={{color:'#ff4b2b'}}>0</p> 
                                            <p>Items</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )])
                })
            }
        } catch(err) {
            console.log(err);
        }
    }


    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214,214,214)'}}>
                {!storesList.length > 0 ? <Spinner /> : storesList}
            </div>
        </Fragment>
    )
}

Main_Stores.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    favorite: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps, null)(Main_Stores);
