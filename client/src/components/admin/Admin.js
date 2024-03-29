import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { setMainNav } from '../../actions/navActions';
import { getCurrentStore, deleteStore } from '../../actions/storeActions';

import mixpanel from 'mixpanel-browser';

import Table from './table/Table';
import JoinCreate from './JoinCreate';
import logo from '../common/logo.jpg';
import { Logo } from '../Logo';

const Admin = ({ getCurrentStore, setMainNav, store: { stores, loading } }) => {

    const [sentMixpanel, setSentMixpanel] = useState(false);

    useEffect(() => {
        setMainNav('');
        getCurrentStore();
    }, []);

    const handleMixpanel = () => {
        mixpanel.track("View Choose-Store Admin Page", {
        //   "Entry Point": "Home Landing",
          "# of Stores Returned": stores.length,
        });

        mixpanel.people.set({
            "# of stores": stores.length
        })
    }

    let storeList;

    if(stores === null || loading) {
        storeList = <Spinner />;
    }
    else {
        if(!sentMixpanel) {
            handleMixpanel();
            setSentMixpanel(true);
        }
        if(stores.length > 0) {
            storeList = stores.map(store => (
                <div key={store._id} className="stores-box-option">
                    <div className="stores-box-option-title">
                        <img src={`/api/products/image/${store.img_name}`} style={{height:'50px', width:'50px', borderRadius:'50px'}} />
                        <Link to={`/admin/${store._id}`}>{store.name}</Link>
                    </div>
                    <div className="stores-box-option-numbers">
                        <div style={{marginRight: '10px'}}>
                            <p>$0</p> 
                            <p>Sales</p>
                        </div>
                        <div>
                            <p>0</p> 
                            <p>Items</p>
                        </div>
                    </div>
                </div>
            ));
        }
        else {
            storeList = <h2 style={{color:'#333', fontWeight:'300'}}>No Stores</h2>
        }
    }
    return (
        <Fragment>
            {loading && stores === null ? <Spinner /> : (
                <Fragment>
                    {stores !== null && stores.length > 0 ? (
                        <div id="home" className="column-center">
                            <div className="stores-box">
                                <Logo>
                                    <img src={logo} style={{maxHeight: '40px'}} alt="cardboard express logo" />
                                </Logo>
                                <div>
                                    <p className="text-primary">Choose A Store</p>
                                    <div>
                                        {storeList}
                                        <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems:'center', boxSizing: 'border-box'}}>
                                            <Link to="/create-store" style={{fontSize: '1.3rem', fontWeight:'500', margin: '0.3rem 1rem'}}>Create A Store</Link>
                                        </div>
                                        <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems:'center', boxSizing: 'border-box'}}>
                                            <Link to="/join-store" style={{fontSize: '1.3rem', fontWeight:'500', margin: '0.3rem 1rem'}}>Join A Store</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <JoinCreate />
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

Admin.propTypes = {
    getCurrentStore: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    setMainNav: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { setMainNav, getCurrentStore, deleteStore })(Admin);
