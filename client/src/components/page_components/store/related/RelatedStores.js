import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';           

import Spinner from '../../../common/Spinner';
import RecommendedStore from './Recommended_Store';

import mixpanel from 'mixpanel-browser';

const RelatedStores = ({ store, product}) => {

    const [storesList, setStoresList] = useState([]);

    useEffect(() => {
        renderStoresList();
      }, [store.stores])


    const renderStoresList = async () => {
        setStoresList([]);
        try {
            if(store.stores.length > 0) {
                store.stores.map(async storeObj => {
                    const res = await axios.get(`/api/products/store/${storeObj._id}`);
                    setStoresList(storesList => [...storesList, (
                        <RecommendedStore products={res.data} store={storeObj} />
                    )])       
                });
            } else {
                setStoresList([(
                    <p style={{margin:'0'}}>Sorry no stores...</p>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            {!storesList.length > 0 ? <Spinner /> : storesList}
        </div>
    )
}

RelatedStores.propTypes = {
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    product: state.product
})

export default connect(mapStateToProps, null)(RelatedStores);