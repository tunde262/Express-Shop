import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import { getProductsInCollection } from '../../../../../actions/productActions';

import Map from '../../../../common/map/Map';
import Variant from '../../../table/VariantTable/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';
import ItemTable from '../../../table/ItemTable/ItemTable';
import Spinner from '../../../../common/Spinner';
import InputTag from '../../../../common/InputTag/InputTag';

import StatsBlock from '../common/StatsBlock';
import TagsBlock from '../common/TagsBlock';
import VisibilityBlock from '../common/VisibilityBlock';
import InventoryActivityBlock from '../common/InventoryActivityBlock';
import LocationsBlock from '../common/LocationsBlock';
import MapBlock from '../common/MapBlock';
import LocationVariantsBlock from '../common/LocationVariantsBlock'
import ItemsBlock from '../common/ItemsBlock';


const DetailCollection = ({ 
    getProductsInCollection, 
    collection: { collection, loading }, 
    product, 
    storageLocation,
    setModal,
    onAddItemTag,
    onDeleteItemTag,
    itemTags,
    loadItemTags,
    formData,
    setFormData,
    switchChange,
    onChange,
    match,
    deleteVariant,
    onAddTag,
    onDeleteTag,
    varTags,
}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [pageNav, setPageNav] = useState('detail');
    // TODO : map markers
    
    // let imageContent;
    
    // if(detailProduct && detailProduct.img_gallery && detailProduct.img_gallery.length > 0 ) {
    //     imageContent = detailProduct.img_gallery.map(image => (
    //         <div style={{margin:'10px'}}>
    //             <img style={{width: '100%'}} src={`/api/products/image/${image.img_name}`} alt="img" />
    //         </div>
    //     ))
    // } else {
    //     imageContent = <h4>No Photos</h4>;
    // }

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const {
        visible,
    } = formData;

    const handleMixpanel = () => {
        mixpanel.track("Admin Collection Page View", {
        //   "Entry Point": "Home Landing",
          "Collection Name": collection.name,
        //   "Location Zipcode": collection.address_components.postalcode,
          "Store Name": collection.store.name,
          "Item Count": collection.items.length,
          
        });
    }

    if(!sentMixpanel && collection) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    let inventoryContent;

    if(pageNav === 'inventory' && !loading) {
        if(!storageLocation.loading && storageLocation.locations.length > 0) {
            inventoryContent = storageLocation.locations.map(detailLocation => (
                <LocationVariantsBlock 
                    detailLocation={detailLocation}
                    setModal={setModal}
                    collectionId={match.params.collectionId}
                    deleteVariant={deleteVariant}
                    onAddTag={onAddTag}
                    onDeleteTag={onDeleteTag}
                    varTags={varTags}
                    onChange={onChange}
                />
            ))
        } else {
            inventoryContent = <p>No Locations</p>
        }
    } else {
        inventoryContent = <Spinner />
    }

    {/** Content Block Variables */}

    const secondaryCollectionInfo = ( 
        <Fragment>
            <VisibilityBlock
                isMobile={isMobile}
                switchChange={switchChange}
                formData={formData}
                setFormData={setFormData}
            />
            <TagsBlock
                isMobile={isMobile} 
                onAddItemTag={onAddItemTag}  
                onDeleteItemTag={onDeleteItemTag}  
                itemTags={itemTags} 
                loadItemTags={loadItemTags}
            />
        </Fragment>
    );

    const secondaryInventoryInfo = ( 
        <Fragment>
            <InventoryActivityBlock 
                isMobile={isMobile}
            />
            <LocationsBlock 
                isMobile={isMobile} 
            />
        </Fragment>
    );

    const mainCollectionInfo = ( 
        <Fragment>
            {isMobile ? (
                secondaryCollectionInfo
            ) : null}

            <ItemsBlock
                product={product} 
                setModal={setModal}
                page="detail" 
            />
        </Fragment>
    );

    const mainInventoryInfo = ( 
        <Fragment>
            <MapBlock />

            {isMobile ? (
                secondaryInventoryInfo
            ) : null}

            {inventoryContent}
        </Fragment>
    );

    {/** END Block Variables */}

    let mainContent;

    if(collection) {
        if(pageNav === 'detail') {
            mainContent = mainCollectionInfo;
        } else if (pageNav === 'inventory') {
            mainContent = mainInventoryInfo;
        }
    } else {
        mainContent = <Spinner />;
    }

    let secondaryContent;

    if(collection) {
        if(pageNav === 'detail') {
            secondaryContent = secondaryCollectionInfo;
        } else if (pageNav === 'inventory') {
            secondaryContent = secondaryInventoryInfo;
        }
    } else {
        secondaryContent = null;
    }


    return (
        <Fragment>
            {/* <div className="product-actions container-fluid">
                <div style={{display:'flex', justifyContent:'space-between', height:'50px', alignItems:'center'}}>
                    <p>Qty 20 in stock for 3 varients</p>
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <Link to={collection && `/collections/${collection._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i style={{margin:'0 1rem', fontSize:'1.4rem'}} class="fas fa-share-alt"></i>
                        <button onClick={e => setTable('edit collection')} style={{ margin:'0 1rem 0 0', background:'#f4f4f4', color:'#7A7A7A', borderColor:'#f4f4f4' }}>Edit</button>
                        <button onClick={e => setTable('storage request')} style={{ margin:'0 1rem 0 0' }}>Request Storage</button>
                    </div>
                    {' '}
                </div>
                <hr style={{margin:'0'}} />
            </div> */}
            <StatsBlock 
                setPageNav={setPageNav}
                pageNav={pageNav}
            />
            <div class="product-admin-main">
                {mainContent}
            </div>
            <div class="product-admin-secondary">
                {secondaryContent}
            </div>
        </Fragment>
    )
}

DetailCollection.propTypes = {
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    storageLocation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product,
    storageLocation: state.location
})

export default connect(mapStateToProps, null)(withRouter(DetailCollection));

