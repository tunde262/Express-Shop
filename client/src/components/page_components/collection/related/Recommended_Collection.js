import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';

import mixpanel from 'mixpanel-browser';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';

const Recommended_Collection = ({ collection, products, followCollection, user }) => {
    const [checkFollowing, setCheckFollowing] = useState(false);
    const [following, setFollowing] = useState(false);


    const handleFollow = (detailCollection) => {
        followCollection(detailCollection._id);
        setFollowing(!following);

        // Check if product already liked by same user
        if(detailCollection.likes.filter(like => like.user.toString() === user._id).length > 0) {
            mixpanel.track("Collection Un-Bookmark", {
                "Collection Name": detailCollection.name,
                // "Collection Rating": cartIds,
                "Total Followers": detailCollection.likes.length - 1,
                "Collection ID": detailCollection._id,
            });
            
            mixpanel.people.increment("Saved Collections", -1);
        } else {
            mixpanel.track("Collection Bookmark", {
                "Collection Name": detailCollection.name,
                "Total Favorites": detailCollection.likes.length + 1,
                "Collection ID": detailCollection._id,
            });
            
            mixpanel.people.increment("Saved Collections");
        }
    }

    if(user && collection && !checkFollowing) {
        if(collection.likes.length > 0) {
            collection.likes.map(like => {
                if (like.user === user._id) {
                    setFollowing(true);
                }
            })
        }  

        setCheckFollowing(true);
    }
    return (
        <Fragment>

            <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <i style={{color:'#ff4b2b', fontSize:'14px', marginRight:'5px'}} class="fas fa-tag"></i>
                        <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{margin:'0'}}>{collection.name}</p>
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
                                onClick={collection ? () => handleFollow(collection) : undefined}
                            >
                                Following
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                            </button>
                        ) : (
                            <button
                                style={{width:'100%', margin:'10px 0',}}
                                onClick={collection ? () => handleFollow(collection) : undefined}
                            >
                                Follow
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ProductOverview products={products} shop={false} link={`/home`} />

            <div style={{width:'100%', borderTop:'1px solid rgb(214,214,214)', height:'50px', color:'#808080', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <p style={{margin: '0', color:'#0098d3'}}>View all</p>
            </div>
        </Fragment>
    )
}

Recommended_Collection.propTypes = {

}

export default Recommended_Collection
