import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';           

import Spinner from '../../../common/Spinner';
import RecommendedStore from './Recommended_Store';

import mixpanel from 'mixpanel-browser';
import { favorite } from '../../../../actions/storeActions';

const RelatedStores = ({ store, product, auth, profile, favorite }) => {

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
                        <RecommendedStore products={res.data} store={storeObj} profile={profile} auth={auth} favorite={favorite} />
                    )])       
                });
            } else {
                setStoresList([(
                    <div className="no-rides">
                        <h1>Nothing Found</h1>
                        <h2>
                            Sorry we couldn't find anything.{' '} 
                            <a href="/explore">Find Stores</a>
                        </h2> 
                    </div>
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
    auth: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    favorite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    auth: state.auth,
    product: state.product,
    profile: state.profile
})

export default connect(mapStateToProps, { favorite })(RelatedStores);