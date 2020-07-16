import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types';

import ReactGA from 'react-ga';

import { BackButton } from '../common/BackButton';
import { Container } from './Form';

const Login = ({ isAuthenticated, login, history }) => {
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
                <div className="container">
                    <h1>Login</h1>
                    <form onSubmit={e => onSubmit(e)}>
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
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => onChange(e)}
                            />
                        </label>
                        <button type="submit">Login</button>
                        <Link to="/register">Don't yet have an account?</Link>
                    </form>
                </div>
            </Container>
        </Fragment>
    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
