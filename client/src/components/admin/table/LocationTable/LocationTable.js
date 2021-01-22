import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getLocationsByStoreId, deleteLocation } from '../../../../actions/locationActions';
import { editVarLocation } from '../../../../actions/variantActions';

import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';

import Location from './Location';


const LocationTable = ({ 
    location: {
        locations
    }, 
    variant: {
        loading,
        detailVariant
    },
    store, 
    product,
    page, 
    getLocationsByStoreId, 
    deleteLocation,
    onChange,
    setVarModal,
    editVarLocation
}) => {
    const [locationHeader, setLocationHeader] = useState(null);
    const [locationList, setLocationList] = useState([]);
    const [gotLocations, setGotLocations] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        renderLocationList();

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
      }, [locations, detailVariant])

    const [modalShow, setModal] = useState(false);
     
    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const renderLocationList = async () => {
        setLocationList([]);
        try {
            if(page === "variant"){
                if(detailVariant.locations.length > 0) {
                    setLocationHeader((
                        <div className="secondary-thead-mobile">
                            <div style={{padding:'0 1rem'}}><p>Nickname</p></div>
                            <div><p>Qty</p></div>
                            <div><p>Sold</p></div>
                        </div>
                    ))
                    detailVariant.locations.map(async location => {
                        if (location) {
                            const res = await axios.get(`/api/darkstores/${location.location}`);
                            setLocationList(locationList => [...locationList, (
                                <Location 
                                    store={store}
                                    varLocation={location} 
                                    detailVariant={detailVariant}
                                    detailLocation={res.data} 
                                    editVarLocation={editVarLocation}
                                    deleteLocation={deleteLocation} 
                                    onChange={onChange}
                                    page={page}
                                />
                            )])   
                        }       
                    });
                } else {
                    setLocationList([(
                        <div className="no-rides">
                            <h1>No Locations</h1>
                            <h2>Manage inventory better by adding storage locations. <a href="#">Learn More.</a></h2>
                        </div>
                    )])
                }
            } else {
                if(locations.length > 0) {
                    setLocationHeader((
                        <div className="secondary-thead-mobile">
                            <div style={{padding:'0 1rem'}}><p>Nickname</p></div>
                            <div><p>Qty</p></div>
                            <div><p>Sold</p></div>
                        </div>
                    ))
                    locations.map(async location => {
                        setLocationList(locationList => [...locationList, (
                            <Location 
                                store={store}
                                detailLocation={location} 
                                deleteLocation={deleteLocation} 
                                page={page}
                                setVarModal={setVarModal}
                                onChange={onChange}
                                product={product}
                            />
                        )])          
                    });
                } else {
                    setLocationList([(
                        <div className="no-rides">
                            <h1>No Locations</h1>
                            <h2>Manage inventory better by adding storage locations. <a href="#">Learn More.</a></h2>
                        </div>
                    )])
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotLocations && page === "dashboard") {
        getLocationsByStoreId(store.store._id);
        setGotLocations(true);
    }

    return (
        <Fragment>
            {/* <section>
                <p style={{alignSelf: 'flex-end'}}>40 locations</p>
                <Link to="/admin/add-location" style={{background: '#42b499', color:'#fff'}} className="btn">Add Location</Link>
            </section> */}
            <div className="table">
                {locationHeader}
                <div className="tbody">{!locationList.length > 0 ? <Spinner /> : locationList}</div>
            </div>
        </Fragment>
    )
}

LocationTable.propTypes = {
    location: PropTypes.object.isRequired,
    deleteLocation: PropTypes.func.isRequired,
    getLocationsByStoreId: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    editVarLocation: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    location: state.location,
    store: state.store,
    variant: state.variant,
    product: state.product
});

export default connect(mapStateToProps, { getLocationsByStoreId, deleteLocation, editVarLocation })(LocationTable);
