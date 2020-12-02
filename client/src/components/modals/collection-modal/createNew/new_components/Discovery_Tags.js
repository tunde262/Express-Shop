import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

import InputTag from '../../../../common/InputTag/InputTag';

const Discovery_Tags = ({
    origin,
    onAddCollectionTag,
    onDeleteCollectionTag,
    collectionTags,
    visible,
    switchChange,
    todo,
    setSlideForm2,
    slideform2,
    setSlideForm1,
    slideform1
}) => {
    return (
        <Fragment>
            <div style={{height:'200px', padding:'0 10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', borderBottom:'1px solid rgb(247,247,247)', width:'100%', overflow:'scroll'}}> 
                <InputTag  
                    onAddTag ={onAddCollectionTag}
                    onDeleteTag = {onDeleteCollectionTag}
                    defaultTags={collectionTags}
                    placeholder="Tags (seperated by comma)"
                />
                <p style={{margin:'5px 0', textAlign:'center', color:'#808080', fontSize:'14px', fontFamily:'Arial, Helvetica, sans-serif'}}>Make this collection more discoverable.</p>
            </div>

            <div style={{display:'flex', margin:'10px 0 20px 0', alignItems:'center', justifyContent:'flex-end'}}>
                <p style={{margin:'0 20px', color:'#808080'}}>Make this collection public</p>
                <input 
                    class="toggle-button" 
                    type="checkbox" 
                    name="visible"
                    checked={visible}
                    onChange={switchChange}
                />
            </div>
            <button onClick={(e) => todo(e)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Create Collection 
            </button>
            <p onClick={origin === 'side-drawer' ? () => setSlideForm1(!slideform1) : () => setSlideForm2(!slideform2)} style={{margin:'0', textAlign:'center', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Discovery_Tags.propTypes = {

}

export default Discovery_Tags
