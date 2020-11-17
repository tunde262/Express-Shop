import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-responsive-modal';
import { addProduct, editProduct, addProductImg, handleDetail } from '../../../../actions/productActions';

import TextEditor from '../../../common/TextEditor';
import DragAndDrop from '../../../admin/forms/utils/DragAndDrop';
import InputTag from '../../../common/InputTag/InputTag';
import Map from '../../../common/map/Map';
import TitleBlock from '../common/TitleBlock';
import MapBlock from '../../../admin/pages/page_components/common/MapBlock';
import InventoryBlock from '../../../admin/pages/page_components/common/InventoryBlock';
import VisibilityBlock from '../../../admin/pages/page_components/common/VisibilityBlock';


const Form_Location = ({
  product,
  getProductsInCollection,
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

    let secondaryLocationInfo = (
      <Fragment>
        <VisibilityBlock
          isMobile={isMobile}
          formData={formData}
          setFormData={setFormData}
          switchChange={switchChange} 
        />
      </Fragment>
    );
    let mainLocationInfo = (
      <Fragment>
        <div class="content-box" style={{padding:'1rem 10px', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
            <input
                type="text"
                name="phone"
                className="input_line"
                placeholder="Enter address . . ."
                autocomplete="no"
                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
            />
        </div>
        <TitleBlock 
          onChange={onChange}
          formData={formData}
          isLocation
        />
        
        <MapBlock />
        
        <InventoryBlock 
          setModal={setModal}
        />

        {isMobile ? (
            secondaryLocationInfo
        ) : null}
      </Fragment>
    );

    {/** END Content Block Variables */}


    {/** Rendering */}

    const mainContent = mainLocationInfo;

    const secondaryContent = secondaryLocationInfo;

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

Form_Location.propTypes = {
    addProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  product: state.product,
  store: state.store
});

export default connect(mapStateToProps, { addProduct, editProduct, handleDetail })(
    withRouter(Form_Location)
);
