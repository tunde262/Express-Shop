import React, { Fragment, Component } from 'react';

import { Container } from '../../auth/Form';
import { ButtonContainer } from '../../Button';

export class FormAddress extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, onChange } = this.props;
        return (
            <Fragment>
                <Container>
                    <div className="container">
                        <h1>Address</h1>
                        <form onSubmit={this.continue}>
                            <label>Address</label>
                            <input 
                                type="text"
                                name="address"
                                className="input_line"
                                value={values.address}
                                onChange={onChange('address')}
                                placeholder="1234 Example Street Drive"
                            />
                            <a style={{marginRight: '1rem'}}onClick={this.back}>Back</a>
                            <ButtonContainer>
                                Continue
                            </ButtonContainer>
                        </form>
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default FormAddress;
