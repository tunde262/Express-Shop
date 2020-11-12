import React, { useState, Fragment } from 'react';

import TagList from './TagList'; 

const InputTag = ({defaultTags, onAddTag, onDeleteTag, placeholder}) => {
    const [tags, setTags] = useState([]);

    const onKeyUp = (e) => {
        console.log(e.which);
         // comma (188) for comma, and 13 for enter/return key
         if (e.which === 188 || e.which === 13) {
              let input = e.target.value.trim().split(",");
              // return if empty tags
              if (input.length === 0 || input[0] === "") return;
              onAddTag(input[0]);
              e.target.value = "";
        }
    }

    const onDelete = (tag) => {
        onDeleteTag(tag);
    }
    
    return (
        <Fragment>
            <div style={cStyle}>
                <input 
                    style={iStyle}
                    onKeyUp= {(e) => onKeyUp(e) }
                    type="text" placeholder= {placeholder} 
                />   
            </div>
            <TagList 
                tags = {defaultTags} 
                onDeleteTag = {onDelete}
            /> 
        </Fragment>
    )
}

const cStyle = {
    position: "relative",
    display: "inline-block",
    border: "2px dashed rgb(214, 214, 214)",
    overflow: "auto",
    width: "100%",
    height: "50px",
    padding: "0 10px"
}
const iStyle = {
    display: "inline-block",
    fontSize: "0.9em", 
    width: "100%",
    height: "100%",
    border: "0",
    outline: "none",
    background: "#fff",
}

export default InputTag;