import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../actions/productActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const ShortItem = ({ product: {loading, sortedProducts}, deleteProduct, handleClick, itemList }) => {  
    const [listForColor, setListForColor] = useState([]);
    const [colorSwitch, setColorSwitch] = useState(false);

    const itemClick = (newItem) => {
        handleClick(newItem);
        setColorSwitch(!colorSwitch)
        if(listForColor.includes(newItem)) {
            // Get remove index
            const removeIndex = listForColor.indexOf(newItem);

            const newList = listForColor.splice(removeIndex, 1);

            setListForColor([...newList]);
        } else {
            setListForColor([...listForColor, newItem]);
        }
    }

    let productList;
    if(sortedProducts === null || loading) {
        productList = <Spinner />; 
    } else {
        if(sortedProducts.length > 0) {
            
            productList = sortedProducts.map(product => {
                let rowStyle;
                if(listForColor.includes(product._id)){
                    rowStyle = {background: 'rgb(0,0,255,0.2)'};
                }
                if(listForColor.includes(!product._id)){
                    rowStyle = {background: 'rgb(0,0,0,0)'};
                }

                return (
                    <tr key={product._id} style={rowStyle} onClick={() => itemClick(product._id)}>
                        <td>
                            <input class="edit_info" type="checkbox" style={{width:'15px'}}/>
                        </td>
                        <td>{product.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${product.img_gallery[0].img_name}`} alt="img" />}</td>
                        <td><Link to={"/admin/product/" + product._id}>{product.name}</Link></td>
                        <td>5 Stock / 2 Variants</td>
                    </tr>
                )

            });
        } else {
            productList = <h3>No Items</h3>
        }
    }

    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="name1" />
                        </th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>{productList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

ShortItem.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { deleteProduct })(ShortItem);
