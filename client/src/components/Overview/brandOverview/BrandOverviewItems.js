import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Spinner from '../../common/Spinner';
import StoreCard from './StoreCard';

import { HorizontalNav } from '../../common/HorizontalNav';

const BrandOverviewItems = ({stores, profile}) => {
    let storeList;

    if(stores && stores.length > 0) {
        storeList = stores.map(storeObj => (
            <StoreCard key={storeObj._id} storeObj={storeObj} profile={profile} />
        ))
    }
    else {
        storeList = <Spinner />
    }

    return (
        <HorizontalNav background="var(--body-color)">
            {storeList}
        </HorizontalNav>
    )
}

BrandOverviewItems.propTypes = {

}


export default BrandOverviewItems;