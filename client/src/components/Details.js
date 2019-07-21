import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleDetail, addToCart, openModal, addTotals, getCart } from '../actions/productActions';

import { ButtonContainer } from './Button';
import { BackButton } from './common/BackButton';
import Spinner from './common/Spinner';

class Details extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this);
     }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.handleDetail(this.props.match.params.id);
        }
        
        this.props.getCart();
    }

    goBack(){
        this.props.history.goBack();
    }

    onAddToCart(id) {
        this.props.addToCart(id);
        this.props.addTotals();
    }

    openModal(id) {
        this.props.openModal(id);
    }

    todo(id){
        this.onAddToCart(id);
        this.openModal(id);
    }

    render() {
        const { detailProduct, loading } = this.props.product;
        // const { _id, company, img, info, price, title, inCart} = detailProduct;

        let detailItem;

        if(detailProduct === null || loading) {
            detailItem = <Spinner />;
        }
        else {
            detailItem = (
                <div>
                    {/* title */}
                    <div className="row">
                        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                            <h1>{detailProduct.title}</h1>
                        </div>
                    </div>
                    {/* end title */}
                    {/* product info */}
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <img src={`/api/products/image/${detailProduct.img_name}`} className="img-fluid" alt="product" />
                        </div>
                        {/* product text */}
                        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                            <h2>model : {detailProduct.title}</h2>
                            {/* <h4 className="text-uppercase text-muted mt-3 mb-2">
                                Brand : <span className="text-uppercase">{detailProduct.company}</span>
                            </h4> */}
                            <h4 className="text-blue">
                                <strong>price : <span>$</span>{detailProduct.price}</strong>
                            </h4>
                            <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                some info about product:
                            </p>
                            <p className="text-muted lead">{detailProduct.info}</p>
                            {/* buttons */}
                            <div>
                                <ButtonContainer onClick={this.goBack}>back to products</ButtonContainer>
                                <ButtonContainer
                                    cart
                                    disabled={detailProduct.inCart ? true : false}
                                    onClick={this.todo.bind(this, detailProduct._id)}
                                >
                                    {detailProduct.inCart ? 'inCart' : 'add to cart'}
                                </ButtonContainer>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <React.Fragment>
                <BackButton onClick={this.goBack}><i className="fas fa-arrow-left"></i></BackButton>
                {detailItem}
            </React.Fragment>
        )
    }
}

Details.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired,
    handleDetail: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { addToCart, getCart, openModal, addTotals, handleDetail })(Details);
