import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';
import ShortVariant from './ShortVariant';


const ShortVarTable = ({ 
    variant: {loading, modalVariants}, 
    handleVarClick, 
    itemList, 
    slide,
    onChange,
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
                />));
        } else {
            variantList = <h3>No Items</h3>
        }
    }

    return (
        <Fragment>
            <table className="table">
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
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

ShortVarTable.propTypes = {
    variant: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    variant: state.variant
})

export default connect(mapStateToProps, null)(ShortVarTable);
