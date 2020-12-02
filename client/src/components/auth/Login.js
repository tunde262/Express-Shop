import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types';
import logo from '../common/logo.png';

import ReactGA from 'react-ga';

import { BackButton } from '../common/BackButton';
import { Container } from './Form';

const Login = ({ auth: { isAuthenticated, user }, login, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
        
        clicked();
    }

    const clicked = () => {
        ReactGA.event({
            category: 'Account',
            action: 'Logged Into Account'
        });  
    }

    // Redirect if logged in
    if(isAuthenticated) {
        history.goBack();
    }

    return (
        <main id="home" className="store-form-container">
            <div className="store-form">
                <h3>Sign In</h3>
                <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Welcome back to the fastest place to shop online!</p>
                <div style={{height:'230px', overflow:'scroll'}}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        className="input_line"
                        placeholder="Enter Email"
                        style={{margin:'30px 0 20px 0', width:'100%', height:'50px'}}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => onChange(e)}
                        className="input_line"
                        style={{margin:'0', width:'100%', height:'50px'}}
                    />
                </div>
                <button onClick={onSubmit} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    Continue 
                </button>
                <Link to="/register" style={{color:'#808080'}}>Don't have an account?</Link>
            </div>
        </main>
    )
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
