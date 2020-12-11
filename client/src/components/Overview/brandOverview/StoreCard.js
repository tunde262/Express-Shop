import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { favorite } from '../../../actions/storeActions';

import ReactGA from 'react-ga';
import mixpanel from 'mixpanel-browser';


const StoreCard = ({ storeObj, profile, favorite }) => {
    const [subList, setSubList] = useState([]);

    const [checkedSubs, setCheckedSubs] = useState(false);
    const [subscribedToo, setSubscribedToo] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());
    
        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleSubscribe = (detailStore) => {
        if(profile.profile) {
            console.log('FAVORITE')
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
        console.log('LOOK HERE PLEASE')
        profile.subscriptions.map(store => {
            const storeId = store._id;
            setSubList(subList => [...subList, storeId]);
        })

        console.log(profile.subscriptions);

        setCheckedSubs(true);
    }

    const clicked = (title) => {
        ReactGA.event({
            category: 'Cart',
            action: 'Added From Product Card',
            label: title
        });
    }

    const isMobile = windowWidth <= 500;
    const isTablet = windowWidth <= 1000;

    return (
        <BrandOverviewItem>
            <div class="card__container">
                {/* <div class="card__image">
                    {storeObj.banner_imgs && storeObj.banner_imgs.length > 0 && <img src={`/api/stores/image/${storeObj.banner_imgs[0].img_name}`} alt="" />}
                </div> */}
                <a href={`https://www.cardboardexpress.com/store/${storeObj._id}`}>
                    <div className="card__logo__image">
                        <img src={`/api/stores/image/${storeObj.img_name}`} />
                    </div>
                </a>
                <div class="card__body">
                    <div style={{height:'30px', lineHeight:'15px', overflow:'hidden'}}>
                        <a style={{textDecoration:'none'}} href={`https://www.cardboardexpress.com/store/${storeObj._id}`}><p class="card__body__heading line-clamp">{storeObj.name}</p></a>
                    </div>
                    <div style={{width:'100%', position:'absolute', bottom:'0', padding:'0 10px'}} className="store-socials store">
                        {subList.includes(storeObj._id) ? (
                            <button
                                className="active"
                                style={{
                                    width:'100%', 
                                    height: '35px',
                                    margin:'20px 0 10px',
                                    borderRadius: '30px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                }}
                                onClick={() => handleSubscribe(storeObj)}
                            >
                                Subscribe
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                            </button>
                        ) : (
                            <button
                                style={{
                                    width:'100%', 
                                    height: '35px',
                                    margin:'20px 0 10px',
                                    borderRadius: '30px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                }}
                                onClick={() => handleSubscribe(storeObj)}
                            >
                                Subscribe
                                <i style={{marginLeft:'10px', fontSize:'12px'}} class="fas fa-plus"></i>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </BrandOverviewItem>
    );
}

const BrandOverviewItem = styled.div`
    display: inline-box;
    margin: 0 15px;
`;

StoreCard.propTypes = {
    favorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { favorite })(StoreCard);