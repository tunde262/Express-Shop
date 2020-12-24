import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    signup: true
};

const AuthModal = ({ setAlert, register, login, auth: { isAuthenticated, user }, history }) => {

    const [displayModal, toggleModal] = useState(false);
    const [formData, setFormData] = useState(initialState);
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

    const { name, email, password } = formData;

    const onSubmit = async e => {
        e.preventDefault();

        const first_name = name.split(' ').slice(0, -1).join(' ');
        const last_name = name.split(' ').slice(-1).join(' ');

        console.log('FIRST NAME');
        console.log(first_name)
        console.log('LAST NAME');
        console.log(last_name);

        if(formSignUp) {
            // const fullName = `${formData.firstname} ${formData.lastname}`
            register({ 
                first_name, 
                last_name, 
                email, 
                password, 
                history 
            });
        } else {
            login(email, password);
        }

        setFormData(initialState);
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

export default connect(mapStateToProps, { setAlert, register, login })(withRouter(AuthModal));
