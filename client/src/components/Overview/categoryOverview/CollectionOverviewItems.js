import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../common/Spinner';
import CollectionCard from './CollectionCard';
import Title from '../../Title';

import { HorizontalNav } from '../../common/HorizontalNav';

const CollectionOverviewItems = ({ collections, collection: { loading }, shop }) => {
    
    let collectionList;

    if(collections === null || loading) {
        collectionList = <Spinner />;
    }
    else {
        if(collections.length > 0) {
            collectionList = collections.map(collection => (
                <div style={{margin:'0'}}>
                    {shop ? (
                        <CollectionCard key={collection._id} collection={collection} />
                    ) : (
                        <CollectionCard preview key={collection._id} collection={collection} />
                    )}
                    
                </div>
            ))
        }
        else {
            collectionList = <Title name="No Collections" title="Available" />
        }
    }

    return (
        <HorizontalNav style={{padding: '0 1rem'}} background="var(--body-color)">
            {collectionList}
        </HorizontalNav>
    )
}

CollectionOverviewItems.propTypes = {
    collection: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
});

export default connect(mapStateToProps, null)(CollectionOverviewItems);