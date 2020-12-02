import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import AddName from '../createNew/new_components/Name_Add';
import DiscoveryTags from '../createNew/new_components/Discovery_Tags';

import cardboardLogo from '../../../common/logo.jpg';
import { Logo } from '../../../Logo';

const NewCollection = ({
    origin,
    onAddCollectionTag,
    onDeleteCollectionTag,
    collectionTags,
    visible,
    switchChange,
    todo,
    setSlideForm2,
    slideform2,
    onChange, 
    slideform1, 
    setSlideForm1, 
}) => {
    return (
        <Fragment>
            <Logo>
                <img src={cardboardLogo} style={{maxHeight: '40px'}} alt="cardboard express logo" />
            </Logo>
            <div style={{width:'100%', fontFamily:'Arial, Helvetica, sans-serif', display:'flex', justifyContent:'center', alignItems:'center', color:'#0098d3', textAlign:'center'}}>
                <i style={{margin:'10px', fontSize:'1.2rem'}} class="fas fa-plus"></i>
                <h4> New Collection</h4>
            </div>
            <div style={{width:'100%'}} className="form-settings-transition">
                <div id="transition-1" style={{width:'100%', padding:'0 10px'}} className={!slideform2 ? "auth-form-container active" : "auth-form-container"}>
                    <AddName 
                        origin={origin}
                        onChange={onChange} 
                        setSlideForm1={setSlideForm1} 
                        slideform1={slideform1} 
                        setSlideForm2={setSlideForm2} 
                        slideform2={slideform2} 
                    />
                </div>
                <div id="transition-2" style={{width:'100%', padding:'0 10px'}} className={slideform2 ? "auth-form-container active" : "auth-form-container"}>
                    <DiscoveryTags
                        origin={origin}
                        onAddCollectionTag={onAddCollectionTag}
                        onDeleteCollectionTag={onDeleteCollectionTag}
                        collectionTags={collectionTags}
                        visible={visible}
                        switchChange={switchChange}
                        todo={todo}
                        setSlideForm2={setSlideForm2}
                        slideform2={slideform2}
                    />
                </div>  
            </div>
        </Fragment>
    )
}

NewCollection.propTypes = {

}

export default NewCollection
