import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCart } from '../actions/productActions';
import { setNav1, setPage, setMainNav } from '../actions/navActions';

import mixpanel from 'mixpanel-browser';

import Footer from '../components/layout/Footer/Footer';
import Spinner from '../components/common/Spinner';

import AuthModal from '../components/modals/AuthModal';
import HomeMain from '../components/page_components/Home/HomeMain';

const HomePage = ({
    product, 
    auth: { 
        user, 
        isAuthenticated, 
        loading
    }, 
    setMainNav,
    setNav1, 
    setPage
}) => {

    const [skip, setSkip] = useState(0);

    // Nav underline Table
    const [tableShow1, setTableShow1] = useState('nearby');

    const [sentMixpanel, setSentMixpanel] = useState(false);
    
    useEffect(() => {
        setMainNav('store');
        setNav1('explore');
        setPage('home')
    }, []);

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight} = e.target
    
        if (offsetHeight + scrollTop === scrollHeight) {
          setSkip(product.products.length)
        }
    }

    const handleMixpanel = () => {
        mixpanel.init("1b36d59c8a4e85ea3bb964ac4c4d5889");
        mixpanel.identify(user._id);
        mixpanel.track("View Main Shopping Page", {
        //   "Entry Point": "Home Landing",
        //   "# of Results Returned": "A",
          "Chosen Category": "All"
        });
    }

    // if(!loading && !isAuthenticated) {
    //     setTimeout(setModal, 3000);
    // }

    if(!sentMixpanel && user !== null) {
        handleMixpanel();
        setSentMixpanel(true);
    }
        
    return (
        <Fragment>
            <HomeMain 
                skip={skip} 
                setSkip={setSkip} 
                handleScroll={handleScroll}
                setTableShow1={setTableShow1} 
                tableShow1={tableShow1} 
            />
            {/* <Footer /> */}
            {!loading && !isAuthenticated ? <AuthModal /> : null }
        </Fragment>
    )
    
}

HomePage.propTypes = {
    getCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    setMainNav: PropTypes.func.isRequired,
    setNav1: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    product: state.product,
    auth: state.auth,
    nav: state.nav
});

export default connect(mapStateToProps, { getCart, setMainNav, setNav1, setPage })(HomePage);
