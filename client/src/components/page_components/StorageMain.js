import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../admin/table/Table';

import BoxEmoji from '../../utils/imgs/box.png'; 
import ClosedLockEmoji from '../../utils/imgs/closedlock.jpg'; 
import OpenLockEmoji from '../../utils/imgs/openlock.png'; 
import CarEmoji from '../../utils/imgs/car.jpg'; 
import EyeballsEmoji from '../../utils/imgs/eyeballs.png'; 
import PencilEmoji from '../../utils/imgs/pencil.png'; 


const StoreMain = ({ store: { store, loading } }) => {
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

    return (
        <Fragment>
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
            </section>
            <Table page="storage" />
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
