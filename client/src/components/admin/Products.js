import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from '../../actions/productActions';

class Products extends Component {
    onDeleteClick(prod_id) {
        this.props.deleteProduct(prod_id);
        window.location.reload(true); 
    }

    render() {
        let product = this.props.products.map(prod => (
            <tr key={prod._id}>
                <td><img style={{width: '50px'}} src={`/api/products/image/${prod.img_name}`} alt="img" /></td>
                <td><Link to={`/` + prod._id}>{prod.title}</Link></td>
                <td>{prod.price}</td>
                <td><div><i className="fas fa-trash" onClick={this.onDeleteClick.bind(this, prod._id)}></i></div></td>
            </tr>
        ));

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th colspan="3">
                                {this.props.products.length} Items
                            </th>
                            <th colspan="3">
                                <Link to="/admin/add">
                                    Add Product
                                </Link>
                            </th>
                        </tr>
                        <tr>
                            <th>img</th>
                            <th>Product Name</th>
                            <th colspan="2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product}
                    </tbody>
                </table>
            </div>
        )
    }
}

Products.propTypes = {
    deleteProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { deleteProduct })(Products);
