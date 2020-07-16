import React, { Fragment, Component } from 'react';

import { Container } from '../../auth/Form';
import { BackButton } from '../../common/BackButton';
import { ButtonContainer } from '../../Button';

export class FormDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    history = e => {
        e.preventDefault();
        this.props.history();
    }
    render() {
        const { values, onChange } = this.props;
        return (
            <Fragment>
                <BackButton onClick={this.history}><i className="fas fa-arrow-left"></i></BackButton>
                <Container>
                    <div className="container">
                    <h1>Info</h1>
                        <form onSubmit={this.continue}>
                            <label>Full Name</label>
                            <input 
                                type="text"
                                name="name"
                                className="input_line"
                                value={values.name}
                                onChange={onChange('name')}
                                placeholder="John Doe"
                            />
                            <label>Email</label>
                            <input 
                                type="text"
                                name="email"
                                className="input_line"
                                value={values.email}
                                onChange={onChange('email')}
                                placeholder="JohnDoe@email.com"
                            />
                            <button>
                                Continue
                            </button>
                        </form>
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default FormDetails;
