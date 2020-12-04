import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 

import { followCollection } from '../../../actions/collectionActions';

import Banner from '../../common/Banner';
import { CSSTransition } from 'react-transition-group';
import DefaultBanner from '../../../utils/imgs/placeholderimg.jpg';

import mixpanel from 'mixpanel-browser';

const CollectionHeader = ({ 
    collection, 
    followCollection, 
    setTableShow1, 
    tableShow1,
    auth: {
        user
    }
}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // Toggle Dropdwon
    const [dropdown, setDropdown] = useState(false);

    const [menuHeight, setMenuHeight] = useState(null);

    const [collectionName, setCollectionName] = useState('');
    const [collectionLoaded, setCollectionLoaded] = useState(false);

    const [checkFollowing, setCheckFollowing] = useState(false);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
    }

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

    if(!collectionLoaded && collection.collection) {
        setCollectionName(collection.collection.name);
        setCollectionLoaded(true);
    }

    if(user && collection.collection && !checkFollowing) {
        if(collection.collection.likes.length > 0) {
            collection.collection.likes.map(like => {
                if (like.user === user._id) {
                    setFollowing(true);
                }
            })
        }  

        setCheckFollowing(true);
    }

    const isMobile = windowWidth <= 769;


    return (
        <Fragment>
            <div style={{display:'flex', color:'#ff4b2b', width:'100%', padding:'10px 0', fontSize:'0.8rem', justifyContent:'flex-start', alignItems:'center'}}>
                <i class="fas fa-long-arrow-alt-left"></i>
                <p style={{margin:'0 10px'}}>  Back</p>
            </div>
            <div className="store-details">
                <div id="store-titles">
                    <div style={{display:'flex', alignItems:'center'}}>
                        <h3><i style={{color:'#ff4b2b', marginRight:'10px'}} class="fas fa-tag"></i>{collectionName}</h3>
                    </div>
                </div>
                <p id="store-description" className="desktop" style={{color:'#808080'}}>description</p>

                <div className="store-socials desktop" style={{paddingRight:'10px'}} id="store-socials">
                    {following ? (
                        <button 
                            className="active"
                            onClick={() => handleFollow(collection.collection)}
                        >
                            Following
                            <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                        </button>
                    ) : (
                        <button 
                            onClick={collection.collection ? () => handleFollow(collection.collection) : undefined}
                        >
                            Follow
                            <i style={{margin:'0 10px'}} class="fas fa-plus"></i>
                        </button>
                    )}
                    <div onClick={() => setDropdown(!dropdown)} style={{border:'1px solid #0098d3', background:'#0098d3', color:'#fff', display:'flex', justifyContent:'center', alignItems:'center', height:'40px', width:'35px', borderRadius:'5px'}}>
                        <i style={{fontSize:'14px'}}class="fas fa-chevron-down"></i>
                    </div>
                
                    <div className={dropdown ? "edit-dropdown active" : "edit-dropdown"} style={{height: menuHeight}}>
                        <div className="menu">
                            <Link to="/profile/saved" className="menu-item">
                                <i style={{color:'#0098d3', fontSize:'1.2rem', marginRight:'10px'}} class="fas fa-eye"></i>
                                View Store
                            </Link>
                            <hr style={{margin:'10px 0', height:'1px', background:'#f2f2f2'}} />
                            <Link to="/profile/orders" className="menu-item">
                                <i style={{color:'#0098d3', fontSize:'1.2rem', marginRight:'10px'}} class="fas fa-qrcode"></i>
                                Qr Code
                            </Link>
                        </div>
                    </div>
                    
                    {/* <svg style={{fill:'currentColor', strokeWidth:0, verticalAlign:'middle', color:'#333'}} height="20" width="20" viewBox="0 0 24 24" aria-label="Send" role="img"><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z"></path></svg> */}
                </div>
            </div>
            {isMobile && (
                <Fragment>
                    <div id="store-description-mobile">
                        <p style={{color:'#808080'}}>description</p>
                    </div>
                    <div className="store-socials" id="collection-actions-mobile">
                        {following ? (
                            <button 
                                className="active"
                                onClick={() => handleFollow(collection.collection)}
                            >
                                Following
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-check"></i>
                            </button>
                        ) : (
                            <button 
                                onClick={collection.collection ? () => handleFollow(collection.collection) : undefined}
                            >
                                Follow
                                <i style={{margin:'0 10px'}} class="fas fa-plus"></i>
                            </button>
                        )}
                        <div style={{width:'2px'}}></div>
                        <div onClick={() => setDropdown(!dropdown)} className="extra-options-btn">
                            <i style={{fontSize:'14px'}}class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    <div className={dropdown ? "edit-dropdown active" : "edit-dropdown"} style={{height: menuHeight}}>
                        <div className="menu">
                            <Link to="/profile/saved" className="menu-item">
                                <i style={{color:'#0098d3', fontSize:'1.2rem', marginRight:'10px'}} class="fas fa-eye"></i>
                                View Store
                            </Link>
                            <hr style={{margin:'10px 0', height:'1px', background:'#f2f2f2'}} />
                            <Link to="/profile/orders" className="menu-item">
                                <i style={{color:'#0098d3', fontSize:'1.2rem', marginRight:'10px'}} class="fas fa-qrcode"></i>
                                Qr Code
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}

            <ul class="profile-underline" style={{width:'50%'}}>
                <div 
                    className={tableShow1 === "shop" && "active"}
                    onClick={e => setTableShow1('shop')}
                >
                    <li><p>Shop</p></li>
                </div>
                <div
                    className={tableShow1 === "related" && "active"}
                    onClick={e => setTableShow1('related')}
                >
                    <li><p>Related</p></li>
                </div>
            </ul>
        </Fragment>
    )
}

CollectionHeader.propTypes = {
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    followCollection: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product,
    auth: state.auth
})

export default connect(mapStateToProps, { followCollection })(CollectionHeader);