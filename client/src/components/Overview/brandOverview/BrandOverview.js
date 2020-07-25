import React from 'react';

import Overview from '../Overview';
import BrandOverviewItems from './BrandOverviewItems';

const BrandOverview = () => (
    <Overview shop title="Brands" link={"/stores"}>
        <BrandOverviewItems />
    </Overview>
);

export default BrandOverview
