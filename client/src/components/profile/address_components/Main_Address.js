import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Spinner from '../../common/Spinner';
import OrderList from '../../admin/OrderList';
import { BackButton } from '../../common/BackButton';
import BrandOverview from '../../Overview/brandOverview/BrandOverview';

const Main_Address = ({handleAddressModal, auth: { user }, profile: {profile, loading }}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        renderAddressList();

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [profile]);


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };


    const handleMixpanel = () => {
        mixpanel.track("View Profile Address Page", {
        // "Entry Point": "Home Landing",
        });
    }


    const renderAddressList = async () => {
        setAddressList([]);
        try {
            if(profile.address_book) {
                if(profile.address_book.length > 0) {
                    profile.address_book.map(address => {

                        setAddressList(addressList => [...addressList, (
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
                                {!isMobile ? (
                                    <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                                        {/* <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%'}}>
                                            <div style={{marginLeft:'2rem',display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                                <p style={{margin:'0'}}>Tunde's House<br/>
                                                    <span className="line-clamp-1" style={{height:'16px', margin:'0', overflow:'hidden', color:'#808080'}}>
                                                        6100 Glenhollow Dr, Plano, Texas, United States, 75093
                                                    </span>
                                                </p>
                                            </div>
                                        </div> */}
                                        <div style={{marginLeft:'4rem', display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%'}}>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                <div style={{margin:'0 10px', color:'#ff4b2b'}}>
                                                    <i class="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div style={{display:'flex', width:'100%', lineHeight:'15px', flexDirection:'column', alignItems:'flex-start'}}>
                                                    {address.address_name ? (<p style={{margin:'0'}}>{address.address_name}</p>) : (<p style={{margin:'0'}}>{address.first_name} {address.last_name}</p>)}
                                                    
                                                    <div style={{height:'16px', margin:'0', overflow:'hidden', color:'#808080', display:'flex', justifyContent:'flex-start'}}>
                                                        <p className="line-clamp-1" style={{margin:'0', textAlign:'left', fontSize:'12px', color:'#808080'}}>{address.formatted_address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            {address.active ? (
                                                <div style={{background:'#99ff99', justifyContent:'center', alignItems:'center', height:'30px', borderRadius:'30px', padding:'0 1rem'}}>
                                                    <p style={{margin:'5px 0', color:'green'}}>Default</p>
                                                </div>
                                            ) : (
                                                <div style={{background:'#e8e8e8', justifyContent:'center', alignItems:'center', height:'30px', borderRadius:'30px', padding:'0 1rem'}}>
                                                    <p style={{margin:'5px 0', color:'#808080'}}>Set To Default</p>
                                                </div>
                                            )}
                                        </div>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <p style={{color:'#808080', margin:'0'}} onClick={() => handleAddressModal(true)}>Edit</p>
                                            <p style={{color:'#808080', margin:'0 10px'}}>|</p>
                                            <p style={{color:'#ff4b2b', margin:'0'}}>Remove</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{display:'grid', width: '100%', gridGap:'4rem', gridTemplateColumns:'2fr 1fr'}}>
                                        <div style={{marginLeft:'2rem', display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%'}}>
                                            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                <div style={{margin:'0 10px', color:'#ff4b2b'}}>
                                                    <i class="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div style={{display:'flex', width:'100%', lineHeight:'15px', flexDirection:'column', alignItems:'flex-start'}}>
                                                    {address.address_name ? (<p style={{margin:'0'}}>{address.address_name}</p>) : (<p style={{margin:'0'}}>{address.first_name} {address.last_name}</p>)}
                                                    <div style={{height:'16px', margin:'0', overflow:'hidden', color:'#808080', display:'flex', justifyContent:'flex-start'}}>
                                                        <p className="line-clamp-1" style={{margin:'0', textAlign:'left', fontSize:'12px', color:'#808080'}}>{address.formatted_address}</p>
                                                    </div>
                                                    <div style={{display:'flex', marginTop:'10px', justifyContent:'center', alignItems:'center'}}>
                                                        <p style={{color:'#808080', fontSize:'14px', margin:'0'}} onClick={() => handleAddressModal(true)}>Edit</p>
                                                        <p style={{color:'#808080', fontSize:'14px', margin:'0 10px'}}>|</p>
                                                        <p style={{color:'#ff4b2b', fontSize:'14px', margin:'0'}}>Remove</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            {address.active ? (
                                                <div style={{background:'#99ff99', justifyContent:'center', alignItems:'center', height:'30px', borderRadius:'30px', padding:'0 1rem'}}>
                                                    <p style={{margin:'5px 0', color:'green'}}>Default</p>
                                                </div>
                                            ) : (
                                                <div style={{background:'#e8e8e8', justifyContent:'center', alignItems:'center', height:'30px', borderRadius:'30px', padding:'0 1rem'}}>
                                                    <p style={{margin:'5px 0', color:'#808080'}}>Set To Default</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )])
                    })
                } else {
                    setAddressList([(
                        <button>Add Address</button>
                    )])
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    // let orderList;

    // if(user === null || loading) {
    //     orderList = <Spinner />;
    // }
    // else {
    //     if(!sentMixpanel) {
    //         handleMixpanel();
    //         setSentMixpanel(true);
    //     }

    //     orderList = <OrderList user={user._id} profile />
    // }

    const isMobile = windowWidth <= 769;

    return (
        // <div>
        //     <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
        //     {orderList}
        // </div>
        <Fragment>
            <div className="filter-container profile" onClick={() => handleAddressModal(false)}>
                <span style={{fontSize:'13px', fontWeight:'bold', color:'#0098d3', letterSpacing:'2px', margin:'10px'}}>Add New</span>
                <i class="fas fa-plus" style={{fontSize:'13px',color:'#0098d3'}}></i>
            </div>
            <div style={{background:'#fff', margin:'0', borderTop:'1px solid #e8e8e8'}}>
                {!addressList.length > 0 ? <Spinner /> : addressList}
            </div>
        </Fragment>
    )
}

Main_Address.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    store: state.store
});

export default connect(mapStateToProps)(Main_Address);
