import React from 'react';

const VariantTagList = ({variant}) => {
    return (
        <div className="tag-list">
            {variant.color && (
                <div className="tag-item green">
                    <p>
                        {variant.color} 
                    </p>
                </div>
            )}
            {variant.size && (
                <div className="tag-item green">
                    <p>
                        {variant.size} 
                    </p>
                </div>
            )}
            {variant.weight && (
                <div className="tag-item green">
                    <p>
                        {variant.weight} 
                    </p>
                </div>
            )}
            {variant.bundle && (
                <div className="tag-item green">
                    <p>
                        {variant.bundle} 
                    </p>
                </div>
            )}
            {variant.type && (
                <div className="tag-item green">
                    <p>
                        {variant.type} 
                    </p>
                </div>
            )}
            {variant.scent && (
                <div className="tag-item green">
                    <p>
                        {variant.scent} 
                    </p>
                </div>
            )}
            {variant.fit && (
                <div className="tag-item green">
                    <p>
                        {variant.fit} 
                    </p>
                </div>
            )}
            {variant.flavor && (
                <div className="tag-item green">
                    <p>
                        {variant.flavor} 
                    </p>
                </div>
            )}
            {variant.material && (
                <div className="tag-item green">
                    <p>
                        {variant.material} 
                    </p>
                </div>
            )}
        </div>
    )
}

export default VariantTagList;
