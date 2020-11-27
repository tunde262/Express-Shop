import React from 'react'
import PropTypes from 'prop-types'

const FeaturedNav = ({ setTableShow1, tableShow1 }) => {
    return (
        <ul class="profile-underline store">
            <div onClick={e => setTableShow1('top stores')} className={tableShow1 === "top stores" && "active"}><li><p>Top Stores</p></li></div>
            <div onClick={e => setTableShow1('trending')} className={tableShow1 === "trending" && "active"}><li><p>Trending</p></li></div>
        </ul>
    )
}

FeaturedNav.propTypes = {

}

export default FeaturedNav
