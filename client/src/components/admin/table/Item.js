import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../actions/productActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Item = ({ product: {loading, sortedProducts}, deleteProduct }) => {  

    let productList;
    if(sortedProducts === null || loading) {
        productList = <Spinner />; 
    } else {
        if(sortedProducts.length > 0) {
            productList = sortedProducts.map(product => (
                <tr key={product._id}>
                    <td>
                        <input type="checkbox" value=""/>
                    </td>
                    <td>{product.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${product.img_gallery[0].img_name}`} alt="img" />}</td>
                    <td><Link to={"/admin/product/" + product._id}>{product.name}</Link></td>
                    <td>5 Stock / 2 Variants</td>
                    <td>{product.price}</td>
                    <td><i onClick={() => deleteProduct(product._id)} className="fas fa-trash"></i></td>
                </tr>

            ));
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
                            <input type="checkbox" value=""/>
                        </th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th />
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

Item.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { deleteProduct })(Item);
