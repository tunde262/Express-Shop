import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../../../actions/authActions';

const Login = ({ slideform1, setSlideForm1, auth: { isAuthenticated, user }, login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [changedForm, setChangedForm] = useState(false);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    const todo = async e => {
        if(isAuthenticated) {
            setSlideForm1(true);
        } else {
            onSubmit(e);
        }
    }

    // Continue to next slide if logged in
    if(isAuthenticated && !changedForm) {
        setSlideForm1(true);
        setChangedForm(true);
    }

    return (
        <Fragment>
            <h3>Sign In</h3>
            <p style={{margin:'5px 0', fontSize:'1rem', fontFamily:'Arial, Helvetica, sans-serif'}}>to continue <span style={{color:'rgb(47, 183, 236)', fontSize:'1rem'}}>creating a new store</span>.</p>
            <div style={{height:'230px', overflow:'scroll'}}>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    className="input_line"
                    placeholder="Enter Email"
                    style={{margin:'30px 0 20px 0', width:'100%', height:'50px'}}
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
            <button onClick={e => todo(e)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p style={{margin:'0', color:'#808080'}}>Don't have an account?</p>
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
