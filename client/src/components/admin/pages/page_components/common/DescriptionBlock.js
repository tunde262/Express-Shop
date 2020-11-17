import React from 'react'
import PropTypes from 'prop-types';

import TextEditor from '../../../../common/TextEditor';

const DescriptionBlock = ({
    editorState, 
    setEditorState
}) => {
    return (
        <div id="order-map" style={{marginTop:'10px', overflow:'hidden'}}>
            <TextEditor descriptionObj={editorState} setDescriptionObj={setEditorState} />
        </div>
    )
}

DescriptionBlock.propTypes = {

}

export default DescriptionBlock
