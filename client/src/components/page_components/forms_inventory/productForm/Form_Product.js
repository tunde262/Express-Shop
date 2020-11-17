import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-responsive-modal';
import { addProduct, editProduct, addProductImg, handleDetail , incImg, decImg } from '../../../../actions/productActions';
import { addVariant } from '../../../../actions/variantActions';

import VisibilityBlock from '../../../admin/pages/page_components/common/VisibilityBlock';
import CategoryBlock from '../../../admin/pages/page_components/common/CategoryBlock';
import ConditionBlock from '../../../admin/pages/page_components/common/ConditionBlock';
import TagsBlock from '../../../admin/pages/page_components/common/TagsBlock';
import ImageBlock from '../../../admin/pages/page_components/common/ImageBlock';
import DescriptionBlock from '../../../admin/pages/page_components/common/DescriptionBlock';

import TitleBlock from '../common/TitleBlock';
import NumbersBlock from '../common/NumbersBlock';
import AddVariantsBlock from '../common/AddVariantsBlock';


const Form_Product = ({
    product: { detailProduct },
    setImageModal,
    onAddItemTag,
    onDeleteItemTag,
    itemTags,
    loadItemTags,
    formData,
    categoryData,
    conditionData,
    editorState,
    setEditorState,
    handleCategoryChange,
    handleConditionChange,
    switchChange,
    onChange,
    setFormData,
    varName,
    displayOption1,
    displayOption2,
    displayOption3,
    displayOption4,
    handleToggleOption,
    removeDisplayOption1,
    removeDisplayOption2,
    removeDisplayOption3,
    removeDisplayOption4,
    onAddTag,
    onDeleteTag,
    onAddTag2,
    onDeleteTag2,
    onAddTag3,
    onDeleteTag3,
    onAddTag4,
    onDeleteTag4,
    varTags,
    varTags2,
    varTags3,
    varTags4,
    updateList,
    varInfo,
    display,
    optionToggle,
    setOptionToggle,
    optionToggle2,
    setOptionToggle2,
    optionToggle3,
    setOptionToggle3,
    optionToggle4,
    setOptionToggle4,
    categoryToggle,
    setCategoryToggle,
    conditionToggle,
    setConditionToggle,
    handleVarNameChange,
}) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);
  
    // Toggle
    const [displayModal, toggleModal] = useState(false);
    const [displayVariantInputs, toggleVariantInputs] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;


    const handleMixpanel = () => {
        mixpanel.track("Add Product Page View", {
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

    {/** Content Block Variables */}

    let secondaryItemInfo = (
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
    );

    let mainItemInfo = (
        <Fragment>
            <TitleBlock 
                onChange={onChange}
                formData={formData}
            />
            <ImageBlock 
                detailProduct={detailProduct}
                setImageModal={setImageModal}
            />
            <DescriptionBlock 
                editorState={editorState} 
                setEditorState={setEditorState}
            />
            <NumbersBlock 
                onChange={onChange}
                formData={formData}
            />

            {isMobile ? (
                secondaryItemInfo
            ) : null}

            <AddVariantsBlock 
                handleToggleOption={handleToggleOption}
                displayOption1={displayOption1}
                displayOption2={displayOption2}
                displayOption3={displayOption3} 
                displayOption4={displayOption4}
                optionToggle={optionToggle}
                setOptionToggle={setOptionToggle}
                optionToggle2={optionToggle2}
                setOptionToggle2={setOptionToggle2}
                optionToggle3={optionToggle3}
                setOptionToggle3={setOptionToggle3}
                optionToggle4={optionToggle4}
                setOptionToggle4={setOptionToggle4}
                varName={varName}
                handleVarNameChange={handleVarNameChange}
                onAddTag={onAddTag}
                onDeleteTag={onDeleteTag}
                varTags={varTags}
                onAddTag2={onAddTag2}
                onDeleteTag2={onDeleteTag2}
                varTags2={varTags2}
                onAddTag3={onAddTag3}
                onDeleteTag3={onDeleteTag3}
                varTags3={varTags3}
                onAddTag4={onAddTag4}
                onDeleteTag4={onDeleteTag4}
                varTags4={varTags4}
                removeDisplayOption1={removeDisplayOption1}
                removeDisplayOption2={removeDisplayOption2}
                removeDisplayOption3={removeDisplayOption3}
                removeDisplayOption4={removeDisplayOption4}
                updateList={updateList}
                varInfo={varInfo}
                display={display}
            />
        </Fragment>
    );

    {/** END Content Block Variables */}

    {/** Rendering */}

    const mainContent = mainItemInfo;

    const secondaryContent = secondaryItemInfo;

    {/** END Rendering */}
    
    return (
        <Fragment>
            <div class="product-admin-main">
                {mainContent}
            </div>
            <div class="product-admin-secondary">
                {secondaryContent}
            </div>
        </Fragment>
    )
}

Form_Product.propTypes = {
    handleDetail: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    addVariant: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    incImg: PropTypes.func.isRequired,
    decImg: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  store: state.store,
});

export default connect(mapStateToProps, { handleDetail, incImg, decImg, addVariant })(
    withRouter(Form_Product)
);
