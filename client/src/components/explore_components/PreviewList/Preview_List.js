import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import RecommendedCategory from '../../page_components/category/related/Recommended_Categories';

const Preview_List = ({ tag_value, img }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        getListOfProducts();

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const getListOfProducts = async () => {
        try {
            const res = await axios.get(`/api/products/filter/${tag_value}?skip=0`);

            setProductList([...res.data])

        } catch (err) {
            console.log(err);
        }
    }

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    return (
        <div 
            style={{
                background:'#fff', 
                margin:'10px', 
                borderLeft:'1px solid #e3e8ee',
                borderRight:'1px solid #e3e8ee',
                borderBottom:'1px solid #e3e8ee'
            }}
        >
            <RecommendedCategory products={productList} category={{tag_value, img}} />
        </div>
    )
}

Preview_List.propTypes = {

}

export default Preview_List;