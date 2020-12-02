import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../../common/Spinner';

const CollectionList = ({ handleCollectionClick, collection, setSlideForm1, slideform1 }) => {

    const [collectionList, setCollectionList] = useState([]);

    useEffect(() => {
        renderCollectionList();
      }, [collection.profile_collections])


    const renderCollectionList = () => {
        setCollectionList([]);
        try {
            if(collection.profile_collections.length > 0) {
                collection.profile_collections.map(collectionObj => {
                    setCollectionList(collectionList => [...collectionList, (
                        <div key={collectionObj._id} onClick={() => handleCollectionClick(collectionObj._id)} className="collection-form-item">
                            <div style={{height:'40px', width:'40px', borderRadius:'5px', background:'#808080', margin:'0 10px 0 0'}}></div>
                            <div style={{lineHeight:'20px'}}>
                                <p style={{margin:'0', fontSize:'1rem'}}>{collectionObj.name}</p>
                                <p style={{margin:'0', color: '#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>{collectionObj.items.length} items | 4 followers</p>
                            </div>
                        </div>
                    )])       
                });
            } else {
                setCollectionList([(
                    <p style={{margin:'0'}}>No Collections</p>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div style={{padding:'0 10px', marginTop:'1rem', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div onClick={() => setSlideForm1(!slideform1)} style={{display:'flex', color:'#0098d3', borderBottom:'1px solid #cecece', marginBottom:'10px', height:'50px', width:'100%', padding: '30px 1rem', alignItems:'center'}}>
                <i style={{fontSize:'1.1rem', margin:'0 10px'}} class="fas fa-plus"></i>
                <p style={{margin:'0', fontSize:'1rem'}}>New Collection</p>
            </div>
            <div style={{height:'400px', width:'100%', overflowY: 'scroll'}}>
                {!collectionList.length > 0 ? <Spinner /> : collectionList}
            </div>
        </div>
    )
}

CollectionList.propTypes = {
    collection: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection
});

export default connect(mapStateToProps, null)(CollectionList);
