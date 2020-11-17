import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Map from '../../../../common/map/Map';
import TextEditor from '../../../../common/TextEditor';
import Spinner from '../../../../common/Spinner';
import InputTag from '../../../../common/InputTag/InputTag';

import mixpanel from 'mixpanel-browser';

import VariantTable from '../../../table/VariantTable/VariantTable';
import TableDetails from '../../../../TableDetails/TableDetails';

import { incImg, decImg, editProduct } from '../../../../../actions/productActions';
import TagsBlock from '../common/TagsBlock';
import ConditionBlock from '../common/ConditionBlock';
import CategoryBlock from '../common/CategoryBlock';
import VisibilityBlock from '../common/VisibilityBlock';
import InventoryActivityBlock from '../common/InventoryActivityBlock';
import CollectionsBlock from '../common/CollectionsBlock';
import MapBlock from '../common/MapBlock';
import LocationVariantsBlock from '../common/LocationVariantsBlock';
import ImageBlock from '../common/ImageBlock';
import DescriptionBlock from '../common/DescriptionBlock';
import VariantBlock from '../common/VariantBlock';
import StatsBlock from '../common/StatsBlock';


// const initialEditorState = {
//     "entityMap":{},
//     "blocks":[
//         {
//             "key":"btdob",
//             "text":"Initialized from content state.",
//             "type":"unstyled",
//             "depth":0,
//             "inlineStyleRanges":[],
//             "entityRanges":[],
//             "data":{}
//         }
//     ]
// }

const DetailProduct = ({ 
    product: { detailProduct },
    stateLocation: {
        locations,
        loading
    },
    match,
    setModal,
    setImageModal,
    onAddItemTag,
    onDeleteItemTag,
    itemTags,
    loadItemTags,
    onAddTag,
    onDeleteTag,
    varTags,
    formData,
    categoryData,
    conditionData,
    editorState,
    setEditorState,
    categoryToggle,
    setCategoryToggle,
    conditionToggle,
    setConditionToggle,
    handleCategoryChange,
    handleConditionChange,
    switchChange,
    onChange,
    deleteVariant,
    setFormData
}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
    const [pageNav, setPageNav] = useState('detail');

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
        console.log('CHECK STATE');
        console.log(editorState);
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, [])

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;
    
    const handleMixpanel = () => {
        mixpanel.track("Admin Product Page View", {
        //   "Entry Point": "Home Landing",
          "Item Name": detailProduct.name,
          "Item Category": detailProduct.category,
          "Item Cost": detailProduct.price,
          "Store Name": detailProduct.store.name,
          "Total Imgs": detailProduct.img_gallery.length,
          "Total Likes": detailProduct.likes.length,
          "Total Comments": detailProduct.comments.length,
          
        });
    }

    if(!sentMixpanel && detailProduct) {
        handleMixpanel();
        setSentMixpanel(true);
    }

    let inventoryContent;

    if(pageNav === 'inventory' && !loading) {
        if(locations.length > 0) {
            inventoryContent = locations.map(detailLocation => (
                <LocationVariantsBlock 
                    detailLocation={detailLocation}
                    setModal={setModal}
                    prodId={match.params.productId}
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
    const secondaryItemInfo = (
        <Fragment>
            <VisibilityBlock
                isMobile={isMobile}
                formData={formData}
                switchChange={switchChange}
                setFormData={setFormData}
            />
            <CategoryBlock 
                isMobile={isMobile}
                categoryToggle={categoryToggle}
                setCategoryToggle={setCategoryToggle}
                categoryData={categoryData}
                handleCategoryChange={handleCategoryChange}
            />
            <ConditionBlock
                isMobile={isMobile} 
                setConditionToggle={setConditionToggle} 
                conditionToggle={conditionToggle} 
                conditionData={conditionData} 
                handleConditionChange={handleConditionChange} 
            />
            <TagsBlock
                isMobile={isMobile} 
                onAddItemTag={onAddItemTag}  
                onDeleteItemTag={onDeleteItemTag}  
                itemTags={itemTags} 
                loadItemTags={loadItemTags}
            />
        </Fragment>
    )

    const secondaryInventoryInfo = (
        <Fragment>
            <InventoryActivityBlock 
                isMobile={isMobile}
            />
            <CollectionsBlock
                isMobile={isMobile} 
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

    const mainItemInfo = (
        <Fragment>
            <ImageBlock 
                detailProduct={detailProduct}
                setImageModal={setImageModal}
            />
            <DescriptionBlock 
                editorState={editorState} 
                setEditorState={setEditorState}
            />

            {isMobile ? (
                secondaryItemInfo
            ) : null}

            <VariantBlock 
                setModal={setModal} 
                prodId={match.params.productId} 
                deleteVariant={deleteVariant} 
                onAddTag={onAddTag}
                onDeleteTag={onDeleteTag}
                varTags={varTags}
                onChange={onChange}
            />
        </Fragment>
    );
    {/** End Content Block */}

    let mainContent;

    if(detailProduct) {
        if(pageNav === 'detail') {
            mainContent = mainItemInfo;
        } else if (pageNav === 'inventory') {
            mainContent = mainInventoryInfo;
        }
    } else {
        mainContent = <Spinner />;
    }

    let secondaryContent;

    if(detailProduct) {
        if(pageNav === 'detail') {
            secondaryContent = secondaryItemInfo;
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
                    <p style={{margin:'0'}}>Qty <span style={{fontWeight:'bold'}}>{detailProduct && detailProduct.inventory_qty}</span> in stock for <span style={{fontWeight:'bold'}}>{variant.variants.length}</span> variants</p>
                    <div style={{display:'flex', height:'100%', alignItems:'center'}}>
                        <Link to={detailProduct && `/details/${detailProduct._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i style={{margin:'0 1rem', fontSize:'1.4rem'}} class="fas fa-share-alt"></i>
                        <button onClick={e => setTable('edit')} style={{ margin:'0 1rem 0 0', background:'#f4f4f4', color:'#7A7A7A', borderColor:'#f4f4f4' }}>Edit</button>
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

DetailProduct.propTypes = {
    incImg: PropTypes.func.isRequired,
    decImg: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    editProduct: PropTypes.func.isRequired,
    stateLocation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    product: state.product,
    store: state.store,
    stateLocation: state.location
})

export default connect(mapStateToProps, { 
    incImg,
    decImg,
    editProduct
})(withRouter(DetailProduct));