import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '../../auth/Form';

export class Success extends Component {
    continue = e => {
        e.preventDefault();
        // Process Form
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (
            <Fragment>
                <Container>
                    <div className="container">
                        <h1>Thank You For Your Purchase</h1>
                        <p>You Will Be Receiving Your Order Shortly :)</p>
                        <Link to="/profile">View All Orders</Link>
                    </div>
                </Container>
            </Fragment>
        )
    }
}

export default Success;
