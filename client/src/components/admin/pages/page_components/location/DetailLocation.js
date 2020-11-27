import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import { addToVariants, deleteVariant } from '../../../../../actions/variantActions';

import Map from '../../../../common/map/Map';
import Variant from '../../../table/VariantTable/Variant';
import TableDetails from '../../../../TableDetails/TableDetails';
import Inventory from '../../../table/Inventory';
import ItemsBlock from '../common/ItemsBlock';
import StatsBlock from '../common/StatsBlock';
import VariantBlock from '../common/VariantBlock';

import Spinner from '../../../../common/Spinner';
import InputTag from '../../../../common/InputTag/InputTag';
import InventoryBlock from '../common/InventoryBlock';
import MapBlock from '../common/MapBlock';
import InventoryActivityBlock from '../common/InventoryActivityBlock';
import VisibilityBlock from '../common/VisibilityBlock';
import CollectionsBlock from '../common/CollectionsBlock';
import TagsBlock from '../common/TagsBlock';

const DetailLocation = ({ 
    setModal, 
    product,
    addToVariants, 
    storageLocation, 
    storageLocation: { 
        detailLocation, 
        loading 
    }, 
    variant, 
    setTable,
    setVarModal,
    onAddItemTag,
    onDeleteItemTag,
    onAddTag,
    onDeleteTag,
    varTags,
    itemTags,
    loadItemTags,
    formData,
    setFormData,
    switchChange,
    onChange,
    match,
    deleteVariant
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

        if(detailLocation) {
            for(var i = 0; i < detailLocation.products.length; i++) {
                console.log('ITEM ID');
                console.log(detailLocation.products[i]);
                // addToVariants(detailLocation.products[i])
            }
        }

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [loading]);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;


    const handleMixpanel = () => {
        mixpanel.track("Admin Location Page View", {
        //   "Entry Point": "Home Landing",
          "Location Name": detailLocation.name,
          "Location City": detailLocation.address_components.city,
        //   "Location Zipcode": detailLocation.address_components.postalcode,
          "Store Name": detailLocation.store.name,
        //   "Item Count": detailLocation.img_gallery.length,
          
        });
    }

    if(!sentMixpanel && detailLocation) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    {/** Content Block Variables */}

    const secondaryLocationInfo = (
        <Fragment>
            <VisibilityBlock
                isMobile={isMobile}
                formData={formData}
                setFormData={setFormData}
                switchChange={switchChange}
            />
            {/* <CollectionsBlock
                product={product}
                isMobile={isMobile} 
            /> */}
            <TagsBlock
                isMobile={isMobile} 
                onAddItemTag={onAddItemTag}  
                onDeleteItemTag={onDeleteItemTag}  
                itemTags={itemTags} 
                loadItemTags={loadItemTags}
            />
            <InventoryActivityBlock 
                isMobile={isMobile}
            />
        </Fragment>
    );

    const mainLocationInfo = (
        <Fragment>
            <MapBlock detail />
            
            {isMobile ? (
                secondaryLocationInfo
            ) : null}

            <ItemsBlock
                product={product} 
                // setModal={setModal}
                setModal={setVarModal}
                page="location"
            />
        </Fragment>
    );

    const mainInventoryInfo = (
        <Fragment>
            <InventoryBlock 
                setModal={setModal}
            />
            {/* <div style={{margin:'10px 0'}}>
                <div class="table-responsive table-filter">
                    <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                </div>
                <div class="content-box">
                    <div class="table-responsive table-filter">
                        <Inventory setModal={setVarModal} page="location" variant={{sortedVariants: [...variant.variants], loading: false}} />
                    </div>
                </div>
            </div> */}
        </Fragment>
    );

    {/** END Block Variables */}

    let mainContent;

    if(detailLocation) {
        if(pageNav === 'detail') {
            mainContent = mainLocationInfo;
        } else if (pageNav === 'inventory') {
            mainContent = mainInventoryInfo;
        }
    } else {
        mainContent = <Spinner />;
    }

    let secondaryContent;

    if(detailLocation) {
        if(pageNav === 'detail') {
            secondaryContent = secondaryLocationInfo;
        } else if (pageNav === 'inventory') {
            secondaryContent = null;
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
                        <Link to={detailLocation && `/locations/${detailLocation._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i style={{margin:'0 1rem', fontSize:'1.4rem'}} class="fas fa-share-alt"></i>
                        <button onClick={e => setTable('edit location')} style={{ margin:'0 1rem 0 0', background:'#f4f4f4', color:'#7A7A7A', borderColor:'#f4f4f4' }}>Edit</button>
                        <button onClick={e => setTable('storage request')} style={{ margin:'0 1rem 0 0' }}>Request Storage</button>
                    </div>
                    {' '}
                </div>
                <hr style={{margin:'0'}} />
            </div> */}
        
            {pageNav === 'inventory' ? (
                <section id="stats">
                    <StatsBlock 
                        setPageNav={setPageNav}
                        pageNav={pageNav}
                    />

                    {mainContent}
                    
                    {/* <div style={{margin:'10px 0', width:'100%'}}>
                        <div class="table-responsive table-filter">
                            <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
                        </div>
                        <div class="content-box">
                            <div class="table-responsive table-filter">
                                <Inventory setModal={setModal} page="location" variant={{sortedVariants: [...variant.variants], loading: false}} />
                            </div>
                        </div>
                    </div> */}
                </section>
            ) : (
                <Fragment>
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
            )}
        </Fragment>
    )
}

DetailLocation.propTypes = {
    storageLocation: PropTypes.object.isRequired,
    addToVariants: PropTypes.func.isRequired,
    variant: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    deleteVariant: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    storageLocation: state.location,
    variant: state.variant,
    product: state.product
})

export default connect(mapStateToProps, { addToVariants, deleteVariant })(withRouter(DetailLocation));

