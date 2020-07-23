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
                        <div id="home" style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <div style={{ padding:'50px',textAlign:'center', border: '2px solid #ccc', borderRadius:'15px', width: '50%' }}>
                                <Logo>
                                    <img src={logo} style={{maxHeight: '40px'}} alt="cardboard express logo" />
                                </Logo>
                                <div>
                                    <p className="text-primary">Choose A Store</p>
                                    <div>
                                        <div style={{padding: '1rem 2rem', borderBottom:'2px solid #ccc', minHeight: '100px', display: 'flex', justifyContent: 'space-between', alignItems:'center', boxSizing: 'border-box'}}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                                <Link to="/admin/wer23r" style={{fontSize: '1.3rem', fontWeight:'500', margin: ' 0.3rem 1rem'}}>The Cardboard Store</Link>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center', marginRight: '10px'}}>
                                                    <p style={{margin: '0'}}>$0</p> 
                                                    <p style={{margin: '0'}}>Sales</p>
                                                </div>
                                                <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center'}}>
                                                    <p style={{margin: '0'}}>0</p> 
                                                    <p style={{margin: '0'}}>Items</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'space-between', alignItems:'center', boxSizing: 'border-box'}}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                                <p style={{fontSize: '1.3rem', fontWeight:'500', margin: '0.3rem 1rem'}}>Stonebriar</p>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center', marginRight: '10px'}}>
                                                    <p style={{margin: '0'}}>$0</p> 
                                                    <p style={{margin: '0'}}>Sales</p>
                                                </div>
                                                <div style={{display: 'grid', gridGap: '10px', color:'#808080', textAlign: 'center'}}>
                                                    <p style={{margin: '0'}}>0</p> 
                                                    <p style={{margin: '0'}}>Items</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems:'center', boxSizing: 'border-box'}}>
                                            <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                                            <Link to="/create-store" style={{fontSize: '1.3rem', fontWeight:'500', margin: '0.3rem 1rem'}}>Create A Store</Link>
                                        </div>
                                        <div style={{padding: '1rem 2rem', minHeight: '100px', display: 'flex', justifyContent: 'center', alignItems:'center', boxSizing: 'border-box'}}>
                                            <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
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
