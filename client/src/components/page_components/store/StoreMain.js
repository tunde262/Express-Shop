import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../../admin/table/Table';   
import { getProductsByStoreId } from '../../../actions/productActions';            
import Header from '../../header/Header';
import Container from '../../ProductList/Container';
import Banner from '../../common/Banner';
import DefaultBanner from '../../../utils/imgs/placeholderimg.jpg';
import carousell1 from '../../../utils/imgs/carousell1.jpg';
import carousell2 from '../../../utils/imgs/carousell2.jpg';

import mixpanel from 'mixpanel-browser';

const StoreMain = ({ store: { store, loading }, product, getProductsByStoreId, admin, setTable }) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    useEffect(() => {
        getProductsByStoreId(store._id)
    }, []);

    const handleMixpanel = () => {
        let banner_value = false;

        if (store.banner_imgs.length > 0) {
            banner_value = true;
        }
        mixpanel.track("Store Admin View", {
            // "Entry Point": "Home Landing",
            "# of Public Store Items": product.products.length,
            // "# of People Part of Store": "Home Landing",
            "Store Name": store.name,
            // "Store Category": "Home Landing",
            "Store ID": store._id,
            "Banner Value": banner_value,
        });
    }


    if(admin === "true" && !sentMixpanel && store !== null && !product.loading && product.products !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }


    return (
        <Fragment>
            {/* {admin === "true" && store !== null ? (
                <div className="store-actions-container">
                    <div className="store-actions">
                        <i style={{fontSize:'1.3rem'}} onClick={e => setTable('settings')} className="fas fa-cog"></i>
                        <Link to={`/store/${store._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i class="fas fa-share-alt"></i>
                    </div>
                </div>
            ) : null} */}
            {store !== null ? (
                <div className="store-main"> 
                    {/* {admin === "true" && store !== null && <Banner admin={admin} imgLarge={DefaultBanner} imgSmall={DefaultBanner} />} */}
                    {/* <Header /> */}
                    <Container title="Bottoms" category="bottoms" background="MediumSlateBlue"  />
                </div>
            ) : (
                <h3>This store doesn't exist</h3>
            )}
        </Fragment>
    )
}

StoreMain.propTypes = {
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    getProductsByStoreId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    product: state.product
})

export default connect(mapStateToProps, { getProductsByStoreId })(StoreMain);