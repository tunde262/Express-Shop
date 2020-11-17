import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import InputTag from '../../../common/InputTag/InputTag';

const FullTagsBlock = ({
    collection,
    onAddItemTag, 
    onDeleteItemTag, 
    itemTags,
    loadItemTags,
    match
}) => {

    useEffect(() => {
        setTags();
    }, [collection.collection]);

    const setTags = () => {
        if(match.params.collectionId) {
            if (!collection.loading && collection.collection) {
                loadItemTags(collection.collection.tags)
            }
        }
    }

    return (
        <div id="order-map" style={{margin:'10px 0', width:'100%', padding:'10px 15px 10px 10px', background:'#fff', border:'1px solid rgb(214,214,214)', overflow:'hidden'}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'center'}}>
                <p style={{fontSize:'1.3rem', margin:'0'}}>Add Tags</p>
                <p style={{color:'#808080', margin:'0'}}>Create an auto updating collection by adding matching tags with items.</p>
            </div>
            <div style={{width:'100%', margin:'2rem 0 15px 0', minHeight:'50px'}}>
                <InputTag  
                    onAddTag ={onAddItemTag}
                    onDeleteTag = {onDeleteItemTag}
                    defaultTags={itemTags}
                    placeholder="enter tags separated by comma"
                />
            </div>
        </div>  
    )
}

FullTagsBlock.propTypes = {
    collection: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection
})

export default connect(mapStateToProps, null)(withRouter(FullTagsBlock));
