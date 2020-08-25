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
    const [skip, setSkip] = useState(0);
    const [tableShow1, setTableShow1] = useState('saved');

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
                    <ul class="nav-underline">
                        <li onClick={e => setTableShow1('saved')} className={tableShow1 === "saved" ? "active" : "nav-underline-item"}><i className="fas fa-heart"></i><p>Saved</p></li>
                        <li onClick={e => setTableShow1('orders')} className={tableShow1 === "orders" ? "active" : "nav-underline-item"}><i class="fas fa-history"></i><p>My Orders</p></li>
                        <li onClick={e => setTableShow1('settings')} className={tableShow1 === "settings" ? "active" : "nav-underline-item"}><i class="fas fa-cog"></i><p>Settings</p></li>
                    </ul>
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
