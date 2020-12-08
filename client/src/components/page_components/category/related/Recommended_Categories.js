import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';
import categoryList from '../../../admin/pages/page_components/edit/categoryList';

const Recommended_Categories = ({ products, category }) => {
    const [checkFollowing, setCheckFollowing] = useState(false);
    const [following, setFollowing] = useState(true);


    // const handleFollow = (detailCollection) => {
    //     followCollection(detailCollection._id);
    //     setFollowing(!following);

    //     // Check if product already liked by same user
    //     if(detailCollection.likes.filter(like => like.user.toString() === user._id).length > 0) {
    //         mixpanel.track("Collection Un-Bookmark", {
    //             "Collection Name": detailCollection.name,
    //             // "Collection Rating": cartIds,
    //             "Total Followers": detailCollection.likes.length - 1,
    //             "Collection ID": detailCollection._id,
    //         });
            
    //         mixpanel.people.increment("Saved Collections", -1);
    //     } else {
    //         mixpanel.track("Collection Bookmark", {
    //             "Collection Name": detailCollection.name,
    //             "Total Favorites": detailCollection.likes.length + 1,
    //             "Collection ID": detailCollection._id,
    //         });
            
    //         mixpanel.people.increment("Saved Collections");
    //     }
    // }

    // if(user && collection && !checkFollowing) {
    //     if(collection.likes.length > 0) {
    //         collection.likes.map(like => {
    //             if (like.user === user._id) {
    //                 setFollowing(true);
    //             }
    //         })
    //     }  

    //     setCheckFollowing(true);
    // }

    return (
        <Fragment>
            <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img style={{height: '40px', width: '40px', border:'1px solid #e8e8e8', marginRight: '10px', borderRadius: '50px'}} src={category.img} alt="img" />
                        <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{margin:'0'}}>{category.tag_value}</p>
                            <div style={{maxHeight:'40px', overflow:'hidden', lineHeight:'15px'}}>
                                <p className="line-clamp" style={{margin:'0', fontFamily:' Arial, Helvetica,sans-serif', color:'#808080'}}>12.5k followers</p>
                            </div>
                        </div>
                    </div>
                    <div className="store-socials store">
                        {following ? (
                            <button 
                                className="active"
                                style={{width:'100%', margin:'10px 0'}}
                                // onClick={collection ? () => handleFollow(collection) : undefined}
                            >
                                Following
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                            </button>
                        ) : (
                            <button
                                style={{width:'100%', margin:'10px 0',}}
                                // onClick={collection ? () => handleFollow(collection) : undefined}
                            >
                                Follow
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ProductOverview products={products} shop={false} link={`/home`} />
        </Fragment>
    )
}

Recommended_Categories.propTypes = {

}

export default Recommended_Categories;
