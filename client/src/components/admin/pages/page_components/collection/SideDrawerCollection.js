import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { getCollectionsByStoreId } from '../../../../../actions/collectionActions';

import Spinner from '../../../../common/Spinner';

const SideDrawerCollection = ({setSlideForm1, getCollectionsByStoreId, storeId, collection: { collections, loading }}) => {
    useEffect(() => {
        renderCollectionList();
    }, [collections]);

    const [collectionList, setCollectionList] = useState([]);
    const [gotCollections, setGotCollections] = useState(false);

    const renderCollectionList = async () => {
        setCollectionList([]);
        try {
            if(collections.length > 0) {
                collections.map(async collection => {
                    const res = await axios.get(`/api/products/collection/${collection._id}`);
                    console.log(res.data);
                    setCollectionList(collectionList => [...collectionList, (
                        <a style={{textDecoration:'none'}} href={`https://www.cardboardexpress.com/admin/collection/${storeId}/${collection._id}?show=detail`}>
                            <div key={collection._id} style={{display:'flex', justifyContent:'space-between', height:'100px', width:'100%', padding:'10px', borderBottom:'1px solid #cecece'}}>
                                <div style={{display:'flex', height:'100%', overflow:'hidden', width:'200px', paddingLeft:'10px', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                                    <div className="line-clamp-1" style={{height:'20px', overflow:'hidden', width:'100%'}}>
                                        <h3 style={{color: '#333', fontWeight: '300', fontSize: '16px', color: 'rgb(51, 51, 51)'}}>{collection.name}</h3>
                                    </div>
                                    <p style={{margin:'0', color:'#808080'}}><span style={{color:'#ff4b2b', fontSize:'14px'}}>{res.data.length}</span> Items / <span style={{color:'#ff4b2b', fontSize:'14px'}}>0</span> Sold</p>
                                </div>
                                <div style={{display:'flex', height:'100%', color:'#808080', paddingRight:'10px', justifyContent:'center', alignItems:'center'}}>
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </a>
                    )])
                });
            } else {
                setCollectionList([(
                    <button>New Collection</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotCollections) {
        getCollectionsByStoreId(storeId);
        setGotCollections(true);
    }

    console.log('COLLECTION LIST DATA');
    console.log(collectionList);
        

    return (
        <Fragment>
            {/* <div onClick={() => setSlideForm1(false)} style={{display:'flex', color:'#808080', width:'100%', padding:'1rem 0 0 1.5rem', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                <i className="fas fa-long-arrow-alt-left"></i>
                <p style={{margin:'0 10px'}}>  Back to menu</p>
            </div> */}
            <div style={{overflowY:'scroll', borderTop:'1px solid #f2f2f2', marginTop:'10px', height:'80vh'}}>
                {!collectionList.length > 0 ? <Spinner /> : collectionList}
            </div>
        </Fragment>
    )
}

SideDrawerCollection.propTypes = {
    collection: PropTypes.object.isRequired,
    getCollectionsByStoreId: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    collection: state.collection,
})

export default connect(mapStateToProps, { getCollectionsByStoreId})(SideDrawerCollection);

