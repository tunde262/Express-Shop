import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProductLocations } from '../../actions/locationActions';

import pickUp from '../../utils/imgs/person_carry.png';
import Spinner from '../../components/common/Spinner';
import Map from '../../components/common/map/Map';

const Locations = ({
    variant, 
    getProductLocations,
    product: {
        detailProduct,
        loading,
        switchMaps
    },
    location
}) => {
    useEffect(() => {
        getProductLocations(detailProduct._id);
    }, []);

    let locationList;

    if(location.locations.length > 0) {
        locationList = location.locations.map((location, index) => (
            <div key={index} style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p style={{fontSize: '1.3rem', fontWeight:'500', margin: ' 0.3rem 0'}}>{location.name}</p>
                    <a style={{color:'#808080', marginBottom: '1rem'}}><i class="fas fa-map-marker-alt"></i> {location.address_components.city}, {location.address_components.state}</a>
                    <p style={{margin: '0'}}>
                        In Stock: 
                        <span style={{fontWeight:'bold', color:'#ff4b2b'}}> {location.qty}</span>
                    </p>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center', marginRight: '10px'}}>
                        <i class="fas fa-truck"></i> 
                        <p style={{margin: '0'}}>Deliver</p>
                    </div>
                    <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center'}}>
                        <img style={{width: '28px', marginBottom: '-3px'}} src={pickUp} />
                        <p style={{margin: '0'}}>Pick Up </p>
                    </div>
                </div>
            </div>
        ))
    }
    else {
        locationList = <h5>No Locations</h5>
    }

    return (
        <div style={{display: 'grid'}}>
            <div style={{width: '100%', height: '200px', background: '#cecece'}}>
                {location.locations.length > 0 && !switchMaps ? (
                    <Map 
                        defaultZoom="8"
                        centerLat={location.locations[0].location.coordinates[0]}
                        centerLng={location.locations[0].location.coordinates[1]}
                        markerLat={location.locations[0].location.coordinates[0]}
                        markerLng={location.locations[0].location.coordinates[1]}
                    />
                ) : null}
            </div>
            <div>
                {locationList}
                <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'center'}}>
                    <h5>Add Location<i style={{marginLeft:'1rem'}} class="far fa-plus-square"></i></h5>
                </div>
            </div>
        </div>
    )
}

Locations.propTypes = {
    getProductLocations: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    variant: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant,
    location: state.location
});

export default connect(mapStateToProps, { getProductLocations })(Locations);
