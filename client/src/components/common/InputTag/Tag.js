import React, { Fragment } from 'react'

const Tag = ({onDeleteTag, value}) => {
    var tag = (
        <div class="tag-item green">
           <p style={{margin:'auto', color:'green'}}>{value}</p>
           <i 
                onClick = {(e) => onDeleteTag(e, value)} 
                style={{color:'green', marginLeft:'10px',fontSize:'12px', cursor: 'pointer'}} 
                class="fas fa-times"
            ></i>
        </div>
    );

    return (
        <Fragment>
            {tag}
        </Fragment>
    )
}

const tagStyle  = {
    fontSize: "0.9em",
    margin: "5px",
    padding: "2px",
    cursor: "pointer"
}

export default Tag;
