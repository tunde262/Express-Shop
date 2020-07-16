import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactGA from 'react-ga';

import { BackButton } from '../common/BackButton';
import { Container } from './Form';

const Register = ({ setAlert, register, isAuthenticated, history }) => {
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
                <div className="container">
                    <h1>Sign Up</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <label for="name">Name
                            <input
                                type="name"
                                name="name"
                                className="input_line"
                                placeholder="Enter Name"
                                value={name}
                                onChange={e => onChange(e)}
                            />
                        </label>
                        <label for="email">Email
                            <input
                                type="email"
                                name="email"
                                className="input_line"
                                placeholder="Enter Email"
                                value={email}
                                onChange={e => onChange(e)}
                            />
                        </label>
                        <label for="password">Password
                            <input
                                type="password"
                                name="password"
                                className="input_line"
                                placeholder="Create Password"
                                value={password}
                                onChange={e => onChange(e)}
                            />
                        </label>
                        <label for="password2">Confirm Password
                            <input
                                type="password"
                                name="password2"
                                className="input_line"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={e => onChange(e)}
                            />
                        </label>
                        <button type="submit">Register</button>
                        <Link to="/login" style={{marginBottom: '1rem'}}>I already have an account</Link>
                    </form>
                </div>
            </Container>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
