import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getCurrentStore, deleteStore } from '../../actions/storeActions';

import Table from './table/Table';
import JoinCreate from './JoinCreate';
import logo from '../common/logo.jpg';
import { Logo } from '../Logo';

const Admin = ({ getCurrentStore, store: { store, loading } }) => {
    useEffect(() => {
        getCurrentStore();
    }, []);
    return (
        <Fragment>
            {loading && store === null ? <Spinner /> : (
                <Fragment>
                    {store !== null ? (
                        <div id="home" className="column-center">
                            <div className="stores-box">
                                <Logo>
                                    <img src={logo} style={{maxHeight: '40px'}} alt="cardboard express logo" />
                                </Logo>
                                <div>
                                    <p className="text-primary">Choose A Store</p>
                                    <div>
                                        <div className="stores-box-option">
                                            <div className="stores-box-option-title">
                                                <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                                <Link to="/admin/wer23r">The Cardboard Store</Link>
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
                                        <div className="stores-box-option">
                                            <div className="stores-box-option-title">
                                                <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                                <a>Stonebriar</a>
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
                                        <div className="stores-box-option">
                                            <div className="stores-box-option-title">
                                                <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                                <Link to="/admin/wer23r">The Cardboard Store</Link>
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
                                        <div className="stores-box-option">
                                            <div className="stores-box-option-title">
                                                <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                                <a>Stonebriar</a>
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
                                        <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems:'center', boxSizing: 'border-box'}}>
                                            <Link to="/create-store" style={{fontSize: '1.3rem', fontWeight:'500', margin: '0.3rem 1rem'}}>Create A Store</Link>
                                        </div>
                                        <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems:'center', boxSizing: 'border-box'}}>
                                            <p style={{fontSize: '1.3rem', fontWeight:'500', margin: '0.3rem 1rem'}}>Join A Store</p>
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
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { getCurrentStore, deleteStore })(Admin);
