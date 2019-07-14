import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../actions/productActions';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            file: '',
            price: '',
            company: '',
            info: '',
            category: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fileChanged = this.fileChanged.bind(this);
    }

    fileChanged(e) {
        const f = e.target.files[0];
        this.setState({
            file: f
        });
    }
    
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('title', this.state.title);
        data.append('price', this.state.price);
        data.append('company', this.state.company);
        data.append('info', this.state.info);
        data.append('category', this.state.category);

        // const newProduct = {
        //     title: this.state.title,
        //     img: this.state.img,
        //     price: this.state.price,
        //     company: this.state.company,
        //     info: this.state.info,
        //     category: this.state.category,
        // }

        this.props.addProduct(data, this.props.history);
    }

    

  render() {

    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i> Add Product
                    </h1>   
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <label>Name</label>
                        <input
                            type="name"
                            name="title"
                            className="form-control"
                            placeholder="Enter Product Name"
                            value={this.state.title}
                            onChange={this.onChange}
                        />
                        </div>
                        <div className="form-group">
                        <label>Img</label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="form-control"
                            placeholder="Start with ../img/"
                            value={this.state.img}
                            onChange={this.fileChanged}
                        />
                        </div>
                        <div className="form-group">
                        <label>Price</label>
                        <input
                            type="text"
                            name="price"
                            className="form-control"
                            placeholder="How much do you want to sell this item for?"
                            value={this.state.price}
                            onChange={this.onChange}
                        />
                        </div>
                        <div className="form-group">
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            className="form-control"
                            placeholder="company"
                            value={this.state.company}
                            onChange={this.onChange}
                        />
                        </div>
                        <div className="form-group">
                        <label>Info</label>
                        <input
                            type="text"
                            name="info"
                            className="form-control"
                            placeholder="Enter Info or Description"
                            value={this.state.info}
                            onChange={this.onChange}
                        />
                        </div>
                        <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            className="form-control"
                            placeholder="What type of item is this?"
                            value={this.state.category}
                            onChange={this.onChange}
                        />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                        Add Product
                        </button>
                    </form>
                    <p className="lead mt-4"><Link to="/admin">Back to admin</Link></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
  }
}

AddProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
}

export default connect(null, { addProduct })(AddProduct);
