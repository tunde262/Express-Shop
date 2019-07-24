import React, { Fragment, Component } from 'react';

import { Container } from '../../auth/Form';
import { ButtonContainer } from '../../Button';

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values: { name, email, address, amount } } = this.props;
        return (
            <Fragment>
                <Container>
                    <div className="container">
                        <h1>Confirm</h1>
                        <hr />
                        <ul>
                            <li><p style={{fontSize: '20px'}}><strong>Full Name:</strong> {name}</p></li>
                            <li><p style={{fontSize: '20px'}}><strong>Email:</strong> {email}</p></li>
                            <li><p style={{fontSize: '20px'}}><strong>Address:</strong> {address}</p></li>
                            <li><p style={{fontSize: '20px'}}><strong>Total:</strong> ${amount}</p></li>
                        </ul>
                        <a style={{marginRight: '1rem'}}onClick={this.back}>Back</a>
                        <ButtonContainer onClick={this.continue}>
                            Continue
                        </ButtonContainer>
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default Confirm;
