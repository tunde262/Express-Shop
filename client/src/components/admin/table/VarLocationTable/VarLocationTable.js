import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../common/Spinner';
import 'react-responsive-modal/styles.css';
import VarLocationItem from './VarLocationItem';


const VarLocationTable = ({ product: {loading, modalProducts}, setModalForm1, modalForm1, slide }) => {  
    // const [listForColor, setListForColor] = useState([]);
    // const [colorSwitch, setColorSwitch] = useState(false);

    // const itemClick = (newItem) => {
    //     handleClick(newItem);
    //     setColorSwitch(!colorSwitch)
    //     if(listForColor.includes(newItem)) {
    //         // Get remove index
    //         const removeIndex = listForColor.indexOf(newItem);

    //         const newList = listForColor.splice(removeIndex, 1);

    //         setListForColor([...newList]);
    //     } else {
    //         setListForColor([...listForColor, newItem]);
    //     }
    // }

    let productList;
    if(modalProducts === null || loading) {
        productList = <Spinner />; 
    } else {
        if(modalProducts.length > 0) {
            
            productList = modalProducts.map(detailItem => <VarLocationItem detailItem={detailItem} setModalForm1={setModalForm1} modalForm1={modalForm1} slide={slide} />);
        } else {
            productList = <h3>No Items</h3>
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
                <tbody>{productList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

VarLocationTable.propTypes = {
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, null)(VarLocationTable);
