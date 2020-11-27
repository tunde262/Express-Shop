import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../header/Header';

const TrendingCollections = props => {
    return (
        <div className="header-nav-container">
            <div style={{padding:'10px'}}>
                <h3 style={{fontSize:'12px', letterSpacing:'1px',color:'#808080'}}>
                    Trending Collections
                </h3>
            </div>
            <div style={{marginTop:'-2rem'}}>
                <Header />
            </div>
        </div>
)
}

TrendingCollections.propTypes = {

}

export default TrendingCollections
