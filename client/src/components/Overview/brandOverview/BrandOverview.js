import React from 'react';

import Overview from '../Overview';
import BrandOverviewItems from './BrandOverviewItems';

const BrandOverview = ({stores, title, profile}) => (
    <Overview title={title} link={"/stores"}>
        <BrandOverviewItems stores={stores} profile={profile} />
    </Overview>
);

export default BrandOverview
