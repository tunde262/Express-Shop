import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const HeaderLocation = ({storageLocation: { detailLocation }, history}) => {
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
                <h3 style={{color: "black"}}>
                    {detailLocation && detailLocation.name}
                </h3>
            </div>
            <hr style={{margin:'0'}} />
        </div>
    )
}

HeaderLocation.propTypes = {
    storageLocation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    storageLocation: state.location,
})

export default connect(mapStateToProps, null)(withRouter(HeaderLocation));
