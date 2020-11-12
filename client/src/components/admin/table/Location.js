import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLocationsByStoreId, deleteLocation } from '../../../actions/locationActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Location = ({ location: {loading, locations}, store, getLocationsByStoreId, deleteLocation }) => {
    const [locationList, setLocationList] = useState([]);
    const [gotLocations, setGotLocations] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        getLocationsByStoreId(store.store._id);

        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
      }, [])

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
        try {
            if(locations.length > 0) {
                locations.map(async location => {
                    setLocationList(locationList => [...locationList, (
                        <div className="secondary-table-row-mobile" key={location._id}>
                                <Fragment>
                                    <Link to={{pathname:`/admin/location/${store.store._id}/${location._id}`,search: "?show=detail"}}>
                                        <div>
                                            <div><i style={{color:'#3CB371', margin:'0 10px', fontSize:'1.1rem'}} class="fas fa-map-marker-alt"></i></div>
                                            <div>
                                                {location.name && (
                                                    <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>
                                                        {location.name}
                                                    </div>
                                                )}
                                                <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#808080'}}>{location.formatted_address}</div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to={{pathname:`/admin/location/${store.store._id}/${location._id}`,search: "?show=detail"}}>
                                        <div><p style={{margin:'0'}}>5</p></div>
                                    </Link>
                                    <Link to={{pathname:`/admin/location/${store.store._id}/${location._id}`,search: "?show=detail"}}>
                                        <div><p style={{margin:'0'}}>5</p></div>
                                    </Link>
                                </Fragment>
                        </div>

                    )])          
                });
            } else {
                setLocationList(locationList => [...locationList, (
                    <button>Add Location</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotLocations && !loading && locations.length > 0) {
        renderLocationList();
        setGotLocations(true);
    }

    return (
        <Fragment>
            {/* <section>
                <p style={{alignSelf: 'flex-end'}}>40 locations</p>
                <Link to="/admin/add-location" style={{background: '#42b499', color:'#fff'}} className="btn">Add Location</Link>
            </section> */}
            <table className="table">
                <div className="secondary-thead-mobile">
                    <div style={{padding:'0 1rem'}}><p>Nickname</p></div>
                    <div><p>Qty</p></div>
                    <div><p>Sold</p></div>
                </div>
                <div className="tbody">{!locationList.length > 0 ? <Spinner /> : locationList}</div>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <CollectionForm />
            </Modal> */}
        </Fragment>
    )
}

Location.propTypes = {
    location: PropTypes.object.isRequired,
    deleteLocation: PropTypes.func.isRequired,
    getLocationsByStoreId: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    location: state.location,
    store: state.store
})

export default connect(mapStateToProps, { getLocationsByStoreId, deleteLocation })(Location);
