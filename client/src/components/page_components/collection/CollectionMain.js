import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../../admin/table/Table';   
import { getProductsInCollection } from '../../../actions/productActions'; 
import { getCollections, getCollectionsByTagList } from '../../../actions/collectionActions';             
import Header from '../../header/Header';
import Container from '../../ProductList/Container';

import mixpanel from 'mixpanel-browser';

import RelatedCollections from './related/RelatedCollections';

const CollectionMain = ({ 
    collection, 
    getCollectionsByTagList, 
    getCollections,
    setTableShow1, 
    tableShow1, 
    getProductsInCollection
}) => {

    const [gotCollections, setGotCollections] = useState(false);
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        if(collection.collection) {
            getProductsInCollection(collection.collection._id);
        }
    }, [collection.collection]);


    let pageContent = null;

    if(collection.collection !== null) {
        if(tableShow1 === 'shop') {
            pageContent = (
                <Fragment>
                    <div className="header-nav-container mobile">
                        <div style={{padding:'10px'}}>
                            {/* <h3 style={{fontSize:'12px', letterSpacing:'1px',color:'#808080'}}>
                                Pick A Category
                            </h3> */}
                        </div>
                        <div style={{marginTop:'-2rem'}}>
                            <Header />
                        </div>
                    </div>
        
                    {/* <h1>Collection Page</h1> */}
                    <div className="product-list-container">
                        <div className="filter-container">
                            <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                            <i class="fas fa-sliders-h"></i>
                        </div>
                        <Container page="collection" />
                    </div>
                </Fragment>
            )
        } else if (tableShow1 === 'related') {
            pageContent = (
                <RelatedCollections />
            );
        }
    } else {
        pageContent = (<h3>This Collection doesn't exist</h3>);
    }

    if(!gotCollections && tableShow1 === 'related' && collection.collection) {
        console.log('FETCH RELATED COLLECTIONS')

        getCollectionsByTagList(collection.collection.tags, skip);
        
        setGotCollections(true);
    }


    return (
        <Fragment>
            {/* {admin === "true" && store !== null ? (
                <div className="store-actions-container">
                    <div className="store-actions">
                        <i style={{fontSize:'1.3rem'}} onClick={e => setTable('settings')} className="fas fa-cog"></i>
                        <Link to={`/store/${store._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i class="fas fa-share-alt"></i>
                    </div>
                </div>
            ) : null} */}
            {pageContent}
        </Fragment>
    )
}

CollectionMain.propTypes = {
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    getProductsInCollection: PropTypes.func.isRequired,
    getCollectionsByTagList: PropTypes.func.isRequired,
    getCollections: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product
})

export default connect(mapStateToProps, { getProductsInCollection, getCollections, getCollectionsByTagList })(CollectionMain);