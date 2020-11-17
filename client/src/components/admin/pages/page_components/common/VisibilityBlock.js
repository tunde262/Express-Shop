import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const VisibilityBlock = ({
    product,
    collection,
    storageLocation,
    isMobile,
    formData,
    setFormData,
    switchChange,
    match
}) => {

    useEffect(() => {
        setVisibility();
    }, [product.detailProduct, collection.collection, storageLocation.detailLocation]);


    const {
        visible,
    } = formData;

    const setVisibility = () => {
        if(match.params.productId) {
            if (!product.loading && product.detailProduct) {
                setFormData({ ...formData, [visible]: product.detailProduct.visible });
            }
        }

        if(match.params.collectionId) {
            if (!collection.loading && collection.collection) {
                setFormData({ ...formData, [visible]: collection.collection.visible });
            }
        }

        if(match.params.locationId) {
            if (!storageLocation.loading && storageLocation.detailLocation) {
                setFormData({ ...formData, [visible]: storageLocation.detailLocation.visible });
            }
        }
    }

    
    return (
        <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
            <div class="product-privacy-box-title">
                <p style={{color:'#808080', margin:'0'}}>Visibility</p>
                <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                <div style={{display:'flex', justifyContent:'space-between', height:'50px', width:'100%', alignItems:'center'}}>
                    <p style={{color:'#3CB371', margin:'0'}}>Public</p>
                    <input 
                        class="toggle-button" 
                        type="checkbox" 
                        name="visible"
                        checked={visible}
                        onChange={switchChange}
                    />
                </div>
            </div>
        </div>
    )
}

VisibilityBlock.propTypes = {
    storageLocation: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    storageLocation: state.location,
    product: state.product,
    collection: state.collection
})

export default connect(mapStateToProps, null)(withRouter(VisibilityBlock));
