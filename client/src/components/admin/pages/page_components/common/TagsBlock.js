import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InputTag from '../../../../common/InputTag/InputTag';

const TagsBlock = ({
    product,
    collection,
    storageLocation,
    isMobile, 
    onAddItemTag, 
    onDeleteItemTag, 
    itemTags,
    loadItemTags,
    match
}) => {

    useEffect(() => {
        setTags();
    }, [product.detailProduct, collection.collection, storageLocation.detailLocation]);

    const setTags = () => {
        if(match.params.productId) {
            if (!product.loading && product.detailProduct) {
                loadItemTags(product.detailProduct.tags)
            }
        }

        if(match.params.collectionId) {
            if (!collection.loading && collection.collection) {
                loadItemTags(collection.collection.tags)
            }
        }

        if(match.params.locationId) {
            if (!storageLocation.loading && storageLocation.detailLocation) {
                loadItemTags(storageLocation.detailLocation.tags)
            }
        }
    }

    return (
        <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
            <div class="product-privacy-box-title">
                <p style={{color:'#808080', margin:'0'}}>Tags</p>
                <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                <InputTag  
                    onAddTag ={onAddItemTag}
                    onDeleteTag = {onDeleteItemTag}
                    defaultTags={itemTags}
                    placeholder="enter tags separated by comma"
                />
            </div>
            
        </div>
    )
}

TagsBlock.propTypes = {
    storageLocation: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    storageLocation: state.location,
    product: state.product,
    collection: state.collection
})

export default connect(mapStateToProps, null)(withRouter(TagsBlock));
