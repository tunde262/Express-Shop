import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';

import ShortVariant from './ShortVariant';

import { editVarLocation, addVarLocation } from '../../../../actions/variantActions';
import { addProductToLocation } from '../../../../actions/locationActions';


const ShortVarTable = ({ 
    variant: {loading, modalVariants}, 
    product,
    handleVarClick, 
    itemList, 
    slide,
    onChange,
    modalForm,
    editVarLocation,
    addVarLocation,
    addProductToLocation,
    storageLocation,
    page
}) => {  

    let variantList;
    if(modalVariants === null || loading) {
        variantList = <Spinner />; 
    } else {
        if(modalVariants.length > 0) {
            
            variantList = modalVariants.map(detailVariant => (
                <ShortVariant 
                    detailVariant={detailVariant} 
                    handleVarClick={handleVarClick} 
                    itemList={itemList} 
                    slide={slide} 
                    onChange={onChange}
                    modalForm={modalForm}
                    editVarLocation={editVarLocation}
                    addVarLocation={addVarLocation}
                    addProductToLocation={addProductToLocation}
                    storageLocation={storageLocation}
                    product={product}
                    page={page}
                />));
        } else {
            variantList = <h3>No Items</h3>
        }
    }

    return (
        <Fragment>
            <div className="table">
                {/* <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="name1" />
                        </th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Stock</th>
                    </tr>
                </thead> */}
                <div className="tbody">{variantList}</div>
            </div>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

ShortVarTable.propTypes = {
    variant: PropTypes.object.isRequired,
    editVarLocation: PropTypes.func.isRequired,
    storageLocation: PropTypes.object.isRequired,
    addVarLocation: PropTypes.func.isRequired,
    addProductToLocation: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    variant: state.variant,
    storageLocation: state.location,
    product: state.product
})

export default connect(mapStateToProps, { editVarLocation, addVarLocation, addProductToLocation })(ShortVarTable);
