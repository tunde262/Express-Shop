import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CollectionHeader = ({collection: { collection }, history}) => {
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
                    {collection && collection.name}
                </h3>
            </div>
            <hr style={{margin:'0'}} />
        </div>
    )
}

CollectionHeader.propTypes = {
    collection: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
})

export default connect(mapStateToProps, null)(withRouter(CollectionHeader));
