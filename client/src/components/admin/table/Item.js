import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProducts } from '../../../actions/productActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';

const Item = ({ product: {loading, products}, getProducts }) => {
    useEffect(() => {
        getProducts();
      }, [getProducts])

    const [modalShow, setModal] = useState(false);
     
      const openModal = () => {
        setModal(true);
      };

      const closeModal = () => {
        setModal(false);
      };
     

    let productList;
    if(products === null || loading) {
        productList = <Spinner />; 
    } else {
        if(products.length > 0) {
            productList = products.map(product => (
                <tr key={product._id}>
                    <td><img style={{width: '50px'}} src={`/api/products/image/${product.img_name}`} alt="img" /></td>
                    <td className="hide-sm">{product.title}</td>
                    <td>{product.price}</td>
                    <td><i className="fas fa-trash"></i></td>
                </tr>

            ));
        } else {
            productList = <h3>No Products</h3>
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <h2 className="my-2">Items</h2>
                </div>
                <div className="col-sm-6 flex-end">
                    <Link to="/admin/add" onClick={openModal}>
                        Add Item
                    </Link>
                </div>
            
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Img</th>
                        <th className="hide-sm">Title</th>
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
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    product: state.product
})

export default connect(mapStateToProps, { getProducts })(Item);
