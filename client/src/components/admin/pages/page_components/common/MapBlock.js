import React from 'react';
import PropTypes from 'prop-types';

import Map from '../../../../common/map/Map';

const MapBlock = props => {
    return (
        <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
            <div style={{margin:'0', width:'100%',border:'2px dashed #cecece',borderRadius: '10px'}}>
                <div style={{height:'250px', maxHeight:'250px', width:'100%'}}>
                    <Map 
                        defaultZoom="8"
                        centerLat="33.0300238"
                        centerLng="-96.83283879999999"
                        markerLat="33.0300238"
                        markerLng="-96.83283879999999"
                    />
                    {/* {!storageLocation.loading && storageLocation.locations.length > 0 && !product.switchMaps ? (
                        <Map storageLocation={storageLocation} />
                    ) : null} */}
                </div>
            </div>
        </div>
    )
}

MapBlock.propTypes = {

}

export default MapBlock
