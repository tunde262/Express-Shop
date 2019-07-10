import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleDetail, addToCart, openModal, closeModal, addTotals } from '../../../actions/productActions';

class ProductCard extends Component {
    // componentDidMount() {
    //     console.log(this.props.product);
    // }

    onHandleDetailClick(id) {
        this.props.handleDetail(id);
    }

    onAddToCart(id) {
        this.props.addToCart(id);
        // this.props.addTotals();
    }

    openModal(id) {
        this.props.openModal(id);
    }

    closeModal(e) {
        this.props.closeModal();
    }

    todo(id){
        this.onAddToCart(id);
        // this.onHandleDetailClick(id);
        this.openModal(id);
    }

    render() {
        const { _id, title, img, price, inCart } = this.props.product;

        return (
            <ProductWrapper className="mx-auto col-6 col-lg-3 my-3">
                <div className="card">
                    <div 
                        className="img-container p-5" 
                        onClick={this.onHandleDetailClick.bind(this, _id)}
                    >
                        <Link to={"/" + _id}>
                            <img src={img} alt="product" className="card-img-top" />
                        </Link>
                        <button 
                            className="cart-btn" 
                            disabled={inCart ? true : false} 
                            onClick={this.todo.bind(this, _id)}
                        >
                            {inCart ? (
                                <p className="text-capitalize mb-0" disabled>
                                    {" "}
                                    in cart
                                </p>
                            ) : (
                                <i className="fas fa-cart-plus" />
                            )}
                        </button>
                    </div>
                        
                    
                    {/* card footer */ }
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">$</span>
                            {price}
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired,
    handleDetail: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    addTotals: PropTypes.func.isRequired
};

const ProductWrapper = styled.div`
    display: inline-block;
    .card {
        border: 0.04rem solid rgba(0,0,0,0.2);
        transition: all 0.5s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        display: flex;
        transition: all 1s linear;
        width: 100%;
        overflow: hidden;
    }
    &:hover {
        .card {
            border: 0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }
        .card-footer {
            background: rgba(247,247,247);
        }
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }
    .card-img-top {
        transition: all 0.5s linear
    }
    .img-container:hover .card-img-top{
        transform: scale(1.2);
    }
    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--lightBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition: all 0.5s linear;
    }
    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }
    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }

    @media (max-width: 765px) {
        .card {
            border-color: transparent;
        }
        .card-footer {
            flex-direction: column;
        }
      }

`;

export default connect(null, { handleDetail, addToCart, openModal, closeModal, addTotals })(ProductCard);

