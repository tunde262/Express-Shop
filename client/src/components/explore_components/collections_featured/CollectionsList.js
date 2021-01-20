import React from 'react'
import PropTypes from 'prop-types';

import CollectionOverview from '../../Overview/categoryOverview/CategoryOverview';

import paperTowelImg from '../../../utils/imgs/paper_towels.jpeg';
import categoryImg from '../../../utils/imgs/personal_care_promo_block.jpg';
import helpImg from '../../../utils/imgs/help_us_banner.jpg';
import shoeSampleImg from '../../../utils/imgs/20484728.jpeg';

const CollectionsList = ({collections, title}) => {
    return (
        <div style={{background:'#fff', margin:'10px', border:'1px solid #e3e8ee'}}>
            <CollectionOverview title={title} collections={collections} shop={false} link={`/home`} />
        </div>
    )
}

CollectionsList.propTypes = {

}

export default CollectionsList
