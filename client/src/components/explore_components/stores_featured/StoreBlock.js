import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StoresBlock = ({ store, profile, favorite }) => {
    const [subList, setSubList] = useState([]);

    const [checkedSubs, setCheckedSubs] = useState(false);
    const [subscribedToo, setSubscribedToo] = useState(false);
    const [checkSub, setCheckSub] = useState(false);
  

    const handleSubscribe = (detailStore) => {
        if(profile.profile) {
            favorite(detailStore._id);

            setSubscribedToo(!subscribedToo);

            if(subList.includes(detailStore._id)) {
                const removeIndex = subList.indexOf(detailStore._id);
                subList.splice(removeIndex, 1);
            } else {
                setSubList(subList => [...subList, detailStore._id]);
            }
        }
    }

    if(profile.profile && profile.subscriptions.length > 0 && !checkedSubs) {
        profile.subscriptions.map(store => {
            const storeId = store._id;
            setSubList(subList => [...subList, storeId]);
        })

        setCheckedSubs(true);
    }

    return (
        <div className="store-block-container">
            <div className="store-block">
                <a href={`https://www.cardboardexpress.com/store/${store._id}`}>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div className="store-block-img">
                            <img src={`/api/stores/image/${store.img_name}`}/>
                        </div>
                    </div>
                </a>
                <a href={`https://www.cardboardexpress.com/store/${store._id}`} style={{display:'flex', justifyContent:'flex-start', alignItems:'center', height:'100%', width:'100%', overflow:'hidden'}} className="word-hover line-clamp-1">
                    <div style={{display:'flex', margin:'0 5px', justifyContent:'flex-start', alignItems:'center', height:'100%', width:'100%', overflow:'hidden'}}>
                        <div style={{height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'flex-start'}}>
                            <div style={{height:'1rem', overflow:'hidden', lineHeight:'15px'}}>
                                <p style={{margin:'0'}} className="line-clamp-1">
                                    {store.name}
                                </p>
                            </div>
                            <div style={{maxHeight:'40px', overflow:'hidden', lineHeight:'15px'}}>
                                <p className="line-clamp" style={{margin:'0', fontFamily:' Arial, Helvetica,sans-serif', color:'#808080'}}>{store.category}</p>
                            </div>
                        </div>
                        
                    </div>
                </a>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className="store-socials store">
                        {subList.includes(store._id) ? (
                            <button 
                                className="active"
                                style={{width:'100%', margin:'10px 0'}}
                                onClick={() => handleSubscribe(store)}
                            >
                                Subscribed
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                            </button>
                        ) : (
                            <button
                                style={{width:'100%', margin:'10px 0',}}
                                onClick={() => handleSubscribe(store)}
                            >
                                Subscribe
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

StoresBlock.propTypes = {

}

export default StoresBlock;
