import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types';

import { favorite } from '../../../../actions/productActions';

import ProductOverview from '../../../Overview/productOverview/ProductOverview';

const Recommended_Store = ({ store, products, profile, favorite }) => {
    const [subList, setSubList] = useState([]);

    const [checkedSubs, setCheckedSubs] = useState(false);
    const [subscribedToo, setSubscribedToo] = useState(false);

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
        <Fragment>
            <div style={{minHeight:'50px', background:'rgb(247,247,247)', padding:'1rem 20px', width:'100%', borderTop:'1px solid rgb(214,214,214)', borderBottom:'1px solid rgb(214,214,214)'}}>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img style={{height: '40px', width: '40px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img_name}`} alt="img" />
                        <div style={{display:'flex', lineHeight:'1rem', flexDirection:'column', alignItems:'flex-start'}}>
                            <p style={{margin:'0'}}>{store.name}</p>
                            <div style={{maxHeight:'40px', overflow:'hidden', lineHeight:'15px'}}>
                                <p className="line-clamp" style={{margin:'0', fontFamily:' Arial, Helvetica,sans-serif', color:'#808080'}}>{store.category}</p>
                            </div>
                        </div>
                    </div>
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
            <ProductOverview products={products} shop={false} link={`/home`} />

            <div style={{width:'100%', borderTop:'1px solid rgb(214,214,214)', height:'50px', color:'#808080', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <p style={{margin: '0', color:'#0098d3'}}>View Shop</p>
            </div>
        </Fragment>
    )
}

Recommended_Store.propTypes = {

}

export default Recommended_Store
