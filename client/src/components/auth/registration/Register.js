import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alertActions';
import { register } from '../../../actions/authActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../../common/logo.png';

import ReactGA from 'react-ga';

const initialState = {
    name: '',
    email: '',
    password: ''
};

const Register = ({ setAlert, register, auth: { isAuthenticated }, profile, history }) => {
    const [formData, setFormData] = useState(initialState);

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();

        const first_name = name.split(' ').slice(0, -1).join(' ');
        const last_name = name.split(' ').slice(-1).join(' ');

        console.log('FIRST NAME');
        console.log(first_name)
        console.log('LAST NAME');
        console.log(last_name);

        register({ 
            first_name, 
            last_name, 
            email, 
            password, 
            history 
        });

        setFormData(initialState);
        // if(password !== password2) {
        //     setAlert('Passwords do not match', 'danger');
        // } else {
        //     register({ name, email, password });
        // }

        clicked();
    }

    const clicked = () => {
        ReactGA.event({
            category: 'Account',
            action: 'Created An Account'
        });
    }

    if(isAuthenticated && !profile.loading && profile.profile) {
        if(!profile.profile.registration_complete) {
            history.push(`/account-setup`);
        } else {
            history.goBack();
        }  
    }

    return (
        <main id="home" className="store-form-container">
            <div className="store-form">
                <h3>Create Account</h3>
                <p style={{margin:'5px 0', color:'#808080', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>Welcome to the fastest place to shop online!</p>
                <div style={{height:'230px', overflow:'scroll'}}>
                    <input
                        type="text"
                        name="name"
                        className="input_line"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => onChange(e)}
                        style={{margin:'30px 0 20px 0', width:'100%', height:'50px'}}
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        className="input_line"
                        placeholder="Enter Email"
                        style={{margin:'0 0 20px 0', width:'100%', height:'50px'}}
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
                    Create Account
                </button>
                <Link to="/login" style={{color:'#808080'}}>Already have an account?</Link>
            </div>
        </main>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { setAlert, register })(Register);
