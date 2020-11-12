import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CollectionHeader = ({collection: { collection }, history}) => {
    return (
        <div class="product-header container-fluid">
            {/* <div id="breadcrumb">
                <nav className="breadcrumb">
                    <ol>
                        <li><b>My Portfolio</b></li>
                    </ol>
                </nav>
            </div> */}
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <div>
                    <div onClick={() => history.goBack()} style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                        <i class="fas fa-long-arrow-alt-left"></i>
                        <p style={{margin:'0 10px'}}>  Back</p>
                    </div>
                    <div style={{display: 'flex', height:'auto', marginBottom:'10px', alignItems:'center'}}>
                        <h3 style={{color: "black"}}>
                            {collection && collection.name}
                        </h3>
                    </div>
                </div>
                {/* <div>
                    <button onClick={setModal} style={{width:'300px', background:'#0098d3', borderColor:'#0098d3', outline:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <i style={{margin:'0 10px'}} class="fas fa-plus"></i>
                        Add Manually
                    </button>
                </div> */}
            </div>
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
