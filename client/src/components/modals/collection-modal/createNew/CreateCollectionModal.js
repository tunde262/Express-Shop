import React, { Component, Fragment, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addProfileCollection } from '../../../../actions/collectionActions';
import Modal from 'react-responsive-modal';

import InputTag from '../../../common/InputTag/InputTag';

import AddName from './new_components/Name_Add';
import DiscoveryTags from './new_components/Discovery_Tags';

import cardboardLogo from '../../../common/logo.jpg';
import { Logo } from '../../../Logo';


const CreateCollectionModal = ({
    displayCollectionModal, 
    setCollectionModal, 
    profile, 
    addProfileCollection,
    formData,
    switchChange,
    onChange,
    onAddCollectionTag,
    loadCollectionTags,
    onDeleteCollectionTag,
    handleModalClose,
    collectionTags
}) => {

    const [slideform1, setSlideForm1] = useState(false);
    const [slideform2, setSlideForm2] = useState(false);
    const [slideform3, setSlideForm3] = useState(false);
    const [slideform4, setSlideForm4] = useState(false);

    const {
        name, 
        visible,
    } = formData;


    const todo = (e) => {
        onAddCollection(e);
        setCollectionModal(false);
    }

    const onAddCollection = async (e) => {
        e.preventDefault();
  
        let tags = '';
        if (collectionTags.length > 0) {
          tags = collectionTags.join(', ');
        }
    
        let data = new FormData();
        // if(formData.file !== '') data.append('file', formData.file);
        if(name !== '')data.append('name', name);
        if(visible !== '')data.append('visible', visible);
        if(tags !== '')data.append('tags', tags);

        console.log('ON ADD COLLECTION')
    
        addProfileCollection(data, profile.profile._id);
    
        // mixpanel.track("Add Collection Completed", {
        //   "Collection Name": name,
        //   "Collection Category": categoryData,
        //   "Collection Cost": price,
        //   "Store Name": store.store.name,
        //   "Creation Date": new Date().toISOString(), 
        // });
    
    };

    let modal;

    const bg2 = {
        modal: {
            boxShadow: "none",
            borderRadius: "15px",
            border: "1px solid rgb(214, 214, 214)",
            padding: "0"
        },
        overlay: {
          background: "rgba(20,20,20, .5)"
        }
    };

    if(!displayCollectionModal) {
        modal = null;
    }
    else {
        modal = (
            <Modal open={displayCollectionModal} onClose={setCollectionModal} center styles={bg2}>
                <div className="collection-form">
                    <div style={{width:'100%', minHeight:'40px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-center', height:'40px'}}>
                    <p style={{margin:'0', fontSize:'12px', color:'#0098d3'}}><i style={{fontSize:'10px'}} class="fas fa-plus"></i> Create</p>
                    </div>
                    <Logo>
                        <img src={cardboardLogo} style={{maxHeight: '40px'}} alt="cardboard express logo" />
                    </Logo>
                    <div style={{padding:'0 20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div style={{width:'100%', fontFamily:'Arial, Helvetica, sans-serif', display:'flex', justifyContent:'center', alignItems:'center', color:'#0098d3', textAlign:'center'}}>
                            <i style={{margin:'10px', fontSize:'1.2rem'}} class="fas fa-plus"></i>
                            <h3> New Collection</h3>
                        </div>  
                        <div style={{width:'100%'}} className="form-settings-transition">
                            <div id="transition-1" style={{width:'100%', padding:'0 10px'}} className={!slideform1 ? "auth-form-container active" : "auth-form-container"}>
                                <AddName 
                                    origin="side-drawer"
                                    name={name}
                                    onChange={onChange} 
                                    setSlideForm1={setSlideForm1} 
                                    slideform1={slideform1} 
                                    setSlideForm2={setSlideForm2} 
                                    slideform2={slideform2} 
                                />
                            </div>
                            <div id="transition-2" style={{width:'100%', padding:'0 10px'}} className={slideform1 ? "auth-form-container active" : "auth-form-container"}>
                                <DiscoveryTags 
                                    origin="side-drawer"
                                    onAddCollectionTag={onAddCollectionTag}
                                    onDeleteCollectionTag={onDeleteCollectionTag}
                                    collectionTags={collectionTags}
                                    visible={visible}
                                    switchChange={switchChange}
                                    todo={todo}
                                    setSlideForm2={setSlideForm2}
                                    slideform2={slideform2}
                                    setSlideForm1={setSlideForm1}
                                    slideform1={slideform1}
                                />
                            </div>  
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <React.Fragment>
            {modal}
        </React.Fragment>
    )
}

const ModalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
    #modal {
        background: #fff;
    }
`;

CreateCollectionModal.propTypes = {
    profile: PropTypes.object.isRequired,
    addProfileCollection: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { addProfileCollection })(CreateCollectionModal);
