import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mixpanel from 'mixpanel-browser';

import Modal from 'react-responsive-modal';
import { addLocation } from '../../../../actions/locationActions';

import TextEditor from '../../../common/TextEditor';
import DragAndDrop from '../../../admin/forms/utils/DragAndDrop';
import InputTag from '../../../common/InputTag/InputTag';
import Map from '../../../common/map/Map';
import TitleBlock from '../common/TitleBlock';
import MapBlock from '../../../admin/pages/page_components/common/MapBlock';
import ItemsBlock from '../../../admin/pages/page_components/common/ItemsBlock';
import VisibilityBlock from '../../../admin/pages/page_components/common/VisibilityBlock';
import AddressBlock from '../common/AddressBlock';


const Form_Location = ({
  store,
  product,
  storageLocation: { 
    detailLocation, 
    loading 
  }, 
  setVarModal,
  formData,
  setFormData,
  switchChange,
  onChange,
  setModal,
  address,
  setAddress,
  handleLocationSelect,
  history,
  match
}) => {
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [sentMixpanel, setSentMixpanel] = useState(false);

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
      mixpanel.track("Add Location Page View", {
      //   "Entry Point": "Home Landing",
        "Store Name": store.store.name,
      });
  }

  if(!sentMixpanel && store.store) {
      handleMixpanel();
      setSentMixpanel(true);
  }
    

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
        <AddressBlock 
          address={address}
          setAddress={setAddress}
          handleLocationSelect={handleLocationSelect}
        />
            {/* <input
                type="text"
                name="phone"
                className="input_line"
                placeholder="Enter address . . ."
                autocomplete="no"
                style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', borderBottom:'2px dashed #cecece', borderRadius:'5px'}}
            /> */}
        <TitleBlock 
          onChange={onChange}
          formData={formData}
          isLocation
        />
        
        <MapBlock />

        <ItemsBlock
            product={product} 
            // setModal={setModal}
            setModal={setVarModal}
            page="location"
        />
        
        {/* <InventoryBlock 
          setModal={setModal}
        /> */}

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
    addLocation: PropTypes.func.isRequired,
    storageLocation: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  storageLocation: state.location,
  store: state.store,
  product: state.product
});

export default connect(mapStateToProps, { addLocation })(
    withRouter(Form_Location)
);
