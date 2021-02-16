import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../../admin/table/Table';

import BoxEmoji from '../../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../../utils/imgs/openlock.png'; 
import CarEmoji from '../../../utils/imgs/car.jpg'; 
import EyeballsEmoji from '../../../utils/imgs/eyeballs.png'; 
import PencilEmoji from '../../../utils/imgs/pencil.png'; 


const InventoryMain = ({ inventoryNav, setTable, store: { store, loading } }) => {
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
    }, []);

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

    let statContent;

    if(inventoryNav === 'inventory') {
        statContent = (
            <section className="stats">
                <div className="stats-box">
                    <div>
                        <img style={{width: '28px'}} src={CarEmoji} alt="img" />
                        <h2 style={{color:'#333', fontWeight:'300'}}>2,000</h2>
                    </div>
                    <div>  
                        <img style={{width: '28px'}} src={ClosedLockEmoji} alt="img" /> 
                        <h2 style={{color:'#333', fontWeight:'300'}}>2,000</h2>
                    </div>
                    <div>   
                        <img style={{width: '28px'}} src={OpenLockEmoji} alt="img" />
                        <h2 style={{color:'#333', fontWeight:'300'}}>2,056</h2>
                    </div>
                    <div>   
                        <img style={{width: '28px'}} src={BoxEmoji} alt="img" />
                        <h2 style={{color:'#333', fontWeight:'300'}}>2000</h2>
                    </div>
                </div>
                <div>
                    <ul class="profile-underline">
                        <div 
                            onClick={e => setTable('products')} className={inventoryNav === "products" && "active"}
                        >
                            <li><p>Items</p></li>
                        </div>
                        <div 
                            onClick={e => setTable('inventory')} className={inventoryNav === "inventory" && "active"}
                        >
                            <li><p>Variants</p></li>
                        </div>
                    </ul>
                </div>
            </section>
        )
    }

    return (
        <Fragment>
            {inventoryNav === 'products' || inventoryNav ==='inventory' ? (
                <section className="stats" style={{marginTop:'10px'}}>
                    <div className="stats-box">
                        <div>
                            <h2 style={{color:'#0098d3', fontWeight:'300'}}>23</h2>
                            <p>Active</p>
                        </div>
                        <div>  
                            <h2 style={{color:'#0098d3', fontWeight:'300'}}>1</h2>
                            <p>Paused</p>
                        </div>
                        <div>   
                            <h2 style={{color:'#0098d3', fontWeight:'300'}}>0</h2>
                            <p>Sold</p>
                        </div>
                        <div>   
                            <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>0</h2>
                            <p>Low Stock</p>
                        </div>
                    </div>
                    <div>
                        <ul class="profile-underline">
                            <div 
                                onClick={e => setTable('products')} className={inventoryNav === "products" && "active"}
                            >
                                <li><p>Items<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(36)</span></p></li>
                            </div>
                            <div 
                                onClick={e => setTable('inventory')} className={inventoryNav === "inventory" && "active"}
                            >
                                <li><p>Variants<span style={{color:'#ff4b2b', marginLeft:'5px'}}>(108)</span></p></li>
                            </div>
                        </ul>
                    </div>
                </section>
            ) : null}
            <div className="filter-container">
                <span style={{fontSize:'15px', fontWeight:'bold', color:'#808080', letterSpacing:'2px', margin:'10px'}}>Filter</span>
                <i class="fas fa-sliders-h"></i>
            </div>
            <div className="product-list-container admin">
                <Table page="dashboard" inventoryNav={inventoryNav}  setTable={setTable} />
            </div>
        </Fragment>
    )
}

InventoryMain.propTypes = {
    store: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps)(InventoryMain);
