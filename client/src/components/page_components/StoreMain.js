import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../admin/table/Table';               
import Header from '../header/Header';
import Container from '../ProductList/Container';
import Banner from '../common/Banner';
import carousell1 from '../../utils/imgs/carousell1.jpg';
import carousell2 from '../../utils/imgs/carousell2.jpg';

const StoreMain = ({ store: { store, loading } }) => {
    useEffect(() => {
 
    }, []);


    return (
        <Fragment>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <i class="fas fa-pencil-alt"></i>
                <i class="fas fa-cog"></i>
            </div>
            {store.store !== null ? (
                <div class="store-main">
                    <Banner imgLarge={carousell1} imgSmall={carousell2} />
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