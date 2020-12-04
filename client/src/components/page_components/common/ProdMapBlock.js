import React from 'react';
import PropTypes from 'prop-types';

import Map from '../../common/map/Map';

const ProductListBlock = ({storageLocation}) => {

    return (
        <div className="product-list-container" style={{height:'100vh', margin:'10px 10px 10px 0'}}>
            <div style={{height:'100%', width:'100%'}}>
                {storageLocation.locations.length > 0 && <Map storageLocation={storageLocation}/>}
                
            </div>
        </div>
    )
}

ProductListBlock.propTypes = {

}

export default ProductListBlock;