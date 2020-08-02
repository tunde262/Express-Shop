import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../actions/productActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Item = ({ setModal, store, page, product: {loading, sortedProducts}, deleteProduct }) => {  

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
                    <td><Link to={"/admin/product/" + store.store._id + "/" + product._id}>{product.name}</Link></td>
                    <td>5 Stock / 2 Variants</td>
                    <td>{product.price}</td>
                    <td><i onClick={() => deleteProduct(product._id)} className="fas fa-trash"></i></td>
                </tr>

            ));
        } else {
            productList = <h3>No Items</h3>
        }
    }

    let count;
    if(sortedProducts !== null && !loading) {
        count = sortedProducts.length;
    }

    return (
        <Fragment>
            {page === 'dashboard' ? (
                <section>
                    <p style={{alignSelf: 'flex-end'}}>{count} Items</p>
                    <Link to="/admin/add-product"><button type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Product</button></Link>
                </section>
            ) : null}
            {page === 'collection' ? (
                <section>
                    <p style={{alignSelf: "flex-end"}}>{count} Variants</p>
                    <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Manually</button>
                </section>
            ) : null}
            
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
    profile: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    store: state.store
})

export default connect(mapStateToProps, { deleteProduct })(Item);
