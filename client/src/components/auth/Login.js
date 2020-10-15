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
        <Fragment>
            <BackButton onClick={history.goBack}><i className="fas fa-arrow-left"></i></BackButton>
            <Container>
                <div style={{marginTop:'7rem'}} className="form-container sign-up-container" id="sign-up-container">
                    <form style={{display:'flex', flexDirection:'column', alignItems:'center', marginBottom: '-2rem'}} id="auth-form" onSubmit={onSubmit}>
                        <img src={logo} style={{maxHeight: '60px', marginBottom: '2rem'}} alt="cardboard express logo" />
                        <h3>Sign In</h3>
                        <p>Welcome back to the fastest place to shop online!</p>
                        <input
                        type="email"
                        name="email"
                        className="input_line"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => onChange(e)}
                        style={{margin:'10px 0', width:'100%', height:'50px'}}
                        />
                        <input
                            type="password"
                            name="password"
                            className="input_line"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => onChange(e)}
                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                        />
                        {/* <input
                            type="password"
                            name="password2"
                            className="input_line"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={e => onChange(e)}
                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                        /> */}
                        <button style={{width: '100%'}} type="submit">Welcome Back!</button>
                        <Link to="/register" style={{color:'#808080', marginTop:'1rem'}}>Don't have an account?</Link>
                    </form>
                </div>
            </Container>
        </Fragment>
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
