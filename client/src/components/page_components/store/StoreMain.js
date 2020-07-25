import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../../admin/table/Table';               
import Header from '../../header/Header';
import Container from '../../ProductList/Container';
import Banner from '../../common/Banner';
import carousell1 from '../../../utils/imgs/carousell1.jpg';
import carousell2 from '../../../utils/imgs/carousell2.jpg';

const StoreMain = ({ store: { store, loading }, admin, setTable }) => {
    useEffect(() => {
 
    }, []);


    return (
        <Fragment>
            {admin === "true" && (
                <div className="store-actions-container">
                    <div className="store-actions">
                        <i style={{fontSize:'1.3rem'}} onClick={e => setTable('settings')} className="fas fa-cog"></i>
                        <Link to={`/store/${store._id}`}><i style={{fontSize:'1.3rem'}} class="fas fa-eye"></i></Link>
                        <i class="fas fa-share-alt"></i>
                    </div>
                </div>
            )}
            {store.store !== null ? (
                <div className="store-main"> 
                    <Banner admin={admin} imgLarge={carousell1} imgSmall={carousell2} />
                    <Header />
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
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(StoreMain);