import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-responsive-modal';
import { getProductsInCollection } from '../../../../actions/productActions';

import VisibilityBlock from '../../../admin/pages/page_components/common/VisibilityBlock';
import ItemsBlock from '../../../admin/pages/page_components/common/ItemsBlock';
import TitleBlock from '../common/TitleBlock';
import FullTagsBlock from '../common/FullTagsBlock';
import InputTag from '../../../common/InputTag/InputTag';
import ItemTable from '../../../admin/table/ItemTable/ItemTable';


const Form_Collection = ({
    product,
    setModal,
    onAddItemTag,
    onDeleteItemTag,
    itemTags,
    loadItemTags,
    formData,
    setFormData,
    switchChange,
    onChange,
    history,
    match
    }) => {
  
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

    {/** Content Block Variables */}

    let secondaryCollectionInfo = (
        <Fragment>
            <VisibilityBlock
                isMobile={isMobile}
                formData={formData}
                switchChange={switchChange}
                setFormData={setFormData}
            />
        </Fragment>
    );
    let mainCollectionInfo = (
      <Fragment>
            <TitleBlock 
                onChange={onChange}
                formData={formData}
            />
            
            <FullTagsBlock 
                onAddItemTag={onAddItemTag}  
                onDeleteItemTag={onDeleteItemTag}  
                itemTags={itemTags} 
                loadItemTags={loadItemTags}
            />

            {isMobile ? (
                secondaryCollectionInfo
            ) : null}

            <ItemsBlock
                product={product} 
                setModal={setModal}
                page="collection-form"
            />      

      </Fragment>
    );

    {/** END Content Block Variables */}


    {/** Rendering */}

    const mainContent = mainCollectionInfo;

    const secondaryContent = secondaryCollectionInfo;

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

Form_Collection.propTypes = {
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    getProductsInCollection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.collection,
  product: state.product,
  store: state.store
});

export default connect(mapStateToProps, { getProductsInCollection })(
    withRouter(Form_Collection)
);
