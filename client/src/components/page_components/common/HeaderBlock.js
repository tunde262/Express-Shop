import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../header/Header';

const HeaderBlock = () => {

    return (
        <div className="header-nav-container">
            <div style={{padding:'10px'}}>
                {/* <h3 style={{fontSize:'12px', letterSpacing:'1px',color:'#808080'}}>
                    Pick A Category
                </h3> */}
            </div>
            <div style={{marginTop:'-2rem'}}>
                <Header />
            </div>
        </div>
    )
}

HeaderBlock.propTypes = {

}

export default HeaderBlock
