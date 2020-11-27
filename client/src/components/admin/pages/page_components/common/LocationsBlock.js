import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import Spinner from '../../../../common/Spinner';


const LocationsBlock = ({ 
    storageLocation
}) => {
    const [locationList, setLocationList] = useState([]);
    const [gotLocations, setGotLocations] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
      }, [])


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    let orderList;

    if(storageLocation.loading) {
        orderList = <Spinner />;
    }
    else {
        if(storageLocation.locations.length > 0) {
            orderList = storageLocation.locations.map(location => (
                <div key={location._id} style={{borderBottom:'1px solid #f2f2f2', minHeight:'75px', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                        <div style={{display:'flex', height:'100%', overflow:'hidden', width:'200px', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                            <div className="line-clamp-1" style={{height:'20px', overflow:'hidden', width:'100%'}}>
                                <h3 style={{color: '#333', fontWeight: '300', fontSize: '16px', color: 'rgb(51, 51, 51)'}}>{location.name}</h3>
                            </div>
                            <div className="line-clamp-1" style={{height:'20px', overflow:'hidden', width:'100%'}}>
                                <small style={{margin:'0', color:'#808080'}}><span style={{color:'#ff4b2b', fontSize:'13px'}}>{location.qty}</span> Qty / <span style={{color:'#ff4b2b', fontSize:'13px'}}>0</span> Variants</small>
                                {/* <p style={{margin:'0', color:'#808080'}}>{location.formatted_address}</p> */}
                            </div>  
                            
                        </div>
                        {/* <small style={{color:'#ccc', margin:'0'}}>Auto</small> */}
                    </div>
                </div>
            ))
        }
        else {
            orderList = <button>Add Location</button>
        }
    }

    return (
        <Fragment>
            <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
                <div class="product-privacy-box-title">
                    <p style={{color:'#808080', margin:'0'}}>Locations</p>
                    <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                    {orderList}
                </div>
            </div>
        </Fragment>
    )
}

LocationsBlock.propTypes = {
    storageLocation: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    storageLocation: state.location
})

export default connect(mapStateToProps, null)(LocationsBlock);
