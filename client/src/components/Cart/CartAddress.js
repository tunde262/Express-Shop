import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import AddressForm from './checkout/FormAddress';

const CartAddress = ({ profile, cartAddressId, setCartAddressId }) => {

    // Mixpanel
    const [addressState, setAddressState] = useState('main');

    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        renderAddressList();
    }, [profile.profile, addressState]);

    const handleCartAddress = (addressId) => {
        setCartAddressId(addressId);
        setAddressState('main');
    }

    const renderAddressList = () => {
        setAddressList([]);
        if(profile.profile) {
            if(addressState === 'main') {
                if(profile.profile.address_book.length > 0) {
                    const defaultAddress = profile.profile.address_book.filter(address => address._id === cartAddressId);

                    console.log('DEFAULT ADDRESS HERE')
                    console.log(defaultAddress);

                    if(defaultAddress[0]) {
                        setAddressList([(
                            <div style={{display:'flex', cursor:'pointer', justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{display:'flex', alignItems:'center'}}>
                                    {cartAddressId === defaultAddress[0]._id ? (
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'15px', width:'15px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                            <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                        </div>
                                    ) : ( 
                                        <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                    )}
                                    <div style={{display:'flex', lineHeight:'15px', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                                        {defaultAddress[0].address_name ? (<p style={{margin:'0'}}>{defaultAddress[0].address_name}</p>) : (<p style={{margin:'0'}}>{defaultAddress[0].first_name} {defaultAddress[0].last_name}</p>)}
                                        <p style={{margin:'0', textAlign:'left', fontFamily:'Arial, Helvetica,sans-serif', color:'#808080'}}>{defaultAddress[0].formatted_address}</p>
                                    </div>
                                </div>
                                <div>
                                    <p onClick={(e) => setAddressState('list')} style={{color:'rgb(47, 183, 236)', margin:'0'}}>Change</p>
                                </div>
                            </div>
                        )])
                    } else {
                        setAddressList(addressList => [...addressList, (
                            <div onClick={(e) => setAddressState('form')} style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                                <i class="fas fa-plus" style={{fontSize:'13px',color:'rgb(47, 183, 236)'}}></i>
                                <p style={{fontSize:'13px', fontWeight:'bold', color:'rgb(47, 183, 236)', letterSpacing:'2px', margin:'10px'}}>New Address</p>
                            </div>
                        )])
                    }
                } else {
                    setAddressList(addressList => [...addressList, (
                        <div onClick={(e) => setAddressState('form')} style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                            <i class="fas fa-plus" style={{fontSize:'13px',color:'rgb(47, 183, 236)'}}></i>
                            <p style={{fontSize:'13px', fontWeight:'bold', color:'rgb(47, 183, 236)', letterSpacing:'2px', margin:'10px'}}>New Address</p>
                        </div>
                    )])
                }
            } else if (addressState === 'list') {
                if(profile.profile.address_book && profile.profile.address_book.length > 0) {
                    profile.profile.address_book.map(address => {

                        setAddressList(addressList => [...addressList, (
                            <div onClick={() => handleCartAddress(address._id)} style={{cursor:'pointer'}}>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        {cartAddressId === address._id ? (
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'15px', width:'15px', border:'2px solid #ff4b2b', padding:'2px', borderRadius:'50%', marginRight:'10px'}}>
                                                <div style={{height:'100%', width:'100%', background:'#ff4b2b', borderRadius:'50%'}}></div>
                                            </div>
                                        ) : ( 
                                            <div style={{height:'14px', width:'14px', border:'2px solid #cecece', borderRadius:'50%', marginRight:'10px'}}></div>
                                        )}
                                        <div style={{display:'flex', lineHeight:'15px', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                                            {address.address_name ? (<p style={{margin:'0'}}>{address.address_name}</p>) : (<p style={{margin:'0'}}>{address.first_name} {address.last_name}</p>)}
                                            <p style={{margin:'0', textAlign:'left', fontFamily:'Arial, Helvetica,sans-serif', color:'#808080'}}>{address.formatted_address}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{color:'rgb(47, 183, 236)', margin:'0'}}>Edit</p>
                                    </div>
                                </div>
                                <hr style={{background:'rgb(214,214,214)', margin:'1rem 0', height:'1px'}} />
                            </div>
                        )])
                    })
                    
                    setAddressList(addressList => [...addressList, (
                        <div onClick={(e) => setAddressState('form')} style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                            <i class="fas fa-plus" style={{fontSize:'13px',color:'rgb(47, 183, 236)'}}></i>
                            <p style={{fontSize:'13px', fontWeight:'bold', color:'rgb(47, 183, 236)', letterSpacing:'2px', margin:'10px'}}>New Address</p>
                        </div>
                    )])
                } else {
                    setAddressList([(
                        <div onClick={(e) => setAddressState('form')} style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                            <i class="fas fa-plus" style={{fontSize:'13px',color:'rgb(47, 183, 236)'}}></i>
                            <p style={{fontSize:'13px', fontWeight:'bold', color:'rgb(47, 183, 236)', letterSpacing:'2px', margin:'10px'}}>New Address</p>
                        </div>
                    )])
                }
            } else if (addressState === 'form') {
                setAddressList([(
                    <AddressForm setCartAddressId={setCartAddressId} setAddressState={setAddressState} />
                )])
                
            }
        } else {
            setAddressList([(
                <div onClick={(e) => setAddressState('form')} style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                    <i class="fas fa-plus" style={{fontSize:'13px',color:'rgb(47, 183, 236)'}}></i>
                    <p style={{fontSize:'13px', fontWeight:'bold', color:'rgb(47, 183, 236)', letterSpacing:'2px', margin:'10px'}}>New Address</p>
                </div>
            )])
        }
    }

    return (
        <Fragment>
            {!addressList.length > 0 ? (
                <div onClick={(e) => setAddressState('form')} style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                    <i class="fas fa-plus" style={{fontSize:'13px',color:'rgb(47, 183, 236)'}}></i>
                    <p style={{fontSize:'13px', fontWeight:'bold', color:'rgb(47, 183, 236)', letterSpacing:'2px', margin:'10px'}}>New Address</p>
                </div>
            ) : addressList}
        </Fragment>
    )
}

CartAddress.propTypes = {

}

export default CartAddress
