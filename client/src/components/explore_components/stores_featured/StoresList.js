import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import StoreBlock from './StoreBlock';
import FeaturedNav from './FeaturedNav';

import { favorite } from '../../../actions/storeActions';

import topStores from '../../../utils/featuredStoreData/TopStoresData';
import trendingStores from '../../../utils/featuredStoreData/TrendingStoresData';

const StoresList = ({ 
    store: { 
        featured,
        trending
    },
    profile,
    favorite
}) => {

    const [topStoreList, setTopStoreList] = useState(topStores);
    const [trendingStoreList, setTrendingStoreList] = useState(trendingStores);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('top stores');

    const [active, setActive] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleTableShow1 = (value) => {
        setTableShow1(value);
        setActive(false);
    }
    
    let topStoreContent1;
    let topStoreContent2;
    let topStoreContent3;
 
    if(featured !== null && featured.length > 0) {
        const storeList1 = featured.slice(0, 3);
        const storeList2 = featured.slice(3, 6);
        const storeList3 = featured.slice(6, 9);
        topStoreContent1 = storeList1.map(store => (
            <StoreBlock store={store} profile={profile} favorite={favorite} />
        ));

        topStoreContent2 = storeList2.map(store => (
            <StoreBlock store={store} profile={profile} favorite={favorite} />
        ));

        topStoreContent3 = storeList3.map(store => (
            <StoreBlock store={store} profile={profile} favorite={favorite} />
        ));
    };

    let trendingStoreContent1;
    let trendingStoreContent2;
    let trendingStoreContent3;
 
    if(trending !== null && trending.length > 0) {
        const storeList1 = trending.slice(0, 3);
        const storeList2 = trending.slice(3, 6);
        const storeList3 = trending.slice(6, 9);
        trendingStoreContent1 = storeList1.map(store => (
            <StoreBlock store={store} profile={profile} favorite={favorite} />
        ));

        trendingStoreContent2 = storeList2.map(store => (
            <StoreBlock store={store} profile={profile} favorite={favorite} />
        ));

        trendingStoreContent3 = storeList3.map(store => (
            <StoreBlock store={store} profile={profile} favorite={favorite} />
        ));
    };

    let featuredContent;
    let featuredContent2;

    featuredContent = (
        <div className={active ? "store-grid active" : "store-grid short"}>
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
        <div className={active ? "store-grid active" : "store-grid short"}>
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

    const isMobile = windowWidth <= 769;

    const isTablet = windowWidth <= 1000;

    return (
        <div className="store-list-container">
            <FeaturedNav setTableShow1={handleTableShow1} tableShow1={tableShow1} />

            <div className="profile-settings-transition">
                <div className={tableShow1 === 'top stores' ? "profile-settings-container active" : "profile-settings-container"} id="transition-3">
                    {featuredContent}
                </div>
                <div className={tableShow1 === 'trending' ? "profile-settings-container active" : "profile-settings-container"} id="transition-4">
                    {featuredContent2}
                </div>
            </div>

            <div onClick={() => setActive(!active)} style={{width:'100%', height:'50px', color:'#808080', display:'flex', justifyContent:'center', alignItems:'center'}}>
                {active || !isTablet ? (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'2px 10px 0'}} class="fas fa-chevron-down"></i>
                        <p style={{margin: '0'}}>View all</p>
                    </Fragment>
                ): (
                    <Fragment>
                        <i style={{fontSize:'14px', margin:'2px 10px 0'}} class="fas fa-chevron-down"></i>
                        <p style={{margin: '0'}}>Show more</p>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

StoresList.propTypes = {
    store: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    favorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    profile: state.profile
})

export default connect(mapStateToProps, { favorite })(StoresList);
