import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentStore, deleteStore } from '../../../actions/storeActions';
import Table from '../table/Table';

const StoreMain = ({ getCurrentStore, store: { store, loading } }) => {
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

    const [tableShow1, setTableShow1] = useState('store');

    const viewDashboard = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log('DASHBOARD!!!!!');

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
                <ul class="admin-underline">
                    <li><a class={tableShow1 === "store" && "active"} onClick={e => setTableShow1('store')}><i class="fas fa-store"></i> Store</a></li>
                    <li><a class={tableShow1 === "storage" && "active"} onClick={e => setTableShow1('storage')}><i class="fas fa-boxes"></i> Storage</a></li>
                    <li><a class={tableShow1 === "delivery" && "active"} onClick={e => setTableShow1('delivery')}><i class="fas fa-truck"></i> Delivery</a></li>
                    <li><a class={tableShow1 === "people" && "active"} onClick={e => setTableShow1('people')}><i class="fas fa-users"></i> People</a></li>
                </ul>
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                    <i class="fas fa-pencil-alt"></i>
                    <i class="fas fa-cog"></i>
                </div>
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
    )
}

StoreMain.propTypes = {
    getCurrentStore: PropTypes.func.isRequired,
    deleteStore: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { getCurrentStore, deleteStore })(StoreMain);
