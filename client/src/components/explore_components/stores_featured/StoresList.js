import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import StoreBlock from './StoreBlock';
import FeaturedNav from './FeaturedNav';

import topStores from '../../../utils/featuredStoreData/TopStoresData';
import trendingStores from '../../../utils/featuredStoreData/TrendingStoresData';

const StoresList = () => {

    const [topStoreList, setTopStoreList] = useState(topStores);
    const [trendingStoreList, setTrendingStoreList] = useState(trendingStores);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('top stores');
    
    let topStoreContent1;
    let topStoreContent2;
    let topStoreContent3;
 
    if(topStoreList !== null && topStoreList.length > 0) {
        const storeList1 = topStoreList.slice(0, 3);
        const storeList2 = topStoreList.slice(3, 6);
        const storeList3 = topStoreList.slice(6, 9);
        topStoreContent1 = storeList1.map(store => (
            <StoreBlock store={store} />
        ));

        topStoreContent2 = storeList2.map(store => (
            <StoreBlock store={store} />
        ));

        topStoreContent3 = storeList3.map(store => (
            <StoreBlock store={store} />
        ));
    };

    let trendingStoreContent1;
    let trendingStoreContent2;
    let trendingStoreContent3;
 
    if(trendingStoreList !== null && trendingStoreList.length > 0) {
        const storeList1 = trendingStoreList.slice(0, 3);
        const storeList2 = trendingStoreList.slice(3, 6);
        const storeList3 = trendingStoreList.slice(6, 9);
        trendingStoreContent1 = storeList1.map(store => (
            <StoreBlock store={store} />
        ));

        trendingStoreContent2 = storeList2.map(store => (
            <StoreBlock store={store} />
        ));

        trendingStoreContent3 = storeList3.map(store => (
            <StoreBlock store={store} />
        ));
    };

    let featuredContent;
    let featuredContent2;

    featuredContent = (
        <div className="store-grid">
            {topStoreList.length > 0 ? (
                <div className="grid-rows">
                    <div>
                        {topStoreContent1}
                    </div>
                    <div>
                        {topStoreContent2}
                    </div>
                    <div>
                        {topStoreContent3}
                    </div>
                </div>
            ) : (
                <h2>Sorry Nothing Today...</h2>
            )}
        </div>
    );
    featuredContent2 = (
        <div className="store-grid">
            {topStoreList.length > 0 ? (
                <div className="grid-rows">
                    <div>
                        {trendingStoreContent1}
                    </div>
                    <div>
                        {trendingStoreContent2}
                    </div>
                    <div>
                        {trendingStoreContent3}
                    </div>
                </div>
            ) : (
                <h2>Sorry Nothing Today...</h2>
            )}
        </div>
    );

    return (
        <div className="store-block-container">
            <FeaturedNav setTableShow1={setTableShow1} tableShow1={tableShow1} />

            <div className="profile-settings-transition">
                <div className={tableShow1 === 'top stores' ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                    {featuredContent}
                </div>
                <div className={tableShow1 === 'trending' ? "profile-settings-container active" : "profile-settings-container"} id="transition-4">
                    {featuredContent2}
                </div>
            </div>
        </div>
    )
}

StoresList.propTypes = {

}

export default StoresList;
