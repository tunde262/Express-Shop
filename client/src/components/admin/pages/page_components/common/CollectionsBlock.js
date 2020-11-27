import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import Spinner from '../../../../common/Spinner';


const CollectionBlock = ({ 
    product
}) => {
    const [locationList, setLocationList] = useState([]);
    const [gotLocations, setGotLocations] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        renderLocationList();

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
      }, [product.detailProduct])


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const renderLocationList = async () => {
        try {
            if(product.detailProduct.collections.length > 0) {
                setLocationList([]);
                product.detailProduct.collections.map(async collection => {
                    if (collection) {
                        const res = await axios.get(`/api/categories/${collection.collectionId}`);
                        setLocationList(locationList => [...locationList, (
                            <div style={{borderBottom:'1px solid #f2f2f2', minHeight:'75px', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
                                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                                    <p style={{margin:'0'}}>{res.data.name} <span style={{color:'#ff4b2b'}}>({res.data.items.length})</span></p>
                                    {/* <small style={{color:'#ccc', margin:'0'}}>Auto</small> */}
                                </div>
                                <i style={{color:'#ff4b2b', fontSize:'13px'}} class="fas fa-times"></i>
                            </div>
                        )])  
                    }       
                });
            } else {
                setLocationList([(
                    <button>Add Location</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotLocations) {
        setGotLocations(true);
    }

    return (
        <Fragment>
            <div class="product-privacy-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
                <div class="product-privacy-box-title">
                    <p style={{color:'#808080', margin:'0'}}>Collections</p>
                    <hr style={{height:'1px', background:'rgb(214,214,214)', margin:'10px 0 10px 0'}}/>
                    {!locationList.length > 0 ? <Spinner /> : locationList}
                </div>
            </div>
        </Fragment>
    )
}

CollectionBlock.propTypes = {
    
}


export default CollectionBlock;
