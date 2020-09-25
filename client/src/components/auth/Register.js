import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../common/logo.png';

import ReactGA from 'react-ga';

import { BackButton } from '../common/BackButton';
import { Container } from './Form';

const Register = ({ setAlert, register, auth: { isAuthenticated, user }, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }

        clicked();
    }

    const clicked = () => {
        ReactGA.event({
            category: 'Account',
            action: 'Created An Account'
        });
    }

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
                            <h3>Create Account</h3>
                            <p>Welcome to the fastest place to shop online!</p>
                            <input
                            type="text"
                            name="name"
                            className="input_line"
                            placeholder="Enter Name"
                            value={name}
                            onChange={e => onChange(e)}
                            style={{margin:'10px 0', width:'100%', height:'50px'}}
                            />
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
                            <button style={{width: '100%'}} type="submit">Create An Account</button>
                            <Link to="/login" style={{color:'#808080', marginTop:'1rem'}}>Already have an account?</Link>
                        </form>
                    </div>
            </Container>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { setAlert, register })(Register);
