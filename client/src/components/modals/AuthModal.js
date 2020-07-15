import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register, login } from '../../actions/authActions';
import Modal from 'react-responsive-modal';

import { Logo } from '../Logo';
import logo from '../common/logo.jpg';
import smallLogo from '../common/logo.png';
import { ButtonContainer } from '../Button';

const initialState = {
    firstname: '',
    lastname: '',
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
            if(formData.password !== formData.password2) {
                setAlert('Passwords do not match', 'danger');
            } else if (formData.firstname === '' || formData.lastname === '') {
                setAlert('Both First & Last Name are required', 'danger');
            } else {
                const { email, password } = formData;
                const fullName = `${formData.firstname} ${formData.lastname}`
                register({ name: fullName, email, password });
            }
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
            <ModalContainer>
                <div className="container">
                    <div className="row">
                        <div id="modal" className="col-10 mx-auto col-md-8 col-lg-6 text-center text-capitalize p-5">
                            <Logo>
                                <img className="mainLogo" src={logo} style={{maxWidth: '100%', height:'50px'}} alt="cardboard express logo" />
                                <img className="smallLogo" src={smallLogo} style={{height: '50px'}} alt="cardboard express logo" />
                            </Logo>
                            <ul class="nav-underline" style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
                                <li style={{width:'50%'}}><a onClick={() => setFormSignUp(false)} className={`${formSignUp ? "" : "active"}`}>Log In</a></li>
                                <li style={{width:'50%'}}><a onClick={() => setFormSignUp(true)} className={`${formSignUp ? "active" : ""}`}>Sign Up</a></li>
                            </ul>
                            <form onSubmit={e => onSubmit(e)}>
                                {formSignUp && (
                                    <div style={{display: 'flex'}}>
                                        <input
                                            type="name"
                                            name="firstname"
                                            className="input_line"
                                            placeholder="Enter Name"
                                            value={formData.firstname}
                                            onChange={e => onChange(e)}
                                        />
                                        <input
                                            type="name"
                                            name="lastname"
                                            className="input_line"
                                            placeholder="Enter Name"
                                            value={formData.lastname}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                )}
                                <input
                                    type="email"
                                    name="email"
                                    className="input_line"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={e => onChange(e)}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    className="input_line"
                                    placeholder="Create Password"
                                    value={formData.password}
                                    onChange={e => onChange(e)}
                                />
                                {formSignUp ? (
                                    <Fragment>
                                        <input
                                            type="password"
                                            name="password2"
                                            className="input_line"
                                            placeholder="Confirm Password"
                                            value={formData.password2}
                                            onChange={e => onChange(e)}
                                        />
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <button type="submit">Register</button>
                                            <a onClick={() => setFormSignUp(false)} style={{margin: '1rem 0', cursor:'pointer'}}>I already have an account</a>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                        <button type="submit">Login</button>
                                        <a onClick={() => setFormSignUp(true)} style={{margin: '1rem 0', cursor:'pointer'}}>Don't yet have an account?</a>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </ModalContainer>
        );
    }

    return (
        <React.Fragment>
            {modal}
        </React.Fragment>
    )
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
    #modal {
        background: #fff;
        @media (max-width: 768px){
            margin-top: -7rem;
        }
    }
`;

AuthModal.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { setAlert, register, login })(AuthModal);
