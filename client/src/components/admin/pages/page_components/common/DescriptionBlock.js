import React from 'react'
import PropTypes from 'prop-types';

import TextEditor from '../../../../common/TextEditor';

const DescriptionBlock = ({
    editorState, 
    setEditorState
}) => {
    return (
        <div id="order-map" style={{marginTop:'10px', overflow:'hidden', boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)', border: '1px solid #ddd', borderRadius: '6px'}}>
            <TextEditor descriptionObj={editorState} setDescriptionObj={setEditorState} />
        </div>
    )
}

DescriptionBlock.propTypes = {

}

export default DescriptionBlock
