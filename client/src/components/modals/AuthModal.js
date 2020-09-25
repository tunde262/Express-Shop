import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register, login } from '../../actions/authActions';
import Modal from 'react-responsive-modal';

import { Logo } from '../Logo';
import logo from '../common/logo.png';
import smallLogo from '../common/logo.png';
import { ButtonContainer } from '../Button';
import AuthForm from './forms/authForm';

const initialState = {
    name: '',
    email: '',
    password: '',
    password2: '',
    signup: true
}

const AuthModal = ({ setAlert, register, login, auth: { isAuthenticated, user } }) => {

    const [displayModal, toggleModal] = useState(false);
    const [formData, setFormData] = useState(user);
    const [formSignUp, setFormSignUp] = useState(true);

    useEffect(() => {
        if(!user) {
            setFormData(initialState)
        } else {
            if(!user.signup) {
                setFormSignUp(false)
            }
        };
        if(!isAuthenticated) {
            setTimeout(() => toggleModal(!displayModal),5000)
        }
    }, []);



    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
        console.log(formData);

        console.log(formData);
    };

    const onSubmit = async e => {
        e.preventDefault();
        if(formSignUp) {
            const { name, email, password } = formData;
            // const fullName = `${formData.firstname} ${formData.lastname}`
            register({ name, email, password });
        } else {
            login(formData.email, formData.password);
        }
    }


    let modal;


    if(!displayModal) {
        modal = null
    }
    else {
        modal = (
            <AuthForm formData={formData} setFormSignUp={setFormSignUp} formSignUp={formSignUp} onSubmit={onSubmit} onChange={onChange} logo={logo} smallLogo={smallLogo}  />
        );
    }

    return (
        <React.Fragment>
            {modal}
        </React.Fragment>
    )
}

AuthModal.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { setAlert, register, login })(AuthModal);
