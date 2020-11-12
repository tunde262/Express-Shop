import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ProductHeader = ({product: { detailProduct }, history}) => {
    return (
        <div class="product-header container-fluid">
            <div style={{display: 'flex', height:'auto', flexDirection:'column', alignItems:'flex-start', marginBottom:'10px'}}>
                <div onClick={() => history.goBack()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                    <i class="fas fa-long-arrow-alt-left"></i>
                    <p style={{margin:'0 10px'}}>  Back</p>
                </div>
                <div style={{display: 'flex', height:'auto', marginBottom:'10px', alignItems:'center'}}>
                    <h3 style={{color: "black"}}>
                        {detailProduct && detailProduct.name}
                    </h3>
                </div>
            </div>
        </div>
    )
}

ProductHeader.propTypes = {
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    product: state.product,
})

export default connect(mapStateToProps, null)(withRouter(ProductHeader));
