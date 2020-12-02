import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addProfileCollection, addCollectionItem, closeCollectionModal } from '../../../../actions/collectionActions';

import Modal from 'react-responsive-modal';

import CollectionList from './CollectionList';
import NewCollection from './NewCollection';


const AddToCollectionModal = ({
    closeCollectionModal,
    collection,
    profile, 
    addProfileCollection,
    formData,
    switchChange,
    onChange,
    onAddCollectionTag,
    loadCollectionTags,
    onDeleteCollectionTag,
    collectionTags,
    addCollectionItem,
    product
}) => {

    const [slideform1, setSlideForm1] = useState(false);
    const [slideform2, setSlideForm2] = useState(false);
    const [slideform3, setSlideForm3] = useState(false);
    const [slideform4, setSlideForm4] = useState(false);

    const {
        name, 
        visible,
    } = formData;

    const {
        modalOpen
    } = collection;


    const todo = (e) => {
        onAddCollection(e);
        handleModalClose();
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

    const handleCollectionClick = (collectionId) => {
        const { modalProduct } = product;

        const prodId = modalProduct._id;

        addCollectionItem([prodId], collectionId);

        handleModalClose();
    }

    const handleModalClose = () => {
        closeCollectionModal();
    }

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

    if(!modalOpen) {
        modal = null;
    }
    else {
        modal = (
            <Modal open={modalOpen} onClose={handleModalClose} center styles={bg2}>
                <div className="collection-form">
                    <div style={{width:'100%', marginTop:'20px', minHeight:'40px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-center', height:'40px'}}>
                        <h3>Add To</h3>
                    </div>
                    <div style={{width:'100%'}} className="form-settings-transition">
                        <div id="transition-1" style={{width:'100%'}} className={!slideform1 ? "auth-form-container active" : "auth-form-container"}>
                            <CollectionList 
                                setSlideForm1={setSlideForm1} 
                                slideform1={slideform1} 
                                handleCollectionClick={handleCollectionClick}
                            />
                        </div>
                        <div id="transition-2" style={{width:'100%', padding:'0 10px'}} className={slideform1 ? "auth-form-container active" : "auth-form-container"}>
                            <NewCollection 
                                origin="add-to"
                                onChange={onChange} 
                                setSlideForm1={setSlideForm1} 
                                slideform1={slideform1} 
                                setSlideForm2={setSlideForm2} 
                                slideform2={slideform2} 
                                onAddCollectionTag={onAddCollectionTag}
                                onDeleteCollectionTag={onDeleteCollectionTag}
                                collectionTags={collectionTags}
                                visible={visible}
                                switchChange={switchChange}
                                todo={todo}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    return (
        <Fragment>
            {modal}
        </Fragment>
    )
}

AddToCollectionModal.propTypes = {
    profile: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    addProfileCollection: PropTypes.func.isRequired,
    closeCollectionModal: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    addCollectionItem: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    collection: state.collection,
    product: state.product
});

export default connect(mapStateToProps, { addProfileCollection, addCollectionItem, closeCollectionModal })(AddToCollectionModal);





