import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
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
    }

    if(isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <Fragment>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i> Register
                    </h1>   
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                        <label for="name">Name</label>
                        <input
                            type="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            value={name}
                            onChange={e => onChange(e)}
                        />
                        </div>
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
                            placeholder="Create Password"
                            value={password}
                            onChange={e => onChange(e)}
                        />
                        </div>
                        <div className="form-group">
                        <label for="password2">Confirm Password</label>
                        <input
                            type="password"
                            name="password2"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                        Register
                        </button>
                    </form>
                    <p className="lead mt-4">Have An Account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
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
