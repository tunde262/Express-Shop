import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { HorizontalNav } from '../../common/HorizontalNav';
import Spinner from '../../common/Spinner';

const BrandOverviewItems = ({stores}) => {
    let storeList;

    if(stores && stores.length > 0) {
        storeList = stores.map(store => (
            <Link key={store._id} to={`/store/${store._id}`}>
                <BrandOverviewItem>
                    <div class="card__container">
                        <div class="card__image">
                            {store.banner_imgs && store.banner_imgs.length > 0 && <img src={`/api/stores/image/${store.banner_imgs[0].img_name}`} alt="" />}
                        </div>
                        <div className="card__logo__image">
                            <img src={`/api/stores/image/${store.img_name}`} />
                        </div>
                        <div class="card__body">
                            <h3 class="card__body__heading">{store.name}</h3>
                        </div>
                    </div>
                </BrandOverviewItem>
            </Link>
        ));
    }
    else {
        storeList = <h2 style={{color:'#333', fontWeight:'300'}}><Spinner/></h2>
    }

    return (
        <HorizontalNav background="white">
            {storeList}
            {/* <BrandOverviewItem>
                <div class="card__container" style={{color:'#808080', justifyContent: 'center', textAlign:'center'}}>
                    <h4>See <br/> Others</h4>
                </div>
            </BrandOverviewItem> */}
        </HorizontalNav>
    )
}

const BrandOverviewItem = styled.div`
    display: inline-box;
    margin: 0 15px;
`;

export default BrandOverviewItems;
