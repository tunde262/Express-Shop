import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const HeaderLocation = ({storageLocation: { detailLocation }, history}) => {
    return (
        <div className="product-header container-fluid">
            {/* <div id="breadcrumb">
                <nav className="breadcrumb">
                    <ol>
                        <li><b>My Portfolio</b></li>
                    </ol>
                </nav>
            </div> */}
            <div style={{display: 'flex', flexDirection:'column', height:'auto', marginBottom:'10px', alignItems:'flex-start'}}>
                <div onClick={() => history.goBack()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                    <i className="fas fa-long-arrow-alt-left"></i>
                    <p style={{margin:'0 10px'}}>  Back</p>
                </div>
                <div style={{display: 'flex', height:'auto', marginBottom:'10px', alignItems:'center'}}>
                    <h3 style={{color: "black"}}>
                        {detailLocation && detailLocation.name}
                    </h3>
                </div>
            </div>
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
