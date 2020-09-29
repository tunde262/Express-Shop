import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openOverview, closeOverview } from '../../actions/productActions';

import ReactGA from 'react-ga';

import styled from 'styled-components';

class Overview extends Component{
    openOverview(e) {
        this.props.openOverview();
        ReactGA.event({
            category: 'Cart',
            action: 'Cart-Overview',
            label: 'Opened'
        });
    }

    closeOverview(e) {
        this.props.closeOverview();
        ReactGA.event({
            category: 'Cart',
            action: 'Cart-Overview',
            label: 'closed'
        });
    }
    render() {
        const { cartOverview, cartQty } = this.props.product;
        return (
            <div style={{marginTop: '10px'}}>
                <div style={{display: 'flex', alignItems: 'center', padding: '0 50px 0 30px'}}>
                    <h5 style={{color:'#808080'}}>{this.props.title}</h5>
                    <div style={{flex: '1'}} />
                    {/* {this.props.toggle ? (
                        <Fragment>
                            {cartOverview ? (
                                <CartOverviewButton 
                                    onClick={this.closeOverview.bind(this)}
                                >
                                    <i class="fas fa-minus"></i>
                                </CartOverviewButton>
                            ) : (
                                <CartOverviewButton 
                                    onClick={this.openOverview.bind(this)}
                                >
                                    <i class="fas fa-shopping-cart"></i>
                                    {cartQty ? 
                                        <span style={{position: "absolute", top: "5px", right: "5px", color: "white", fontSize: ".8rem"}} class="badge badge-pill badge-dark"><small><strong>{cartQty}</strong></small></span> :
                                        null
                                    }
                                </CartOverviewButton>
                            )}
                        </Fragment>
                    ) : null} */}
                    {/* {cartOverview ? (
                        <div onClick={this.closeOverview.bind(this)}><i class="fas fa-minus"></i></div>
                    ) : (
                        <div onClick={this.openOverview.bind(this)}><i class="fas fa-plus"></i></div>
                    )} */}
            
                    {this.props.shop ? (
                        <Link 
                            to={this.props.link}
                            style={{
                            fontWeight: '400', 
                            color: '#5f6368', 
                            fontSize: '1rem'
                            }}
                        >
                            <i class="fas fa-shopping-bag"></i>{'  '}
                            Shop All
                        </Link>
                    ) : null}
                </div>
                {this.props.children}
            </div>
        )
    }
}

Overview.propTypes = {
    openOverview: PropTypes.func.isRequired,
    closeOverview: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    product: state.product
});

const Button = styled.button`
    font-weight: 400;
    color: #5f6368;
    font-size: .8rem;
    border: 0.05rem solid #5f6368;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.5rem 0.5rem 0 0;
    min-width: 100px;
    height: 3rem;
    text-align: center;
    
`;

const CartOverviewButton = styled.button`
    color: white;
    border-radius: 10px 0 0 10px;
    background: orange;
    border-color: transparent;
    cursor: pointer;
    position: fixed;
    margin-top: 200px;
    top: 100;
    right: 0;
    width: 60px;
    height: 60px;   
    text-align: center;

    i {
        font-size: 1.5rem;
    }
`;

export default connect(mapStateToProps, { openOverview, closeOverview })(Overview);
