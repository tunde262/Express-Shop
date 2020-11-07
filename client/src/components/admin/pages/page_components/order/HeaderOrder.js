import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const OrderHeader = ({order, history}) => {
    return (
        <div class="product-header container-fluid">
            {/* <div id="breadcrumb">
                <nav className="breadcrumb">
                    <ol>
                        <li><b>My Portfolio</b></li>
                    </ol>
                </nav>
            </div> */}
            <div style={{display: 'flex', height:'auto', marginBottom:'10px', alignItems:'center'}}>
                <i onClick={() => history.goBack()} style={{fontSize:'20px'}} class="fas fa-arrow-left"></i>
                <div style={{display: 'flex', height:'auto', marginBottom:'10px', alignItems:'center'}}>
                    <h3 style={{color: "black"}}>
                        Order Details
                    </h3>
                </div>
            </div>
        </div>
    )
}

OrderHeader.propTypes = {
    order: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    order: state.order,
})

export default connect(mapStateToProps, null)(withRouter(OrderHeader));
