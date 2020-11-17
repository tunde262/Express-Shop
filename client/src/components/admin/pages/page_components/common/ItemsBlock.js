import React from 'react';
import PropTypes from 'prop-types';
import ItemTable from '../../../table/ItemTable/ItemTable';

const ItemsBlock = ({
    product, 
    setModal,
    page
}) => {
    return (
        <div class="content-box">
            <div class="table-responsive table-filter">
                <ItemTable 
                    page={page}
                    product={product} 
                    setModal={setModal} 
                />
            </div>
        </div>
    )
}

ItemsBlock.propTypes = {

}

export default ItemsBlock
