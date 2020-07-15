import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getCurrentStore, deleteStore } from '../../actions/storeActions';
import { getStoreProducts } from '../../actions/productActions';
import { getStoreCollections } from '../../actions/collectionActions';
import { getStoreLocations } from '../../actions/locationActions';

import OrderList from './OrderList';
import Table from './table/Table';

const Admin = ({ getCurrentStore, deleteStore, getStoreProducts, getStoreCollections, getStoreLocations, store: { store, loading } }) => {
    const accountLink = 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/dashboard/&client_id=ca_FFrwAOlKVRTGBrORx2OTVFLXJeM3gHHe&state=SECRET';
    useEffect(() => {
        var url_string = (window.location.href);
        var url = new URL(url_string);
        var urlCode = url.searchParams.get("code");
        async function getAccountLink() {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const formData = {
                "code": `${urlCode}`
            }

            console.log('pre-request:' + formData.code)

            const res = await axios.post('/api/stripe/create-account-hosted', formData, config);
            console.log('requested: ' + res.data);
            const accountNum = res.data;
            console.log('state: ' + accountNum);
            // setAccountLink(res.data.url);
        } 
        if(urlCode){
            getAccountLink();
        }
        getCurrentStore();
        // getStoreProducts();
        // getStoreCollections();
        // getStoreLocations();
    }, []);

    const viewDashboard = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const formData = {
            "code": `${store.stripe_id}`
        }

        console.log('pre-request:' + formData.code)

        const res = await axios.post('/api/stripe/create-login-link', formData, config);

        console.log('data: ' + res.data.url)
        window.location.href = res.data.url; 
    }

    return (
            <Fragment>
                    {loading && store === null ? <Spinner /> : (
                        <Fragment>
                            {store !== null ? (
                                <Fragment>
                                    {/* Website Overview */}
                                    <div style={{marginTop: '7rem'}}></div>
                                    <div id="breadcrumb">
                                        <nav className="breadcrumb">
                                            <ol>
                                                <li><b>My Portfolio</b></li>
                                            </ol>
                                        </nav>
                                    </div>
                                    <section className="container">
                                        <div style={{display: 'flex'}}>
                                            {store.img_name && <img style={{height: '35px', marginRight: '1rem', borderRadius: '50px'}} src={`/api/stores/image/${store.img_name}`} alt="img" />}
                                            <h3 style={{color: "black"}}>{store.name}</h3>
                                        </div>
                                        <hr/>
                                        {store.stripe_id ? (
                                            <div class="panel panel-default">
                                                <div class="panel-heading main-color-bg">
                                                    <h3 class="panel-title">Website Overview</h3>
                                                    <button onClick={viewDashboard}>View Dashboard</button>
                                                </div>
                                                <div class="panel-body">
                                                    <div class="col-md-3">
                                                        <div class="well dash-box">
                                                            <h2> 2</h2>
                                                            <h4>Sold Today</h4>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="well dash-box">
                                                            <h2> 34</h2>
                                                            <h4>Sold Last 7 Days</h4>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="well dash-box">
                                                            <h2> $0.00</h2>
                                                            <h4>Sales Today</h4>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="well dash-box">
                                                            <h2> $0.00</h2>
                                                            <h4>Sales Last 7 Days</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> ) : (
                                                <a className="cta" href={accountLink}><button><i className="fas fa-shopping-bag">{' '}</i> Shop</button></a>
                                            )
                                        }
                                    </section>
                                    <Table />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <p>You have not setup a store</p>
                                    <Link to='/create-store' className="btn btn-primary my-1">
                                        Create A Store
                                    </Link>
                                </Fragment> 
                            )}
                        </Fragment>
                    )}
        </Fragment>
    )
}

Admin.propTypes = {
    getCurrentStore: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    getMyProjects: PropTypes.func.isRequired,
    getMyPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { getCurrentStore, deleteStore, getStoreProducts, getStoreCollections, getStoreLocations })(Admin);
