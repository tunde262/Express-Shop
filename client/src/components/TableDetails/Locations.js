import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import pickUp from '../../utils/imgs/person_carry.png';
import Spinner from '../../components/common/Spinner';
import Map from '../../components/common/map/Map';

const Locations = ({
    variant, 
    product: {
        detailProduct,
        loading
    }
}) => {
    return (
        <div style={{display: 'grid'}}>
            <div style={{width: '100%', height: '200px', background: '#cecece'}}>
                <Map 
                    defaultZoom="8"
                    centerLat={detailProduct.locationId.location.coordinates[0]}
                    centerLng={detailProduct.locationId.location.coordinates[1]}
                    markerLat={detailProduct.locationId.location.coordinates[0]}
                    markerLng={detailProduct.locationId.location.coordinates[1]}
                />
            </div>
            <div>
                <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p style={{fontSize: '1.3rem', fontWeight:'500', margin: ' 0.3rem 0'}}>Stonebriar</p>
                        <a style={{color:'#808080', marginBottom: '1rem'}}><i class="fas fa-map-marker-alt"></i> Frisco, Tx</a>
                        <p style={{margin: '0'}}>
                            In Stock: 
                            <span style={{fontWeight:'bold', color:'#ff4b2b'}}> 5</span>
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
                <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p style={{fontSize: '1.3rem', fontWeight:'500', margin: ' 0.3rem 0'}}>Walmart</p>
                        <a style={{color:'#808080', marginBottom: '1rem'}}><i class="fas fa-map-marker-alt"></i> Plano, Tx</a>
                        <p style={{margin: '0'}}>
                            In Stock: 
                            <span style={{fontWeight:'bold', color:'#ff4b2b'}}> 5</span>
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
            </div>
        </div>
    )
}

Locations.propTypes = {

}

const mapStateToProps = state => ({
    product: state.product,
    variant: state.variant
});

export default connect(mapStateToProps, null)(Locations);
