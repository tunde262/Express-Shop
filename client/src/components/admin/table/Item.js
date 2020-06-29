import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStoreProducts, deleteProduct } from '../../../actions/productActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Item = ({ product: {loading, products}, getStoreProducts, deleteProduct }) => {
    useEffect(() => {
        getStoreProducts();
      }, [getStoreProducts])

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
                    <td>
                        <input type="checkbox" value=""/>
                    </td>
                    <td><img style={{width: '50px'}} src={`/api/products/image/${product.img_name}`} alt="img" /></td>
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
            <section>
                <p style={{alignSelf: 'flex-end'}}>50 Items</p>
                <Link to="/admin/add-product" style={{background: '#42b499', color:'#fff'}} className="btn">Add Item</Link>
            </section>
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
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getStoreProducts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    product: state.product
})

export default connect(mapStateToProps, { getStoreProducts, deleteProduct })(Item);
