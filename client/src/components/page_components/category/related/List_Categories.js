import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';           

import Spinner from '../../../common/Spinner';
import RecommendedCategory from './Recommended_Categories';

import mixpanel from 'mixpanel-browser';

const List_Categories = ({ product, listData}) => {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        renderCategoryList();
      }, [listData])


    const renderCategoryList = async () => {
        setCategoryList([]);
        try {
            if(listData.length > 0) {
                listData.map(async categoryObj => {
                    const res = await axios.get(`/api/products/filter/${categoryObj.tag_value}?skip=0`);
                    setCategoryList(categoryList => [...categoryList, (
                        <RecommendedCategory products={res.data} category={categoryObj} />
                    )])       
                });
            } else {
                setCategoryList([(
                    <div className="no-rides">
                        <h1>Nothing Found</h1>
                        <h2>
                            Sorry we couldn't find anything.{' '} 
                            <a href="/explore">Explore Products</a>
                        </h2> 
                    </div>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <Fragment>
            {!categoryList.length > 0 ? <Spinner /> : categoryList}
        </Fragment>
    )
}

List_Categories.propTypes = {
    collection: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    collection: state.collection,
    product: state.product
})

export default connect(mapStateToProps, null)(List_Categories);