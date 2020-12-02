import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCollections } from '../../../../actions/collectionActions';

import { HorizontalNav } from '../../../common/HorizontalNav';
import CollectionOverview from '../../../Overview/categoryOverview/CategoryOverview';

import shoeSampleImg from '../../../../utils/imgs/20484728.jpeg';
import paperTowelImg from '../../../../utils/imgs/paper_towels.jpeg';

const Collection_Elements = ({ collection, getCollections, slideform3, setSlideForm3, slideform4, setSlideForm4 }) => {
    // useEffect(() => {
    //     getCollections()
    // }, []);

    return (
        <Fragment>
            <div onClick={() => setSlideForm3(!slideform3)} style={{display:'100%', display:'flex', alignItems:'center', color:'#ff4b2b', padding:'20px 20px 0'}}>
                <i style={{fontSize:'12px', margin:'0 10px'}} class="fas fa-arrow-left"></i>
                <p style={{margin:'0'}}>go back</p>
            </div>
            <h3>You may also like...</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Follow collections to help you dicover intersting things</p>
            <div style={{marginBottom:'25px'}}>
                <CollectionOverview collections={collection.collections} shop={false} link={`/home`} />
            </div>
        
            <button onClick={() => setSlideForm4(!slideform4)} style={{width:'100%', outline:'none', margin:'0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue
            </button> 
        </Fragment>
    )
}

Collection_Elements.propTypes = {
    collection: PropTypes.object.isRequired,
    getCollections: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection,
});

export default connect(mapStateToProps, { getCollections })(Collection_Elements);
