import React from 'react';
import PropTypes from 'prop-types';

import VariantTable from '../../../table/VariantTable/VariantTable';

const LocationVariantsBlock = ({
    detailLocation,
    setModal,
    prodId,
    deleteVariant,
    onAddTag,
    onDeleteTag,
    varTags,
    onChange,
}) => {
    return (
        <div style={{margin:'10px 0'}}>
            {/* <div class="table-responsive table-filter">
                <Variant setModal={setModal} page="product" prodId={match.params.productId} deleteVariant={deleteVariant} />
            </div> */}
            <div style={{background:'#fff', margin:'10px 0', border:'1px solid rgb(214, 214, 214)'}}>
                <div style={{background:'#fff', padding:'1rem', width:'100%', justifyContent:'space-between', display:'flex', alignItems:'center', borderBottom:'1px solid rgb(214, 214, 214)'}}>
                    <div style={{display: 'flex', margin:'0 1rem', alignItems: 'center'}}>
                        <i style={{color:'#3CB371', margin:'0 10px', fontSize:'1.1rem'}} class="fas fa-map-marker-alt"></i>
                        <p style={{margin:'1rem 0'}}>{detailLocation.name}</p>
                    </div>
                    <div style={{margin:'0 1rem'}}>
                        <button disabled className="btn">Save</button>
                    </div>
                </div>
                <div class="table-responsive table-filter">
                    <VariantTable 
                        setModal={setModal} 
                        page="inventory" 
                        prodId={prodId} 
                        deleteVariant={deleteVariant}
                        onAddTag={onAddTag}
                        onDeleteTag={onDeleteTag}
                        varTags={varTags}
                        onChange={onChange}
                        locId={detailLocation._id}
                    />
                </div>
            </div>
        </div>
    )
}

LocationVariantsBlock.propTypes = {

}

export default LocationVariantsBlock
