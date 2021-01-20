import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { getStoreById } from '../actions/storeActions';

import qrPNG from '../utils/imgs/frame.png';

const NewStore = ({
    getStoreById,
    store: {
        store,
        loading
    },
    match,
    profile
}) => {

    const [gotStore, setGotStore] = useState(false);
    const [gotCode, setGotCode] = useState(false);

    var url_string = (window.location.href);
    var url = new URL(url_string);
    var urlCode = url.searchParams.get("code");

    useEffect(() => {
        
    }, []);
    

    const getAccountLink = async (urlCode, storeId) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const formData = {
            "code": `${urlCode}`
        }

        console.log('pre-request:' + formData.code)

        const res = await axios.post(`/api/stripe/create-account-hosted/${storeId}`, formData, config);
        console.log('requested: ' + res.data);
        const accountNum = res.data;
        console.log('state: ' + accountNum);
        // setAccountLink(res.data.url);
    }

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

    if(!profile.loading && profile.profile !== null && profile.profile.recent_store && !gotStore) {
        getStoreById(profile.profile.recent_store);
        setGotStore(true);
    }

    if(urlCode && !loading && store && !gotCode){
        getAccountLink(urlCode, store._id);
        setGotCode(true);
    }

    return (
        <Fragment>
            <div className="page-full">
                <h2 className="slogan" style={{margin:'20px auto 0'}}>
                    Congratulations! <br/>You store was just created . . .
                </h2>

                <div className="qr-img-container">
                    <img className="qr-img" src={qrPNG} />
                </div>

                <p>
		            Scan this QR code with your phone's camera app to see your store live (or click it):
                </p>


                <div className="group design">
                    <div className="heading">
                        SHARE YOUR STORE
                    </div>
                    <p>Share your store with others by copying the URL below or download & print your QR Code:</p>


                    {!loading && store ? <input type="text" value={'http://localhost:3000/store/' + store._id} style={{width:'calc(100% - 14px)'}} /> : null}

                    <p>We can also send the URL and QR Code to your email so you don't lose it:</p>

                    <div className="input-container">
                        Your email:{' '}
                        <input type="text" className="email" value="example@example.com" style={{display:'inline-block', marginLeft:'10px', width:'200px'}} />
                        <div className="button">
                            Send me link
                        </div>
                    </div> 
                </div>
                
                {/* <div style={{display:'flex', justifyContent:'center'}}>
                    <YoutubeBlock videoId='_nBlN9yp9R8' />
                </div> */}

                <a href="/" className="qr_code_link action-save-changes" target="_blank">
                    {/* <div className="qr_code">
                        <img className="qr_code_logo" src="https://qrmenucreator.com/assets/11.png?2" />
                        <canvas width="1000" height="1000" style={{display:'none'}} />
                        <img style={{display: 'block'}} src="https://lh3.googleusercontent.com/proxy/WfUMWqfw-3Mb2w9wPBhvFme--pGZJsjKPRsLxtSyMnqdckRlaNqAVZauN5att8-i9fsSYbonKzltSadFBO-EwPS9ZDREQTQ5wmj-xZqLg-ka0PcQun6xU_4e" />
                    </div> */}
                </a>
                <div className="button-container full medium store-socials">
                    <a href={store && `/admin/${store._id}?show=store`}>
                        <button className="button">
                            View Dashboard
                        </button> 
                    </a>
                </div>
                <div style={{height:'100px', width:'100%'}}></div>
            </div> 
        </Fragment>
    )
}

NewStore.propTypes = {
    store: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getStoreById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    store: state.store,
    profile: state.profile
});

export default connect(mapStateToProps, { getStoreById })(NewStore);
