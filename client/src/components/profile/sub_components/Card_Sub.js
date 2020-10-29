import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { favorite } from '../../../actions/storeActions';

const Card_Sub = ({store, favorite, auth: { user }, match}) => {
    const [subscribedToo, setSubscribedToo] = useState(false);
    const [checkSub, setCheckSub] = useState(false);
  

    const handleSubscribe = (detailStore) => {
        favorite(detailStore._id);
        setSubscribedToo(!subscribedToo);

        // Check if product already liked by same user
        // if(detailStore.favorites.filter(favorite => favorite.user.toString() === user._id).length > 0) {
        //     mixpanel.track("Store Un-Bookmark", {
        //         "Store Name": detailStore.name,
        //         "Store Category": detailStore.category,
        //         // "Store Rating": cartIds,
        //         "Total Favorites": detailStore.favorites.length - 1,
        //         "Total Reviews": detailStore.reviews.length,
        //         "Store ID": detailStore._id,
        //     });
            
        //     mixpanel.people.increment("Saved Stores", -1);
        // } else {
        //     mixpanel.track("Store Bookmark", {
        //         "Store Name": detailStore.name,
        //         "Store Category": detailStore.category,
        //         // "Store Rating": cartIds,
        //         "Total Favorites": detailStore.favorites.length + 1,
        //         "Total Reviews": detailStore.reviews.length,
        //         "Store ID": detailStore._id,
        //     });
            
        //     mixpanel.people.increment("Saved Stores");
        // }
    }
    
    return (
        <div style={
            {marginTop:'1rem', 
            width:'100%', 
            borderBottom:'1px solid #e8e8e8', 
            background:'#fff', 
            height:'100px',
            display:'flex', 
            alignItems:'center'
            }
        }>
            <div style={{display:'grid', width: '100%', gridTemplateColumns:'1fr 2fr 1fr'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div>
                        <img style={{border:'1px solid #e8e8e8', height:'60px', width:'60px', borderRadius:'50%', background:'#e8e8e8'}} src={`/api/stores/image/${store.img_name}`} />
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'70px', width:'100%', overflow:'hidden'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                        <p style={{margin:'0'}}>{store.name}</p>
                        <p style={{margin:'0', color:'#808080'}}>Wholesaler</p>
                    </div>
                    
                </div>
                <div className="store-socials">
                    {subscribedToo ? (
                        <button 
                            className="active"
                            onClick={() => handleSubscribe(store)}
                        >
                            Subscribed
                            <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                        </button>
                    ) : (
                        <button
                            onClick={() => handleSubscribe(store)}
                        >
                            Subscribe
                            <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

Card_Sub.propTypes = {
    favorite: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { favorite })(Card_Sub);

