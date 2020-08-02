import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ProductHeader = ({product: { detailProduct }, history}) => {
    return (
        <div class="product-header container-fluid">
            <div id="breadcrumb">
                <nav className="breadcrumb">
                    <ol>
                        <li><b>My Portfolio</b></li>
                    </ol>
                </nav>
            </div>
            <i onClick={() => history.goBack()} style={{fontSize:'20px'}} class="fas fa-arrow-left"></i>
            <div style={{display: 'flex', height:'auto', marginBottom:'10px', alignItems:'center'}}>
                {detailProduct && detailProduct.img_gallery[0] ? <img style={{width: '50px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/products/image/${detailProduct.img_gallery[0].img_name}`} alt="img" /> : null}
                <h3 style={{color: "black"}}>
                    {detailProduct && detailProduct.name}
                </h3>
            </div>
            <hr style={{margin:'0'}} />
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
