import React from 'react';
import PropTypes from 'prop-types';

import VariantTable from '../../../table/VariantTable/VariantTable';

const VariantBlock = ({
    setModal,
    prodId,
    deleteVariant,
    onAddTag,
    onDeleteTag,
    varTags,
    onChange,
}) => {
    return (
        <div class="content-box">
            <div class="table-responsive table-filter">
                <VariantTable
                    setModal={setModal} 
                    page="product" 
                    prodId={prodId} 
                    deleteVariant={deleteVariant} 
                    onAddTag={onAddTag}
                    onDeleteTag={onDeleteTag}
                    varTags={varTags}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

VariantBlock.propTypes = {

}

export default VariantBlock
