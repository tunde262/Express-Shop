import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLikedProducts } from '../actions/productActions';

import Header from '../components/header/Header';
import CategoryOverview from '../components/Overview/categoryOverview/CategoryOverview';
import ProductOverview from '../components/Overview/productOverview/ProductOverview';
import Spinner from '../components/common/Spinner';
import Container from '../components/ProductList/Container';
import AuthModal from '../components/modals/AuthModal';

const LikePage = ({getLikedProducts, product, auth: { user, isAuthenticated, loading}}) => {
    const [skip, setSkip] = useState(0)
    useEffect(() => {
        if(user) {
            getLikedProducts(user._id);
        }
    }, [user]);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }
        
    return (
        <Fragment>
            <div onScroll={handleScroll} style={{height:"100vh", overflowY:'scroll'}}>
                <div style={{textAlign:'center', marginTop:'1rem'}} class="container-fluid">
                    <h3 style={{color: '#333', fontWeight:'300'}}>Hey, {user && user.name}</h3>
                    <hr/>
                    <h5 style={{color: '#333', fontWeight:'300'}}>
                        <i className="fas fa-heart"></i>{' '}
                        Saved
                    </h5>
                </div>
                <Container />
            </div>
            {/* <Footer /> */}
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </Fragment>
    )
    
}

LikePage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth
});

export default connect(mapStateToProps, { getLikedProducts })(LikePage);
