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
                        <h1>Delivery</h1>
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
                            <label>City</label>
                            <input 
                                type="text"
                                name="city"
                                className="input_line"
                                value={values.city}
                                onChange={onChange('city')}
                                placeholder="city"
                            />
                            <label>State</label>
                            <input 
                                type="text"
                                name="state"
                                className="input_line"
                                value={values.state}
                                onChange={onChange('state')}
                                placeholder="state"
                            />
                            <label>Zipcode</label>
                            <input 
                                type="text"
                                name="zipcode"
                                className="input_line"
                                value={values.zipcode}
                                onChange={onChange('zipcode')}
                                placeholder="zipcode"
                            />
                            <label>Phone Number</label>
                            <input 
                                type="text"
                                name="telephone"
                                className="input_line"
                                value={values.telephone}
                                onChange={onChange('telephone')}
                                placeholder="123-456-7890"
                            />
                            <small className='invalid_feedback'>We may need to contact you during delivery.</small>
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
