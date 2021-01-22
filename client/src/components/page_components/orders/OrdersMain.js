import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../../admin/table/Table';

const OrdersMain = ({ ordersNav, order, setTable, store: { store, loading } }) => {
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
            {order.orders.length > 0 && (
                <section className="stats" style={{marginTop:'10px'}}>
                    {/* <p onClick={viewDashboard}>View Dashboard</p> */}
                    <div className="stats-box">
                        <div>
                            <h4 style={{color:'#808080'}}>Sold Today</h4>
                            <h2 style={{color:'#ff4b2b', fontWeight:'300'}}> 2</h2>
                        </div>
                        <div>  
                            <h4 style={{color:'#808080'}}>Sold Last 7 Days</h4>
                            <h2 style={{color:'#ff4b2b', fontWeight:'300'}}> 2</h2>
                        </div>
                        <div>   
                            <h4 style={{color:'#808080'}}>Sales Today</h4>
                            <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>$0.00</h2>
                        </div>
                        <div>   
                            <h4 style={{color:'#808080'}}>Sales Last 7 Days</h4>
                            <h2 style={{color:'#ff4b2b', fontWeight:'300'}}>$0.00</h2>
                        </div>
                    </div>
                </section>
            )}
            <Table page="orders" inventoryNav="orders"  setTable={setTable} />
        </Fragment>
    )
}

OrdersMain.propTypes = {
    store: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    store: state.store,
    order: state.order
})

export default connect(mapStateToProps)(OrdersMain);

