import React from 'react'
import PropTypes from 'prop-types';

import Inventory from '../../../table/Inventory';

const InventoryBlock = ({
    setModal
}) => {
    return (
        <div style={{margin:'10px 0', width:'100%'}}>
            {/* <div class="table-responsive table-filter">
                <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
            </div> */}
            <div class="content-box">
                <div class="table-responsive table-filter">
                    <Inventory 
                        setModal={setModal} 
                        page="location" 
                    />
                </div>
            </div>
        </div>
    )
}

InventoryBlock.propTypes = {

}

export default InventoryBlock
