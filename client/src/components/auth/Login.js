import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types';

import { BackButton } from '../common/BackButton';

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
    }

    // Redirect if logged in
    if(isAuthenticated) {
        history.goBack();
    }

    return (
        <Fragment>
            <BackButton onClick={history.goBack}><i className="fas fa-arrow-left"></i></BackButton>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => onChange(e)}
                        />
                        </div>
                        <div className="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => onChange(e)}
                        />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                    <p className="lead mt-4">
                        No Account? <Link to="/register">Register</Link>
                    </p>
                    </div>
                </div>
            </div>
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
