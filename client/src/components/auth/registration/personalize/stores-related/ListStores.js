import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../../../common/Spinner';
import RelatedStores from '../../../../page_components/store/related/RelatedStores';

const ListStores = ({ store, product, slideform2, setSlideForm2, slideform3, setSlideForm3 }) => {
    // const [storesList, setStoresList] = useState([]);

    // useEffect(() => {
    //     renderStoresList();
    //   }, [store.stores])


    // const renderStoresList = () => {
    //     setStoresList([]);
    //     try {
    //         if(store.stores.length > 0) {
    //             store.stores.map(storeObj => {
    //                 setStoresList(storesList => [...storesList, (
    //                     <RecommendedStore product={product} store={storeObj} />
    //                 )])       
    //             });
    //         } else {
    //             setStoresList([(
    //                 <p style={{margin:'0'}}>No Collections</p>
    //             )])
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <Fragment>
            <div onClick={() => setSlideForm2(!slideform2)} style={{display:'100%', display:'flex', alignItems:'center', color:'#ff4b2b', padding:'15px 20px 0'}}>
                <i style={{fontSize:'12px', margin:'0 10px'}} class="fas fa-arrow-left"></i>
                <p style={{margin:'0'}}>go back</p>
            </div>
            <h3>Stores you may like</h3>
            <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Subscribe to stores you like for easy access</p>
            <div style={{height:'454px', borderTop:'1px solid rgb(214,214,214)', overflowY:'scroll'}}>
                <RelatedStores />
            </div>

            <button onClick={() => setSlideForm3(!slideform3)} style={{width:'100%', outline:'none', margin:'0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue
            </button> 
        </Fragment>
    )
}

ListStores.propTypes = {
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    store: state.store
});

export default connect(mapStateToProps, null)(ListStores);
