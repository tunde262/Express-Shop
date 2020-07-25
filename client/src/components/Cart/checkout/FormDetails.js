import React, { Fragment, Component } from 'react';

import { Container } from '../../auth/Form';
import { BackButton } from '../../common/BackButton';
import { ButtonContainer } from '../../Button';

const FormDetails = ({ values, onChange, nextStep, history })=> {
    const next = e => {
        e.preventDefault();
        nextStep();
    }

    const goBack = e => {
        e.preventDefault();
        history();
    }

    return (
        <Fragment>
            <BackButton onClick={goBack}><i className="fas fa-arrow-left"></i></BackButton>
            <Container>
                <div className="container">
                <h1>Info</h1>
                    <form onSubmit={next}>
                        <label>Full Name</label>
                        <div style={{display: 'flex'}}>
                            <input
                                type="text"
                                name="firstname"
                                className="input_line"
                                placeholder="First Name"
                                value={values.firstname}
                                onChange={onChange('firstname')}
                            />
                            <input
                                type="text"
                                name="lastname"
                                className="input_line"
                                placeholder="Last Name"
                                value={values.lastname}
                                onChange={onChange('lastname')}
                            />
                        </div>
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            className="input_line"
                            value={values.email}
                            onChange={onChange('email')}
                            placeholder="Enter your email"
                        />
                        {/* <div style={{display: 'flex'}}>
                            <input
                                type="text"
                                name="street"
                                className="input_line"
                                placeholder=""
                                value={formData.firstname}
                                onChange={e => onChange(e)}
                            />
                            <input
                                type="name"
                                name="lastname"
                                className="input_line"
                                placeholder="Last Name"
                                value={values.firstname}
                                onChange={e => onChange(e)}
                            />
                        </div> */}
                        <button>
                            Continue
                        </button>
                    </form>
                </div>
            </Container>
        </Fragment>
    )
}

export default FormDetails;
