import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';           

import Spinner from '../../../common/Spinner';
import RecommendedCollection from './Recommended_Collection';

import mixpanel from 'mixpanel-browser';

const RelatedCollections = ({ collection, product}) => {

    const [collectionsList, setCollectionsList] = useState([]);

    useEffect(() => {
        renderCollectionsList();
      }, [collection.collections])


    const renderCollectionsList = async () => {
        setCollectionsList([]);
        try {
            if(collection.collections.length > 0) {
                collection.collections.map(async collectionObj => {
                    const res = await axios.get(`/api/products/collection/${collectionObj._id}`);
                    if(res.data.length > 0) {
                        setCollectionsList(collectionsList => [...collectionsList, (
                            <RecommendedCollection products={res.data} collection={collectionObj} />
                        )]) 
                    } else {
                        return
                    }
                });
            } else {
                setCollectionsList([(
                    <p style={{margin:'0'}}>Sorry no collections...</p>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="product-list-container">
            {!collectionsList.length > 0 ? <Spinner /> : collectionsList}
        </div>
    )
}

RelatedCollections.propTypes = {
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product
})

export default connect(mapStateToProps, null)(RelatedCollections);