import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ProductHeader = ({product: { detailProduct }, onAddProduct, history}) => {
    return (
        <Fragment>
            <div onClick={() => history.goBack()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                <i class="fas fa-long-arrow-alt-left"></i>
                <p style={{margin:'0 10px'}}>  Back</p>
            </div>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <h3>{detailProduct && detailProduct.name}</h3>
                <button onClick={(e) => onAddProduct(e)} style={{width:'300px'}}>
                    Save
                </button>
            </div>
        </Fragment>
    )
}

ProductHeader.propTypes = {
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    product: state.product,
})

export default connect(mapStateToProps, null)(withRouter(ProductHeader));
