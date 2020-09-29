import React from 'react';

import Overview from '../Overview';
import BrandOverviewItems from './BrandOverviewItems';

const BrandOverview = ({stores, title}) => (
    <Overview title={title} link={"/stores"}>
        <BrandOverviewItems stores={stores} />
    </Overview>
);

export default BrandOverview
