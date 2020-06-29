import React, { useState } from 'react';

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
        <div style={cStyle}>
           
            <input 
                style={iStyle}
                onKeyUp= {(e) => onKeyUp(e) }
                type="text" placeholder= {placeholder} 
            />   

            <TagList 
                tags = {defaultTags} 
                onDeleteTag = {onDelete}
            /> 
       </div>
    )
}

const cStyle = {
    position: "relative",
    display: "inline-block",
    width: "300px",
    border: "1px solid lightblue",
    overflow: "auto"
}
const iStyle = {
    display: "inline-block",
    fontSize: "0.9em", 
    margin: "5px",
    width: "90%",
    border: "0"
}

export default InputTag;