import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { getLocationsByStoreId } from '../../../../../actions/locationActions';

import Spinner from '../../../../common/Spinner';

const SideDrawerLocation = ({setSlideForm1, getLocationsByStoreId, storeId, location: { locations, loading }}) => {
    useEffect(() => {
        renderLocationList();
    }, [locations]);

    const [locationList, setLocationList] = useState([]);
    const [gotLocations, setGotLocations] = useState(false);

    const renderLocationList = async () => {
        setLocationList([]);
        try {
            if(locations.length > 0) {
                locations.map(async location => {
                    const res = await axios.get(`/api/products/location/${location._id}`);
                    console.log(res.data);
                    setLocationList(locationList => [...locationList, (
                        <Link style={{textDecoration:'none'}} to={{pathname:`/admin/location/${storeId}/${location._id}`,search: "?show=detail"}}>
                            <div key={location._id} style={{display:'flex', justifyContent:'space-between', height:'100px', width:'100%', padding:'10px', borderBottom:'1px solid #cecece'}}>
                                <div style={{display:'flex'}}>
                                    <div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <i style={{color:'#3CB371', margin:'0 10px', fontSize:'1.3rem'}} class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div style={{display:'flex', height:'100%', overflow:'hidden', width:'200px', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                                        <div className="line-clamp-1" style={{height:'20px', overflow:'hidden', width:'100%'}}>
                                            <h3 style={{color: '#333', fontWeight: '300', fontSize: '16px', color: 'rgb(51, 51, 51)'}}>{location.name}</h3>
                                        </div>
                                        <div className="line-clamp-1" style={{height:'20px', overflow:'hidden', width:'100%'}}>
                                            <p style={{margin:'0', color:'#808080'}}>{location.formatted_address}</p>
                                        </div>  
                                        <p style={{margin:'0', color:'#808080'}}><span style={{color:'#ff4b2b', fontSize:'14px'}}>5</span> Qty / <span style={{color:'#ff4b2b', fontSize:'14px'}}>0</span> Sold</p>
                                    </div>
                                </div>
                                <div style={{display:'flex', height:'100%', color:'#808080', paddingRight:'10px', justifyContent:'center', alignItems:'center'}}>
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </Link>
                    )])
                });
            } else {
                setLocationList([(
                    <button>New Location</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotLocations) {
        getLocationsByStoreId(storeId);
        setGotLocations(true);
    }

    console.log('LOCATION LIST DATA');
    console.log(locationList);
        

    return (
        <Fragment>
            <div onClick={() => setSlideForm1(false)} style={{display:'flex', color:'#808080', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                <i class="fas fa-long-arrow-alt-left"></i>
                <p style={{margin:'0 10px'}}>  Back to menu</p>
            </div>
            <div style={{overflowY:'scroll', borderTop:'1px solid #f2f2f2', marginTop:'10px', height:'80vh'}}>
                {!locationList.length > 0 ? <Spinner /> : locationList}
            </div>
        </Fragment>
    )
}

SideDrawerLocation.propTypes = {
    location: PropTypes.object.isRequired,
    getLocationsByStoreId: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    location: state.location,
})

export default connect(mapStateToProps, { getLocationsByStoreId})(SideDrawerLocation);

